import PropTypes from 'prop-types';
import React from 'react';

import FullTextHolding from './FullTextHolding';
import translate from '../higherOrderComponents/translate';

const FullTextHoldings = ({ title, data = [], text }) => {
    return (
        <div>
            <p>{text.access}</p>
            <ul className="fulltext-holdings">
                {data.map((fullTextHolding, key) => (
                    <li key={key}>
                        <FullTextHolding title={title} {...fullTextHolding} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

FullTextHoldings.propTypes = {
    data: PropTypes.array,
    text: PropTypes.object,
    title: PropTypes.string.isRequired,
};

FullTextHoldings.defaultProps = {
    text: {
        access: 'Accès ressource',
    },
};

export default translate(FullTextHoldings);
