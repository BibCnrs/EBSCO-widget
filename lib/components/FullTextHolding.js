import React, { PropTypes } from 'react';

const FullTextHolding = ({ data }) => {
    return (
        <li>
            <p><a href={data.url} target="_blank">{data.name}</a></p>
            <p>
                Couverture: {data.coverage.map((coverage) => {
                    return `${coverage.start} - ${coverage.end}`;
                })
                .join(', ')}
            </p>
            {data.embargo ? <p>
                Embargo: {`${data.embargo.value} ${data.embargo.unit}`}
            </p> : null}
        </li>
    );
};

FullTextHolding.propTypes = {
    data: PropTypes.object.isRequired
};

export default FullTextHolding;
