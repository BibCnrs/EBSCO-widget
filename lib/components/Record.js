import React, { PropTypes } from 'react';
import ArticleLink from '../containers/ArticleLink';
import Etc from './Etc';

const Record = ({ record, showNotice, index }) => {
    return <li className="record">
        <div>
            <h4>
                <a
                    className="fetch-link title"
                    onClick={() => showNotice(index, true)}
                >
                    {`${record.id}. ${record.title}`}
                </a>
            </h4>
            <p>{record.publicationType}</p>
            { record.authors ? <p>Par: <Etc list={record.authors} limit={5}/></p> : null }
            <p>{record.source}</p>
            <ArticleLink index={index} />
        </div>
    </li>;
};

Record.propTypes = {
    record: PropTypes.object.isRequired
};

export default Record;
