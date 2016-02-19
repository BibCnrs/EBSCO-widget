import FullScreen from './FullScreen';
import EDS from '../components/EDS';

// function mapStateToProps(state) {
//     return {
//         open: state.userInterface.open,
//         domains: state.domains,
//         login: state.login,
//         url: state.url,
//         limiterShown: state.userInterface.limiterShown,
//         limiters: state.search.limiters
//     };
// }
//
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//         changeTerm: actions.changeTerm,
//         changeDomain: actions.changeDomain,
//         searchTerm: actions.searchTerm,
//         forceLogin: actions.forceLogin,
//         showLimiter: actions.showLimiter,
//         push: routeActions.push
//     }, dispatch);
// }

export default FullScreen(EDS);
