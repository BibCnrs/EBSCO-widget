import React, { PropTypes } from 'react';
import ViewAbstract from '../containers/ViewAbstract';
import ViewNotice from '../containers/ViewNotice';

const Result = ({ result, index }) => (
    <li className="result">
        <div>
            <h3 className="title">{result.title}</h3>
            <p>{result.publicationType}</p>
                { result.authors ? <p>Par: {result.authors.join(', ')}</p> : null}
            <p>{result.source}</p>
            <ViewNotice index={index} />
            <a className="button" target="blank" href={result.articleLink}>Accéder à l&apos;article</a>
            <ViewAbstract index={index}/>
        </div>
    </li>
);

Result.propTypes = {
    result: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default Result;
