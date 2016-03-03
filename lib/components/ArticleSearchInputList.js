import React, { PropTypes } from 'react';
import { Row, Col }  from 'react-bootstrap';

import ArticlePrimarySearchInput from '../containers/ArticlePrimarySearchInput';
import ArticleSecondarySearchInput from '../containers/ArticleSecondarySearchInput';
import BibButton from './BibButton';

const ArticleSearchInputList = ({ queries, addQuery, removeQuery }) => {

    return (
        <Row className="article-search-input-list" xs={12}>
            <Row>
                <Col xs={10}>
                    <ArticlePrimarySearchInput/>
                </Col>
                <Col xs={2} className="action">
                    <BibButton
                        icon={{ name: 'plus'}}
                        tooltip='ajouter un nouveau champ à la recherche'
                        bsStyle={'default'}
                        bsSize={'small'}
                        onClick={() => addQuery(0)}
                    />
                </Col>
            </Row>
            {queries.slice(1).map((query, index) => {
                return (
                    <Row key={index}>
                        <Col xs={10}>
                            <ArticleSecondarySearchInput index={index + 1}/>
                        </Col>
                        <Col xs={2} className="action">
                            <BibButton
                                icon={{ name: 'plus'}}
                                tooltip='ajouter un nouveau champ à la recherche'
                                bsStyle={'default'}
                                bsSize={'small'}
                                onClick={() => addQuery(index + 1)}
                            />
                            <BibButton
                                icon={{ name: 'minus'}}
                                tooltip='retirer le champ de la recherche'
                                bsStyle={'default'}
                                bsSize={'small'}
                                onClick={() => removeQuery(index + 1)}
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
