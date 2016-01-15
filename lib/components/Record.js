import React, { PropTypes } from 'react';

const Record = ({ record, showNotice, index }) => {
    return <li className="record">
        <div>
            <a
                className="fetch-link title"
                href="#"
                onClick={() => showNotice(index, true)}
            >
                <h3>{`${record.id}. ${record.title}`}</h3>
            </a>
            <p>{record.publicationType}</p>
                { record.authors ? <p>Par: {record.authors.join(', ')}</p> : null}
            <p>{record.source}</p>
            <a className="button" target="blank" href={record.articleLink}>Accéder à l&apos;article</a>
        </div>
    </li>;
};

Record.propTypes = {
    record: PropTypes.object.isRequired
};

export default Record;
