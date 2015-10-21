'use strict';

import Icon from 'react-fa';
import Search from '../../../lib/components/Search';

describe('Search', function () {
    let component;

    describe('props.state=NONE', function () {
        before(function () {
            const click = function click() {};
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<Search onClick={click} state="NONE" />);

            component = shallowRenderer.getRenderOutput();
        });

        it ('should display input with button', function () {
            assert.equal(component.type, 'div');
            const children = component.props.children;
            assert.equal(children.length, 2);
            const [ input, button ] = children;
            assert.equal(input.type, 'input');
            assert.equal(input.props.type, 'text');
            assert.equal(button.type, 'button');
            assert.isFalse(button.props.disabled);
            const [icon] = button.props.children;
            assert.isNull(icon);
        });
    });

    describe('props.state=PENDING', function () {
        before(function () {
            const click = function click() {};
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<Search onClick={click} state="PENDING" />);

            shallowRenderer.state = { term: 'search' };

            component = shallowRenderer.getRenderOutput();
        });

        it ('should disable search and display spinner if props.state is PENDING', function () {
            assert.equal(component.type, 'div');
            const children = component.props.children;
            assert.equal(children.length, 2);
            const [ input, button ] = children;
            assert.equal(input.type, 'input');
            assert.equal(input.props.type, 'text');
            assert.equal(button.type, 'button');
            assert.isTrue(button.props.disabled);
            const [icon] = button.props.children;
            assert.equal(icon.type, Icon);
            assert.equal(icon.props.name, 'spinner');
            assert.isTrue(icon.props.spin);
        });
    });

    describe('event', function () {
        let term;

        before(function () {
            const onClick = (t) => (term = t);
            const props = {
                onClick,
                state: 'NONE'
            };
            component = TestUtils.renderIntoDocument(React.createElement(Search, props));
        });

        describe('handleClick', function () {
            beforeEach(function () {
                component.setState({term: 'searched term'});
            });

            it('should call onClick with state.term value', function () {
                component.handleClick();
                assert.equal(term, 'searched term');
            });

            it('should set state.term value to ""', function () {
                component.handleClick();
                assert.deepEqual(component.state, { term: '' });
            });
        });

        describe('handleChange', function () {

            beforeEach(function () {
                component.handleChange({ target: { value: 'searched term'}});
            });

            it('should set state.term to onChange event.target.value', function () {
                assert.deepEqual(component.state, { term: 'searched term' });
            });

            it('should set input value to onChange event.target.value', function () {
                const inputNode = TestUtils.findRenderedDOMComponentWithTag(component, 'input').getDOMNode();
                assert.equal(inputNode.value, 'searched term');
            });
        });
    });

});
