export const parseActiveFacetValue = (facetValue) => {
    return {
        label: facetValue.FacetValue.Value,
        value: facetValue.RemoveAction
    };
};

export const parseActiveFacet = (result, facetFilter) => {
    const previousValues = result[facetFilter.FacetValuesWithAction[0].FacetValue.Id] ? result[facetFilter.FacetValuesWithAction[0].FacetValue.Id].values : [];
    return {
        ...result,
        [facetFilter.FacetValuesWithAction[0].FacetValue.Id] : {
            filterId: facetFilter.FilterId,
            clear: facetFilter.RemoveAction,
            values: [
                ...previousValues,
                ...facetFilter.FacetValuesWithAction.map(parseActiveFacetValue)
            ]
        }
    };
};

export const parseFacetValue = (facetValue) => {
    return {
        value: facetValue.AddAction,
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
                ...activeFacets[key] || { clear: undefined, values: [] }
            }
        };
    }, {});
};

export default function parseFacetData(facets, activeFacets = []) {
    const parsedFacets = facets.reduce(parseFacet, {});
    const parsedActiveFacets = activeFacets.reduce(parseActiveFacet, {});

    return mergeFacets(parsedFacets, parsedActiveFacets);
}
