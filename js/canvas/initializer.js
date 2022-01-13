import {FogExp2, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass';
import {FXAAShader} from 'three/examples/jsm/shaders/FXAAShader';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';

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
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new TrackballControls(camera, renderer.domElement);
    controls.noZoom = true;
    controls.noPan = true;
    controls.noRotate = true;
    controls.rotateSpeed = 4;

    const renderPass = new RenderPass(scene, camera);
    const fxaaPass = new ShaderPass(FXAAShader);
    const antialiasingComposer = new EffectComposer(renderer);
    antialiasingComposer.addPass(renderPass);
    antialiasingComposer.addPass(fxaaPass);

    return [camera, canvas, antialiasingComposer, controls, fxaaPass, renderer, scene, stats];
}
