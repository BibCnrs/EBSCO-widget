import React, { PropTypes } from 'react';
import { Row, Col }  from 'react-bootstrap';

import ArticleSearchInput from '../containers/ArticleSearchInput';
import BibButton from './BibButton';

const ArticleSearchInputList = ({ queries, addQuery, removeQuery }) => {

    return (
        <Row className="article-search-input-list" xs={12}>
            {queries.map((query, index) => {
                return (
                    <Row key={index}>
                        <Col xs={10}>
                            <ArticleSearchInput index={index}/>
                        </Col>
                        <Col xs={2} className="action">
                            <BibButton
                                icon={{ name: 'plus'}}
                                tooltip='ajouter un nouveau champ à la recherche'
                                bsStyle={'default'}
                                bsSize={'small'}
                                onClick={() => addQuery(index)}
                            />
                            <BibButton
                                icon={{ name: 'minus'}}
                                tooltip='retirer le champ de la recherche'
                                bsStyle={'default'}
                                bsSize={'small'}
                                onClick={() => removeQuery(index)}
                            />
                        </Col>
                    </Row>
                );
            })}
        </Row>
    );
};

ArticleSearchInputList.propTypes = {
    queries: PropTypes.array.isRequired
};

export default ArticleSearchInputList;
