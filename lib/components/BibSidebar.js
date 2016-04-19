import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Sidebar from './Sidebar';

const BibSidebar = ({ mainContent, sidebarContent, resultShown, limiterShown, showSidebar }) => {
    return (
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            {
                resultShown ? (
                    <Sidebar
                        key="resultShown"
                        sidebarContent={sidebarContent}
                        open={showSidebar}
                        isOpen={limiterShown}
                    >
                        {mainContent}
                    </Sidebar>
                ) : (
                    <div key="resultHidden"/>
                )
            }
        </ReactCSSTransitionGroup>
    );
};

BibSidebar.propTypes = {
    sidebarContent: PropTypes.element.isRequired,
    mainContent: PropTypes.element.isRequired,
    resultShown: PropTypes.bool.isRequired,
    limiterShown: PropTypes.bool.isRequired,
    showSidebar: PropTypes.func.isRequired
};

export default BibSidebar;
