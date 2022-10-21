import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import BibButton from '../BibButton';

const MetadoreRecord = ({ record }) => {
    const { id, title, type, description, url } = record;
    const [noticeShown, setNoticeShown] = useState(false);

    const removeHtmlTags = text => {
        return text.replace(/(<([^>]+)>)/gi, '');
    };

    return (
        <div className="record record-metadore">
            <h4 className="title">
                <BibButton
                    className="notice-opener"
                    icon={
                        noticeShown
                            ? { name: 'chevron-down' }
                            : { name: 'chevron-right' }
                    }
                    bsStyle="link"
                    onClick={() => setNoticeShown(!noticeShown)}
                />
                <a
                    className="fetch-link"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {`${id}. ${title} ${type ? `[${type}]` : ''}`}
                </a>
            </h4>
            <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                {noticeShown && (
                    <div className="notice">
                        <p>{removeHtmlTags(description)}</p>
                    </div>
                )}
            </CSSTransitionGroup>
        </div>
    );
};

MetadoreRecord.propTypes = {
    record: PropTypes.object.isRequired,
};

export default MetadoreRecord;
