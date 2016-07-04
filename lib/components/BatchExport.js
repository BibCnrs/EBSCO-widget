import React, { PropTypes } from 'react';
import { BibButton } from './BibButton';

const BatchExport = ({ selectedIds, text, exportNotice }) => {
    if(!selectedIds.length) {
        return <span></span>;
    }

    return (
        <BibButton
            className="batch-export"
            label={text.export}
            onClick={() => exportNotice(selectedIds)}
        />
    );
};

BatchExport.propTypes = {
    selectedIds: PropTypes.bool.isRequired,
    text: PropTypes.object,
    exportNotice: PropTypes.func.isRequired
};

BatchExport.defaultProps = {
    text: {
        export: 'exporter'
    }
};

export default BatchExport;
