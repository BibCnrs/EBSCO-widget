export default function extractActiveFacet(facets) {
    return Object.keys(facets)
    .filter((key) => facets[key].filterId)
    .map((key) => {
        return {
            FilterId: facets[key].filterId,
            FacetValues: facets[key].values.map((value) => ({
                Id: key,
                Value: value.label
            }))
        };
    });
}
