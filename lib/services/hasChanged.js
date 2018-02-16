export default function hasChanged(val1, val2) {
    return (
        JSON.stringify([].concat(val1).sort()) !==
        JSON.stringify([].concat(val2).sort())
    );
}
