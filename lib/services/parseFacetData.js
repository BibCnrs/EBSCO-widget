export const parseActiveFacetValue = (facetValue) => {
    return {
        label: facetValue,
        value: facetValue
    };
};

export const parseActiveFacets = (activeFacets) => {
    return Object.keys(activeFacets).reduce((result, key) => {
        const activeFacetValues = activeFacets[key].map(parseActiveFacetValue);

        return {
            ...result,
            [key]: {
                values: activeFacetValues,
                newValues: activeFacetValues
            }
        };
    }, {});
};

export const parseFacetValue = (facetValue) => {
    return {
        value: facetValue.Value,
        label: `${facetValue.Value} (${facetValue.Count})`
    };
};

export const parseFacet = (result, facet) => {
    return {
        ...result,
        [facet.Id]: {
            label: facet.Label,
            choices: facet.AvailableFacetValues.map(parseFacetValue)
        }
    };
};

export const mergeFacets = (facets, activeFacets) => {
    return Object.keys({
        ...activeFacets,
        ...facets
    })
    .reduce((result, key) => {
        return {
            ...result,
            [key]: {
                ...facets[key] || { label: key, choices: activeFacets[key].values },
                ...activeFacets[key] || { values: [], newValues: [] }
            }
        };
    }, {});
};

export default function parseFacetData(facets = [], activeFacets = {}) {
    const parsedFacets = facets.reduce(parseFacet, {});
    const parsedActiveFacets = parseActiveFacets(activeFacets);

    return mergeFacets(parsedFacets, parsedActiveFacets);
}
