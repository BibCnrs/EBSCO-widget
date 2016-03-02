import React, { PropTypes } from 'react';

import ArticlePrimarySearchInput from '../containers/ArticlePrimarySearchInput';
import ArticleSecondarySearchInput from '../containers/ArticleSecondarySearchInput';
import BibButton from './BibButton';

const ArticleSearchInputList = ({ queries, addField, removeField }) => {

    return (
        <ul>
            <li>
                <ArticlePrimarySearchInput/>
                <BibButton
                    icon={{ name: 'plus'}}
                    tooltip='ajouter un nouveau champ à la recherche'
                    onClick={() => addField(0)}
                />
            </li>
            {queries.slice(1, 0).map((query, index) => {
                return (
                    <li>
                        <ArticleSecondarySearchInput index={index}/>
                        <BibButton
                            icon={{ name: 'plus'}}
                            tooltip='ajouter un nouveau champ à la recherche'
                            onClick={() => addField(index)}
                        />
                        <BibButton
                            icon={{ name: 'minus'}}
                            tooltip='retirer le champ de la recherche'
                            onClick={() => removeField(index)}
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
