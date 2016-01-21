export const parseActiveFacetValue = (facetValue) => {
    return {
        label: facetValue.Value,
        value: facetValue.Value
    };
};

export const parseActiveFacet = (result, facetFilter) => {
    const previousValues = result[facetFilter.FacetValues[0].Id] ? result[facetFilter.FacetValues[0].Id].values : [];
    return {
        ...result,
        [facetFilter.FacetValues[0].Id] : {
            filterId: facetFilter.FilterId,
            values: [
                ...previousValues,
                ...facetFilter.FacetValues.map(parseActiveFacetValue)
            ],
            newValues: [
                ...previousValues,
                ...facetFilter.FacetValues.map(parseActiveFacetValue)
            ]
        }
    };
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

export default function parseFacetData(facets, activeFacets = []) {
    const parsedFacets = facets.reduce(parseFacet, {});
    const parsedActiveFacets = activeFacets.reduce(parseActiveFacet, {});

    return mergeFacets(parsedFacets, parsedActiveFacets);
}
