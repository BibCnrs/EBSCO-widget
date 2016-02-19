import React, { Component } from 'react';

import EDS from './EDS';

class AdvancedEDS extends Component {
    componentWillMount() {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }
    componentWillUnmount() {
        document.getElementsByTagName('html')[0].style.overflow = '';
    }
    render() {
        return <EDS fullScreen/>;
    }
}

AdvancedEDS.propTypes = {};

export default AdvancedEDS;
