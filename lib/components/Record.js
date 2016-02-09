import React, { PropTypes } from 'react';
import ArticleLink from '../containers/ArticleLink';

const Record = ({ record, showNotice, index }) => {
    return <li className="record">
        <div>
            <h3>
                <a
                    className="fetch-link title"
                    href="#"
                    onClick={() => showNotice(index, true)}
                >
                    {`${record.id}. ${record.title}`}
                </a>
            </h3>
            <p>{record.publicationType}</p>
                { record.authors ? <p>Par: {record.authors.join(', ')}</p> : null}
            <p>{record.source}</p>
            <ArticleLink index={index} />
        </div>
    </li>;
};

Record.propTypes = {
    record: PropTypes.object.isRequired
};

export default Record;
