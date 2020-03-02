import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import translate from '../higherOrderComponents/translate';
import BookmarkButton from '../containers/BookmarkButton';
import BibButton from './BibButton';

export const FullTextHolding = ({
    url,
    name,
    title,
    displayBookmark,
    coverage,
    isCurrent,
    text,
}) => {
    return (
        <div className={classNames('fulltext-holding', { current: isCurrent })}>
            <a href={url} target="_blank" rel="noopener noreferrer">
                {name}
            </a>
            {displayBookmark === true ? (
                <BookmarkButton title={`${title} - ${name}`} url={url} />
            ) : (
                ''
            )}
            {coverage ? (
                <span className="coverage">
                    {coverage
                        .map(
                            coverage =>
                                `${text.date(coverage.start)} - ${text.date(
                                    coverage.end,
                                )}`,
                        )
                        .join(', ')}
                </span>
            ) : (
                ''
            )}
        </div>
    );
};

FullTextHolding.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    displayBookmark: PropTypes.bool,
    coverage: PropTypes.array,
    isCurrent: PropTypes.bool,
    text: PropTypes.object,
};

FullTextHolding.defaultProps = {
    displayBookmark: false,
    text: {
        date: '<day>/<month>/<year>',
        now: 'présent',
    },
};

export default translate(FullTextHolding);
