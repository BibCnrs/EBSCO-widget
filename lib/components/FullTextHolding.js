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
    isCurrent,
    text,
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
            <BookmarkButton title={`${title} - ${name}`} url={url} />
        </div>
    );
};

FullTextHolding.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    coverage: PropTypes.array,
    isCurrent: PropTypes.bool,
    text: PropTypes.object,
};

FullTextHolding.defaultProps = {
    text: {
        date: '<day>/<month>/<year>',
        now: 'présent',
    },
};

export default translate(FullTextHolding);
