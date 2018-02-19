import { Facet } from '../../../lib/components/Facet';

describe('Facet', function() {
    const defaultFacet = {
        id: 'id',
        label: 'title',
        activeFacets: ['value1'],
        availableFacetValues: [
            { value: 'value1', count: 1, checked: true },
            { value: 'value2', count: 2, checked: false },
        ],
    };

    const getComponent = (facet = defaultFacet) => {
        const props = {
            facet,
            changeFacet: () => {},
        };

        return enzyme.shallow(<Facet {...props} />);
    };

    it('should display a bibButton with "facet.label (facet.count)" as label that call applyFacet onClick', function() {
        const component = getComponent();
        const titleButton = component.find('BibButton.title');

        assert.equal(titleButton.props().label, 'title (2)');
    });

    it('should display a bibButton with facet.id if no label', function() {
        const component = getComponent({
            ...defaultFacet,
            label: undefined,
        });
        const bibButton = component.find('BibButton.title');

        assert.equal(bibButton.props().label, 'id (2)');
    });

    it('should replace id TypePublicationPubD by Publication Type', function() {
        const component = getComponent({
            ...defaultFacet,
            label: undefined,
            id: 'TypePublicationPubD',
        });
        const bibButton = component.find('BibButton.title');

        assert.equal(bibButton.props().label, 'Publication Type (2)');
    });

    it('should display a FacetValue foreach availableFacetValues', function() {
        const component = getComponent();
        const facetValues = component.find('FacetValue');

        assert.deepEqual(
            facetValues.map(facetValue => facetValue.props().facetValue),
            defaultFacet.availableFacetValues,
        );
    });

    it('should display only the first three availableFacetValues as FacetValue when state.showAll is default false', function() {
        const availableFacetValues = [
            { value: 1, count: 1, checked: false },
            { value: 2, count: 2, checked: false },
            { value: 3, count: 3, checked: false },
            { value: 4, count: 4, checked: false },
        ];
        const component = getComponent({
            ...defaultFacet,
            availableFacetValues,
        });
        const facetValues = component.find('FacetValue');

        assert.isFalse(component.state().showAll);
        assert.deepEqual(
            facetValues.map(facetValue => facetValue.props().facetValue),
            availableFacetValues.slice(0, 3),
        );
    });

    it('should display all availableFacetValues as FacetValue when state.showAll is true', function() {
        const availableFacetValues = [
            { value: 1, count: 1, checked: false },
            { value: 2, count: 2, checked: false },
            { value: 3, count: 3, checked: false },
            { value: 4, count: 4, checked: false },
        ];
        const component = getComponent({
            ...defaultFacet,
            availableFacetValues,
        });
        component.setState({ showAll: true });
        const facetValues = component.find('FacetValue');

        assert.deepEqual(
            facetValues.map(facetValue => facetValue.props().facetValue),
            availableFacetValues,
        );
    });
});
