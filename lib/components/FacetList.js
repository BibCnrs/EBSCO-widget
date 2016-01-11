import React, { PropTypes } from 'react';
import Facet from '../containers/Facet';

const FacetList = ({ facets }) => {
    return (
        <div>
            <div className="facet_list">
                <h4>Facettes</h4>
                {Object.keys(facets).map((key) => {
                    return(
                        <Facet key={key} id={key} facet={facets[key]} />
                    );
                })}
            </div>
        </div>
    );
};

FacetList.propTypes = {
    facets: PropTypes.object.isRequired
};

export default FacetList;
