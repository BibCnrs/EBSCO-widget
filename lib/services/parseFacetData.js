import uncapitalizeKeys from './uncapitalizeKeys';

export default function parseFacetData(facets = [], activeFacets = {}) {
    const parsedFacets = facets.map(uncapitalizeKeys);
    const availableIds = parsedFacets.map(facet => facet.id);
    const purelyActiveFacets = Object.keys(activeFacets)
    .filter(id => availableIds.indexOf(id) === -1)
    .map(id => ({
        id,
        label: id,
        activeFacets: activeFacets[id],
        availableFacetValues: []
    }));

    return [
        ...purelyActiveFacets,
        ...parsedFacets.map(facet => {
            return {
                ...facet,
                activeFacets: activeFacets[facet.id] || []
            };
        })
    ];
}
