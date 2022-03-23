import platformGroups from './config/platforms';
import '/css/footer.scss'

export default class Footer {
    constructor() {
        this.footer = document.getElementById('footer');
        this.itemHeight = 50;
        this.skewDegree = 23;
        this.initialize();
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

    initialize() {
        this.rowCount = platformGroups.reduce((maxLength, element) => element.length > maxLength ? element.length : maxLength, 0);
        this.hiddenAreaHeight = (this.rowCount - 1) * this.itemHeight;
        this.footerHeight = (this.rowCount + 1) * this.itemHeight;

        let itemSkewWidth = this.itemHeight * Math.tan(this.skewDegree * Math.PI / 180);
        this.footer.style.paddingLeft = `${this.rowCount * itemSkewWidth}px`;
        document.documentElement.style.setProperty('--item-height', `${this.itemHeight}px`);
        document.documentElement.style.setProperty('--footer-height', `${this.footerHeight}px`);

        this.footer.replaceChildren();
        platformGroups.map(platforms => this.getPlatformGroup(platforms)).forEach(node => this.footer.append(node));
        this.footer.append(this.getMusicGroup());
    }

    getMusicGroup() {
        let platformGroup = this.getGroup();
        this.musicButton = Footer.createElementWithClasses('a', ['footer-item', 'button']);
        this.musicButton.id = 'music-button';
        this.musicButton.title = 'Let\'s go!';

        let content = Footer.createElementWithClasses('div', ['footer-item-content']);
        content.textContent = 'music';
        this.musicButton.append(content);

        for (let i = 0; i <= this.rowCount; i++) {
            platformGroup.append(i === 1 ? this.musicButton : Footer.getEmptyItem());
        }
        return platformGroup;
    }

    getPlatformGroup(platforms) {
        let platformGroup = this.getGroup();
        for (let i = 0; i < this.rowCount; i++) {
            platformGroup.append(platforms[i] ? Footer.getItem(platforms[i]) : Footer.getEmptyItem());
        }

        if (platforms.length > 1) {
            let arrow = Footer.getArrow();
            platformGroup.prepend(arrow);
            arrow.addEventListener('click', () => this.onArrowClick(platformGroup, platforms.length + 1));
        } else {
            platformGroup.prepend(Footer.getEmptyItem());
        }

        return platformGroup;
    }

    getGroup() {
        let platformGroup = Footer.createElementWithClasses('div', ['footer-button-group']);
        platformGroup.style.transform = `skew(-${this.skewDegree}deg) translateY(${this.hiddenAreaHeight}px)`;
        return platformGroup;
    }

    static getItem(platform) {
        let item = Footer.createElementWithClasses('a', ['footer-item', 'button']);
        item.style.background = platform.background;
        item.title = platform.name;
        if (platform.href) {
            item.href = platform.href;
            item.target = '_blank';
        }

        let svg = Footer.createElementWithClasses('img', ['footer-item-content']);
        svg.style.width = `${platform.width}px`;
        svg.src = platform.src;
        svg.alt = platform.name;

        item.append(svg);
        return item;
    }

    static getEmptyItem() {
        return Footer.createElementWithClasses('a', ['footer-item'])
    }

    static getArrow() {
        let arrow = Footer.createElementWithClasses('a', ['footer-item', 'button']);
        let svg = Footer.createElementWithClasses('img', ['arrow']);
        svg.src = new URL('/img/icons/arrow.svg', import.meta.url).toString();
        svg.alt = 'Arrow';
        arrow.append(svg);
        return arrow;
    }

    static createElementWithClasses(tagName, classes) {
        let element = document.createElement(tagName);
        element.classList.add(...classes);
        return element;
    }

    onArrowClick(platformGroup, platformCount) {
        if (platformGroup.classList.contains('extended')) {
            platformGroup.classList.remove('extended');
            platformGroup.style.transform = `skew(-${this.skewDegree}deg) translateY(${this.hiddenAreaHeight}px)`;
        } else {
            platformGroup.classList.add('extended');
            platformGroup.style.transform = `skew(-${this.skewDegree}deg) translateY(${this.footerHeight - this.itemHeight * platformCount}px)`;
        }
    }
}
