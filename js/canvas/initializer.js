import {FogExp2, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';
import Universe from './universe';

export function initUniverse(canvasWidth) {
    const canvas = document.getElementById('smoke-canvas');

    const scene = new Scene();
    scene.fog = new FogExp2(0x11111f, .1);

    const camera = new PerspectiveCamera(80, canvasWidth / window.innerHeight, 1, 1000);
    camera.position.z = 3;
    scene.add(camera);

    const renderer = new WebGLRenderer({canvas: canvas, antialias: true});
    renderer.setClearColor(0x11111f, 1);
    renderer.setSize(canvasWidth, window.innerHeight);

    const controls = new TrackballControls(camera, renderer.domElement);
    controls.noZoom = true;
    controls.noPan = true;
    controls.noRotate = true;
    controls.rotateSpeed = 4;

    return new Universe(renderer, canvas, scene, camera, controls);
}
