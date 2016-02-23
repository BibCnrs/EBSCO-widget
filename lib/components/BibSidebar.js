import React, { PropTypes } from 'react';

import Sidebar from './Sidebar';

const BibSidebar = ({ mainContent, sidebarContent, resultShown, limiterShown, showLimiter }) => {
    console.log(resultShown);
    return resultShown ? (
        <Sidebar
            sidebarContent={sidebarContent}
            open={showLimiter}
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
    showLimiter: PropTypes.func.isRequired
};

export default BibSidebar;
