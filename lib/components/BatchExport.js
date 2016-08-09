import React, { PropTypes } from 'react';
import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';

export const BatchExport = ({ selectedIds, exporting, text, exportNotice }) => {
    if(!selectedIds.length) {
        return <span></span>;
    }

    return (
        <BibButton
            className="batch-export"
            bsStyle="default"
            label={text.export}
            icon={exporting ? { name: 'spinner', spin: true } : { name: 'download' }}
            onClick={() => exportNotice(selectedIds)}
        />
    );
};

BatchExport.propTypes = {
    selectedIds: PropTypes.array.isRequired,
    exporting: PropTypes.bool.isRequired,
    text: PropTypes.object,
    exportNotice: PropTypes.func.isRequired
};

BatchExport.defaultProps = {
    text: {
        export: 'exporter sélection'
    }
};

export default translate(BatchExport);
