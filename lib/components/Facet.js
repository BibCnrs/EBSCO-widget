import React, { PropTypes } from 'react';
import Select from 'react-select';
import Button from './Button';

const Facet = ({ facet, id, changeFacet, applyFacet }) => {
    return <div className="facet">
        <label>
            <h5>{facet.label}</h5>
            <div>
                <Select
                    multi={true}
                    value={facet.newValues}
                    searchable={true}
                    clearable={true}
                    options={facet.choices}
                    onBlur={() => applyFacet(id)}
                    onChange={(data) => {
                        return changeFacet(id, data || []);
                    }}
                />
                <Button label="OK"/>
            </div>
        </label>
    </div>;
};

Facet.propTypes = {
    facet: PropTypes.object.isRequired,
    changeFacet: PropTypes.func.isRequired
};

export default Facet;
