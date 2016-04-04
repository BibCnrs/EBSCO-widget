import _ from 'lodash';

export default function uncapitalizeKeys(literal) {
    if(Array.isArray(literal)) {
        return literal.map(uncapitalizeKeys);
    }
    if(typeof literal !== 'object') {
        return literal;
    }

    return Object.keys(literal).reduce((result, key) => ({
        ...result,
        [_.lowerFirst(key)]: uncapitalizeKeys(literal[key])
    }), {});
}
