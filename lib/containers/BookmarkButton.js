import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import actions from '../actions';
import translate from '../higherOrderComponents/translate';
import BookmarkButton from '../components/BookmarkButton';

function mapDispatchToProps(dispatch, { title, url }) {
    return bindActionCreators(
        {
            addFavouriteResource: event => {
                event.preventDefault();
                return actions.addFavouriteResource({
                    title,
                    url,
                });
            },
        },
        dispatch,
    );
}

export default compose(connect(null, mapDispatchToProps), translate)(
    BookmarkButton,
);
