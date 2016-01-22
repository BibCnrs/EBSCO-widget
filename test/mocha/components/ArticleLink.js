import ArticleLink from '../../../lib/components/ArticleLink';

describe('ArticleLink', function () {

    it('should display a "Accéder à l\'article" button if there is one link', function () {
        const props = {
            link: [
                'http://linkToArticle.com'
            ],
            url: 'http://host',
            domain: 'vie',
            dbId: 'id',
            an: '1234',
            token: 'token',
            index: 1,
            retrieveLink: () => null
        };
        const component = enzyme.shallow(<ArticleLink { ...props } />);

        const button = component.find('Button');
        assert.equal(button.props().label, 'Accéder à l\'article');
        assert.isFalse(button.props().disabled);

        const select = component.find('Select');
        assert.equal(select.length, 0);

        const fetchButton = component.find('FetchButton');
        assert.equal(fetchButton.length, 0);
    });

    it('should display a "Accéder à l\'article" disabled button if thereis  no link', function () {
        const props = {
            link: null,
            url: 'http://host',
            domain: 'vie',
            dbId: 'id',
            an: '1234',
            token: 'token',
            index: 1,
            retrieveLink: () => null
        };
        const component = enzyme.shallow(<ArticleLink { ...props } />);

        const button = component.find('Button');
        assert.equal(button.props().label, 'Accéder à l\'article');
        assert.isTrue(button.props().disabled);

        const select = component.find('Select');
        assert.equal(select.length, 0);

        const fetchButton = component.find('FetchButton');
        assert.equal(fetchButton.length, 0);
    });

    it('should display a "Accéder à l\'article (2)" select if there is more than one link', function () {
        const props = {
            link: [
                'http://link1ToArticle.com',
                'http://link2ToArticle.com'
            ],
            url: 'http://host',
            domain: 'vie',
            dbId: 'id',
            an: '1234',
            token: 'token',
            index: 1,
            retrieveLink: () => null
        };
        const component = enzyme.shallow(<ArticleLink { ...props } />);

        const select = component.find('Select');
        assert.equal(select.props().placeholder, 'Accéder à l\'article (2)');
        assert.deepEqual(select.props().options, [{
            label: 1,
            value: 'http://link1ToArticle.com'
        }, {
            label: 2,
            value: 'http://link2ToArticle.com'
        }]);

        const button = component.find('Button');
        assert.equal(button.length, 0);

        const fetchButton = component.find('FetchButton');
        assert.equal(fetchButton.length, 0);
    });

    it('should display a "Récupérer le lien" FetchButton if link is pdflink', function () {
        const props = {
            link: 'pdflink',
            url: 'http://host',
            domain: 'vie',
            dbId: 'id',
            an: '1234',
            token: 'token',
            index: 1,
            retrieveLink: () => null
        };
        const component = enzyme.shallow(<ArticleLink { ...props } />);

        const fetchButton = component.find('FetchButton');
        assert.equal(fetchButton.props().label, 'Récupérer le lien');
        const select = component.find('Select');
        assert.equal(select.length, 0);
        const button = component.find('Button');
        assert.equal(button.length, 0);
    });
});
