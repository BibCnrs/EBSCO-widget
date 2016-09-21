import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import CheckBoxLimiter from '../components/CheckboxLimiter';
import translate from '../higherOrderComponents/translate';
import * as fromState from '../selectors';

const createCheckBoxLimiterContainer = (category, limiterName) => {

    function mapStateToProps(state, { text = { fullText: 'Texte Intégral' } }) {
        return {
            limiter: limiterName,
            label: text[limiterName],
            value: fromState.getLimiterValueByName(state, limiterName)
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            onApply: (...args) => actions.search(category, ...args),
            onChange: (...args) => actions.changeLimiter(category, ...args)
        }, dispatch);
    }

    return translate(connect(mapStateToProps, mapDispatchToProps)(CheckBoxLimiter), `${limiterName}Limiter`);
};

export default createCheckBoxLimiterContainer;
