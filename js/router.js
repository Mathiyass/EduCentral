// SPA Router
class Router {
    constructor() {
        this.routes = {
            'home': document.getElementById('home'),
            'projects': document.getElementById('projects'),
            'games': document.getElementById('games'),
            'skills': document.getElementById('skills'),
            'contact': document.getElementById('contact')
        };
        this.navItems = document.querySelectorAll('.nav-item');

        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute(); // Handle initial load
    }

    handleRoute() {
        let hash = window.location.hash.slice(1) || 'home';

        // Default to home if route doesn't exist
        if (!this.routes[hash]) hash = 'home';

        this.updateView(hash);
        this.updateNav(hash);
    }

    updateView(routeId) {
        // Hide all views
        Object.values(this.routes).forEach(view => {
            view.classList.remove('active-view');
        });

        // Show target view
        const targetView = this.routes[routeId];
        targetView.classList.add('active-view');

        // Scroll to top
        window.scrollTo(0, 0);
    }

    updateNav(routeId) {
        this.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === routeId) {
                item.classList.add('active');
            }
        });
    }
}
