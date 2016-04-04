export default function parseFacetData(facets = [], activeFacets = {}) {
    const availableIds = facets.map(facet => facet.id);
    const missingActiveFacets = Object.keys(activeFacets)
    .filter(id => availableIds.indexOf(id) === -1)
    .map(id => ({
        id,
        label: id,
        activeFacets: activeFacets[id],
        availableFacetValues: activeFacets[id].map(value => ({
            value,
            count: null
        }))
    }));

    return [
        ...missingActiveFacets,
        ...facets.map(facet => {
            const availableValues = facet.availableFacetValues.map(value => value.value);
            const missingAvailableValues = (activeFacets[facet.id] || [])
            .filter(value => availableValues.indexOf(value) === -1)
            .map(value => ({
                value,
                count: null
            }));

            return {
                ...facet,
                activeFacets: activeFacets[facet.id] || [],
                availableFacetValues: [
                    ...missingAvailableValues,
                    ...facet.availableFacetValues
                ]
            };
        })
    ];
}
