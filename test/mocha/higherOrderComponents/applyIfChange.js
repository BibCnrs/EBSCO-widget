import applyIfChange from '../../../lib/higherOrderComponents/applyIfChange';

describe('applyIfChange', function () {
    let mountedComponent, onApplyCall, props;

    beforeEach(function () {
        const component = ({ value, onApply }) => {
            return (
                <div>
                    <div>{value}</div>
                    <button className="apply" onClick={onApply}>Apply</button>
                </div>
            );
        };
        const ApplyIfChangeComponent = applyIfChange(component);
        onApplyCall = 0;
        const onApply = function () {
            onApplyCall++;
        };

        props = {
            value: 'initial value',
            onApply
        };

        mountedComponent = enzyme.mount(<ApplyIfChangeComponent {...props} />);
    });

    it('should have state.initialValue set to initial props.value', function () {
        assert.equal(mountedComponent.state('initialValue'), 'initial value');
    });

    it('should have state.initialValue not change when updating props.value', function () {
        mountedComponent.setProps({
            ...props,
            value: 'updated value'
        });
        assert.equal(mountedComponent.state('initialValue'), 'initial value');
    });

    it('should not call onApply if props.value is equal to state initialValue', function () {
        mountedComponent.find('.apply').simulate('click');
        assert.equal(onApplyCall, 0);

        mountedComponent.setProps({
            ...props,
            value: 'updated value'
        });
        mountedComponent.setProps({
            ...props,
            value: 'initial value'
        });
        mountedComponent.find('.apply').simulate('click');
        assert.equal(onApplyCall, 0);
    });

    it('should update state.initialValue to props value once onAplly is called', function () {
        mountedComponent.setProps({
            ...props,
            value: 'updated value'
        });
        assert.equal(mountedComponent.state('initialValue'), 'initial value');
        mountedComponent.find('.apply').simulate('click');
        assert.equal(onApplyCall, 1);
        assert.equal(mountedComponent.state('initialValue'), 'updated value');
    });
});
