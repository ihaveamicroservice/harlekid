import songs from './config/songs';
import '/css/player.scss';
import '/css/play-button.scss';

export default class Player {
    constructor() {
        this.player = document.getElementById('player');
        this.cover = document.getElementById('cover');
        this.title = document.getElementById('title');
        this.progressBar = document.getElementById('progress-bar');
        this.closeButton = document.getElementById('close-button');
        this.spotifyButtonIcon = document.getElementById('spotify-button-icon');
        this.playIcon = document.getElementById('play');
        this.playingClass = 'playing';
        this.audioEventListeners = this.#getAudioEventListeners();
        this.#addClickEventListener();
    }

    hide() {
        this.player.style.display = 'none';
    }

    show() {
        this.player.style.display = 'flex';
    }

    pause() {
        this.audio && this.audio.pause();
    }

    play() {
        !this.audio.paused ? this.audio.pause() : this.audio.play();
    }

    selectSong(index) {
        const song = songs.get(index);
        this.#showSong(song);
        this.#playSong(song);
    }

    #showSong(song) {
        this.player.classList.remove('hidden-controls');
        this.cover.src = song.cover;
        this.title.textContent = song.title;
        this.title.style.color = song.colorHex;
        this.spotifyButtonIcon.style.backgroundColor = song.colorHex;
        this.progressBar.style.backgroundColor = song.colorHex;
        this.progressBar.style.width = '0';
    }

    #playSong(song) {
        this.audio && this.#removeEventListeners();
        this.pause();
        this.audio = new Audio(song.song.toString());
        this.audio.play();
        this.#addEventListeners();
    }

    #removeEventListeners() {
        this.audioEventListeners.forEach((listener, type) => this.audio.removeEventListener(type, listener));
    }

    #addEventListeners() {
        this.audioEventListeners.forEach((listener, type) => this.audio.addEventListener(type, listener));
    }

    #addClickEventListener() {
        document.getElementById('play-button').addEventListener('click', () => this.play());
    }

    #getAudioEventListeners() {
        const onPlay = () => this.playIcon.classList.add(this.playingClass);
        const onPause = () => this.playIcon.classList.remove(this.playingClass);
        const updateProgress = event => this.progressBar.style.width = `${event.target.currentTime / event.target.duration * window.innerWidth}px`;

        return new Map([
            ['play', onPlay],
            ['pause', onPause],
            ['ended', onPause],
            ['timeupdate', updateProgress]
        ]);
    }
}
