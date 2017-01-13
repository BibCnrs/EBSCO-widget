import { getSortedDatabases } from '../../../lib/reducers/databases';

describe('databases', () => {
    const databases = [
        { name_fr: 'oiseau', name_en: 'bird' },
        { name_fr: 'poisson', name_en: 'fish' },
        { name_fr: 'chien', name_en: 'dog' },
        { name_fr: 'chat', name_en: 'cat' },
    ];

    it('should return databases sorted by name_fr if language is fr', () => {
        assert.deepEqual(getSortedDatabases(databases, 'fr'), {
            c: [databases[3], databases[2]],
            p: [databases[1]],
            o: [databases[0]],
        });
    });

    it('should return databases sorted by name_en if language is en', () => {
        assert.deepEqual(getSortedDatabases(databases, 'en'), {
            b: [databases[0]],
            c: [databases[3]],
            d: [databases[2]],
            f: [databases[1]],
        });
    });

    it('should return databases sorted by name_en if language is en', () => {
        assert.deepEqual(getSortedDatabases(databases, 'en'), {
            b: [databases[0]],
            c: [databases[3]],
            d: [databases[2]],
            f: [databases[1]],
        });
    });

    it('should ignore case', () => {
        assert.deepEqual(getSortedDatabases([{ name_fr: 'oiseau' }, { name_fr: 'Oregon' }], 'fr'), {
            o: [
                { name_fr: 'oiseau' },
                { name_fr: 'Oregon' },
            ],
        });
    });
});
