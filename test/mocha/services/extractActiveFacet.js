import extractActiveFacet from '../../../lib/services/extractActiveFacet';

describe('extractActiveFacet', function () {
    it('should extract activeFacet data from facets', function () {
        assert.deepEqual(extractActiveFacet({
            SourceType: {
                filterId: 2,
                label: 'Source Type',
                choices: [
                    {
                        label: 'Academic Journals (32850)',
                        value: 'addfacetfilter(SourceType:Academic Journals)'
                    }
                ],
                clear: 'removefacetfilter(2)',
                values: [
                    {
                        label: 'Academic Journals',
                        value: 'removefacetfiltervalue(2,SourceType:Academic Journals)'
                    },
                    {
                        label: 'Electronic Resources',
                        value: 'removefacetfiltervalue(2,SourceType:Electronic Resources)'
                    }
                ]
            },
            Language: {
                filterId: 3,
                label: 'Language',
                choices: [
                    {
                        label: 'english',
                        value: 'addfacetfilter(SourceType:Academic Journals)'
                    }
                ],
                clear: 'removefacetfilter(3)',
                values: [
                    {
                        label: 'english',
                        value: 'removefacetfiltervalue(2,Language:english)'
                    }
                ]
            }
        }), [
            {
                FilterId: 2,
                FacetValues: [
                    {
                        Id: 'SourceType',
                        Value: 'Academic Journals'
                    }, {
                        Id: 'SourceType',
                        Value: 'Electronic Resources'
                    }
                ]
            }, {
                FilterId: 3,
                FacetValues: [
                    {
                        Id: 'Language',
                        Value: 'english'
                    }
                ]
            }
        ]);
    });

    it('should ignore non active facet', function () {
        assert.deepEqual(extractActiveFacet({
            SourceType: {
                label: 'Source Type',
                choices: [
                    {
                        label: 'Academic Journals (32850)',
                        value: 'addfacetfilter(SourceType:Academic Journals)'
                    }
                ],
                clear: undefined,
                values: []
            }
        }), []);
    });
});
