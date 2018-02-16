import PropTypes from 'prop-types';
import React from 'react';
import SelectButton from './SelectButton';

const ResultsPerPageSelector = ({ resultsPerPage, changeResultsPerPage }) => {
    return (
        <SelectButton
            value={resultsPerPage}
            choices={[10, 20, 50, 100].map(n => ({ label: n, value: n }))}
            onChange={changeResultsPerPage}
        />
    );
};

ResultsPerPageSelector.propTypes = {
    resultsPerPage: PropTypes.number.isRequired,
    changeResultsPerPage: PropTypes.func.isRequired,
};

export default ResultsPerPageSelector;
