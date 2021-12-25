import {BufferAttribute, BufferGeometry, Points, PointsMaterial, TextureLoader} from 'three';

export default class Stars {
    constructor(scene) {
        this.scene = scene;
        this.starCount = 1000;
        this.drawObjects();
    }

    drawObjects() {
        const star = new TextureLoader().load(new URL('/img/canvas/star.png', import.meta.url));
        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new BufferAttribute(this.#getStarPositions(), 3));
        const material = new PointsMaterial({
            size: 0.04,
            map: star,
            transparent: true,
            opacity: 0.7
        });
        this.particlesMesh = new Points(geometry, material);
        this.scene.add(this.particlesMesh);
    }

    animate() {
        this.particlesMesh.rotation.x += 0.0002;
        this.particlesMesh.rotation.y += 0.0002;
    }

    #getStarPositions() {
        const positions = new Float32Array(this.starCount * 3);
        for (let i = 0; i < positions.length; i = i + 3) {
            [i, i + 1, i + 2].forEach(index => positions[index] = (Math.random() - 0.5) * 10);
            positions[i + Stars.#getRandomInt(0, 3)] = Stars.#getRandomArbitrary(2.5, 5) * Stars.#getRandomSign();
        }
        return positions;
    }

    static #getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    static #getRandomInt(min, max) {
        return Math.floor(Stars.#getRandomArbitrary(min, max));
    }

    static #getRandomSign() {
        return Math.random() < 0.5 ? -1 : 1;
    }
}