export default function getActiveFacetValues(activeFacets = {}) {
    return Object.keys(activeFacets).reduce((result, id) => {
        return [
            ...result,
            ...activeFacets[id].map(value => {
                return { id, value, checked: true };
            })
        ];
    }, []);
}
