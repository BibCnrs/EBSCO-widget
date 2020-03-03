import PropTypes from 'prop-types';
import React from 'react';

import Blob from './Blob';
import translate from '../higherOrderComponents/translate';

export const DL = ({
    currentGate,
    data,
    doi: defaultDoi,
    className,
    text,
    page,
}) => {
    const getTerm = key => text[key] || key;
    const keys = Object.keys(data).filter(
        key =>
            data[key] !== '' &&
            data[key] !== null &&
            typeof data[key] !== 'undefined',
    );
    const doi = defaultDoi || (data['DOI'] ? data['DOI'][0] || null : null);

    return (
        <dl className={`dl ${className}`}>
            {keys.map((key, index) => {
                return (
                    <span className="dl-item" key={index}>
                        <dt>{getTerm(key)}</dt>
                        <dd>
                            <Blob
                                data={data[key]}
                                doi={doi}
                                currentGate={currentGate}
                                page={page}
                            />
                        </dd>
                    </span>
                );
            })}
        </dl>
    );
};

DL.propTypes = {
    data: PropTypes.object.isRequired,
    doi: PropTypes.any,
    className: PropTypes.string,
    text: PropTypes.object,
    currentGate: PropTypes.string.isRequired,
    page: PropTypes.string,
};

DL.defaultProps = {
    text: {
        fullTextLinks: "Accès à l'article",
        pdfLinks: 'Accès au pdf',
        dbId: 'Id base de données',
    },
};

export default translate(DL);
