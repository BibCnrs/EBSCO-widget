import React, { PropTypes } from 'react';
import ArticleLink from '../containers/ArticleLink';

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
            <ArticleLink link={record.articleLink} an={record.an} dbId={record.dbId} index={index} />
        </div>
    </li>;
};

Record.propTypes = {
    record: PropTypes.object.isRequired
};

export default Record;
