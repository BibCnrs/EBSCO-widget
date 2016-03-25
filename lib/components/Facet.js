import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';

import Select from './Select';

const parseId = (id) => {
    switch(id) {
    case 'SubjectPubDb':
        return 'Subject';
    case 'TypePublicationPubD':
        return 'Publication Type';
    case 'PublisherPubDb':
        return 'Publisher';
    default:
        return id;
    }
};

const Facet = ({ facet, id, changeFacet, applyFacet }) => {
    return (
        <div>
            <h3>{facet.label.replace('PubDb', '') || parseId(id)}</h3>
            {facet.choices.slice(0, 3).map(value => {
                return (
                    <Input
                        type="checkbox"
                        label={value.label}
                        value={facet.newValues.indexOf(value.value) !== -1}
                    />
                );
            })}
        </div>
    );
};

Facet.propTypes = {
    facet: PropTypes.object,
    id: PropTypes.string,
    changeFacet: PropTypes.func.isRequired,
    applyFacet: PropTypes.func.isRequired
};

export default Facet;
