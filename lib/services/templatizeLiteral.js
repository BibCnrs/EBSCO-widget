export default function templatizeLiteral(template, literal) {
    if (literal === 'now') {
        return 'présent';
    }

    return Object.keys(literal).reduce((result, key) => result.replace(`<${key}>`, literal[key]), template);
}
