import React, { PropTypes } from 'react';

import BibButton from './BibButton';

const NameLimiter = ({ label, value, onRemove, onApply }) => {
    if (!value) {
        return <span/>;
    }

    return (
        <div>
            <label className="title">{label}</label>
            <div>
                {value}
                <BibButton
                    bsStyle="link"
                    icon={{ name: 'times' }}
                    onClick={() => {
                        onRemove();
                        onApply();
                    }}
                />
            </div>
        </div>
    );
};

NameLimiter.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onRemove: PropTypes.func.isRequired,
    onApply: PropTypes.func.isRequired
};

NameLimiter.defaultProps = {
    publication: 'publication'
};


export default NameLimiter;
