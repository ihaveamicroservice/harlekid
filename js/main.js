import Stats from 'three/examples/jsm/libs/stats.module.js';
import Logo from './modules/logo.js';
import Player from './modules/player.js';
import {initUniverse} from './modules/canvas/initializer.js';
import {lifecycle} from './modules/canvas/lifecycle.js';
import Footer from "./modules/footer";

const maxCanvasWidth = 1500;
const canvasWidth = () => window.innerWidth > maxCanvasWidth ? maxCanvasWidth : window.innerWidth;
const element = id => document.getElementById(id);
const elements = className => document.getElementsByClassName(className);

const canvas = element('smoke-canvas');
const logoBackground = element('logo-background');
const selectMessage = element('select-message');
const musicPlayer = element('music-player');
const cover = element('cover');
const title = element('title');
const playButton = element('play-button');
const playIcon = element('play');
const progressBar = element('progress-bar');
const closeButtons = elements('close-button');

const logo = new Logo(logoBackground);
const footer = new Footer();
const player = new Player(cover, title, progressBar, playIcon, 'playing');

const universe = initUniverse(canvas, canvasWidth());
const electricShockRisk = [universe.canvas, logoBackground];

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

universe.renderer.setAnimationLoop(() => {
    stats.begin();
    universe.animate();
    universe.controls.update();
    universe.renderer.render(universe.scene, universe.camera);
    universe.canvas.classList.add('visible');
    stats.end();
});

window.addEventListener('resize', () => {
    let width = canvasWidth();
    universe.camera.aspect = width / window.innerHeight;
    universe.camera.updateProjectionMatrix();
    universe.renderer.setSize(width, window.innerHeight);
    document.body.style.height = `${window.innerHeight}px`;
});

electricShockRisk.forEach(e => e.addEventListener('pointerdown', onMouseDown));
electricShockRisk.forEach(e => e.addEventListener('pointerup', onMouseUp));

playButton.addEventListener('click', () => player.play());

[...closeButtons].forEach(closeButton =>
    closeButton.addEventListener('click', onClose)
);

addMusicButtonEventListener();

function addMusicButtonEventListener() {
    footer.musicButton.addEventListener('click', onMusicButtonClick, {once: true});
}

function onMusicButtonClick(event) {
    createRipple(event);
    universe.showPortal(() => selectMessage.style.display = 'flex');
    logo.moveUp();
    footer.hide();
}

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.offsetX - radius}px`;
    circle.style.top = `${event.offsetY - radius}px`;
    circle.classList.add('ripple');

    circle.addEventListener('animationend', () => circle.remove());
    button.appendChild(circle);
}

function onMouseDown(event) {
    universe.onMouseDown(event);
}

function onMouseUp(event) {
    const faceIndex = universe.onMouseUp(event);
    if (universe.cube.lifecycleStage !== lifecycle.present ||
        faceIndex === undefined) {
        return;
    }
    selectMessage.style.display = 'none';
    musicPlayer.style.display = 'flex';
    player.selectSong(faceIndex);
}

function onClose() {
    selectMessage.style.display = 'none';
    musicPlayer.style.display = 'none';
    player.pause();
    universe.hidePortal(() => {
        logo.moveDown(() => addMusicButtonEventListener());
        footer.show();
    });
}
