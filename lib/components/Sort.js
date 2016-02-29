import React, { PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Icon from 'react-fa';

const sortTitle = {
    relevance: <span>pertinence</span>,
    date: <span>date <Icon name={'arrow-up'}/></span>,
    date2: <span>date <Icon name={'arrow-down'}/></span>,
    title: <span>titre</span>
};

const Sort = ({ sort, availableSort, onChangeSort }) => (
    <label className="sort-selector">
        Trier par: <DropdownButton
            id="sort"
            name="sort"
            title={sortTitle[sort]}
            pullRight
        >
            {availableSort.map(({value, label}, index) => (
                <MenuItem
                    id={value}
                    onClick={() => onChangeSort(value)}
                    key={index}
                    value={value}
                >{label}</MenuItem>))}
        </DropdownButton>
    </label>
);

Sort.propTypes = {
    sort: PropTypes.string.isRequired,
    availableSort: PropTypes.array.isRequired,
    onChangeSort: PropTypes.func.isRequired
};

export default Sort;
