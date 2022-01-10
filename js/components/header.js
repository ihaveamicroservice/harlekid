import '/css/header.scss'

const ASPECT_RATIO = 3;
const ROUNDING_INCREMENT = 5;

export default class Header {
    constructor() {
        this.logo = document.getElementById('logo');
        this.clone();
        this.handleResize();
    }

    moveUp() {
        this.setAbsolutePosition();
        setTimeout(() => this.logo.classList.add('header', 'transition'), 10);
    }

    moveDown(callback) {
        this.setAbsolutePosition();
        this.logo.classList.remove('header');
        this.logo.addEventListener('transitionend', () => {
            this.setRelativePosition();
            callback();
        }, {once: true});
        this.logo.firstElementChild.addEventListener('transitionend', () => {
            this.logo.classList.remove('transition');
        }, {once: true});
    }

    handleResize() {
        const height = this.clonedLogo.firstElementChild.clientHeight;
        const roundedHeight = Math.floor(height / ROUNDING_INCREMENT) * ROUNDING_INCREMENT;
        const width = roundedHeight * ASPECT_RATIO;
        document.documentElement.style.setProperty('--logo-width', `${width}px`);
    }

    clone() {
        this.clonedLogo = this.logo.cloneNode(true);
        this.clonedLogo.id = 'cloned-logo';
        this.clonedLogo.style.visibility = 'hidden';
        document.body.appendChild(this.clonedLogo);
    }

    setAbsolutePosition() {
        this.logo.style.top = `${this.clonedLogo.offsetTop}px`;
    }

    setRelativePosition() {
        this.logo.style.top = 'auto';
    }
}
