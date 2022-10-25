import selectObjectByLangAttribute from '../../../lib/services/selectObjectByLangAttribute';

describe('selectObjectByLangAttribute', function() {
    it('should return object with required language if exists', function() {
        assert.deepEqual(
            selectObjectByLangAttribute(
                [
                    {
                        title: 'A title',
                        lang: 'en',
                    },
                    {
                        title: 'Un titre',
                        lang: 'fr',
                    },
                ],
                'fr',
            ),
            {
                title: 'Un titre',
                lang: 'fr',
            },
        );
    });

    it('should return first item if required language does not exists', function() {
        assert.deepEqual(
            selectObjectByLangAttribute(
                [
                    {
                        title: 'A title',
                    },
                    {
                        title: 'Un titre',
                    },
                ],
                'fr',
            ),
            {
                title: 'A title',
            },
        );
    });

    it('should return empty object if array is empty', function() {
        assert.deepEqual(selectObjectByLangAttribute([], 'fr'), {});
    });
});
