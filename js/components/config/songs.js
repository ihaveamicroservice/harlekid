const propagandalf = {
    title: 'propagandalf',
    cover: new URL('/img/covers/propagandalf.jpg', import.meta.url),
    song: new URL('/mp3/propagandalf.mp3', import.meta.url),
    href: new URL('https://open.spotify.com/track/2nhJ3KZlUoUSza8vxbDohm?si=efb14158f44f4855', import.meta.url),
    color: 0xff2a60,
    colorHex: '#ff2a60'
};

const jekami = {
    title: 'jekami',
    cover: new URL('/img/covers/jekami.jpg', import.meta.url),
    song: new URL('/mp3/jekami.mp3', import.meta.url),
    href: new URL('https://open.spotify.com/track/3vKhPuZs9CbZJY54tnIK2X?si=91d614b909ce46ee', import.meta.url),
    color: 0xe0e100,
    colorHex: '#e0e100'
};

const tanzt = {
    title: 'tanzt',
    cover: new URL('/img/covers/tanzt.jpg', import.meta.url),
    song: new URL('/mp3/tanzt.mp3', import.meta.url),
    href: new URL('https://open.spotify.com/track/2KhjkdNTX9P9zyksfCcbNn?si=fd02b899618b4c38', import.meta.url),
    color: 0xffffff,
    colorHex: '#ffffff'
};

const freieEnergie = {
    title: 'freie energie',
    cover: new URL('/img/covers/freie_energie.jpg', import.meta.url),
    song: new URL('/mp3/freie_energie.mp3', import.meta.url),
    href: undefined,
    color: 0x00f0e5,
    colorHex: '#00f0e5'
};

export default new Map([
    [0, propagandalf],
    [1, propagandalf],
    [2, jekami],
    [3, freieEnergie],
    [4, tanzt],
    [5, tanzt]
]);
