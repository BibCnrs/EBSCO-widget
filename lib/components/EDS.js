import PropTypes from 'prop-types';
import React from 'react';

import History from '../containers/History';
import createSearchResultContainer from '../containers/createSearchResultContainer';
import BibSidebar from '../containers/BibSidebar';
import ArticleLimiters from './ArticleLimiters';
import createFacetListContainer from '../containers/createFacetListContainer';
import translate from '../higherOrderComponents/translate';
import Search from './Search';
import SearchInput from '../containers/ArticleSearchInput';
import SearchMenu from '../containers/ArticleSearchMenu';

const ArticleSearchResult = createSearchResultContainer('article');
const ArticleFacetList = createFacetListContainer('article');

const EDS = ({ text, isInistAccount }) => {
    return (
        <div className="eds">
            <div className="search-bar">
                <Search SearchInput={SearchInput} SearchMenu={SearchMenu} />
            </div>
            <History />
            <BibSidebar
                mainContent={<ArticleSearchResult />}
                sidebarContent={
                    <div>
                        <h3>{text.refine}</h3>
                        <ArticleLimiters />
                        <hr />
                        <ArticleFacetList />
                    </div>
                }
            />
            {isInistAccount && (
                <div className="inist-message">
                    <p>{text.inistExplanation}</p>
                </div>
            )}
        </div>
    );
};

EDS.propTypes = {
    text: PropTypes.object,
    isInistAccount: PropTypes.bool.isRequired,
};

EDS.defaultProps = {
    text: {
        refine: 'Affiner votre recherche',
    },
    isInistAccount: false,
};

export default translate(EDS);
