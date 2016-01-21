import ArticleLink from '../../../lib/components/ArticleLink';

describe('ArticleLink', function () {

    it('should display a "Accéder à l\'article" button', function () {
        const props = {
            link: 'http://linkToArticle.com',
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
        const button = component.find('Button');
        assert.equal(button.length, 0);
    });
});
