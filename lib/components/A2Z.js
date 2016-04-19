import React, { PropTypes } from 'react';

import BibButton from './BibButton';
import BibNavbar from '../containers/BibNavbar';

const aToZ = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0-9'];

const A2Z = ({}) => {

    return (
        <div>
            <BibNavbar/>
            {
                aToZ.map((label, index) => (
                    <BibButton bsSize="small" bsStyle="default" key={index} label={label}/>
                ))
            }
        </div>
    );
};

A2Z.propTypes = {
};

A2Z.defaultProps = {
};

export default A2Z;
