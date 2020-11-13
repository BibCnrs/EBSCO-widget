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
    coverage,
    embargo,
    isCurrent,
    text,
    displayBookmark,
}) => {
    return (
        <div className={classNames('fulltext-holding', { current: isCurrent })}>
            <BibButton
                bsStyle="link"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                label={name}
            />
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
            {embargo ? ` (embargo: ${embargo.value} ${embargo.unit})` : null}
            {displayBookmark === true ? (
                <BookmarkButton title={`${title} - ${name}`} url={url} />
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
    coverage: PropTypes.array,
    embargo: PropTypes.object,
    isCurrent: PropTypes.bool,
    text: PropTypes.object,
    displayBookmark: PropTypes.bool,
};

FullTextHolding.defaultProps = {
    text: {
        date: '<day>/<month>/<year>',
        now: 'présent',
    },
};

export default translate(FullTextHolding);
