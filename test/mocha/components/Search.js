'use strict';

import Search from '../../../lib/components/Search';
import FetchButton from '../../../lib/components/FetchButton';

describe('Search', function () {
    let component;

    describe('props.state={status: NONE}', function () {
        before(function () {
            const onClick = function onClick() {};
            const onChange = function onClick() {};
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<Search onClick={onClick} onChange={onChange} search={{ term: 'word', status: 'NONE' }} />);

            component = shallowRenderer.getRenderOutput();
        });
    });

    describe('props.state={status: PENDING}', function () {
        before(function () {
            const onClick = function onClick() {};
            const onChange = function onChange() {};
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<Search onClick={onClick} onChange={onChange} search={{ status: 'PENDING' }} />);

            shallowRenderer.state = { term: 'search' };

            component = shallowRenderer.getRenderOutput();
        });

        it ('fetchButton props.status should be PENDING if props.search.status is PENDING', function () {
            assert.equal(component.type, 'div');
            const children = component.props.children;
            assert.equal(children.length, 2);
            const [ input, fetchButton ] = children;
            assert.equal(input.type, 'input');
            assert.equal(input.props.type, 'text');
            assert.equal(fetchButton.type, FetchButton);
            assert.equal(fetchButton.props.status, 'PENDING');
        });
    });

    describe('props.state={status: ERROR}', function () {
        before(function () {
            const onClick = function onClick() {};
            const onChange = function onChange() {};
            const shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<Search onClick={onClick} onChange={onChange} search={{ term: 't', status: 'ERROR', error: 'boom' }} />);

            shallowRenderer.state = { term: 'search' };

            component = shallowRenderer.getRenderOutput();
        });

        it ('should display error', function () {
            assert.equal(component.type, 'div');
            const children = component.props.children;
            assert.equal(children.length, 2);
            const [ input, fetchButton ] = children;
            assert.equal(input.type, 'input');
            assert.equal(input.props.type, 'text');
            assert.equal(fetchButton.type, FetchButton);
            assert.equal(fetchButton.props.status, 'ERROR');
            assert.equal(fetchButton.props.error, 'boom');
        });
    });

    describe('event', function () {
        let term;

        before(function () {
            const onClick = (t) => (term = t);
            const onChange = (t) => (term = t);
            const props = {
                onClick,
                onChange,
                search: { term: 'searched term', status: 'NONE' }
            };
            component = TestUtils.renderIntoDocument(React.createElement(Search, props));
        });

        describe('handleClick', function () {

            it('should call onClick with state.term value', function () {
                component.handleClick();
                assert.equal(term, 'searched term');
            });
        });

        describe('handleChange', function () {

            beforeEach(function () {
                component.handleChange({ target: { value: 'searched term'}});
            });

            it('should set term to onChange event.target.value', function () {
                assert.equal(term, 'searched term');
            });

            it('should set input value to onChange event.target.value', function () {
                const inputNode = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
                assert.equal(inputNode.value, 'searched term');
            });
        });
    });

});
