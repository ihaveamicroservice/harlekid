import {DirectionalLight, MeshLambertMaterial, TextureLoader, Vector2} from 'three';
import Smoke from './smoke';
import Portal from './portal';
import Cube from './cube';
import Stars from './stars';

const CLICK_DEVIATION = 10;

export default class Universe {
    constructor(scene, camera, controls) {
        this.scene = scene;
        this.camera = camera;
        this.controls = controls;
        this.mouse = new Vector2();
        this.center = new Vector2(0, 0);
        this.drawObjects();
        this.drawLights();
    }

    animate() {
        this.objects.forEach(o => o.animate());
    }

    onMouseDown(event) {
        this.mouseDownEvent = event;
    }

    onMouseUp(event) {
        if (this.isMoveEvent(event)) {
            return;
        }
        this.updateVector(event);
        const index = this.cube.onMouseUp(this.mouse);
        index === undefined && this.smoke.onMouseUp(this.mouse);
        return index;
    }

    showPortal(callback) {
        this.portal.show(() => this.cube.show(callback));
    }

    hidePortal(callback) {
        this.cube.hide(() => this.portal.hide(callback, () => this.smoke.onMouseUp(this.center)));
    }

    drawObjects() {
        const texture = new TextureLoader().load(new URL('/img/canvas/smoke.png', import.meta.url));
        const material = new MeshLambertMaterial({
            map: texture,
            transparent: true,
            color: 0x9bafd0
        });
        this.smoke = new Smoke(this.camera, material);
        this.portal = new Portal(this.camera, material);
        this.cube = new Cube(this.scene, this.camera, this.controls, this.portal);
        this.stars = new Stars(this.scene);
        this.objects = [this.smoke, this.portal, this.cube, this.stars];
    }

    drawLights() {
        this.camera.add(new DirectionalLight(0xffffff, 0.7));
    }

    updateVector(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    isMoveEvent(event) {
        return Math.abs(this.mouseDownEvent.clientX - event.clientX) > CLICK_DEVIATION
            || Math.abs(this.mouseDownEvent.clientY - event.clientY) > CLICK_DEVIATION;
    }
}
