import React, { PropTypes } from 'react';
import Button from './Button';

const ViewAbstract = ({ abstractShown, abstract, index, onShowAbstract }) => (
    <span className="view-abstract">
        <Button
            label="Abstract"
            icon={{ name: abstractShown ? 'eye-slash' : 'eye' }}
            disabled={!abstract}
            onClick={() => onShowAbstract(index, !abstractShown)}
        />
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
