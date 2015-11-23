'use strict';

import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component, PropTypes } from 'react';
import Result from '../containers/Result';

const ResultList = ({ results, url }) => (
    <ul className="result_list">
        {results.map((result, index) => <Result url={url} key={index} index={index} />)}
    </ul>
);

ResultList.propTypes = {
    results: ImmutablePropTypes.list.isRequired,
    showAbstract: PropTypes.func.isRequired,
    showNotice: PropTypes.func.isRequired,
    fetchNotice: PropTypes.func.isRequired
};

export default ResultList;
