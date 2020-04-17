import PropTypes from 'prop-types';
import React from 'react';
import SelectButton from './SelectButton';

const ResultsPerPageSelector = ({
    resultsPerPage,
    changeResultsPerPage,
    choices = [10, 20, 50, 100],
}) => {
    console.log(resultsPerPage);
    return (
        <SelectButton
            value={resultsPerPage}
            choices={choices.map(n => ({ label: n, value: n }))}
            onChange={changeResultsPerPage}
        />
    );
};

ResultsPerPageSelector.propTypes = {
    resultsPerPage: PropTypes.number.isRequired,
    changeResultsPerPage: PropTypes.func.isRequired,
    choices: PropTypes.array,
};

export default ResultsPerPageSelector;
