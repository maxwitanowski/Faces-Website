// Authentication System for Faces Website
const AUTH = {
    // Creator/Admin email
    CREATOR_EMAIL: 'maxwitanowski@gmail.com',

    // Get all users from localStorage
    getUsers() {
        const users = localStorage.getItem('faces_users');
        return users ? JSON.parse(users) : [];
    },

    // Save users to localStorage
    saveUsers(users) {
        localStorage.setItem('faces_users', JSON.stringify(users));
    },

    // Get current logged in user
    getCurrentUser() {
        const user = localStorage.getItem('faces_current_user');
        return user ? JSON.parse(user) : null;
    },

    // Set current user
    setCurrentUser(user) {
        if (user) {
            localStorage.setItem('faces_current_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('faces_current_user');
        }
    },

    // Check if email is creator/admin
    isCreator(email) {
        return email && email.toLowerCase() === this.CREATOR_EMAIL.toLowerCase();
    },

    // Check if current user is creator
    isCurrentUserCreator() {
        const user = this.getCurrentUser();
        return user && this.isCreator(user.email);
    },

    // Sign up new user
    signUp(name, email, password) {
        const users = this.getUsers();

        // Check if email already exists
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, error: 'Email already registered' };
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: password, // In production, this should be hashed
            createdAt: new Date().toISOString(),
            isCreator: this.isCreator(email)
        };

        users.push(newUser);
        this.saveUsers(users);

        // Auto sign in
        this.setCurrentUser(newUser);

        return { success: true, user: newUser };
    },

    // Sign in existing user
    signIn(email, password) {
        const users = this.getUsers();
        const user = users.find(u =>
            u.email.toLowerCase() === email.toLowerCase().trim() &&
            u.password === password
        );

        if (!user) {
            return { success: false, error: 'Invalid email or password' };
        }

        // Update isCreator status in case it changed
        user.isCreator = this.isCreator(user.email);
        this.setCurrentUser(user);

        return { success: true, user };
    },

    // Sign out
    signOut() {
        this.setCurrentUser(null);
    },

    // Get user initials for avatar
    getInitials(name) {
        return name.substring(0, 2).toUpperCase();
    }
};

