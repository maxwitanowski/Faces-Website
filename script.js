// Platform Detection
const platforms = {
    windows: {
        name: 'Windows',
        note: 'Windows 10/11 required',
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>`,
        download: 'https://github.com/maxwitanowski/Faces-Website/releases/download/windows-release/Faces-Windows.zip'
    },
    macos: {
        name: 'macOS',
        note: 'macOS 11+ required',
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>`,
        download: 'https://github.com/maxwitanowski/Faces-Website/releases/download/Faces-Mac-Release/builds.zip'
    },
    linux: {
        name: 'Linux',
        note: 'Extract and run',
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2z"/></svg>`,
        download: 'https://github.com/maxwitanowski/Faces-Website/releases/download/Faces-Linux-release/Faces-Linux.zip'
    }
};

// Detect user's platform
function detectPlatform() {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();

    if (platform.includes('mac') || userAgent.includes('mac')) {
        return 'macos';
    } else if (platform.includes('linux') || userAgent.includes('linux')) {
        return 'linux';
    }
    return 'windows'; // Default to Windows
}

// Initialize download dropdown
function initDownloadDropdown() {
    const dropdown = document.querySelector('.download-dropdown');
    const btn = document.getElementById('downloadBtn');
    const menu = document.getElementById('dropdownMenu');
    const platformIcon = document.getElementById('platformIcon');
    const platformName = document.getElementById('platformName');
    const downloadNote = document.getElementById('downloadNote');

    // Set initial platform based on detection
    const detectedPlatform = detectPlatform();
    let currentPlatform = detectedPlatform;

    // Update hero download button text based on platform
    const heroDownloadText = document.getElementById('heroDownloadText');
    if (heroDownloadText) {
        heroDownloadText.textContent = `Download for ${platforms[detectedPlatform].name}`;
    }

    // macOS warning element
    const macosWarning = document.getElementById('macosWarning');

    // macOS copy button functionality
    const copyMacosCmd = document.getElementById('copyMacosCmd');
    const macosCommand = document.getElementById('macosCommand');
    if (copyMacosCmd && macosCommand) {
        copyMacosCmd.addEventListener('click', () => {
            const commandText = macosCommand.textContent;
            navigator.clipboard.writeText(commandText).then(() => {
                // Show copied feedback
                const originalTitle = copyMacosCmd.title;
                copyMacosCmd.title = 'Copied!';
                copyMacosCmd.classList.add('copied');
                setTimeout(() => {
                    copyMacosCmd.title = originalTitle;
                    copyMacosCmd.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        });
    }

    if (!dropdown || !btn) return;

    // Update UI for detected platform
    function updatePlatformUI(platform) {
        const data = platforms[platform];
        platformIcon.innerHTML = data.icon;
        platformName.textContent = data.name;
        downloadNote.textContent = data.note;
        currentPlatform = platform;

        // Show/hide macOS warning
        if (macosWarning) {
            macosWarning.style.display = platform === 'macos' ? 'block' : 'none';
        }
    }

    updatePlatformUI(detectedPlatform);

    // Click on main button area (not dropdown arrow) triggers download
    btn.addEventListener('click', (e) => {
        const arrow = btn.querySelector('.dropdown-arrow');
        const arrowRect = arrow.getBoundingClientRect();

        // Check if click was on the dropdown arrow area
        if (e.clientX >= arrowRect.left) {
            // Click on arrow - toggle dropdown
            e.stopPropagation();
            dropdown.classList.toggle('open');
        } else {
            // Click on main button - open dependency modal
            e.stopPropagation();
            dropdown.classList.remove('open');
            // Open dependency modal if it exists
            const depModal = document.getElementById('depModal');
            if (depModal) {
                depModal.classList.add('open');
            } else {
                window.location.href = platforms[currentPlatform].download;
            }
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });

    // Handle dropdown item click - download immediately
    menu.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const platform = item.dataset.platform;

            // Update button display for future clicks
            updatePlatformUI(platform);

            // Close dropdown
            dropdown.classList.remove('open');
        });
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initDownloadDropdown);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to feature cards, showcase items, and about card
document.querySelectorAll('.feature-card, .showcase-item, .provider-card, .about-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add staggered animation delay to feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Add staggered animation delay to provider cards
document.querySelectorAll('.provider-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Parallax effect for hero glow
const heroGlow = document.querySelector('.hero-glow');
if (heroGlow) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        heroGlow.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Button hover ripple effect
document.querySelectorAll('.btn, .btn-donate, .btn-donate-alt').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            transform: translate(-50%, -50%);
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        requestAnimationFrame(() => {
            ripple.style.transition = 'width 0.4s, height 0.4s, opacity 0.4s';
            ripple.style.width = '200px';
            ripple.style.height = '200px';
            ripple.style.opacity = '0';
        });

        setTimeout(() => ripple.remove(), 400);
    });
});

// Mobile menu toggle
const createMobileMenu = () => {
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');

    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'mobile-menu-btn';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    hamburger.style.cssText = `
        display: none;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 10px;
    `;

    // Style hamburger spans
    hamburger.querySelectorAll('span').forEach(span => {
        span.style.cssText = `
            width: 25px;
            height: 2px;
            background: white;
            transition: all 0.3s ease;
        `;
    });

    // Show hamburger on mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMobileMenu = (e) => {
        if (e.matches) {
            hamburger.style.display = 'flex';
        } else {
            hamburger.style.display = 'none';
            navLinks.style.display = 'flex';
        }
    };

    mediaQuery.addListener(handleMobileMenu);
    handleMobileMenu(mediaQuery);

    // Toggle menu
    let menuOpen = false;
    hamburger.addEventListener('click', () => {
        menuOpen = !menuOpen;
        if (menuOpen) {
            navLinks.style.cssText = `
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(10, 10, 15, 0.98);
                padding: 20px;
                gap: 20px;
                border-bottom: 1px solid #2a2a3a;
            `;
        } else {
            navLinks.style.display = 'none';
        }
    });

    navContainer.appendChild(hamburger);
};

