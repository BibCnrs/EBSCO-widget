import PropTypes from 'prop-types';
import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Sidebar from './Sidebar';

const BibSidebar = ({ mainContent, sidebarContent, resultShown, limiterShown, showSidebar }) => {
    if (!sidebarContent) {
        return (
            <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                {
                    resultShown ? (
                        <div key="resultShown">{mainContent}</div>
                    ) : (
                        <div key="resultHidden"/>
                    )
                }
            </ReactCSSTransitionGroup>
        );
    }
    return (
        <div>
        {/* <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}> */}
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
        {/* </ReactCSSTransitionGroup> */}
        </div>
    );
};

BibSidebar.propTypes = {
    sidebarContent: PropTypes.element,
    mainContent: PropTypes.element.isRequired,
    resultShown: PropTypes.bool.isRequired,
    limiterShown: PropTypes.bool.isRequired,
    showSidebar: PropTypes.func.isRequired
};

export default BibSidebar;
