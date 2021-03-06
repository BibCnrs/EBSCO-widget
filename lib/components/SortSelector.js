import PropTypes from 'prop-types';
import React from 'react';

import SelectButton from './SelectButton';
import translate from '../higherOrderComponents/translate';

const SortSelector = ({ sort, availableSort, text, onChangeSort, active }) => {
    if (!active) {
        return null;
    }
    const sortTitle = {
        relevance: <span>{text.relevance}</span>,
        date: <span>{text.new}</span>,
        date2: <span>{text.old}</span>,
        title: <span>{text.title}</span>,
    };
    const sortLabel = {
        relevance: text.relevance,
        date: `${text.new}`,
        date2: `${text.old}`,
        title: text.title,
    };

    return (
        <label className="sort-selector">
            {text.sortBy}:{' '}
            <SelectButton
                className="sort"
                PullRight
                value={sortTitle[sort]}
                choices={availableSort.map(value => ({
                    value,
                    label: sortLabel[value],
                }))}
                onChange={onChangeSort}
            />
        </label>
    );
};

SortSelector.propTypes = {
    sort: PropTypes.string.isRequired,
    availableSort: PropTypes.array.isRequired,
    text: PropTypes.object,
    onChangeSort: PropTypes.func.isRequired,
    active: PropTypes.bool,
};

SortSelector.defaultProps = {
    text: {
        sortBy: 'Tri',
        relevance: 'Pertinence',
        title: 'Alphabétique',
        new: '+ Récent',
        old: '+ Ancien',
    },
};

export default translate(SortSelector);
