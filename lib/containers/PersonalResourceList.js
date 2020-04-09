import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { SortableContainer } from 'react-sortable-hoc';

import PersonalResourceList from '../components/PersonalResourceList';
import actions from '../actions';
import * as fromState from '../selectors';

function mapStateToProps(state) {
    const favouriteResources = fromState.getFavouriteResources(state);

    return {
        personalResources: favouriteResources.filter(n => n.personal === true),
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
)(PersonalResourceList);
