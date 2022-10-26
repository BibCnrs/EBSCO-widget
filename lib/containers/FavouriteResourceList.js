import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { SortableContainer } from 'react-sortable-hoc';

import FavouriteResourceList from '../components/FavouriteResourceList';
import actions from '../actions';
import * as fromState from '../selectors';

function mapStateToProps(state) {
    const favouriteResources = fromState
        .getFavouriteResources(state)
        .map((favouriteResource, index) => ({
            ...favouriteResource,
            index,
        }));

    return {
        favouriteResources: favouriteResources.filter(n => n.personal !== true),
        useDragHandle: true,
    };
}

const mapDispatchToProps = {
    remove: actions.removeFavouriteResource,
    onSortEnd: actions.moveFavouriteResource,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SortableContainer,
)(FavouriteResourceList);
