'use strict';

import React, { Component, PropTypes } from 'react';
import Result from './Result';

export default class ResultList extends Component {
    render() {
        return (
            <ul className="result_list">
                {
                    this.props.results.map(
                        (result) => <Result result={result}/>
                    )
                }
            </ul>
        );
    }
}

ResultList.propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape(PropTypes.object.isRequired).isRequired).isRequired
};
