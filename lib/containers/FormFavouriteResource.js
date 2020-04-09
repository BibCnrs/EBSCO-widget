import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import actions from '../actions';
import translate from '../higherOrderComponents/translate';
import FormFavouriteResource from '../components/FormFavouriteResource';
import * as fromState from '../selectors';

const mapStateToProps = (state, { title, url }) => ({
    isAdded: fromState.isResourceAdded(state, { title, url }),
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            addFavouriteResource: (event, resource) => {
                resource.personal = true;
                event.preventDefault();
                return actions.addFavouriteResource(resource);
            },
            removeFavouriteResource: (event, { url }) => {
                event.preventDefault();
                return actions.removeFavouriteResource(url);
            },
        },
        dispatch,
    );
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    translate,
)(FormFavouriteResource);
