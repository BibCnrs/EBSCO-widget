import PropTypes from 'prop-types';
import React from 'react';

import translate from '../higherOrderComponents/translate';

export const RecordList = ({ records, Record, text }) => {
    if (!records.length) {
        return <p>{text.noResults}</p>;
    }
    return (
        <div>
            <ul className="record_list">
                {records.map((record, index) => (
                    <li key={index}>
                        <Record index={index} record={record} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

RecordList.propTypes = {
    records: PropTypes.array.isRequired,
    Record: PropTypes.func.isRequired,
    text: PropTypes.object,
};

RecordList.defaultProps = {
    text: {
        noResults: 'No results were found.',
    },
};

export default translate(RecordList);
