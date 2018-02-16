import parseFacetData from '../../../lib/services/parseFacetData';

describe('parseFacetData', function() {
    const facets = [
        {
            id: 'Category',
            label: 'Category',
            availableFacetValues: [
                {
                    value: 'education / administration / general',
                    count: 1,
                    addAction:
                        'addfacetfilter(Category:education / administration / general)',
                },
                {
                    value: 'education / organizations & institutions',
                    count: 1,
                    addAction:
                        'addfacetfilter(Category:education / organizations & institutions)',
                },
                {
                    value: 'medical / aids & hiv',
                    count: 1,
                    addAction: 'addfacetfilter(Category:medical / aids & hiv)',
                },
            ],
        },
        {
            id: 'Language',
            label: 'Language',
            availableFacetValues: [
                {
                    value: 'portuguese',
                    count: 640,
                    addAction: 'addfacetfilter(Language:portuguese)',
                },
                {
                    value: 'french',
                    count: 393,
                    addAction: 'addfacetfilter(Language:french)',
                },
            ],
        },
    ];

    const activeFacets = {
        Category: ['health & fitness / diseases / aids & hiv'],
        Language: ['english'],
    };

    it('should complete facets with active facets', function() {
        assert.deepEqual(parseFacetData(facets, activeFacets), [
            {
                id: 'Category',
                label: 'Category',
                activeFacets: ['health & fitness / diseases / aids & hiv'],
                availableFacetValues: [
                    {
                        value: 'health & fitness / diseases / aids & hiv',
                        count: null,
                        checked: true,
                    },
                    {
                        value: 'education / administration / general',
                        count: 1,
                        addAction:
                            'addfacetfilter(Category:education / administration / general)',
                        checked: false,
                    },
                    {
                        value: 'education / organizations & institutions',
                        count: 1,
                        addAction:
                            'addfacetfilter(Category:education / organizations & institutions)',
                        checked: false,
                    },
                    {
                        value: 'medical / aids & hiv',
                        count: 1,
                        addAction:
                            'addfacetfilter(Category:medical / aids & hiv)',
                        checked: false,
                    },
                ],
            },
            {
                id: 'Language',
                label: 'Language',
                activeFacets: ['english'],
                availableFacetValues: [
                    {
                        value: 'english',
                        count: null,
                        checked: true,
                    },
                    {
                        value: 'portuguese',
                        count: 640,
                        addAction: 'addfacetfilter(Language:portuguese)',
                        checked: false,
                    },
                    {
                        value: 'french',
                        count: 393,
                        addAction: 'addfacetfilter(Language:french)',
                        checked: false,
                    },
                ],
            },
        ]);
    });

    it('should add facet for missing active facets', function() {
        assert.deepEqual(
            parseFacetData(facets, { Journal: ['Le journal de Picsou'] }),
            [
                {
                    id: 'Journal',
                    label: 'Journal',
                    availableFacetValues: [
                        {
                            value: 'Le journal de Picsou',
                            count: null,
                            checked: true,
                        },
                    ],
                    activeFacets: ['Le journal de Picsou'],
                },
                {
                    id: 'Category',
                    label: 'Category',
                    activeFacets: [],
                    availableFacetValues: [
                        {
                            value: 'education / administration / general',
                            count: 1,
                            addAction:
                                'addfacetfilter(Category:education / administration / general)',
                            checked: false,
                        },
                        {
                            value: 'education / organizations & institutions',
                            count: 1,
                            addAction:
                                'addfacetfilter(Category:education / organizations & institutions)',
                            checked: false,
                        },
                        {
                            value: 'medical / aids & hiv',
                            count: 1,
                            addAction:
                                'addfacetfilter(Category:medical / aids & hiv)',
                            checked: false,
                        },
                    ],
                },
                {
                    id: 'Language',
                    label: 'Language',
                    activeFacets: [],
                    availableFacetValues: [
                        {
                            value: 'portuguese',
                            count: 640,
                            addAction: 'addfacetfilter(Language:portuguese)',
                            checked: false,
                        },
                        {
                            value: 'french',
                            count: 393,
                            addAction: 'addfacetfilter(Language:french)',
                            checked: false,
                        },
                    ],
                },
            ],
        );
    });
});
