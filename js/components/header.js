import '/css/header.scss'

const ASPECT_RATIO = 3;
const ROUNDING_INCREMENT = 5;

export default class Header {
    constructor() {
        this.logo = document.getElementById('logo');
        this.padding = 10;
        this.initialize();
    }

    moveUp() {
        this.logo.classList.add('header', 'transition');
    }

    moveDown(callback) {
        this.logo.classList.remove('header');
        this.logo.addEventListener('transitionend', callback, {once: true});
        this.logo.firstElementChild.addEventListener('transitionend', () => this.logo.classList.remove('transition'), {once: true});
    }

    handleResize() {
        const width = parseInt(window.getComputedStyle(this.logo, ':before').width);
        const height = width / ASPECT_RATIO;
        const roundedHeight = Math.floor(height / ROUNDING_INCREMENT) * ROUNDING_INCREMENT;
        const roundedWidth = roundedHeight * ASPECT_RATIO;
        const top = (window.innerHeight - roundedHeight) / 2 - this.padding;
        document.documentElement.style.setProperty('--logo-width', `${roundedWidth}px`);
        document.documentElement.style.setProperty('--logo-top', `${top}px`);
    }

    initialize() {
        document.documentElement.style.setProperty('--logo-padding', `${this.padding}px`)
        this.handleResize();
    }
}
