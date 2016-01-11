export const parseActiveFacetValue = (facetValue) => {
    return {
        label: facetValue.FacetValue.Value,
        value: facetValue.RemoveAction
    };
};

export const parseActiveFacet = (result, facetFilter) => {
    return {
        ...result,
        [facetFilter.FacetValuesWithAction[0].FacetValue.Id] : {
            clear: facetFilter.RemoveAction,
            values: facetFilter.FacetValuesWithAction.map(parseActiveFacetValue)
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

export default function parseFacetData(facets, activeFacets) {
    const parsedFacets = facets.map(parseFacet);

    const parsedActiveFacets = activeFacets.map(parseActiveFacet);

    return facets
    .reduce((result, facet) => {
        const activeFacet = parsedActiveFacets[facet.Id] || {};
        return {
            ...result,
            [facet.Id]: {
                label: facet.Label,
                choices: facet.AvailableFacetValues
                .map((choice) => ({
                    value: choice.AddAction,
                    label: `${choice.Value} (${choice.Count})`
                })),
                clear: activeFacet.clear,
                values: activeFacet.values || []
            }
        };
    }, {});
}
