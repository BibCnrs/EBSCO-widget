import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import Button from './Button';

const Sidebar = ({ isOpen, children, sidebarContent, open }) => {

    return (
        <div className={`search-result-with-sidebar ${isOpen ? 'with-sidebar' : 'no-sidebar'}`}>
            <Button
                className="sidebar-handler"
                bsStyle="default"
                onClick={() => open(!isOpen)}
                icon={{name: isOpen ? 'angle-double-left' : 'angle-double-right', size: '2x'}}
            />
            { isOpen ? <div className="sidebar">
                { sidebarContent }
            </div> : null}
            {children}
        </div>
    );
};

Sidebar.propTypes = {
};

export default Sidebar;
