import React, { PropTypes } from 'react';
import Icon from 'react-fa';

import SelectButton from './SelectButton';
import translate from '../higherOrderComponents/translate';

const SortSelector = ({ sort, availableSort, text, onChangeSort }) => {
    const sortTitle = {
        relevance: <span>{text.relevance}</span>,
        date: <span>{text.date} <Icon name={'arrow-up'}/></span>,
        date2: <span>{text.date} <Icon name={'arrow-down'}/></span>,
        title: <span>{text.title}</span>
    };
    const sortLabel = {
        relevance: text.relevance,
        date: `${text.date} (${text.new} - ${text.old})`,
        date2: `${text.date} (${text.old} - ${text.new})`,
        title: text.title
    };

    return (
        <label className="sort-selector">
            {text.sortBy}: <SelectButton
                PullRight
                value={sortTitle[sort]}
                choices={availableSort.map(value => ({ value, label: sortLabel[value] }))}
                onChange={onChangeSort}
            />
        </label>
    );
};

SortSelector.propTypes = {
    sort: PropTypes.string.isRequired,
    availableSort: PropTypes.array.isRequired,
    onChangeSort: PropTypes.func.isRequired
};

SortSelector.defaultProps = {
    text: {
        sortBy: 'Trier par',
        relevance: 'pertinence',
        date: 'date',
        title: 'titre',
        new: 'récent',
        old: 'ancien'
    }
};

export default translate(SortSelector);
