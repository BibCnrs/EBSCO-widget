import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import actions from '../actions';
import translate from '../higherOrderComponents/translate';
import BookmarkButton from '../components/BookmarkButton';
import * as fromState from '../selectors';

const mapStateToProps = (state, { title, url }) => ({
    show: fromState.hasProfile(state) && fromState.isDomainAvailable(state),
    isAdded: fromState.isResourceAdded(state, { title, url }),
});

const mapDispatchToProps = (dispatch, { title, url }) =>
    bindActionCreators(
        {
            addFavouriteResource: event => {
                event.preventDefault();
                return actions.addFavouriteResource({
                    title,
                    url,
                });
            },
            removeFavouriteResource: event => {
                event.preventDefault();
                return actions.removeFavouriteResource(url);
            },
        },
        dispatch,
    );

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    translate,
)(BookmarkButton);
