import PropTypes from 'prop-types';
import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Icon from 'react-fa';

import translate from '../higherOrderComponents/translate';

export const BatchExport = ({
    selectedIds,
    exportTypes,
    exporting,
    text,
    exportNotice,
}) => {
    if (!selectedIds.length) {
        return <span />;
    }

    return (
        <DropdownButton
            className="batch-export"
            id="batch-export"
            name="batch-export"
            title={
                <span>
                    <Icon
                        name={exporting ? 'spinner' : 'download'}
                        spin={exporting}
                    />{' '}
                    {text.export}
                </span>
            }
            onChange={data => exportNotice(data.value, selectedIds)}
            disabled={!exportTypes.length}
        >
            {exportTypes.map((exportType, index) => (
                <MenuItem
                    key={index}
                    id={exportType}
                    value={exportType}
                    onClick={() => exportNotice(exportType, selectedIds)}
                >
                    {text[exportType]}
                </MenuItem>
            ))}
        </DropdownButton>
    );
};

BatchExport.propTypes = {
    selectedIds: PropTypes.array.isRequired,
    exportTypes: PropTypes.array.isRequired,
    exporting: PropTypes.bool.isRequired,
    text: PropTypes.object,
    exportNotice: PropTypes.func.isRequired,
};

BatchExport.defaultProps = {
    text: {
        export: 'exporter sélection',
        'Exporter en format RIS': 'format RIS',
    },
};

export default translate(BatchExport);
