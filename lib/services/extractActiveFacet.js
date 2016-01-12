export default function extractActiveFacet(facets = {}) {
    return Object.keys(facets)
    .filter((key) => facets[key].filterId)
    .map((key) => {
        return {
            FilterId: facets[key].filterId,
            FacetValues: facets[key].values ? facets[key].values
            .filter((value) => {
                return value.value.indexOf('remove') !== -1;
            })
            .map((value) => ({
                Id: key,
                Value: value.label
            })) : []
        };
    });
}
