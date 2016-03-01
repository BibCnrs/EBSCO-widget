import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import SelectButton from './SelectButton';

const sortTitle = {
    relevance: <span>pertinence</span>,
    date: <span>date <Icon name={'arrow-up'}/></span>,
    date2: <span>date <Icon name={'arrow-down'}/></span>,
    title: <span>titre</span>
};

const FieldSelector = ({ sort, availableSort, onChangeSort }) => (
    <SelectButton
        value={sortTitle[sort]}
        choices={availableSort}
        onChange={onChangeSort}
    />
);

FieldSelector.propTypes = {
    sort: PropTypes.string.isRequired,
    availableSort: PropTypes.array.isRequired,
    onChangeSort: PropTypes.func.isRequired
};

export default FieldSelector;
