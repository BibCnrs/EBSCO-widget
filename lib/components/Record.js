import React, { PropTypes } from 'react';
import ViewAbstract from '../containers/ViewAbstract';
import ViewNotice from '../containers/ViewNotice';

const Record = ({ record, index }) => {
    return <li className="record">
        <div>
            <h3 className="title">{record.id}. {record.title}</h3>
            <p>{record.publicationType}</p>
                { record.authors ? <p>Par: {record.authors.join(', ')}</p> : null}
            <p>{record.source}</p>
            <ViewNotice index={index} />
            <a className="button" target="blank" href={record.articleLink}>Accéder à l&apos;article</a>
            <ViewAbstract index={index}/>
        </div>
    </li>;
};

Record.propTypes = {
    record: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default Record;
