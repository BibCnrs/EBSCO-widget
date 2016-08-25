import { BatchExport } from '../../../lib/components/BatchExport';

describe('BatchExport', function () {
    it('render a span instead of a BibButton if selectedIds is empty', function () {
        const props = {
            selectedIds: [],
            exportTypes: ['RIS format'],
            exporting: false
        };

        const component = enzyme.shallow(<BatchExport {...props} />);
        const bibButton = component.find('.batch-export');
        assert.equal(bibButton.length, 0);
        const span = component.find('span');
        assert.equal(span.length, 1);
    });

    it('render a DropdownButton if selectedIds contain value that call exportNotice with selectedIds on click', function () {
        let onClickCall;
        const props = {
            selectedIds: [1, 2],
            exportTypes: ['ris'],
            exporting: false,
            exportNotice: (...args) => { onClickCall = args;}
        };
        const component = enzyme.shallow(<BatchExport {...props} />);
        const dropdownButton = component.find('.batch-export');
        assert.equal(dropdownButton.length, 1);
        dropdownButton.simulate('change', { value: 'ris' });
        assert.deepEqual(onClickCall, ['ris', props.selectedIds]);
    });
});
