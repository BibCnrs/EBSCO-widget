import React, { PropTypes} from 'react';

import ArticleSearch from '../containers/ArticleSearch';
import ArticleSearchMenu from '../containers/ArticleSearchMenu';
import History from '../containers/History';
import createSearchResultContainer from '../containers/createSearchResultContainer';
import BibSidebar from '../containers/BibSidebar';
import ArticleLimiters from './ArticleLimiters';
import createFacetListContainer from '../containers/createFacetListContainer';
import translate from '../higherOrderComponents/translate';

const ArticleSearchResult = createSearchResultContainer('article');
const ArticleFacetList = createFacetListContainer('article');

const EDS = ({ text }) => {
    return (
        <div className="eds">
            <div className="search-bar">
                <ArticleSearch/>
            </div>
            <History/>
            <BibSidebar mainContent={<ArticleSearchResult/>} sidebarContent={
                <div>
                    <h3>{text.refine}</h3>
                    <ArticleLimiters />
                    <hr/>
                    <ArticleFacetList />
                </div>
            } />
        </div>
    );
};

EDS.propTypes = {
    text: PropTypes.object
};

EDS.defaultProps = {
    text: {
        refine: 'Affiner votre recherche'
    }
};

export default translate(EDS);
