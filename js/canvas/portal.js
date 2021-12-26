import {Mesh, PlaneBufferGeometry, PointLight} from 'three';
import {lifecycle, assignAnimationsToLifecycles} from './lifecycle';

export default class Portal {
    constructor(camera, material) {
        this.camera = camera;
        this.material = material;
        this.flash = false;
        this.flashColor = 0xaaaaaa;
        this.portalParticles = [];
        this.invisiblePortalParticles = [];
        this.lifecycleStage = lifecycle.hidden;
        this.animations = assignAnimationsToLifecycles.apply(this);
        this.#drawObjects();
        this.#drawLights();
    }

    animate() {
        const animation = this.animations.get(this.lifecycleStage);
        animation && animation.apply(this);
    }

    animateExisting() {
        if (this.flash) {
            if (!this.portalFlash.power) {
                this.portalFlash.power = 200;
            } else if (Math.random() > 0.9) {
                this.portalFlash.power = 50 + Math.random() * 100;
            }
            this.portalFlash.color.setHex(this.flashColor);
        }
        this.portalParticles.forEach(p => p.rotation.z += 0.005);
        this.#rotate(0.005);
    }

    animateEntering() {
        for (let i = 0; i < 3; i++) {
            if (this.invisiblePortalParticles.length) {
                let particle = this.invisiblePortalParticles.pop()
                particle.visible = true;
                this.portalParticles.unshift(particle);
            }
            if (this.portalParticles.length === 100) {
                this.startCubeAnimationCallback();
            }
        }
        if (!this.invisiblePortalParticles.length) {
            this.lifecycleStage = lifecycle.present;
        }
        this.#rotate(0.02);
    }

    animateLeaving() {
        for (let i = 0; i < 3; i++) {
            if (this.portalParticles.length) {
                let particle = this.portalParticles.shift();
                particle.visible = false;
                this.invisiblePortalParticles.push(particle);
            }
            if (this.portalParticles.length === 50) {
                this.startLogoAnimationCallback();
            }
        }
        if (!this.portalParticles.length) {
            this.lifecycleStage = lifecycle.hidden;
            this.finalFlashAnimationCallback();
        }
        this.#rotate(-0.02);
    }

    show(callback) {
        this.lifecycleStage = lifecycle.entering;
        this.startCubeAnimationCallback = callback;
    }

    hide(startLogoAnimationCallback, finalFlashAnimationCallback) {
        this.lifecycleStage = lifecycle.leaving;
        this.startLogoAnimationCallback = startLogoAnimationCallback;
        this.finalFlashAnimationCallback = finalFlashAnimationCallback;
    }

    #drawObjects() {
        const geometry = new PlaneBufferGeometry(1, 1);
        for (let p = 200; p > 60; p--) {
            const particle = new Mesh(geometry, this.material);
            particle.position.x = 0.006 * p * Math.cos((16 * p * Math.PI) / 180);
            particle.position.y = 0.006 * p * Math.sin((16 * p * Math.PI) / 180);
            particle.position.z = 0.01 * p - 5;
            particle.rotation.z = Math.random() * 360;
            particle.visible = false;
            this.camera.add(particle);
            this.invisiblePortalParticles.push(particle);
        }
    }

    #drawLights() {
        this.portalFlash = new PointLight(this.flashColor, 0, 10, 5);
        this.portalFlash.position.z = -3;
        this.camera.add(this.portalFlash);
    }

    #rotate(speed) {
        this.portalParticles.forEach(p => p.rotation.z += speed);
    }
}
