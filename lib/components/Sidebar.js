import React, { PropTypes } from 'react';
import BibButton from './BibButton';

const Sidebar = ({ isOpen, children, sidebarContent, open }) => {

    return (
        <div className={`search-result-with-sidebar ${isOpen ? 'with-sidebar' : 'no-sidebar'}`}>
            { isOpen ? <div className="sidebar">
                { sidebarContent }
            </div> : null}
            <BibButton
                className="sidebar-handler"
                bsStyle="link"
                onClick={() => open(!isOpen)}
                icon={{name: isOpen ? 'angle-double-left' : 'angle-double-right'}}
                tooltip={isOpen ? 'Fermer' : 'Ouvrir'}
            />
            {children}
        </div>
    );
};

Sidebar.propTypes = {
};

export default Sidebar;
