import { connect } from 'react-redux';
import compose from 'recompose/compose';

import FavouriteResourceList from '../components/FavouriteResourceList';
import translate from '../higherOrderComponents/translate';
import actions from '../actions';
import * as fromState from '../selectors';

function mapStateToProps(state) {
    const favouriteResources = fromState.getFavouriteResources(state);
    return {
        favouriteResources,
    };
}

const mapDispatchToProps = {
    remove: actions.removeFavouriteResource,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), translate)(
    FavouriteResourceList,
);
