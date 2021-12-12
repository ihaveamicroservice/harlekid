import platformGroups from './config/platforms';
import '/css/footer.scss'

export default class Footer {
    constructor() {
        this.footer = document.getElementById('footer');
        this.itemHeight = 50;
        this.skewDegree = 23;
        this.#initializeFooter();
    }

    hide() {
        this.footer.classList.remove('extend-transition');
        this.footer.classList.add('hide-transition');
        this.footer.classList.add('hidden');
    }

    show() {
        this.footer.classList.remove('hidden');
        this.footer.addEventListener('transitionend', () => {
            this.footer.classList.remove('hide-transition');
            this.footer.classList.add('extend-transition');
        }, {once: true});
    }

    #initializeFooter() {
        this.rowCount = platformGroups.reduce((maxLength, element) => element.length > maxLength ? element.length : maxLength, 0);
        this.hiddenAreaHeight = (this.rowCount - 1) * this.itemHeight;
        this.footerHeight = (this.rowCount + 1) * this.itemHeight;

        let itemSkewWidth = this.itemHeight * Math.tan(this.skewDegree * Math.PI / 180);
        this.footer.style.paddingLeft = `${this.rowCount * itemSkewWidth}px`;
        document.documentElement.style.setProperty('--item-height', `${this.itemHeight}px`);
        document.documentElement.style.setProperty('--footer-height', `${this.footerHeight}px`);

        this.footer.replaceChildren();
        platformGroups.map(platforms => this.#getPlatformGroup(platforms)).forEach(node => this.footer.append(node));
        this.footer.append(this.#getMusicGroup());
    }

    #getMusicGroup() {
        let platformGroup = this.#getGroup();
        this.musicButton = document.createElement('a');
        this.musicButton.classList.add('footer-item', 'button');
        this.musicButton.id = 'music-button';
        this.musicButton.title = 'Let\'s go!';

        let content = document.createElement('div');
        content.classList.add('footer-item-content');
        content.textContent = 'music';
        this.musicButton.append(content);

        for (let i = 0; i <= this.rowCount; i++) {
            platformGroup.append(i === 1 ? this.musicButton : Footer.#getEmptyItem());
        }
        return platformGroup;
    }

    #getPlatformGroup(platforms) {
        let platformGroup = this.#getGroup();
        for (let i = 0; i < this.rowCount; i++) {
            platformGroup.append(platforms[i] ? Footer.#getItem(platforms[i]) : Footer.#getEmptyItem());
        }

        if (platforms.length > 1) {
            let arrow = Footer.#getArrow();
            platformGroup.prepend(arrow);
            arrow.addEventListener('click', () => this.#onArrowClick(platformGroup, platforms.length + 1));
        } else {
            platformGroup.prepend(Footer.#getEmptyItem());
        }

        return platformGroup;
    }

    #getGroup() {
        let platformGroup = document.createElement('div');
        platformGroup.classList.add('footer-button-group');
        platformGroup.style.transform = `skew(-${this.skewDegree}deg) translateY(${this.hiddenAreaHeight}px)`;
        return platformGroup;
    }

    static #getItem(platform) {
        let item = document.createElement('a');
        item.classList.add('footer-item', 'button');
        item.style.background = platform.background;
        item.title = platform.name;
        if (platform.href) {
            item.href = platform.href;
            item.target = '_blank';
        }

        let svg = document.createElement('img');
        svg.classList.add('footer-item-content');
        svg.style.width = `${platform.width}px`;
        svg.src = platform.src;
        svg.alt = platform.name;

        item.append(svg);
        return item;
    }

    static #getEmptyItem() {
        let emptyItem = document.createElement('a');
        emptyItem.classList.add('footer-item');
        return emptyItem;
    }

    static #getArrow() {
        let arrow = document.createElement('a');
        arrow.classList.add('footer-item', 'button');

        let svg = document.createElement('img');
        svg.classList.add('arrow');
        svg.src = new URL('/img/arrow.svg', import.meta.url).toString();

        arrow.append(svg);
        return arrow;
    }

    #onArrowClick(platformGroup, platformCount) {
        if (platformGroup.classList.contains('extended')) {
            platformGroup.classList.remove('extended');
            platformGroup.style.transform = `skew(-${this.skewDegree}deg) translateY(${this.hiddenAreaHeight}px)`;
        } else {
            platformGroup.classList.add('extended');
            platformGroup.style.transform = `skew(-${this.skewDegree}deg) translateY(${this.footerHeight - this.itemHeight * platformCount}px)`;
        }
    }
}
