import {BufferAttribute, BufferGeometry, Float32BufferAttribute, Points, PointsMaterial} from 'three';
import Randomizer from './randomizer';

export default class Stars {
    constructor(scene) {
        this.scene = scene;
        this.drawObjects();
    }

    animate() {
        this.rotate(0.0003);
    }

    drawObjects() {
        const material = new PointsMaterial({
            size: 0.1,
            vertexColors: true
        });
        const geometry = new BufferGeometry();
        const starPositions = Stars.getStarPositions(500);
        const starColors = Stars.getStarColors(starPositions);
        geometry.setAttribute('position', new BufferAttribute(starPositions, 3));
        geometry.setAttribute('color', new Float32BufferAttribute(starColors, 3));
        this.particlesMesh = new Points(geometry, material);
        this.scene.add(this.particlesMesh);
    }

    rotate(speed) {
        this.particlesMesh.rotation.x += speed;
        this.particlesMesh.rotation.y += speed;
    }

    static getStarPositions(starCount) {
        const positions = new Float32Array(starCount * 3);
        for (let i = 0; i < positions.length; i = i + 3) {
            [i, i + 1, i + 2].forEach(index => positions[index] = (Math.random() - 0.5) * 10);
            positions[i + Randomizer.getRandomInt(0, 3)] = Randomizer.getRandomArbitrary(3.5, 5) * Randomizer.getRandomSign();
        }
        return positions;
    }

    static getStarColors(starPositions) {
        return [...starPositions].map(position => position / 10 + 0.5);
    }
}