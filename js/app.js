/**
 * Main Application Logic
 */
class App {
    constructor() {
        this.router = new Router();
        this.games = {
            active: null,
            list: {}
        };
        this.init();
    }

    init() {
        this.setupCursor();
        this.setupThemeToggle();
        this.renderProjects();
        this.renderSkills();
        this.setupContactForm();

        console.log("%c LEGENDARY PORTFOLIO INITIALIZED ", "background: #00FFDE; color: #000; font-weight: bold; padding: 5px;");
    }

    setupCursor() {
        const cursor = document.getElementById('cursor');
        const follower = document.getElementById('cursor-follower');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // Smooth follower
            follower.animate({
                left: e.clientX + 'px',
                top: e.clientY + 'px'
            }, { duration: 500, fill: 'forwards' });
        });

        // Hover effects
        const clickables = document.querySelectorAll('a, button, .game-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.transform = 'translate(-50%, -50%) scale(2)';
                follower.style.borderColor = 'var(--secondary)';
            });
            el.addEventListener('mouseleave', () => {
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.borderColor = 'var(--primary)';
            });
        });
    }

    setupThemeToggle() {
        // Placeholder for theme logic
    }

    renderProjects() {
        const projects = [
            {
                title: "Neon Banking Interface",
                tags: ["Vue.js", "D3.js", "WebSockets"],
                desc: "A futuristic banking dashboard with real-time crypto visualization and biometric authentication simulation."
            },
            {
                title: "AI Content Generator",
                tags: ["React", "OpenAI API", "Node.js"],
                desc: "Full-stack application that generates marketing copy and images using generative AI models."
            },
            {
                title: "SpaceX Tracker 3D",
                tags: ["Three.js", "WebGL", "REST API"],
                desc: "Interactive 3D globe visualization of all active Starlink satellites and rocket launches."
            },
            {
                title: "Cyber Commerce",
                tags: ["Next.js", "Stripe", "Tailwind"],
                desc: "E-commerce platform with headless CMS, AR product previews, and instant checkout."
            },
            {
                title: "Neural Chat Bot",
                tags: ["Python", "TensorFlow", "WebRTC"],
                desc: "Voice-activated AI assistant capable of sentiment analysis and natural conversation flows."
            },
            {
                title: "Quantum Algo Visualizer",
                tags: ["Canvas API", "WASM", "Rust"],
                desc: "High-performance visualization of quantum computing algorithms and qubit states."
            }
        ];

        const container = document.querySelector('.projects-grid');
        if (!container) return;

        container.innerHTML = projects.map(p => `
            <div class="project-card">
                <h3 class="project-title">${p.title}</h3>
                <div class="project-tags">
                    ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <p class="project-desc">${p.desc}</p>
                <a href="#" class="btn secondary" style="padding: 10px 20px; font-size: 0.8rem;">VIEW_SOURCE</a>
            </div>
        `).join('');
    }

    renderSkills() {
        // Simple skill rendering for now
        const skills = [
            { cat: "Frontend", items: ["React", "Vue", "Three.js", "D3.js", "WebGL"] },
            { cat: "Backend", items: ["Node.js", "Python", "Go", "GraphQL", "PostgreSQL"] },
            { cat: "DevOps", items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"] }
        ];

        const container = document.querySelector('.skills-container');
        if (!container) return;

        container.innerHTML = skills.map(cat => `
            <div class="skill-category" style="margin-bottom: 2rem;">
                <h3 style="color: var(--primary); margin-bottom: 1rem; font-family: var(--font-display);">${cat.cat}</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${cat.items.map(s => `
                        <div style="background: rgba(255,255,255,0.05); padding: 10px 20px; border: 1px solid var(--border-color);">
                            ${s}
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('TRANSMISSION RECEIVED. ESTABLISHING UPLINK...');
                form.reset();
            });
        }
    }

    // Game Interface methods (called from HTML)
    registerGame(name, gameClass) {
        this.games.list[name] = gameClass;
    }

    loadGame(gameName) {
        const container = document.getElementById('active-game-container');
        const list = document.querySelector('.game-list');

        container.classList.remove('hidden');
        list.classList.add('hidden');

        // Initialize specific game logic
        if (gameName === 'snake') {
            this.games.active = new window.SnakeGame('game-canvas');
            this.games.active.init();
            document.getElementById('game-title').innerText = 'NEON SNAKE';
        }
    }

    exitGame() {
        if (this.games.active) {
            this.games.active.stop();
            this.games.active = null;
        }

        const container = document.getElementById('active-game-container');
        const list = document.querySelector('.game-list');

        container.classList.add('hidden');
        list.classList.remove('hidden');
    }
}

// Create the app instance and attach game handlers
const app = new App();
app.games.load = (name) => app.loadGame(name);
app.games.exit = () => app.exitGame();
