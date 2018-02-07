import PropTypes from 'prop-types';
import React from 'react';

import ArticleSearchInput from '../containers/ArticleSearchInput';
import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';
import { CSSTransitionGroup } from 'react-transition-group';

const ArticleSearchInputList = ({ queries, text, addQuery, removeQuery }) => {

    return (
        <div className="query-list">
            <CSSTransitionGroup transitionName="pop" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                {queries.map((query, index) => {
                    return (
                        <div className="query" key={query.key}>
                            <ArticleSearchInput index={index}/>
                            <div className="action">
                                <BibButton
                                    className="add"
                                    icon={{ name: 'plus'}}
                                    tooltip={text.add}
                                    bsStyle={'default'}
                                    bsSize={'small'}
                                    onClick={() => addQuery(index)}
                                />
                                {
                                    queries.length > 1 ? (
                                        <BibButton
                                            className="remove"
                                            icon={{ name: 'minus'}}
                                            tooltip={text.remove}
                                            bsStyle={'default'}
                                            bsSize={'small'}
                                            onClick={() => removeQuery(index)}
                                        />
                                    ) : null
                                }
                            </div>
                        </div>
                    );
                })}
            </CSSTransitionGroup>
        </div>
    );
};

ArticleSearchInputList.propTypes = {
    queries: PropTypes.array.isRequired,
    text: PropTypes.object,
    addQuery: PropTypes.func.isRequired,
    removeQuery: PropTypes.func.isRequired
};

ArticleSearchInputList.defaultProps = {
    text: {
        add: 'ajouter un nouveau champ à la recherche',
        remove: 'retirer le champ de la recherche'
    }
};

export default translate(ArticleSearchInputList);
