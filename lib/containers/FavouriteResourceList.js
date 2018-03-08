import { connect } from 'react-redux';
import compose from 'recompose/compose';

import FavouriteResourceList from '../components/FavouriteResourceList';
import translate from '../higherOrderComponents/translate';

import * as fromState from '../selectors';

function mapStateToProps(state) {
    const favouriteResources = fromState.getFavouriteResources(state);
    return {
        favouriteResources,
    };
}

const mapDispatchToProps = {};

export default compose(connect(mapStateToProps, mapDispatchToProps), translate)(
    FavouriteResourceList,
);
