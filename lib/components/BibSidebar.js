import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import Sidebar from './Sidebar';

const BibSidebar = ({
    mainContent,
    sidebarContent,
    resultShown,
    limiterShown,
    showSidebar,
}) => {
    if (!sidebarContent) {
        return (
            <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                {resultShown ? (
                    <div key="resultShown">{mainContent}</div>
                ) : (
                    <div key="resultHidden" />
                )}
            </CSSTransitionGroup>
        );
    }
    return (
        <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
        >
            {resultShown ? (
                <Sidebar
                    key="resultShown"
                    sidebarContent={sidebarContent}
                    open={showSidebar}
                    isOpen={limiterShown}
                >
                    {mainContent}
                </Sidebar>
            ) : (
                <div key="resultHidden" />
            )}
        </CSSTransitionGroup>
    );
};

BibSidebar.propTypes = {
    sidebarContent: PropTypes.element,
    mainContent: PropTypes.element.isRequired,
    resultShown: PropTypes.bool.isRequired,
    limiterShown: PropTypes.bool.isRequired,
    showSidebar: PropTypes.func.isRequired,
};

export default BibSidebar;
