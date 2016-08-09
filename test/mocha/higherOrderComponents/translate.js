import { Provider } from 'react-redux';
import { createStore } from 'redux'

import { translator } from '../../../lib/higherOrderComponents/translate';

describe('translate', function () {
    const translate = translator({
        en: {
            Test: {
                hello: 'Hello'
            }
        },
        fr: {
            Test: {
                hello: 'Salut'
            }
        }
    });

    const Test = translate(({ name, text }) => {
        return <p>{`${text.hello} ${name}`}</p>;
    }, 'Test');

    const getComponent = (language, name) => {
        const store = createStore(() => ({
            userInterface: { language: language }
        }));
        return enzyme.mount(<Provider store={store}><Test name={name} /></Provider>);
    };

    it('should use english translation when state.userInterface.language is en', function () {
        const test = getComponent('en', 'john');
        assert.equal(test.text(), 'Hello john');
    });

    it('should use french translation when state.userInterface.language is fr', function () {
        const test = getComponent('fr', 'john');
        assert.equal(test.text(), 'Salut john');
    });
});
