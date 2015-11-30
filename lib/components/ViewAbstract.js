'use strict';

import React, { PropTypes } from 'react';
import Icon from 'react-fa';

const ViewAbstract = ({ abstractShown, abstract, index, onShowAbstract }) => (
    <span className="view-abstract">
        <button className="button" disabled={!abstract} onClick={() => onShowAbstract(index, !abstractShown)}>
            Abstract <Icon name={abstractShown ? 'eye-slash' : 'eye'} />
        </button>
        <div className={abstractShown ? 'abstract shown' : 'abstract hidden'}><p>{abstract}</p></div>
    </span>
);

ViewAbstract.propTypes = {
    abstractShown: PropTypes.bool,
    abstract: PropTypes.string,
    index: PropTypes.number,
    onShowAbstract: PropTypes.func.isRequired
};

export default ViewAbstract;
