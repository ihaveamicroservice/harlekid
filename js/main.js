import Stats from 'three/examples/jsm/libs/stats.module';
import Header from './components/header';
import Player from './components/player';
import {initUniverse} from './canvas/initializer';
import {lifecycle} from './canvas/lifecycle';
import Footer from './components/footer';
import '/css/styles.scss'

const maxCanvasWidth = 1500;
const canvasWidth = () => window.innerWidth > maxCanvasWidth ? maxCanvasWidth : window.innerWidth;

const header = new Header();
const footer = new Footer();
const player = new Player();

const universe = initUniverse(canvasWidth());
const electricShockRisk = [universe.canvas, header.logo];

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

universe.renderer.setAnimationLoop(() => {
    stats.begin();
    universe.animate();
    universe.controls.update();
    universe.renderer.render(universe.scene, universe.camera);
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
player.closeButton.addEventListener('click', onClose);

addMusicButtonEventListener();

function addMusicButtonEventListener() {
    footer.musicButton.addEventListener('click', onMusicButtonClick, {once: true});
}

function onMusicButtonClick(event) {
    createRipple(event);
    universe.showPortal(() => player.show());
    header.moveUp();
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
    player.selectSong(faceIndex);
}

function onClose() {
    player.hide();
    player.pause();
    universe.hidePortal(() => {
        header.moveDown(() => addMusicButtonEventListener());
        footer.show();
    });
}
