import facets from '../../../lib/reducers/facets';
import {
    SEARCH_SUCCESS,
    LOGOUT
} from '../../../lib/actions';

describe('reducers facets', function () {

    it ('should default state to empty literal if none given', function () {
        assert.deepEqual(facets(undefined, { type: 'OTHER_ACTION_TYPE' }), {});
    });

    it ('should return default state if action type is LOGOUT', function () {
        assert.deepEqual(facets({ facet1: 'facet1',  facet2: 'facet2' }, { type: LOGOUT }), {});
    });

    it('should return given state if not concernerd by ACTION', function () {
        assert.deepEqual(facets('currentState', { type: 'OTHER_ACTION_TYPE' }), 'currentState');
    });

    it('should return parsed action.reponse.facets and action.response.activeFacets if action type is SEARCH_SUCCESS', function () {
        assert.deepEqual(facets({}, {
            type: SEARCH_SUCCESS,
            response: {
                facets: [{
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
                }],
                activeFacets: [{
                    FilterId: 2,
                    FacetValues: [
                        {
                            Id: 'Language',
                            Value: 'french'
                        }, {
                            Id: 'Language',
                            Value: 'english'
                        }
                    ]
                }]
            }
        }), {
            Language: {
                filterId: 2,
                label: 'Language',
                choices: [
                    {
                        label: 'french',
                        value: 'french'
                    },
                    {
                        label: 'english',
                        value: 'english'
                    }
                ],
                values: [
                    {
                        label: 'french',
                        value: 'french'
                    },
                    {
                        label: 'english',
                        value: 'english'
                    }
                ]
            },
            SourceType: {
                label: 'Source Type',
                choices: [
                    {
                        label: 'Academic Journals (32850)',
                        value: 'Academic Journals'
                    },
                    {
                        label: 'Magazines (5939)',
                        value: 'Magazines'
                    },
                    {
                        label: 'Reports (1651)',
                        value: 'Reports'
                    }
                ],
                values: []
            }
        });
    });

});
