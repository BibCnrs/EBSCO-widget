import { parseFacet, parseFacetValue, parseActiveFacetValue, parseActiveFacet, mergeFacets } from '../../../lib/services/parseFacetData';

describe('activeFacetsParser', function () {

    describe('mergeFacets', function  () {
        it('should merge facet with activeFacet', function () {
            const facets = {
                SourceType: {
                    label: 'Source Type',
                    choices: [
                        {
                            label: 'Academic Journals (32850)',
                            value: 'addfacetfilter(SourceType:Academic Journals)'
                        }
                    ]
                }
            };

            const activeFacets = {
                SourceType: {
                    filterId: 2,
                    clear: 'removefacetfilter(2)',
                    values: [
                        {
                            label: 'Academic Journals',
                            value: 'removefacetfiltervalue(2,SourceType:Academic Journals)'
                        }
                    ]
                }
            };
            assert.deepEqual(mergeFacets(facets, activeFacets), {
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
                        }
                    ]
                }
            });
        });

        it('should default clear to undefined and values to []', function () {
            const facets = {
                SourceType: {
                    label: 'Source Type',
                    choices: [
                        {
                            label: 'Academic Journals (32850)',
                            value: 'addfacetfilter(SourceType:Academic Journals)'
                        }
                    ]
                }
            };

            const activeFacets = {};

            assert.deepEqual(mergeFacets(facets, activeFacets), {
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
            });
        });

        it('should default label to key and choices to activeFacet.values', function () {
            const facets = {
            };

            const activeFacets = {
                SourceType: {
                    filterId: 2,
                    clear: 'removefacetfilter(2)',
                    values: [
                        {
                            label: 'Academic Journals',
                            value: 'removefacetfiltervalue(2,SourceType:Academic Journals)'
                        }
                    ]
                }
            };
            assert.deepEqual(mergeFacets(facets, activeFacets), {
                SourceType: {
                    filterId: 2,
                    label: 'SourceType',
                    choices: [
                        {
                            label: 'Academic Journals',
                            value: 'removefacetfiltervalue(2,SourceType:Academic Journals)'
                        }
                    ],
                    clear: 'removefacetfilter(2)',
                    values: [
                        {
                            label: 'Academic Journals',
                            value: 'removefacetfiltervalue(2,SourceType:Academic Journals)'
                        }
                    ]
                }
            });
        });

    });

    describe('parseFacet', function () {
        const data = {
            Id: 'SourceType',
            Label: 'Source Type',
            AvailableFacetValues: [
                {
                    Value: 'Academic Journals',
                    Count: 32850,
                    AddAction: 'addfacetfilter(SourceType:Academic Journals)'
                },
                {
                    Value: 'Magazines',
                    Count: 5939,
                    AddAction: 'addfacetfilter(SourceType:Magazines)'
                },
                {
                    Value: 'Reports',
                    Count: 1651,
                    AddAction: 'addfacetfilter(SourceType:Reports)'
                }
            ]
        };

        it('should parse facet', function () {
            assert.deepEqual(parseFacet({}, data), {
                SourceType: {
                    label: 'Source Type',
                    choices: data.AvailableFacetValues.map(parseFacetValue)
                }
            });
        });
    });

    describe('parseFacetValue', function () {
        it('should parse facet value', function () {
            assert.deepEqual(parseFacetValue({
                Value: 'Academic Journals',
                Count: 32850,
                AddAction: 'addfacetfilter(SourceType:Academic Journals)'
            }), {
                label: 'Academic Journals (32850)',
                value: 'addfacetfilter(SourceType:Academic Journals)'
            });
        });

    });

    describe('parseActiveFacetValue', function () {
        it('should parse activeFacet value', function () {
            assert.deepEqual(parseActiveFacetValue({
                FacetValue: {
                    Id: 'Language',
                    Value: 'french'
                },
                RemoveAction: 'removefacetfiltervalue(2,Language:french)'
            }), {
                label: 'french',
                value: 'removefacetfiltervalue(2,Language:french)'
            });
        });
    });

    describe('parseActiveFacet', function () {

        it('should parse active facet filter', function () {
            const data = {
                FilterId: 2,
                FacetValuesWithAction: [
                    {
                        FacetValue: {
                            Id: 'Language',
                            Value: 'french'
                        },
                        RemoveAction: 'removefacetfiltervalue(2,Language:french)'
                    }, {
                        FacetValue: {
                            Id: 'Language',
                            Value: 'english'
                        },
                        RemoveAction: 'removefacetfiltervalue(2,Language:english)'
                    }
                ],
                RemoveAction: 'removefacetfilter(2)'
            };
            assert.deepEqual(parseActiveFacet({}, data), {
                Language: {
                    filterId: 2,
                    clear: 'removefacetfilter(2)',
                    values: data.FacetValuesWithAction.map(parseActiveFacetValue)
                }
            });
        });
    });
});
