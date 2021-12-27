import {BufferAttribute, BufferGeometry, Points, PointsMaterial} from 'three';
import Randomizer from './randomizer';

export default class Stars {
    constructor(scene) {
        this.scene = scene;
        this.starCount = 500;
        this.#drawObjects();
    }

    animate() {
        this.#rotate(0.0003);
    }

    #drawObjects() {
        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new BufferAttribute(this.#getStarPositions(), 3));
        const material = new PointsMaterial({
            size: 0.07,
            color: 0xaaaaaa
        });
        this.particlesMesh = new Points(geometry, material);
        this.scene.add(this.particlesMesh);
    }

    #rotate(speed) {
        this.particlesMesh.rotation.x += speed;
        this.particlesMesh.rotation.y += speed;
    }

    #getStarPositions() {
        const positions = new Float32Array(this.starCount * 3);
        for (let i = 0; i < positions.length; i = i + 3) {
            [i, i + 1, i + 2].forEach(index => positions[index] = (Math.random() - 0.5) * 10);
            positions[i + Randomizer.getRandomInt(0, 3)] = Randomizer.getRandomArbitrary(3.5, 5) * Randomizer.getRandomSign();
        }
        return positions;
    }
}