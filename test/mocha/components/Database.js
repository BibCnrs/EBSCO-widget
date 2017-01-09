import { Database, DatabaseLetter } from '../../../lib/components/Database';

describe('Database', function () {
    it('should render one DatabaseLetter for eack key in databases', function () {
        const props = {
            language: 'fr',
            databases: {
                d: [{
                    name: 'database',
                    text_fr: 'description en français',
                    text_en: 'description in english',
                    url_fr: 'database.fr',
                    url_en: 'database.com',
                }],
                i: [
                    {
                        name: 'inist',
                        text_fr: 'description en français',
                        text_en: 'description in english',
                        url_fr: 'inist.fr',
                        url_en: 'inist.com',
                    }, {
                        name: 'insb',
                        text_fr: 'insb en français',
                        text_en: 'insb in english',
                        url_fr: 'insb.fr',
                        url_en: 'insb.com',
                    }
                ],
            }
        };
        const component = enzyme.shallow(<Database {...props} />);
        const letters = component.find('.letter');
        assert.equal(letters.length, 2);
        const headers = letters.find('.header');
        assert.equal(headers.length, 2);
        headers.map((header, index) => {
            assert.equal(header.text(), index === 0 ? 'D' : 'I');
        });
        const databaseItems = component.find('DatabaseLetter');
        assert.equal(databaseItems.length, 2);
        databaseItems.map((databaseItem, index) => {
            assert.equal(databaseItem.props().language, 'fr');
            assert.equal(databaseItem.props().databases, index === 0 ? props.databases['d'] : props.databases['i']);
        });
    });

    describe('DatabaseLetter', () => {
        it('should render one databaseItem for each item in database with text and url based on language', () => {
            const props = {
                language: 'fr',
                databases: [
                    {
                        name: 'inist',
                        text_fr: 'description en français',
                        text_en: 'description in english',
                        url_fr: 'inist.fr',
                        url_en: 'inist.com',
                        imge: 'inist image',
                    }, {
                        name: 'insb',
                        text_fr: 'insb en français',
                        text_en: 'insb in english',
                        url_fr: 'insb.fr',
                        url_en: 'insb.com',
                        imge: 'insb image',
                    },
                ],
            };
            const component = enzyme.shallow(<DatabaseLetter {...props} />);

            const databaseItems = component.find('DatabaseItem');
            assert.equal(databaseItems.length, 2);
            databaseItems.map((databaseItem, index) => {
                const expectedItem = props.databases[index];
                assert.deepEqual(databaseItem.props(), {
                    name: expectedItem.name,
                    url: expectedItem.url_fr,
                    title: expectedItem.text_fr,
                    image: expectedItem.image,
                });
            });
        });
    });
});
