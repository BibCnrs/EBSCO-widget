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
}) => {
    return (
        <span
            className={classNames('fulltext-holding', { current: isCurrent })}
        >
            <BibButton bsStyle="link" href={url} target="_blank" label={name} />{' '}
            {coverage
                ? coverage
                      .map(
                          coverage =>
                              `${text.date(coverage.start)} - ${text.date(
                                  coverage.end,
                              )}`,
                      )
                      .join(', ')
                : ''}{' '}
            {embargo ? `(embargo: ${embargo.value} ${embargo.unit})` : null}
            <BookmarkButton title={`${title} - ${name}`} url={url} />
        </span>
    );
};

FullTextHolding.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    coverage: PropTypes.array,
    embargo: PropTypes.object,
    isCurrent: PropTypes.bool,
    title: PropTypes.string,
    text: PropTypes.object,
};

FullTextHolding.defaultProps = {
    text: {
        date: '<day>/<month>/<year>',
        now: 'présent',
    },
};

export default translate(FullTextHolding);
