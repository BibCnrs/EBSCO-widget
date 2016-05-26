import { ArticleLink } from '../../../lib/components/ArticleLink';

describe('ArticleLink', function () {

    it('should display a "Résolveur de lien" SelectButton if there is link', function () {
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

        const button = component.find('SelectButton');
        assert.equal(button.props().value, 'Résolveur de lien');
        assert.deepEqual(button.props().choices, [{ label: 'lien 1', value: 'http://link1ToArticle.com' }, { label: 'lien 2', value: 'http://link2ToArticle.com' }]);
    });

    it('should display a "Résolveur de lien" with a spinner as it single item if link is not an array', function () {
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

        const button = component.find('SelectButton');
        assert.equal(button.props().value, 'Résolveur de lien');
        const choices = button.props().choices;
        assert.equal(choices.length, 1);
        assert.isNull(choices[0].value);
    });

    it('should not display SelectButton if link is an empty array', function () {
        const props = {
            link: [],
            url: 'http://host',
            domain: 'vie',
            dbId: 'id',
            an: '1234',
            token: 'token',
            index: 1,
            retrieveLink: () => null
        };
        const component = enzyme.shallow(<ArticleLink { ...props } />);

        const button = component.find('SelectButton');
        assert.equal(button.length, 0);
    });

});
