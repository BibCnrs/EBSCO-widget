import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../actions';
import translate from '../../higherOrderComponents/translate';

import { availableFields } from '../../config/metadore';

import * as fromState from '../../selectors';

const FieldSelector = ({ field, availableFields, text, onChangeField }) => {
    const changeField = value => {
        if (value === field) {
            onChangeField(null);
        } else {
            onChangeField(value);
        }
    };
    return (
        <div className="metadore-field-selector">
            {text.byField}
            {availableFields.map(value => (
                <React.Fragment key={value}>
                    <input
                        type="checkbox"
                        name="metadore-field"
                        id={value}
                        value={value}
                        checked={value === field}
                        onChange={event => changeField(event.target.value)}
                    />
                    <label htmlFor={value}>{text[value]}</label>
                </React.Fragment>
            ))}
        </div>
    );
};

FieldSelector.propTypes = {
    field: PropTypes.string,
    availableFields: PropTypes.array.isRequired,
    text: PropTypes.object,
    onChangeField: PropTypes.func.isRequired,
};

FieldSelector.defaultProps = {
    field: null,
    text: {
        'attributes.titles.title': 'Titre',
        'attributes.descriptions.description': 'Description',
        'attributes.subjects.subject': 'Sujet',
        'attributes.doi': 'DOI',
    },
};

function mapStateToProps(state) {
    const field = fromState.getQueryListField(state, 0);

    return {
        field,
        availableFields,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            onChangeField: (...args) =>
                actions.changeField('metadore', ...args),
        },
        dispatch,
    );
}

export default translate(
    connect(mapStateToProps, mapDispatchToProps)(FieldSelector),
    'MetadoreFieldSelector',
);
