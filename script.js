// Particles Animation
function createParticles() {
    const container = document.getElementById('particles-container');
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        // Random colors
        const colors = ['#4CAF50', '#2196F3', '#FFD700', '#FF5722', '#9C27B0'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 6000);
    }, 200);
}

// Confetti Animation
function createConfetti() {
    const container = document.getElementById('confetti-container');
    
    setInterval(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        // Random confetti shapes and colors
        const colors = ['#FFD700', '#FF5722', '#4CAF50', '#2196F3', '#9C27B0', '#E91E63'];
        const shapes = ['square', 'circle', 'triangle'];
        
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        if (shape === 'circle') {
            confetti.style.borderRadius = '50%';
        } else if (shape === 'triangle') {
            confetti.style.width = '0';
            confetti.style.height = '0';
            confetti.style.borderLeft = '5px solid transparent';
            confetti.style.borderRight = '5px solid transparent';
            confetti.style.borderBottom = '10px solid ' + confetti.style.background;
            confetti.style.background = 'transparent';
        }
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }, 100);
}

// Modal functionality
const modal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeBtn = document.querySelector('.close');

loginBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Login form submission (fake)
document.querySelector('.login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        // Simulate login process
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Вход...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Добро пожаловать, ' + username + '! (Это демо-версия)');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            submitBtn.textContent = 'Войти';
            submitBtn.disabled = false;
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }, 2000);
    }
});

// Giveaway participation buttons
document.querySelectorAll('.giveaway-card .btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const rankType = btn.closest('.giveaway-card').querySelector('.rank-badge').textContent;
        
        // Animate button
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 100);
        
        // Show participation message
        const originalText = btn.textContent;
        btn.textContent = 'Участвуете!';
        btn.style.background = '#4CAF50';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = '';
        }, 2000);
        
        // Show notification
        showNotification(`Вы участвуете в розыгрыше ранга "${rankType}"!`);
    });
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #4CAF50, #66BB6A);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 3000;
        font-weight: 700;
        box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

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

// Animate stats on scroll
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                if (finalValue.includes(',')) {
                    const numericValue = parseInt(finalValue.replace(',', ''));
                    animateNumber(target, 0, numericValue, 2000);
                } else if (finalValue.includes('/')) {
                    // Handle 24/7 case
                    target.style.animation = 'pulse 1s ease-in-out';
                } else {
                    const numericValue = parseInt(finalValue);
                    animateNumber(target, 0, numericValue, 2000);
                }
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    const startTime = Date.now();
    const update = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        
        element.textContent = current > 999 ? current.toLocaleString() : current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };
    update();
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createConfetti();
    animateStats();
    
    // Add hover effects to cards
    document.querySelectorAll('.giveaway-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroBlocks = document.querySelectorAll('.floating-block');
        
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        
        heroBlocks.forEach((block, index) => {
            const speed = (index + 1) * 0.3;
            block.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
});

// Add special effects for holidays
function createSpecialEffects() {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    
    // New Year effects
    if (month === 0 && day === 1) {
        document.body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%), url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><text y=\'50\' font-size=\'50\'>🎊</text></svg>")';
    }
    
    // Add random sparkles
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #FFD700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: sparkle 1s ease-out forwards;
        `;
        
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }, 500);
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1) rotate(180deg); opacity: 1; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(sparkleStyle);

// Initialize special effects
createSpecialEffects();