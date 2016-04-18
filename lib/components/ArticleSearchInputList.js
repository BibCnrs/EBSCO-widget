import React, { PropTypes } from 'react';
import { Row, Col }  from 'react-bootstrap';

import ArticleSearchInput from '../containers/ArticleSearchInput';
import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const ArticleSearchInputList = ({ queries, text, addQuery, removeQuery }) => {

    return (
        <Row className="article-search-input-list" xs={12}>

            <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                {queries.map((query, index) => {
                    return (
                        <Row key={index}>
                            <Col xs={10}>
                                <ArticleSearchInput index={index}/>
                            </Col>
                            <Col xs={2} className="action">
                                <BibButton
                                    className="add"
                                    icon={{ name: 'plus'}}
                                    tooltip={text.add}
                                    bsStyle={'default'}
                                    bsSize={'small'}
                                    onClick={() => addQuery(index)}
                                />
                                <BibButton
                                    className="remove"
                                    icon={{ name: 'minus'}}
                                    tooltip={text.remove}
                                    bsStyle={'default'}
                                    bsSize={'small'}
                                    onClick={() => removeQuery(index)}
                                />
                            </Col>
                        </Row>
                    );
                })}
            </ReactCSSTransitionGroup>
        </Row>
    );
};

ArticleSearchInputList.propTypes = {
    queries: PropTypes.array.isRequired
};

ArticleSearchInputList.defaultProps = {
    text: {
        add: 'ajouter un nouveau champ à la recherche',
        remove: 'retirer le champ de la recherche'
    }
};

export default translate(ArticleSearchInputList);
