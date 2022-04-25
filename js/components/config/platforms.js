const youtube = {
    name: 'Youtube',
    href: new URL('https://youtu.be/7APMmeQOYKc', import.meta.url),
    width: 70,
    src: new URL('/img/logos/youtube.svg', import.meta.url),
    background: '#f00'
};

const instagram = {
    name: 'Instagram',
    href: new URL('https://www.instagram.com/harle.kid/', import.meta.url),
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
    href: new URL('https://www.linkedin.com/in/kevinduss/', import.meta.url),
    width: 24,
    src: new URL('/img/logos/linkedin.svg', import.meta.url),
    background: '#0a66c2'
};

const spotify = {
    name: 'Spotify',
    href: new URL('https://open.spotify.com/artist/3ZnB9imzGnl5mdREkfSgd3?si=misxYs2fQq6rPZoEk_dtIg', import.meta.url),
    width: 26,
    src: new URL('/img/logos/spotify.svg', import.meta.url),
    background: '#1db954'
};

const apple = {
    name: 'Apple Music',
    href: new URL('https://music.apple.com/us/artist/harlekid/1599730024', import.meta.url),
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
const musicPlatforms = [spotify, apple];

export default [videoPlatforms, socialMediaPlatforms, musicPlatforms];
