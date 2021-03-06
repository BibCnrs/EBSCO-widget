import PropTypes from 'prop-types';
import React from 'react';
import BibButton from './BibButton';

const Sidebar = ({ isOpen, children, sidebarContent, open }) => {
    return (
        <div
            className={`search-result-with-sidebar ${
                isOpen ? 'with-sidebar' : 'no-sidebar'
            }`}
        >
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                {sidebarContent}
            </div>
            <BibButton
                className="sidebar-handler"
                bsStyle="link"
                onClick={() => open(!isOpen)}
                icon={{
                    name: isOpen ? 'angle-double-left' : 'angle-double-right',
                }}
                tooltip={isOpen ? 'Fermer' : 'Ouvrir'}
            />
            {children}
        </div>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.any.isRequired,
    sidebarContent: PropTypes.any.isRequired,
    open: PropTypes.func.isRequired,
};

export default Sidebar;