// Auth UI Component
const AuthUI = {
    // Create and show auth modal
    showAuthModal(mode = 'signin') {
        // Remove existing modal if any
        const existingModal = document.getElementById('authModal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = 'authModal';
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-modal-content">
                <button class="auth-close-btn" onclick="AuthUI.closeModal()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div class="auth-header">
                    <div class="auth-logo">
                        <img src="images/app_logo.png" alt="Faces Logo">
                    </div>
                    <h2 id="authTitle">${mode === 'signin' ? 'Welcome Back' : 'Create Account'}</h2>
                    <p id="authSubtitle">${mode === 'signin' ? 'Sign in to your account' : 'Join the Faces community'}</p>
                </div>
                <form id="authForm" class="auth-form">
                    <div class="auth-input-group" id="nameGroup" style="display: ${mode === 'signup' ? 'block' : 'none'}">
                        <label for="authName">Name</label>
                        <input type="text" id="authName" placeholder="Your name" maxlength="50">
                    </div>
                    <div class="auth-input-group">
                        <label for="authEmail">Email</label>
                        <input type="email" id="authEmail" placeholder="your@email.com" required>
                    </div>
                    <div class="auth-input-group">
                        <label for="authPassword">Password</label>
                        <input type="password" id="authPassword" placeholder="••••••••" required minlength="6">
                    </div>
                    <div class="auth-error" id="authError" style="display: none;"></div>
                    <button type="submit" class="btn btn-primary auth-submit-btn">
                        ${mode === 'signin' ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>
                <div class="auth-switch">
                    <span id="authSwitchText">${mode === 'signin' ? "Don't have an account?" : "Already have an account?"}</span>
                    <button type="button" class="auth-switch-btn" onclick="AuthUI.toggleMode()">
                        ${mode === 'signin' ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.dataset.mode = mode;

        // Handle form submission
        document.getElementById('authForm').addEventListener('submit', (e) => {
            e.preventDefault();
            AuthUI.handleSubmit();
        });

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) AuthUI.closeModal();
        });

        // Focus first input
        setTimeout(() => {
            if (mode === 'signup') {
                document.getElementById('authName').focus();
            } else {
                document.getElementById('authEmail').focus();
            }
        }, 100);
    },

    // Close modal
    closeModal() {
        const modal = document.getElementById('authModal');
        if (modal) modal.remove();
    },

    // Toggle between sign in and sign up
    toggleMode() {
        const modal = document.getElementById('authModal');
        const currentMode = modal.dataset.mode;
        const newMode = currentMode === 'signin' ? 'signup' : 'signin';

        modal.dataset.mode = newMode;
        document.getElementById('authTitle').textContent = newMode === 'signin' ? 'Welcome Back' : 'Create Account';
        document.getElementById('authSubtitle').textContent = newMode === 'signin' ? 'Sign in to your account' : 'Join the Faces community';
        document.getElementById('nameGroup').style.display = newMode === 'signup' ? 'block' : 'none';
        document.querySelector('.auth-submit-btn').textContent = newMode === 'signin' ? 'Sign In' : 'Sign Up';
        document.getElementById('authSwitchText').textContent = newMode === 'signin' ? "Don't have an account?" : "Already have an account?";
        document.querySelector('.auth-switch-btn').textContent = newMode === 'signin' ? 'Sign Up' : 'Sign In';
        document.getElementById('authError').style.display = 'none';

        // Clear and refocus
        document.getElementById('authForm').reset();
        if (newMode === 'signup') {
            document.getElementById('authName').focus();
        } else {
            document.getElementById('authEmail').focus();
        }
    },

    // Handle form submission
    handleSubmit() {
        const modal = document.getElementById('authModal');
        const mode = modal.dataset.mode;
        const email = document.getElementById('authEmail').value.trim();
        const password = document.getElementById('authPassword').value;
        const errorEl = document.getElementById('authError');

        let result;

        if (mode === 'signup') {
            const name = document.getElementById('authName').value.trim();
            if (!name) {
                errorEl.textContent = 'Please enter your name';
                errorEl.style.display = 'block';
                return;
            }
            result = AUTH.signUp(name, email, password);
        } else {
            result = AUTH.signIn(email, password);
        }

        if (result.success) {
            this.closeModal();
            this.updateUI();
            // Trigger custom event for pages to listen to
            window.dispatchEvent(new CustomEvent('authChanged', { detail: result.user }));
        } else {
            errorEl.textContent = result.error;
            errorEl.style.display = 'block';
        }
    },

    // Update UI based on auth state
    updateUI() {
        const user = AUTH.getCurrentUser();
        const authContainer = document.getElementById('authContainer');

        if (!authContainer) return;

        if (user) {
            const isCreator = AUTH.isCreator(user.email);
            authContainer.innerHTML = `
                <div class="user-menu">
                    <button class="user-menu-btn" onclick="AuthUI.toggleUserMenu()">
                        <div class="user-avatar ${isCreator ? 'creator-avatar' : ''}">${AUTH.getInitials(user.name)}</div>
                        <span class="user-name">${user.name}</span>
                        ${isCreator ? '<span class="creator-badge-small">Creator</span>' : ''}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <div class="user-dropdown" id="userDropdown">
                        <div class="user-dropdown-header">
                            <div class="user-avatar-large ${isCreator ? 'creator-avatar' : ''}">${AUTH.getInitials(user.name)}</div>
                            <div>
                                <div class="user-dropdown-name">${user.name}</div>
                                <div class="user-dropdown-email">${user.email}</div>
                            </div>
                        </div>
                        ${isCreator ? '<div class="user-dropdown-badge">App Creator</div>' : ''}
                        <div class="user-dropdown-divider"></div>
                        <button class="user-dropdown-item" onclick="AUTH.signOut(); AuthUI.updateUI(); window.dispatchEvent(new Event('authChanged'));">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Sign Out
                        </button>
                    </div>
                </div>
            `;
        } else {
            authContainer.innerHTML = `
                <button class="btn btn-secondary auth-btn" onclick="AuthUI.showAuthModal('signin')">Sign In</button>
                <button class="btn btn-primary auth-btn" onclick="AuthUI.showAuthModal('signup')">Sign Up</button>
            `;
        }
    },

    // Toggle user dropdown menu
    toggleUserMenu() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.toggle('open');
        }
    },

    // Initialize auth UI
    init() {
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const dropdown = document.getElementById('userDropdown');
            const menuBtn = document.querySelector('.user-menu-btn');
            if (dropdown && !dropdown.contains(e.target) && !menuBtn?.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });

        this.updateUI();
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    AuthUI.init();
});
