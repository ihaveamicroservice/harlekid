import songs from './songs.js';

export default class Player {
    constructor(cover, title, progressBar, playIcon, playingClass) {
        this.cover = cover;
        this.title = title;
        this.progressBar = progressBar;
        this.playIcon = playIcon;
        this.playingClass = playingClass;
        this.updateProgress = this.updateProgress.bind(this);
    }

    play() {
        if (!this.audio) {
            return;
        }
        if (!this.audio.paused) {
            this.playIcon.classList.remove(this.playingClass);
            this.audio.pause();
        } else {
            this.playIcon.classList.add(this.playingClass);
            this.audio.play();
        }
    }

    pause() {
        this.audio && this.audio.pause();
    }

    selectSong(index) {
        const song = songs.get(index);
        this.playIcon.classList.add(this.playingClass);
        this.cover.src = song.cover;
        this.title.textContent = song.title;
        this.title.style.color = song.colorHex;
        this.progressBar.style.backgroundColor = song.colorHex;
        this.progressBar.style.width = 0;
        this.audio && this.audio.removeEventListener('timeupdate', this.updateProgress);
        this.pause();
        this.audio = new Audio(song.song.toString());
        this.audio.play();
        this.audio.addEventListener('timeupdate', this.updateProgress);
        this.audio.addEventListener('ended', () => this.playIcon.classList.remove(this.playingClass));
    }

    updateProgress(event) {
        this.progressBar.style.width = `${event.target.currentTime / event.target.duration * window.innerWidth}px`;
    }
}
