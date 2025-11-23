// Utility functions

/**
 * Generates a random integer between min and max (inclusive)
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random color from the palette
 */
function randomColor() {
    const colors = ['#00FFDE', '#FF0055', '#FFFFFF', '#FFFF00', '#00FFFF'];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * LocalStorage Wrapper
 */
const Store = {
    get(key, defaultVal) {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : defaultVal;
    },
    set(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    }
};
