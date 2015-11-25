'use strict';

import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component, PropTypes } from 'react';
import Result from '../containers/Result';

const ResultList = ({ results }) => (
    <ul className="result_list">
        {results.map((result, index) => <Result key={index} index={index} />)}
    </ul>
);

ResultList.propTypes = {
    results: ImmutablePropTypes.list.isRequired
};

export default ResultList;
