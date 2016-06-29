import _ from 'lodash';

const mountSelectors = (stateName, selectors) => {
    return Object.keys(selectors)
    .filter(selectorName => _.isFunction(selectors[selectorName]))
    .reduce((extendedSelectors, selectorName) => ({
        ...extendedSelectors,
        [selectorName]: (state, ...args) => selectors[selectorName](state[stateName], ...args)
    }), {});

};

export default mountSelectors;
