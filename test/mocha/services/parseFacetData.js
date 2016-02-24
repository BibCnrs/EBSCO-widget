import { parseFacet, parseFacetValue, parseActiveFacetValue, parseActiveFacets, mergeFacets } from '../../../lib/services/parseFacetData';

describe('activeFacetsParser', function () {

    describe('mergeFacets', function  () {
        it('should merge facet with activeFacet', function () {
            const facets = {
                SourceType: {
                    label: 'Source Type',
                    choices: [
                        {
                            label: 'Academic Journals (32850)',
                            value: 'Academic Journals'
                        }
                    ]
                }
            };

            const activeFacets = {
                SourceType: {
                    filterId: 2,
                    values: [
                        {
                            label: 'Academic Journals',
                            value: 'Academic Journals'
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
                            value: 'Academic Journals'
                        }
                    ],
                    values: [
                        {
                            label: 'Academic Journals',
                            value: 'Academic Journals'
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
                            value: 'Academic Journals'
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
                            value: 'Academic Journals'
                        }
                    ],
                    values: [],
                    newValues: []
                }
            });
        });

        it('should default label to key and choices to activeFacet.values', function () {
            const facets = {
            };

            const activeFacets = {
                SourceType: {
                    filterId: 2,
                    values: [
                        {
                            label: 'Academic Journals',
                            value: 'Academic Journals'
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
                            value: 'Academic Journals'
                        }
                    ],
                    values: [
                        {
                            label: 'Academic Journals',
                            value: 'Academic Journals'
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
                value: 'Academic Journals'
            });
        });

    });

    describe('parseActiveFacetValue', function () {
        it('should parse activeFacet value', function () {
            assert.deepEqual(parseActiveFacetValue('french'), {
                label: 'french',
                value: 'french'
            });
        });
    });

    describe('parseActiveFacet', function () {

        it('should parse active facet filter', function () {
            const data = {
                Language: ['french', 'english']
            };
            assert.deepEqual(parseActiveFacets(data), {
                Language: {
                    values: data.Language.map(parseActiveFacetValue),
                    newValues: data.Language.map(parseActiveFacetValue)
                }
            });
        });

        it('should regroup facet filter by their id', function () {
            const data = {
                SourceType: ['magazine'],
                Language: ['french', 'english']
            };

            assert.deepEqual(parseActiveFacets(data), {
                Language: {
                    values: [
                        {
                            label: 'french',
                            value: 'french'
                        }, {
                            label: 'english',
                            value: 'english'
                        }
                    ],
                    newValues: [
                        {
                            label: 'french',
                            value: 'french'
                        }, {
                            label: 'english',
                            value: 'english'
                        }
                    ]
                },
                SourceType: {
                    values: [
                        {
                            label: 'magazine',
                            value: 'magazine'
                        }
                    ],
                    newValues: [
                        {
                            label: 'magazine',
                            value: 'magazine'
                        }
                    ]
                }
            });
        });
    });
});
