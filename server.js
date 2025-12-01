const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database tables
async function initDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                is_creator BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                author VARCHAR(50) NOT NULL,
                user_email VARCHAR(255),
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                image TEXT,
                category VARCHAR(50) DEFAULT 'general',
                views INTEGER DEFAULT 0,
                likes INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS replies (
                id SERIAL PRIMARY KEY,
                post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                author VARCHAR(50) NOT NULL,
                user_email VARCHAR(255),
                content TEXT NOT NULL,
                image TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                name VARCHAR(50) NOT NULL,
                user_email VARCHAR(255),
                text TEXT NOT NULL,
                rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS post_likes (
                id SERIAL PRIMARY KEY,
                post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                UNIQUE(post_id, user_id)
            )
        `);

        console.log('Database tables initialized');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

// Creator email
const CREATOR_EMAIL = 'maxwitanowski@gmail.com';

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const isCreator = email.toLowerCase() === CREATOR_EMAIL.toLowerCase();

        // Create user
        const result = await pool.query(
            'INSERT INTO users (name, email, password, is_creator) VALUES ($1, $2, $3, $4) RETURNING id, name, email, is_creator, created_at',
            [name.trim(), email.toLowerCase().trim(), hashedPassword, isCreator]
        );

        res.json({ success: true, user: result.rows[0] });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/auth/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Update is_creator status
        user.is_creator = user.email.toLowerCase() === CREATOR_EMAIL.toLowerCase();

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                is_creator: user.is_creator,
                created_at: user.created_at
            }
        });
    } catch (err) {
        console.error('Signin error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Posts Routes
app.get('/api/posts', async (req, res) => {
    try {
        const { category, sort, userId } = req.query;
        let query = 'SELECT * FROM posts';
        const params = [];

        if (category && category !== 'all') {
            query += ' WHERE category = $1';
            params.push(category);
        }

        if (sort === 'popular') {
            query += ' ORDER BY likes DESC, created_at DESC';
        } else if (sort === 'views') {
            query += ' ORDER BY views DESC, created_at DESC';
        } else {
            query += ' ORDER BY created_at DESC';
        }

        const result = await pool.query(query, params);

        // Get user's likes if userId provided
        let userLikes = [];
        if (userId) {
            const likesResult = await pool.query('SELECT post_id FROM post_likes WHERE user_id = $1', [userId]);
            userLikes = likesResult.rows.map(r => r.post_id);
        }

        // Get replies for each post and mark if user liked it
        for (let post of result.rows) {
            const replies = await pool.query('SELECT * FROM replies WHERE post_id = $1 ORDER BY created_at ASC', [post.id]);
            post.replies = replies.rows;
            post.userLiked = userLikes.includes(post.id);
        }

        res.json(result.rows);
    } catch (err) {
        console.error('Get posts error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/posts', async (req, res) => {
    try {
        const { userId, author, userEmail, title, content, image, category } = req.body;

        const result = await pool.query(
            'INSERT INTO posts (user_id, author, user_email, title, content, image, category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [userId, author, userEmail, title, content, image || null, category || 'general']
        );

        result.rows[0].replies = [];
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Create post error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/posts/:id/view', async (req, res) => {
    try {
        await pool.query('UPDATE posts SET views = views + 1 WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/posts/:id/like', async (req, res) => {
    try {
        const { userId } = req.body;
        const postId = req.params.id;

        // Check if already liked
        const existing = await pool.query('SELECT * FROM post_likes WHERE post_id = $1 AND user_id = $2', [postId, userId]);

        if (existing.rows.length > 0) {
            // Unlike
            await pool.query('DELETE FROM post_likes WHERE post_id = $1 AND user_id = $2', [postId, userId]);
            await pool.query('UPDATE posts SET likes = likes - 1 WHERE id = $1', [postId]);
            res.json({ liked: false });
        } else {
            // Like
            await pool.query('INSERT INTO post_likes (post_id, user_id) VALUES ($1, $2)', [postId, userId]);
            await pool.query('UPDATE posts SET likes = likes + 1 WHERE id = $1', [postId]);
            res.json({ liked: true });
        }
    } catch (err) {
        console.error('Like error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    try {
        const { userEmail } = req.body;

        // Only creator can delete
        if (userEmail.toLowerCase() !== CREATOR_EMAIL.toLowerCase()) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await pool.query('DELETE FROM posts WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        console.error('Delete post error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Replies Routes
app.post('/api/posts/:id/replies', async (req, res) => {
    try {
        const { userId, author, userEmail, content, image } = req.body;
        const postId = req.params.id;

        const result = await pool.query(
            'INSERT INTO replies (post_id, user_id, author, user_email, content, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [postId, userId, author, userEmail, content, image || null]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Create reply error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/api/replies/:id', async (req, res) => {
    try {
        const { userEmail } = req.body;

        // Only creator can delete
        if (userEmail.toLowerCase() !== CREATOR_EMAIL.toLowerCase()) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await pool.query('DELETE FROM replies WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        console.error('Delete reply error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Reviews Routes
app.get('/api/reviews', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Get reviews error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/reviews', async (req, res) => {
    try {
        const { userId, name, userEmail, text, rating } = req.body;

        const result = await pool.query(
            'INSERT INTO reviews (user_id, name, user_email, text, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [userId, name, userEmail, text, rating]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Create review error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/api/reviews/:id', async (req, res) => {
    try {
        const { userEmail } = req.body;

        // Only creator can delete
        if (userEmail.toLowerCase() !== CREATOR_EMAIL.toLowerCase()) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await pool.query('DELETE FROM reviews WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        console.error('Delete review error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await initDB();
});
