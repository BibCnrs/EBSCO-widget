'use strict';

import React, { PropTypes } from 'react';
import Icon from 'react-fa';

const ViewAbstract = ({ abstractShown, abstract, index, onShowAbstract }) => (
    <span>
        <button className="button" disabled={!abstract} onClick={() => onShowAbstract(index, !abstractShown)}>
            Abstract <Icon name={abstractShown ? 'eye-slash' : 'eye'} />
        </button>
        {abstractShown ? <p>{abstract}</p> : null}
    </span>
);

ViewAbstract.propTypes = {
    abstractShown: PropTypes.bool,
    abstract: PropTypes.string,
    index: PropTypes.number,
    onShowAbstract: PropTypes.func.isRequired
};

export default ViewAbstract;
