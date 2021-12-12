import '/css/header.scss'

export default class Header {
    constructor() {
        this.logo = document.getElementById('logo-background');
        this.clone();
    }

    moveUp() {
        this.setAbsolutePosition();
        setTimeout(() => this.logo.classList.add('header'), 10);
    }

    moveDown(callback) {
        this.setAbsolutePosition();
        this.logo.classList.remove('header');
        this.logo.addEventListener('transitionend', () => {
            this.setRelativePosition();
            callback();
        }, {once: true});
    }

    clone() {
        this.clonedLogo = this.logo.cloneNode(true);
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
