import {BoxGeometry, Mesh, MeshLambertMaterial, PointLight, Raycaster, TextureLoader, Vector2} from 'three';
import songs from '../songs.js';
import {lifecycle, assignAnimationsToLifecycles} from './lifecycle.js';

export default class Cube {
    constructor(scene, camera, controls, portal) {
        this.scene = scene;
        this.camera = camera;
        this.controls = controls;
        this.portal = portal;
        this.scale = 0;
        this.raycaster = new Raycaster();
        this.center = new Vector2(0, 0);
        this.lifecycleStage = lifecycle.hidden;
        this.beenThere = false;
        this.animations = assignAnimationsToLifecycles.apply(this);
        this.drawObjects();
        this.drawLights();
    }

    drawObjects() {
        const size = 1.25;
        const geometry = new BoxGeometry(size, size, size);
        const materials = [...Array(6).keys()].map(x =>
            new MeshLambertMaterial({
                map: new TextureLoader().load(songs.get(x).cover)
            })
        );
        this.cube = new Mesh(geometry, materials);
        this.cube.scale.set(this.scale, this.scale, this.scale);
        this.scene.add(this.cube);
    }

    drawLights() {
        this.cubeLight = new PointLight(0xffffff, 1, 10);
        this.camera.add(this.cubeLight);
    }

    animate() {
        const animation = this.animations.get(this.lifecycleStage);
        animation && animation.apply(this);
    }

    animateExisting() {
        this.raycaster.setFromCamera(this.center, this.camera);
        const intersects = this.raycaster.intersectObject(this.cube);
        if (!!intersects.length) {
            const faceIndex = Math.floor(intersects[0].faceIndex / 2);
            this.portal.flashColor = songs.get(faceIndex).color;
        }
        this.rotate(0.002);
    }

    animateEntering() {
        this.scale += 0.025;
        if (this.scale >= 1) {
            this.scale = 1;
            this.lifecycleStage = lifecycle.present;
            this.controls.noRotate = false;
            this.portal.flash = true;
            this.showCallback();
        }
        this.cube.scale.set(this.scale, this.scale, this.scale);
        this.rotate(0.15);
    }

    animateLeaving() {
        if (this.scale === 1) {
            this.portal.flash = false;
            this.portal.portalFlash.power = 0;
            this.controls.noRotate = true;
        }
        if (!this.beenThere) {
            this.scale += 0.01;
            if (this.scale >= 1.2) {
                this.scale = 1.2;
                this.beenThere = true;
            }
            this.rotate(0.05);
        } else {
            this.scale -= 0.05;
            if (this.scale <= 0) {
                this.scale = 0;
                this.lifecycleStage = lifecycle.hidden;
                this.beenThere = false;
            }
            if (this.scale.toFixed(2) === '0.35') {
                this.hideCallback();
            }
            this.rotate(-0.15);
        }
        this.cube.scale.set(this.scale, this.scale, this.scale);
    }

    onMouseUp(mouse) {
        this.raycaster.setFromCamera(mouse, this.camera);
        const intersects = this.raycaster.intersectObject(this.cube);
        return !intersects.length
            ? undefined
            : Math.floor(intersects[0].faceIndex / 2);
    }

    show(callback) {
        this.lifecycleStage = lifecycle.entering;
        this.showCallback = callback;
    }

    hide(callback) {
        this.lifecycleStage = lifecycle.leaving;
        this.hideCallback = callback;
    }

    rotate(speed) {
        this.cube.rotation.x += speed;
        this.cube.rotation.y += speed;
    }
}
