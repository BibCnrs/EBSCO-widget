import React, { PropTypes } from 'react';

import Sidebar from './Sidebar';

const BibSidebar = ({ mainContent, sidebarContent, resultShown, limiterShown, showSidebar }) => {
    return resultShown ? (
        <Sidebar
            sidebarContent={sidebarContent}
            open={showSidebar}
            isOpen={limiterShown}
        >
            {mainContent}
        </Sidebar>
    ) : <div></div>;
};

BibSidebar.propTypes = {
    sidebarContent: PropTypes.element.isRequired,
    mainContent: PropTypes.element.isRequired,
    resultShown: PropTypes.bool.isRequired,
    limiterShown: PropTypes.bool.isRequired,
    showSidebar: PropTypes.func.isRequired
};

export default BibSidebar;
