export default class Randomizer {
    static getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    static getRandomInt(min, max) {
        return Math.floor(Randomizer.getRandomArbitrary(min, max));
    }

    static getRandomSign() {
        return Math.random() < 0.5 ? -1 : 1;
    }
}