const jekami = {
    title: 'jekami',
    cover: new URL('/img/covers/jekami.jpg', import.meta.url),
    song: new URL('/mp3/jekami.mp3', import.meta.url),
    color: 0xe0e100,
    colorHex: '#e0e100'
};

const tanzt = {
    title: 'tanzt',
    cover: new URL('/img/covers/tanzt.jpg', import.meta.url),
    song: new URL('/mp3/tanzt.mp3', import.meta.url),
    color: 0xd60000,
    colorHex: '#d60000'
};

const freieEnergie = {
    title: 'freie energie',
    cover: new URL('/img/covers/freie_energie.jpg', import.meta.url),
    song: new URL('/mp3/freie_energie.mp3', import.meta.url),
    color: 0x00f0e5,
    colorHex: '#00f0e5'
};

export default new Map([
    [0, jekami],
    [1, jekami],
    [2, tanzt],
    [3, tanzt],
    [4, freieEnergie],
    [5, freieEnergie]
]);
