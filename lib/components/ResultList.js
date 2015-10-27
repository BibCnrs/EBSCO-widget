'use strict';

import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component, PropTypes } from 'react';
import Result from './Result';

export default class ResultList extends Component {
    render() {
        return (
            <ul className="result_list">
                {
                    this.props.results.map(
                        (result, index) => <Result key={index} index={index} result={result.toJS()} showAbstract={this.props.showAbstract}/>
                    )
                }
            </ul>
        );
    }
}

ResultList.propTypes = {
    results: ImmutablePropTypes.list.isRequired
};
