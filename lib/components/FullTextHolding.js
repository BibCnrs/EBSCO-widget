import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import translate from '../higherOrderComponents/translate';

export const FullTextHolding = ({
    url,
    name,
    coverage,
    embargo,
    isCurrent,
    text,
}) => {
    return (
        <span
            className={classNames('fulltext-holding', { current: isCurrent })}
        >
            <a href={url} target="_blank">
                {name}
            </a>{' '}
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
        </span>
    );
};

FullTextHolding.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    coverage: PropTypes.array,
    embargo: PropTypes.object,
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