// Initialize mobile menu
createMobileMenu();

// Settings Tabs
function initSettingsTabs() {
    const tabs = document.querySelectorAll('.settings-tab');
    const panels = document.querySelectorAll('.settings-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // Remove active from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Add active to clicked tab and corresponding panel
            tab.classList.add('active');
            document.getElementById(`panel-${targetTab}`).classList.add('active');
        });
    });
}

// Initialize settings tabs
initSettingsTabs();

// Console easter egg
console.log('%c Faces AI ', 'background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; font-size: 20px; padding: 10px 20px; border-radius: 8px;');
console.log('%c Built by Max - a 13 year-old vibe-coder! ', 'color: #a0a0b0; font-size: 14px;');

// Reviews System
function initReviews() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsGrid = document.getElementById('reviewsGrid');
    const reviewsEmpty = document.getElementById('reviewsEmpty');
    const starRating = document.getElementById('starRating');
    const reviewText = document.getElementById('reviewText');
    const charCount = document.getElementById('charCount');

    if (!reviewForm) return;

    const API_URL = window.location.origin;
    let selectedRating = 0;

    // Check if user is creator (uses AUTH from auth.js)
    function isCreator(email) {
        return typeof AUTH !== 'undefined' && AUTH.isCreator(email);
    }

    // Check if current user can delete reviews (is creator/admin)
    function canDelete() {
        return typeof AUTH !== 'undefined' && AUTH.isCurrentUserCreator();
    }

    // Get current user
    function getCurrentUser() {
        return typeof AUTH !== 'undefined' ? AUTH.getCurrentUser() : null;
    }

    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Fetch reviews from API
    async function fetchReviews() {
        try {
            const response = await fetch(`${API_URL}/api/reviews`);
            return await response.json();
        } catch (err) {
            console.error('Error fetching reviews:', err);
            return [];
        }
    }

    // Delete review (admin only)
    window.deleteReview = async function(reviewId) {
        if (!canDelete()) return;
        if (!confirm('Are you sure you want to delete this review?')) return;

        const user = getCurrentUser();
        try {
            await fetch(`${API_URL}/api/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail: user.email })
            });
            renderReviews();
        } catch (err) {
            console.error('Error deleting review:', err);
        }
    };

    // Render reviews
    async function renderReviews() {
        const reviews = await fetchReviews();
        const userCanDelete = canDelete();

        if (reviews.length === 0) {
            reviewsGrid.style.display = 'none';
            reviewsEmpty.style.display = 'block';
            return;
        }

        reviewsGrid.style.display = 'flex';
        reviewsEmpty.style.display = 'none';

        reviewsGrid.innerHTML = reviews.map((review) => {
            const reviewIsCreator = review.user_email && isCreator(review.user_email);
            return `
            <div class="review-card ${reviewIsCreator ? 'creator-review' : ''}">
                <div class="review-header">
                    <div class="review-author">
                        <div class="author-avatar ${reviewIsCreator ? 'creator-avatar' : ''}">${review.name.substring(0, 2).toUpperCase()}</div>
                        <div class="author-info">
                            <span class="author-name">
                                ${escapeHtml(review.name)}
                                ${reviewIsCreator ? '<span class="creator-badge"><svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Creator</span>' : ''}
                            </span>
                            <span class="author-date">${formatDate(review.created_at)}</span>
                        </div>
                    </div>
                    <div class="review-actions-header">
                        <div class="review-stars">
                            ${'<span>★</span>'.repeat(review.rating)}${'<span style="color: var(--text-muted);">★</span>'.repeat(5 - review.rating)}
                        </div>
                        ${userCanDelete ? `
                        <button class="delete-btn" onclick="deleteReview(${review.id})" title="Delete review">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>` : ''}
                    </div>
                </div>
                <p class="review-text">${escapeHtml(review.text)}</p>
            </div>
        `}).join('');
    }

    // Star rating click handler
    if (starRating) {
        starRating.querySelectorAll('span').forEach(star => {
            star.addEventListener('click', (e) => {
                e.preventDefault();
                selectedRating = parseInt(star.dataset.rating);
                updateStars();
            });

            star.addEventListener('mouseenter', () => {
                const hoverRating = parseInt(star.dataset.rating);
                starRating.querySelectorAll('span').forEach((s, i) => {
                    s.classList.toggle('active', i < hoverRating);
                });
            });
        });

        starRating.addEventListener('mouseleave', () => {
            updateStars();
        });
    }

    function updateStars() {
        starRating.querySelectorAll('span').forEach((s, i) => {
            s.classList.toggle('active', i < selectedRating);
        });
    }

    // Character count
    if (reviewText) {
        reviewText.addEventListener('input', () => {
            charCount.textContent = reviewText.value.length;
        });
    }

    // Update form UI based on auth state
    function updateFormUI() {
        const user = getCurrentUser();
        const nameInput = document.getElementById('reviewName');
        const submitBtn = reviewForm.querySelector('button[type="submit"]');

        if (user) {
            // User is logged in - pre-fill name and make it readonly
            nameInput.value = user.name;
            nameInput.readOnly = true;
            nameInput.style.opacity = '0.7';
            submitBtn.disabled = false;
        } else {
            // User is not logged in
            nameInput.value = '';
            nameInput.readOnly = false;
            nameInput.style.opacity = '1';
        }
    }

    // Form submission
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const user = getCurrentUser();

        // Require sign in to submit review
        if (!user) {
            if (typeof AuthUI !== 'undefined') {
                AuthUI.showAuthModal('signin');
            } else {
                alert('Please sign in to submit a review.');
            }
            return false;
        }

        const text = reviewText.value.trim();

        if (!text || selectedRating === 0) {
            if (selectedRating === 0) {
                alert('Please select a star rating.');
            } else {
                alert('Please write a review.');
            }
            return false;
        }

        try {
            await fetch(`${API_URL}/api/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    name: user.name,
                    userEmail: user.email,
                    text,
                    rating: selectedRating
                })
            });

            // Reset form
            reviewText.value = '';
            selectedRating = 0;
            updateStars();
            charCount.textContent = '0';

            renderReviews();
        } catch (err) {
            console.error('Error submitting review:', err);
            alert('Error submitting review. Please try again.');
        }

        return false;
    });

    // Listen for auth changes
    window.addEventListener('authChanged', () => {
        updateFormUI();
        renderReviews();
    });

    // Initial render
    updateFormUI();
    renderReviews();
}

