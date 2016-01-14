import FetchButton from '../../../lib/components/FetchButton';
import Button from '../../../lib/components/Button';

describe('FetchButton', function () {
    let component;

    describe('props.status"NONE"', function () {
        before(function () {
            const onClick = function onClick() {};
            component = enzyme.shallow(<FetchButton onClick={onClick} status="NONE" icon="test" label="test" />);
        });

        it ('should display input with button and search icon', function () {
            assert.equal(component.type(), 'span');
            const button = component.find('Button');
            const error = component.find('.error');
            assert.equal(button.type(), Button);
            const {disabled, icon} = button.props();
            assert.isFalse(disabled);
            assert.deepEqual(icon, {
                name: 'test'
            });
            assert.equal(error.length, 0);
        });
    });

    describe('props.status="PENDING"', function () {
        before(function () {
            const onClick = function onClick() {};
            component = enzyme.shallow(<FetchButton onClick={onClick} status="PENDING" disabled={true} icon="test" label="test" />);
        });

        it ('should disable search and display spinner if props.status is PENDING', function () {
            assert.equal(component.type(), 'span');
            const button = component.find('Button');
            assert.equal(button.type(), Button);
            const {disabled, icon} = button.props();
            assert.isTrue(disabled);
            assert.deepEqual(icon, {
                name: 'spinner',
                spin: true
            });
        });
    });

});
