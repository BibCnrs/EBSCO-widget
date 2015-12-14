import React, { PropTypes } from 'react';
import Button from './Button';
import Logout from '../containers/Logout';

const Home = ({ onOpenSearch }) => {
    return (
        <div className="home">
            <Button
                label='Resume Search'
                icon={{name: 'search'}}
                onClick={() => onOpenSearch(true)}
            />
            <Logout />
        </div>
    );
};

Home.propTypes = {
    onOpenSearch: PropTypes.func.isRequired
};

export default Home;
