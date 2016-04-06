import FacetValue from '../../../lib/components/FacetValue';

describe('FacetValue', function () {
    let changeFacetCall;

    const getComponent = (facetValue) =>  {
        const props = {
            facetValue,
            changeFacet: (value) => {
                changeFacetCall = value;
            }
        };

        return enzyme.mount(<FacetValue {...props}/>);
    };

    beforeEach(function () {
        changeFacetCall = null;
    });

    it('should display Input with label="value (count)"', function () {
        const component = getComponent({ value: 'facet', count: 19, checked: true });
        const input = component.find('Input');

        assert.equal(input.props().label, 'facet (19)');
    });

    it('should display Input with label="value" if count is 0', function () {
        const component = getComponent({ value: 'facet', count: 0, checked: true });
        const input = component.find('Input');

        assert.equal(input.props().label, 'facet');
    });

    it('should call changefacet with event.target.checked', function () {
        let component = getComponent({ value: 'facet', count: 19, checked: true });
        component.find('Input').simulate('change',{ target: { checked: false } });
        assert.isFalse(changeFacetCall);

        component.find('Input').simulate('change',{ target: { checked: true } });

        assert.isTrue(changeFacetCall);
    });

});
