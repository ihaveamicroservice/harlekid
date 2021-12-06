const youtube = {
    name: 'Youtube',
    href: undefined,
    width: 70,
    src: new URL('/img/logos/youtube.svg', import.meta.url),
    background: '#f00'
};

const instagram = {
    name: 'Instagram',
    href: 'https://www.instagram.com/harle.kid/',
    width: 24,
    src: new URL('/img/logos/instagram.svg', import.meta.url),
    background: `radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%),
    radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%),
    radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%),
    radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%),
    radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%),
    radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%),
    radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent),
    linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)`
};

const linkedin = {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kevinduss/',
    width: 24,
    src: new URL('/img/logos/linkedin.svg', import.meta.url),
    background: '#0a66c2'
};

const spotify = {
    name: 'Spotify',
    href: undefined,
    width: 26,
    src: new URL('/img/logos/spotify.svg', import.meta.url),
    background: '#1db954'
};

const apple = {
    name: 'Apple',
    href: undefined,
    width: 35,
    src: new URL('/img/logos/apple.svg', import.meta.url),
    background: 'linear-gradient(#f9647b, #fa233b)'
};

const soundcloud = {
    name: 'Soundcloud',
    href: undefined,
    width: 35,
    src: new URL('/img/logos/soundcloud.svg', import.meta.url),
    background: '#f50'
};

const videoPlatforms = [youtube];
const socialMediaPlatforms = [instagram, linkedin];
const musicPlatforms = [spotify, apple, soundcloud];

export default [videoPlatforms, socialMediaPlatforms, musicPlatforms];