// Initialize reviews on page load
document.addEventListener('DOMContentLoaded', () => {
    initReviews();
    initDependencyModal();
});

// ========================================
// DEPENDENCY SELECTION MODAL
// ========================================

function initDependencyModal() {
    const depModal = document.getElementById('depModal');
    const infoModal = document.getElementById('infoModal');
    const closeDepModal = document.getElementById('closeDepModal');
    const closeInfoModal = document.getElementById('closeInfoModal');
    const infoBackBtn = document.getElementById('infoBackBtn');
    const depDownloadBtn = document.getElementById('depDownloadBtn');
    const depSizeEl = document.getElementById('depSize');
    const infoContent = document.getElementById('infoContent');

    if (!depModal) return;

    // Dependency sizes (approximate MB)
    const depSizes = {
        kokoro: 200,
        whisper: 100,
        yolo: 150,
        piper: 80
    };

    // Base app size
    const baseSize = 150;

    // Dependency info content
    const depInfo = {
        kokoro: {
            title: 'Kokoro TTS',
            badge: 'recommended',
            description: `Kokoro is a high-quality text-to-speech engine that gives your AI a natural, expressive voice. It runs entirely on your device with no internet required.`,
            features: [
                'Natural-sounding voice synthesis',
                'Multiple voice options available',
                'Adjustable speech speed',
                'Runs offline - no API calls needed',
                'Low latency for real-time conversations'
            ]
        },
        whisper: {
            title: 'Whisper STT',
            badge: 'recommended',
            description: `OpenAI's Whisper is a state-of-the-art speech recognition model that accurately transcribes your voice into text. The local version ensures your conversations stay private.`,
            features: [
                'Highly accurate speech recognition',
                'Works with various accents and languages',
                'Runs locally for privacy',
                'Real-time transcription',
                'No internet connection required'
            ]
        },
        yolo: {
            title: 'YOLO 11',
            badge: 'recommended',
            description: `YOLO (You Only Look Once) v11 is a cutting-edge real-time object detection model. It enables face tracking and vision features so your AI can see and respond to the world around you.`,
            features: [
                'Real-time face tracking',
                'Object detection (80+ object types)',
                'Distance estimation',
                'Camera integration',
                'Optimized for speed and accuracy'
            ]
        },
        piper: {
            title: 'Piper TTS',
            badge: 'optional',
            description: `Piper is a lightweight, open-source text-to-speech engine. It's a great alternative to Kokoro if you want a smaller download size or prefer a different voice style.`,
            features: [
                'Lightweight and fast',
                'Open-source and customizable',
                'Multiple voice models available',
                'Lower resource usage',
                'Good for older hardware'
            ]
        }
    };

    // Calculate and update size display
    function updateSize() {
        let total = baseSize;
        if (document.getElementById('depKokoro').checked) total += depSizes.kokoro;
        if (document.getElementById('depWhisper').checked) total += depSizes.whisper;
        if (document.getElementById('depYolo').checked) total += depSizes.yolo;
        if (document.getElementById('depPiper').checked) total += depSizes.piper;
        depSizeEl.textContent = `~${total} MB`;
    }

    // Listen for checkbox changes
    ['depKokoro', 'depWhisper', 'depYolo', 'depPiper'].forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', updateSize);
        }
    });

    // Open dependency modal instead of direct download
    function openDepModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        depModal.classList.add('open');
        updateSize();
    }

    // Close dependency modal
    function closeDepModalFn() {
        depModal.classList.remove('open');
    }

    // Show info modal
    function showInfo(depKey) {
        const info = depInfo[depKey];
        if (!info) return;

        infoContent.innerHTML = `
            <h3>${info.title} <span class="dep-badge ${info.badge}">${info.badge}</span></h3>
            <p>${info.description}</p>
            <ul>
                ${info.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
        `;

        depModal.classList.remove('open');
        infoModal.classList.add('open');
    }

    // Close info modal and go back
    function closeInfoModalFn() {
        infoModal.classList.remove('open');
        depModal.classList.add('open');
    }

    // Handle download
    function handleDownload() {
        const platform = detectPlatform();
        const downloadUrl = platforms[platform].download;

        // For now, just download the main app
        // In a real implementation, this would trigger a custom build
        // or download separate dependency packages
        window.location.href = downloadUrl;
        closeDepModalFn();
    }

    // Event listeners
    closeDepModal.addEventListener('click', closeDepModalFn);
    closeInfoModal.addEventListener('click', closeInfoModalFn);
    infoBackBtn.addEventListener('click', closeInfoModalFn);
    depDownloadBtn.addEventListener('click', handleDownload);

    // Close on background click
    depModal.addEventListener('click', (e) => {
        if (e.target === depModal) closeDepModalFn();
    });
    infoModal.addEventListener('click', (e) => {
        if (e.target === infoModal) closeInfoModalFn();
    });

    // Learn more links
    document.querySelectorAll('.dep-learn-more').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const depKey = link.dataset.dep;
            showInfo(depKey);
        });
    });

    // Hero download button opens modal
    const heroDownloadBtn = document.getElementById('heroDownloadBtn');
    if (heroDownloadBtn) {
        heroDownloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openDepModal();
        });
    }

    // Initial size calculation
    updateSize();
}
