import FetchButton from '../../../lib/components/FetchButton';
import BibButton from '../../../lib/components/BibButton';

describe('FetchButton', function() {
    let component;

    describe('props.status"NONE"', function() {
        before(function() {
            const onClick = function onClick() {};
            component = enzyme.shallow(
                <FetchButton
                    onClick={onClick}
                    status="NONE"
                    icon="test"
                    label="test"
                />,
            );
        });

        it('should display input with button and search icon', function() {
            assert.equal(component.type(), BibButton);
            const error = component.find('.error');
            const { disabled, icon } = component.props();
            assert.isUndefined(disabled);
            assert.deepEqual(icon, {
                name: 'test',
            });
            assert.equal(error.length, 0);
        });
    });

    describe('props.status="PENDING"', function() {
        before(function() {
            const onClick = function onClick() {};
            component = enzyme.shallow(
                <FetchButton
                    onClick={onClick}
                    status="PENDING"
                    disabled={true}
                    icon="test"
                    label="test"
                />,
            );
        });

        it('should disable search and display spinner if props.status is PENDING', function() {
            assert.equal(component.type(), BibButton);
            const { disabled, icon } = component.props();
            assert.isTrue(disabled);
            assert.deepEqual(icon, {
                name: 'spinner',
                spin: true,
            });
        });
    });
});
