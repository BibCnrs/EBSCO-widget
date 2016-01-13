import React, { PropTypes } from 'react';
import ViewNotice from '../containers/ViewNotice';

const Record = ({ record, index }) => {
    return <li className="record">
        <div>
            <ViewNotice index={index} title={`${record.id}. ${record.title}`} />
            <p>{record.publicationType}</p>
                { record.authors ? <p>Par: {record.authors.join(', ')}</p> : null}
            <p>{record.source}</p>
            <a className="button" target="blank" href={record.articleLink}>Accéder à l&apos;article</a>
        </div>
    </li>;
};

Record.propTypes = {
    record: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default Record;
