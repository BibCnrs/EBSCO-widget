import React, { PropTypes } from 'react';
import SelectButton from './SelectButton';

const ResultsPerPageSelector = ({ resultsPerPage, changeResultsPerPage }) => {

    return (
        <SelectButton
            value={resultsPerPage}
            choices={[10, 20, 50, 100].map(n => ({ label: n, value: n }))}
            onChange={bnResults => changeResultsPerPage(bnResults)}
        />
    );
};

ResultsPerPageSelector.propTypes = {
    resultsPerPage: PropTypes.number.isRequired
};

export default ResultsPerPageSelector;
