export const lifecycle = Object.freeze({
    "entering": {},
    "present": {},
    "leaving": {},
    "hidden": {}
});

export function assignAnimationsToLifecycles() {
    return new Map([
        [lifecycle.present, this.animateExisting],
        [lifecycle.entering, this.animateEntering],
        [lifecycle.leaving, this.animateLeaving]
    ]);
}
