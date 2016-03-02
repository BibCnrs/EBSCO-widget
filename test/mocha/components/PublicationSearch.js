import PublicationSearch from '../../../lib/components/PublicationSearch';
import FetchButton from '../../../lib/components/FetchButton';

describe('PublicationSearch', function () {
    let component;

    describe('status: NONE', function () {
        let props;
        before(function () {
            props = {
                onClick: function onClick() {},
                onChangeTerm: function onChangeTerm() {},
                onSearchTerm: function onSearchTerm() {},
                onChangeDomain: function onChangeDomain() {},
                term: 'word',
                status: 'NONE',
                domains: ['vie', 'shs'],
                domain: 'vie',
                sort: 'relevance',
                availableSort: ['relevance', 'date']
            };

            component = enzyme.shallow(<PublicationSearch {...props} />);
        });

        it('should set fetchButton to ', function () {
            const fetchButton = component.find('FetchButton');
            const { icon, status, error } = fetchButton.props();
            assert.equal(icon, 'search');
            assert.equal(status, 'NONE');
            assert.equal(error, undefined);
        });
    });

    describe('status: PENDING', function () {
        before(function () {
            const props = {
                onSearchTerm: function onSearchTerm() {},
                onChangeTerm: function onChangeTerm() {},
                onChangeDomain: function onChangeDomain() {},
                term: 'search',
                status: 'PENDING',
                domains: ['vie', 'shs'],
                domain: 'vie',
                sort: 'relevance',
                availableSort: ['relevance', 'date']
            };

            component = enzyme.shallow(<PublicationSearch {...props} />);
        });

        it('fetchButton should be PENDING if props.search.status is PENDING', function () {
            const fetchButton = component.find('FetchButton');
            assert.equal(fetchButton.type(), FetchButton);
            const { status, error } = fetchButton.props();
            assert.equal(status, 'PENDING');
            assert.equal(error, undefined);
        });
    });

    describe('status: ERROR', function () {
        before(function () {
            const props = {
                onSearchTerm: function onSearchTerm() {},
                onChangeTerm: function onChangeTerm() {},
                onChangeDomain: function onChangeDomain() {},
                term: 'search',
                status: 'ERROR',
                error: 'boom',
                domains: ['vie', 'shs'],
                domain: 'vie',
                sort: 'relevance',
                availableSort: ['relevance', 'date']
            };

            component = enzyme.shallow(<PublicationSearch {...props} />);
        });

        it('fetchButton should be ERROR if props.search.status is ERROR', function () {
            const fetchButton = component.find('FetchButton');
            assert.equal(fetchButton.type(), FetchButton);
            const { status, error } = fetchButton.props();
            assert.equal(status, 'ERROR');
            assert.equal(error, 'boom');
        });
    });

    describe('event', function () {
        let term, domain;

        beforeEach(function () {
            term = null;
            domain = null;
            const onSearchTerm = (t, d) => {term = t, domain = d;};
            const onChangeTerm = (t) => (term = t);
            const onChangeDomain = (d) => (domain = d);
            const props = {
                url: '/api',
                token: 'token',
                limiters: {},
                onSearchTerm,
                onChangeTerm,
                onChangeDomain,
                domains: [ 'vie', 'shs'],
                domain: 'vie',
                term: 'searched term',
                status: 'NONE',
                sort: 'relevance',
                availableSort: ['relevance', 'date']
            };
            component = enzyme.mount(<PublicationSearch {...props}/>);
        });

        describe('onSearchTerm', function () {

            it('should call onSearchTerm with term and domain value', function () {
                component.find('.fetch-button').find('button').simulate('click');
                assert.equal(term, 'searched term');
                assert.equal(domain, 'vie');
            });

            it('should not call onSearchTerm with term and domain value if seachedTerm did not change', function () {

                const onSearchTerm = (t, d) => {term = t, domain = d;};
                const onChangeTerm = (t) => (term = t);
                const onChangeDomain = (d) => (domain = d);
                const props = {
                    url: '/api',
                    token: 'token',
                    limiters: {},
                    onSearchTerm,
                    onChangeTerm,
                    onChangeDomain,
                    domains: [ 'vie', 'shs'],
                    domain: 'vie',
                    term: 'searched term',
                    seachedTerm: 'searched term',
                    status: 'NONE',
                    sort: 'relevance',
                    availableSort: ['relevance', 'date']
                };
                component = enzyme.mount(<PublicationSearch {...props}/>);
                component.find('.fetch-button').find('button').simulate('click');
                assert.equal(term, 'searched term');
                assert.equal(domain, 'vie');
            });
        });
    });

});
