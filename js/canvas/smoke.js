import {Mesh, PlaneBufferGeometry, PointLight} from 'three';

export default class Smoke {
    constructor(camera, material) {
        this.camera = camera;
        this.material = material;
        this.smokeParticles = [];
        this.flashes = [];
        this.flashingFlashes = [];
        this.topClass = 'glitch-top';
        this.bottomClass = 'glitch-bottom';
        this.logo = document.getElementById('logo');
        this.#drawObjects();
        this.#drawLights();
    }

    animate() {
        this.#rotate(-0.002);
        this.#flash(10000);
    }

    onMouseUp(mouse) {
        let flash = this.flashes.pop();
        if (!flash) {
            return;
        }
        switch (Math.sign(mouse.y)) {
            case 1: {
                flash.position.set(0, 10, -4.5);
                this.logo.classList.add(this.topClass);
                break;
            }
            case 0: {
                flash.position.set(0, 0, -4.5);
                break;
            }
            case -1: {
                flash.position.set(0, -10, -4.5);
                this.logo.classList.add(this.bottomClass);
                break;
            }
        }
        this.flashingFlashes.unshift(flash);
        setTimeout(() => this.#stopFlashing(flash), 500);
    }

    #drawObjects() {
        const geometry = new PlaneBufferGeometry(10, 10);
        for (let i = 0; i < 10; i++) {
            const particle = new Mesh(geometry, this.material);
            particle.position.x = Math.random() * 8 - 4;
            particle.position.y = Math.random() * 10 - 5;
            particle.position.z = Math.random() * 5 - 10;
            particle.rotation.z = Math.random() * 360;
            this.smokeParticles.push(particle);
            this.camera.add(particle);
        }
    }

    #drawLights() {
        for (let i = 0; i < 3; i++) {
            this.flashes.push(new PointLight(0x062d89, 0, 10, 5));
        }
        this.flashes.forEach(f => this.camera.add(f));
    }

    #rotate(speed) {
        this.smokeParticles.forEach(p => p.rotation.z += speed);
    }

    #flash(power) {
        this.flashingFlashes.forEach(f => f.power = f.power === 0 ? power : 0);
    }

    #stopFlashing(flash) {
        flash.power = 0;
        this.flashes.unshift(this.flashingFlashes.pop());
        if (!this.flashingFlashes.some(f => f.position.y > 0)) {
            this.logo.classList.remove(this.topClass);
        }
        if (!this.flashingFlashes.some(f => f.position.y < 0)) {
            this.logo.classList.remove(this.bottomClass);
        }
    }
}
