import Icon from 'react-fa';
import FetchButton from '../../../lib/components/FetchButton';

describe('FetchButton', function () {
    let component;

    describe('props.status"NONE"', function () {
        before(function () {
            const onClick = function onClick() {};
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<FetchButton onClick={onClick} status="NONE" icon="test" label="test" />);

            component = shallowRenderer.getRenderOutput();
        });

        it ('should display input with button and search icon', function () {
            assert.equal(component.type, 'span');
            const children = component.props.children;
            assert.equal(children.length, 2);
            const [ button, error ] = children;
            assert.equal(button.type, 'button');
            assert.isFalse(button.props.disabled);
            const [icon] = button.props.children;
            assert.equal(icon.type, Icon);
            assert.equal(icon.props.name, 'test');
            assert.isNull(error);
        });
    });

    describe('props.status="PENDING"', function () {
        before(function () {
            const onClick = function onClick() {};
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<FetchButton onClick={onClick} status='PENDING' disabled={true} label="test" icon="test" />);

            component = shallowRenderer.getRenderOutput();
        });

        it ('should disable search and display spinner if props.status is PENDING', function () {
            assert.equal(component.type, 'span');
            const children = component.props.children;
            assert.equal(children.length, 2);
            const [ button, error ] = children;
            assert.equal(button.type, 'button');
            assert.isTrue(button.props.disabled);
            const [icon] = button.props.children;
            assert.equal(icon.type, Icon);
            assert.equal(icon.props.name, 'spinner');
            assert.isTrue(icon.props.spin);
            assert.isNull(error);
        });
    });

    describe('props.status="ERROR"', function () {
        before(function () {
            const onClick = function onClick() {};
            const onChange = function onChange() {};
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<FetchButton onClick={onClick} onChange={onChange} status="ERROR" error="boom" icon="test" label="test" />);

            component = shallowRenderer.getRenderOutput();
        });

        it ('should display error', function () {
            assert.equal(component.type, 'span');
            const children = component.props.children;
            assert.equal(children.length, 2);
            const [ button, error ] = children;
            assert.equal(button.type, 'button');
            assert.isFalse(button.props.disabled);
            const [icon] = button.props.children;
            assert.equal(icon.type, Icon);
            assert.equal(icon.props.name, 'test');
            assert.equal(error.type, 'p');
            const [errorIcon, , message ] = error.props.children;

            assert.equal(errorIcon.type, Icon);
            assert.equal(errorIcon.props.name, 'exclamation-triangle');
            assert.equal(message, 'boom');
        });
    });

});
