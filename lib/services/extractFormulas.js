export default text => {
    const formulas = text.match(/\$(.*?)\$/g);

    if(!formulas || !formulas.length) {
        return null;
    }

    return formulas.reduce((acc, formula) => {
        const [ before, ...after ] = acc.slice(-1)[0].split(formula);
        return [
            ...acc.slice(0,-1),
            before,
            { formula: formula.slice(1, -1) },
            Array.isArray(after) ? after.join(formula) : after,
        ];
    }, [text]);
}
