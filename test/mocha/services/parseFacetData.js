import parseFacetData from '../../../lib/services/parseFacetData';

describe('parseFacetData', function () {

    const facets = [
        {
            Id: 'Category',
            Label: 'Category',
            AvailableFacetValues: [
                {
                    Value: 'education / administration / general',
                    Count: 1,
                    AddAction: 'addfacetfilter(Category:education / administration / general)'
                },
                {
                    Value: 'education / organizations & institutions',
                    Count: 1,
                    AddAction: 'addfacetfilter(Category:education / organizations & institutions)'
                },
                {
                    Value: 'medical / aids & hiv',
                    Count: 1,
                    AddAction: 'addfacetfilter(Category:medical / aids & hiv)'
                }
            ]
        }, {
            Id: 'Language',
            Label: 'Language',
            AvailableFacetValues: [
                {
                    Value: 'portuguese',
                    Count: 640,
                    AddAction: 'addfacetfilter(Language:portuguese)'
                },
                {
                    Value: 'french',
                    Count: 393,
                    AddAction: 'addfacetfilter(Language:french)'
                }
            ]
        }
    ];

    const activeFacets = {
        Category: ['health & fitness / diseases / aids & hiv'],
        Language: ['english']
    };

    it('should complete facets with active facets', function () {
        assert.deepEqual(parseFacetData(facets, activeFacets), [
            {
                id: 'Category',
                label: 'Category',
                activeFacets: [
                    'health & fitness / diseases / aids & hiv'
                ],
                availableFacetValues: [
                    {
                        value: 'education / administration / general',
                        count: 1,
                        addAction: 'addfacetfilter(Category:education / administration / general)'
                    },
                    {
                        value: 'education / organizations & institutions',
                        count: 1,
                        addAction: 'addfacetfilter(Category:education / organizations & institutions)'
                    },
                    {
                        value: 'medical / aids & hiv',
                        count: 1,
                        addAction: 'addfacetfilter(Category:medical / aids & hiv)'
                    }
                ]
            }, {
                id: 'Language',
                label: 'Language',
                activeFacets: [
                    'english'
                ],
                availableFacetValues: [
                    {
                        value: 'portuguese',
                        count: 640,
                        addAction: 'addfacetfilter(Language:portuguese)'
                    },
                    {
                        value: 'french',
                        count: 393,
                        addAction: 'addfacetfilter(Language:french)'
                    }
                ]
            }
        ]);
    });

    it('should add facet for purely active facets', function () {
        assert.deepEqual(parseFacetData(facets, { Journal: ['Le journal de Picsou']}), [
            {
                id: 'Journal',
                label: 'Journal',
                availableFacetValues: [],
                activeFacets: ['Le journal de Picsou']
            }, {
                id: 'Category',
                label: 'Category',
                activeFacets: [],
                availableFacetValues: [
                    {
                        value: 'education / administration / general',
                        count: 1,
                        addAction: 'addfacetfilter(Category:education / administration / general)'
                    },
                    {
                        value: 'education / organizations & institutions',
                        count: 1,
                        addAction: 'addfacetfilter(Category:education / organizations & institutions)'
                    },
                    {
                        value: 'medical / aids & hiv',
                        count: 1,
                        addAction: 'addfacetfilter(Category:medical / aids & hiv)'
                    }
                ]
            }, {
                id: 'Language',
                label: 'Language',
                activeFacets: [],
                availableFacetValues: [
                    {
                        value: 'portuguese',
                        count: 640,
                        addAction: 'addfacetfilter(Language:portuguese)'
                    },
                    {
                        value: 'french',
                        count: 393,
                        addAction: 'addfacetfilter(Language:french)'
                    }
                ]
            }
        ]);
    });
});
