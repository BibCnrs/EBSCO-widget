import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import selectObjectByLangAttribute from '../../services/selectObjectByLangAttribute';

import BibButton from '../BibButton';
import DL from '../DL';

const MetadoreRecord = ({ record, language }) => {
    const { id, doi, titles, type, descriptions, url } = record;
    const [noticeShown, setNoticeShown] = useState(false);

    const title = selectObjectByLangAttribute(titles, language).title || '';
    const description =
        selectObjectByLangAttribute(descriptions, language).description || '';

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
                {noticeShown ? (
                    <div className="notice">
                        <DL
                            className="notice-list"
                            data={{
                                DOI: doi,
                                Type: type,
                                Description: removeHtmlTags(description),
                            }}
                            currentGate=""
                            title={title}
                            page="metadore"
                        />
                    </div>
                ) : (
                    <div>
                        <p>{`DOI: ${doi}`}</p>
                    </div>
                )}
            </CSSTransitionGroup>
        </div>
    );
};

MetadoreRecord.propTypes = {
    record: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
};

export default MetadoreRecord;