import {FogExp2, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export function initializeThreeJsObjects() {
    const statsContainer = document.getElementById('stats-container');
    const canvas = document.getElementById('smoke-canvas');

    const stats = new Stats();
    stats.showPanel(0);
    statsContainer.appendChild(stats.dom);

    const scene = new Scene();
    scene.fog = new FogExp2(0x11111f, .1);

    const camera = new PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 10);
    camera.position.z = 3;
    scene.add(camera);

    const renderer = new WebGLRenderer({
        canvas: canvas,
        powerPreference: 'high-performance',
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new TrackballControls(camera, renderer.domElement);
    controls.noZoom = true;
    controls.noPan = true;
    controls.noRotate = true;
    controls.rotateSpeed = 4;

    return [camera, canvas, controls, renderer, scene, stats];
}
