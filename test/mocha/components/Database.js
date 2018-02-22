import { Database, DatabaseLetter } from '../../../lib/components/Database';

describe('Database', function() {
    it('should render one DatabaseLetter for eack key in databases', function() {
        const props = {
            language: 'fr',
            domain: 'INSB',
            databases: {
                d: [
                    {
                        name: 'database',
                        text_fr: 'description en français',
                        text_en: 'description in english',
                        url_fr: 'database.fr',
                        url_en: 'database.com',
                        domains: ['INSB'],
                    },
                ],
                i: [
                    {
                        name: 'inist',
                        text_fr: 'description en français',
                        text_en: 'description in english',
                        url_fr: 'inist.fr',
                        url_en: 'inist.com',
                        domains: ['INSB'],
                    },
                    {
                        name: 'insb',
                        text_fr: 'insb en français',
                        text_en: 'insb in english',
                        url_fr: 'insb.fr',
                        url_en: 'insb.com',
                        domains: ['INSB'],
                    },
                ],
            },
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
            assert.deepEqual(
                databaseItem.props().databases,
                index === 0 ? props.databases['d'] : props.databases['i'],
            );
        });
    });

    it('should ignore database that do not have domain', function() {
        const props = {
            language: 'fr',
            domain: 'INSB',
            databases: {
                d: [
                    {
                        name: 'database',
                        text_fr: 'description en français',
                        text_en: 'description in english',
                        url_fr: 'database.fr',
                        url_en: 'database.com',
                        domains: ['INSB'],
                    },
                ],
                i: [
                    {
                        name: 'inist',
                        text_fr: 'description en français',
                        text_en: 'description in english',
                        url_fr: 'inist.fr',
                        url_en: 'inist.com',
                        domains: ['INSHS'],
                    },
                    {
                        name: 'insb',
                        text_fr: 'insb en français',
                        text_en: 'insb in english',
                        url_fr: 'insb.fr',
                        url_en: 'insb.com',
                        domains: ['INSB'],
                    },
                ],
            },
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
            assert.deepEqual(
                databaseItem.props().databases,
                index === 0 ? props.databases['d'] : [props.databases['i'][1]],
            );
        });
    });

    describe('DatabaseLetter', () => {
        it('should render one databaseItem for each item in database with text based on language but no url if domain is all', () => {
            const props = {
                language: 'fr',
                domain: 'ALL',
                databases: [
                    {
                        name_fr: 'inist',
                        name_en: 'inist en',
                        text_fr: 'description en français',
                        text_en: 'description in english',
                        url_fr: 'inist.fr',
                        url_en: 'inist.com',
                        imge: 'inist image',
                    },
                    {
                        name_fr: 'insb',
                        name_en: 'insb en',
                        text_fr: 'insb en français',
                        text_en: 'insb in english',
                        url_fr: 'insb.fr',
                        url_en: 'insb.com',
                        imge: 'insb image',
                    },
                ],
                clickDb: () => {},
            };
            const component = enzyme.shallow(<DatabaseLetter {...props} />);

            const databaseItems = component.find('DatabaseItem');
            assert.equal(databaseItems.length, 2);
            databaseItems.map((databaseItem, index) => {
                const expectedItem = props.databases[index];
                const itemProps = databaseItem.props();
                assert.deepEqual(itemProps, {
                    name: expectedItem.name_fr,
                    url: null,
                    title: expectedItem.text_fr,
                    image: expectedItem.image,
                    domain: 'ALL',
                    onDbClick: itemProps.onDbClick,
                });
            });
        });

        it('should render one databaseItem for each item in database with text and url based on language and domain if not ALL', () => {
            const props = {
                language: 'fr',
                domain: 'INSU',
                databases: [
                    {
                        name_fr: 'inist',
                        name_en: 'inist en',
                        text_fr: 'description en français',
                        text_en: 'description in english',
                        url_fr: 'inist.fr',
                        url_en: 'inist.com',
                        imge: 'inist image',
                    },
                    {
                        name_fr: 'insb',
                        name_en: 'insb en',
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
                const itemProps = databaseItem.props();
                assert.deepEqual(itemProps, {
                    name: expectedItem.name_fr,
                    url: `https://insu.bib.cnrs.fr/login?url=${
                        expectedItem.url_fr
                    }`,
                    title: expectedItem.text_fr,
                    image: expectedItem.image,
                    domain: 'INSU',
                    onDbClick: itemProps.onDbClick,
                });
            });
        });
    });
});
