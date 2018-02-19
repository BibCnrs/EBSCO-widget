import PropTypes from 'prop-types';
import React from 'react';
import { FormControl } from 'react-bootstrap';

import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';
import DL from './DL';

const getIconType = (noticeShown, noticeLoaded) => {
    if (noticeShown && noticeLoaded) {
        return { name: 'chevron-down' };
    }

    if (noticeShown) {
        return { name: 'spinner', spin: true };
    }

    return { name: 'chevron-right' };
};

export const ExactMatchPlacard = ({
    publication,
    notice,
    noticeShown,
    text,
    showNotice,
    exactMatchSearch,
}) => {
    if (!publication) {
        return <span />;
    }
    const { title } = publication;
    return (
        <div className="exact-match">
            <h4 className="title">
                <BibButton
                    icon={getIconType(noticeShown, !!notice)}
                    bsStyle="link"
                    onClick={() => showNotice()}
                />
                <a className="fetch-link" onClick={() => showNotice()}>
                    {title}
                </a>
            </h4>
            <FormControl
                type="text"
                placeholder={text.placeholder}
                onKeyPress={event =>
                    event.key === 'Enter' &&
                    exactMatchSearch(
                        event.target.value,
                        title,
                        publication.publicationId,
                    )
                }
            />
            {noticeShown && notice ? (
                <div className="notice">
                    <DL className="notice-list" data={notice} />
                </div>
            ) : (
                <span />
            )}
        </div>
    );
};

ExactMatchPlacard.propTypes = {
    publication: PropTypes.object,
    notice: PropTypes.object,
    noticeShown: PropTypes.bool.isRequired,
    text: PropTypes.object,
    showNotice: PropTypes.func.isRequired,
    exactMatchSearch: PropTypes.func.isRequired,
};

ExactMatchPlacard.defaultProps = {
    text: {
        placeholder: 'Search into publcation',
    },
};

export default translate(ExactMatchPlacard);
