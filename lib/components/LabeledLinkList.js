import React, { PropTypes } from 'react';

const LabeledLinkList = ({ label, list }) => {
    if(!list || !list.length) {
        return <span/>;
    }

    return (
        <div className="labeled-link-list">
            <p>{label}:</p>
            <ul>
                {
                    list.map(({ name, url }, index) =>
                        <li key={index}><a href={url} target="blank">{name}</a></li>
                    )
                }
            </ul>
        </div>
    );
};

LabeledLinkList.propTypes = {
    label: PropTypes.string.isRequired,
    list: PropTypes.array
};

export default LabeledLinkList;
