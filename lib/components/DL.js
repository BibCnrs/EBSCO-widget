import React, { PropTypes } from 'react';

import Blob from './Blob';
import translate from '../higherOrderComponents/translate';

export const DL = ({ data, className, text }) => {
    const getTerm = (key) => text[key] || key;
    const keys = Object.keys(data).filter((key) => (data[key] !== '') && data[key] !== null && (typeof data[key] !== 'undefined'));
    return (
        <dl className={`dl ${className}`}>
            {keys.map((key, index) => {
                return (
                    <span className="dl-item" key={index}>
                        <dt>{getTerm(key)}</dt>
                        <dd>
                            <Blob data={data[key]}/>
                        </dd>
                    </span>
                );
            }
            )}
        </dl>
    );
};

DL.propTypes = {
    data: PropTypes.object.isRequired,
    className: PropTypes.string,
    text: PropTypes.object
};

DL.defaultProps = {
    text: {
        fullTextLinks: 'Accès au document',
        pdfLinks: 'Accès au pdf',
        dbId: 'Id base de données'
    }
};

export default translate(DL);
