import React, { PropTypes } from 'react';

import ArticlePrimarySearchInput from '../containers/ArticlePrimarySearchInput';
import ArticleSecondarySearchInput from '../containers/ArticleSecondarySearchInput';
import BibButton from './BibButton';

const ArticleSearchInputList = ({ queries, addQuery, removeQuery }) => {

    return (
        <ul>
            <li>
                <ArticlePrimarySearchInput/>
                <BibButton
                    icon={{ name: 'plus'}}
                    tooltip='ajouter un nouveau champ à la recherche'
                    onClick={() => addQuery(0)}
                />
            </li>
            {queries.slice(1).map((query, index) => {
                return (
                    <li key={index}>
                        <ArticleSecondarySearchInput index={index + 1}/>
                        <BibButton
                            icon={{ name: 'plus'}}
                            tooltip='ajouter un nouveau champ à la recherche'
                            onClick={() => addQuery(index + 1)}
                        />
                        <BibButton
                            icon={{ name: 'minus'}}
                            tooltip='retirer le champ de la recherche'
                            onClick={() => removeQuery(index + 1)}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

ArticleSearchInputList.propTypes = {
    queries: PropTypes.array.isRequired
};

export default ArticleSearchInputList;
