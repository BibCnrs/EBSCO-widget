import BatchExport from '../../../lib/components/BatchExport';

describe.only('BatchExport', function () {
    it('render a span instead of a BibButton if selectedIds is empty', function () {
        const props = {
            selectedIds: []
        };

        const component = enzyme.shallow(<BatchExport {...props} />);
        const bibButton = component.find('.batch-export');
        assert.equal(bibButton.length, 0);
        const span = component.find('span');
        assert.equal(span.length, 1);
    });

    it('render a BibButton if selectedIds contain value that call exportNotice with selectedIds on click', function () {
        let onClickCall;
        const props = {
            selectedIds: [1, 2],
            exportNotice: (ids) => { onClickCall = ids;}
        };
        const component = enzyme.shallow(<BatchExport {...props} />);
        const bibButton = component.find('.batch-export');
        assert.equal(bibButton.length, 1);
        bibButton.simulate('click');
        assert.deepEqual(onClickCall, props.selectedIds);
    });
});
