import React from 'react';
import { Row, Col } from 'react-bootstrap';

import PublicationSearch from '../containers/PublicationSearch';
import BibSidebar from '../containers/BibSidebar';
import PublicationSearchMenu from '../containers/PublicationSearchMenu';
import PublicationLimiters from './PublicationLimiters';
import createFacetListContainer from '../containers/createFacetListContainer';
import createSearchResultContainer from '../containers/createSearchResultContainer';

const PublicationFacetList = createFacetListContainer('publication');
const PublicationSearchResult = createSearchResultContainer('publication');

const Publication = () => {
    return (
        <div className="publication">
            <Row>
                <Col md={11}>
                    <PublicationSearch/>
                </Col>
                <Col md={1}>
                    <PublicationSearchMenu/>
                </Col>
            </Row>
            <BibSidebar
                mainContent={<PublicationSearchResult/>}
                sidebarContent={<div>
                    <PublicationLimiters/>
                    <hr/>
                    <PublicationFacetList/>
                </div>}
            />
        </div>
    );
};

Publication.propTypes = {};

export default Publication;
