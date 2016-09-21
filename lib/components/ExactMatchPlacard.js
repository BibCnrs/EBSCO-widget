import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';

import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';

export const ExactMatchPlacard = ({ publication, text }) => {
    const { title } = publication;
    return (
        <div className="exact-patch">
            <h4 className="title">
                <BibButton
                    // icon={getIconType(noticeShown, !!notice)}
                    bsStyle="link"
                    // onClick={() => showNotice(id)}
                />
                <a
                    className="fetch-link"
                    // onClick={() => showNotice(id)}
                >
                    {title}
                </a>
            </h4>
            <FormControl
                type="text"
                // value={value}
                // label={label}
                placeholder={text.placeholder}
                // onChange={(e) => onChange(e.target.value)}
                // onKeyPress={(event) => (event.key === 'Enter' && onApply())}
            />
        </div>
    );
};

ExactMatchPlacard.propTypes = {
    publication: PropTypes.object.isRequired,
    text: PropTypes.object
};

ExactMatchPlacard.defaultProps = {
    text: {
        placeholder: 'Search into publcation'
    }
};

export default translate(ExactMatchPlacard);
