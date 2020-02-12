import OALink from '../../../lib/components/OALink';

describe('OALink', function() {
    const getComponent = props => enzyme.shallow(<OALink {...props} />);

    it('should proxify doaj links', function() {
        const props = {
            apiUrl: 'http://api.local',
            url: 'https://doaj.org/article/579ba7d670e24071a9ac4c06de8b1b7f',
            doi: 'TEST-01',
            domain: 'TEST',
            children: 'Hello',
        };

        const component = getComponent(props);
        const a = component.find('a');

        assert.deepEqual(
            a.props().href,
            'http://api.local/oa?url=https://doaj.org/article/579ba7d670e24071a9ac4c06de8b1b7f&sid=doaj&domaine=TEST&doi=TEST-01',
        );
        assert.deepEqual(a.props().children, props.children);
    });

    it('should proxify arxiv links', function() {
        const props = {
            apiUrl: 'http://api.local',
            url: 'http://arxiv.org/abs/1301.1629f',
            doi: 'TEST-01',
            domain: 'TEST',
            children: 'Hello',
        };

        const component = getComponent(props);
        const a = component.find('a');

        assert.deepEqual(
            a.props().href,
            'http://api.local/oa?url=http://arxiv.org/abs/1301.1629f&sid=arxiv&domaine=TEST&doi=TEST-01',
        );
        assert.deepEqual(a.props().children, props.children);
    });

    it('should proxify hal links #1', function() {
        const props = {
            apiUrl: 'http://api.local',
            url: 'https://www.hal.inserm.fr/inserm-01802849',
            doi: 'TEST-01',
            domain: 'TEST',
            children: 'Hello',
        };

        const component = getComponent(props);
        const a = component.find('a');

        assert.deepEqual(
            a.props().href,
            'http://api.local/oa?url=https://www.hal.inserm.fr/inserm-01802849&sid=hal&domaine=TEST&doi=TEST-01',
        );
        assert.deepEqual(a.props().children, props.children);
    });

    it('should proxify hal links #2', function() {
        const props = {
            apiUrl: 'http://api.local',
            url: 'https://hal.inserm.fr/inserm-01802849',
            doi: 'TEST-01',
            domain: 'TEST',
            children: 'Hello',
        };

        const component = getComponent(props);
        const a = component.find('a');

        assert.deepEqual(
            a.props().href,
            'http://api.local/oa?url=https://hal.inserm.fr/inserm-01802849&sid=hal&domaine=TEST&doi=TEST-01',
        );
        assert.deepEqual(a.props().children, props.children);
    });
});
