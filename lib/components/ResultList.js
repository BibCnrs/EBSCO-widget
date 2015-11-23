'use strict';

import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component, PropTypes } from 'react';
import Result from './Result';

const ResultList = ({ results, showAbstract, showNotice, fetchNotice }) => (
    <ul className="result_list">
        {
            results.map(
                (result, index) => <Result
                    key={index}
                    index={index}
                    result={result.toJS()}
                    showAbstract={showAbstract}
                    showNotice={showNotice}
                    fetchNotice={fetchNotice}
                />
            )
        }
    </ul>
);

ResultList.propTypes = {
    results: ImmutablePropTypes.list.isRequired,
    showAbstract: PropTypes.func.isRequired,
    showNotice: PropTypes.func.isRequired,
    fetchNotice: PropTypes.func.isRequired
};

export default ResultList;
