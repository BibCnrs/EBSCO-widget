import Icon from 'react-fa';
import ViewAbstract from '../../../lib/components/ViewAbstract';

describe('ViewAbstract', function () {
    let component, onShowAbstract;

    describe('abstractShown prop set to true', function () {
        let index, abstractShown;
        before(function () {
            onShowAbstract = function onShowAbstract(i, v) {
                index = i;
                abstractShown = v;
            };
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ViewAbstract index={7} onShowAbstract={onShowAbstract} abstractShown={true} abstract="To summmarize this is all of it." />);

            component = shallowRenderer.getRenderOutput();
        });

        it ('should display abstract', function () {
            assert.equal(component.type, 'span');
            const children = component.props.children;
            assert.equal(children.length, 2);
            const [ button, p ] = children;
            assert.equal(button.type, 'button');
            const icon = button.props.children[1];
            assert.deepEqual(icon.type, Icon);
            assert.equal(icon.props.name, 'eye-slash');
            assert.equal(p.type, 'p');
            assert.equal(p.props.children, 'To summmarize this is all of it.');
        });

        it ('should call onShowAbstract with index props and false', function () {
            component.props.children[0].props.onClick();
            assert.equal(index, 7);
            assert.equal(abstractShown, false);
        });
    });

    describe('abstractShown prop set to false', function () {
        let index, abstractShown;
        before(function () {
            onShowAbstract = function onShowAbstract(i, v) {
                index = i;
                abstractShown = v;
            };
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ViewAbstract index={7} onShowAbstract={onShowAbstract} abstractShown={false} abstract="To summmarize this is all of it." />);

            component = shallowRenderer.getRenderOutput();
        });

        it ('should not display abstract', function () {
            assert.equal(component.type, 'span');
            const children = component.props.children;
            assert.equal(children.length, 2);
            const [ button, p ] = children;
            assert.equal(button.type, 'button');
            const icon = button.props.children[1];
            assert.deepEqual(icon.type, Icon);
            assert.equal(icon.props.name, 'eye');
            assert.isNull(p);
        });

        it ('should call onShowAbstract with index props and true', function () {
            component.props.children[0].props.onClick();
            assert.equal(index, 7);
            assert.equal(abstractShown, true);
        });
    });

    describe('no abstract provided', function () {
        before(function () {
            onShowAbstract = function onShowAbstract() {};
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ViewAbstract index={7} onShowAbstract={onShowAbstract} abstractShown={false} />);

            component = shallowRenderer.getRenderOutput();
        });

        it ('should disable button', function () {
            assert.equal(component.type, 'span');
            const children = component.props.children;
            assert.equal(children.length, 2);
            const [ button ] = children;
            assert.equal(button.type, 'button');
            assert.isTrue(button.props.disabled, 'button');
        });
    });
});
