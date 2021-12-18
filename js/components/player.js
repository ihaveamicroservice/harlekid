import songs from './config/songs';
import createRipple from '../effects/ripple';
import '/css/player.scss';
import '/css/play-button.scss';

export default class Player {
    constructor() {
        this.player = document.getElementById('player');
        this.cover = document.getElementById('cover');
        this.title = document.getElementById('title');
        this.progressBar = document.getElementById('progress-bar');
        this.closeButton = document.getElementById('close-button');
        this.spotifyButton = document.getElementById('spotify-button');
        this.spotifyButtonIcon = document.getElementById('spotify-icon');
        this.playButton = document.getElementById('play-button');
        this.playIcon = document.getElementById('play-icon');
        this.playingClass = 'playing';
        this.audioEventListeners = this.#getAudioEventListeners();
        this.#addClickEventListeners();
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
        this.audio && !this.audio.paused ? this.audio.pause() : this.audio.play();
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
        this.progressBar.style.backgroundColor = song.colorHex;
        this.progressBar.style.width = '0';
        if (song.href) {
            this.spotifyButton.classList.remove('hidden');
            this.spotifyButton.href = song.href;
            this.spotifyButtonIcon.style.backgroundColor = song.colorHex;
        } else {
            this.spotifyButton.classList.add('hidden');
        }
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

    #addClickEventListeners() {
        this.playButton.addEventListener('click', event => {
            this.play();
            createRipple(event);
        });
        this.spotifyButton.addEventListener('click', () => this.pause());
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
