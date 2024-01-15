import parseFullTextHoldings from '../../../lib/services/parseFullTextHoldings';

describe('parseFullTextHoldings', function() {
    it('should handle duplicates', () => {
        assert.deepEqual(
            parseFullTextHoldings([
                {
                    id: 1,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 2019 },
                            start: { day: 3, month: 3, year: 2019 },
                        },
                    ],
                },
                {
                    id: 2,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 2019 },
                            start: { day: 3, month: 3, year: 2019 },
                        },
                    ],
                },
            ]),
            [
                {
                    id: 1,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 2019 },
                            start: { day: 3, month: 3, year: 2019 },
                        },
                    ],
                },
            ],
        );
    });

    it('should handle same start dates', () => {
        assert.deepEqual(
            parseFullTextHoldings([
                {
                    id: 1,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 2019 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
                {
                    id: 2,
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 2019 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
            ]),
            [
                {
                    id: 2,
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 2019 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
            ],
        );
    });

    it('should handle same start dates with embargo as end dates #1', () => {
        assert.deepEqual(
            parseFullTextHoldings([
                {
                    id: 1,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 2019 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
                {
                    id: 2,
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 2019 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
                {
                    embargo: {
                        unit: 'month',
                        value: 3,
                    },
                    id: 3,
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 2019 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
            ]),
            [
                {
                    id: 2,
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 2019 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
            ],
        );
    });

    it('should handle same start dates with embargo as end dates #2', () => {
        assert.deepEqual(
            parseFullTextHoldings([
                {
                    id: 1,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 2019 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
                {
                    id: 2,
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 2019 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
                {
                    id: 4,
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 9999 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
                {
                    embargo: {
                        unit: 'month',
                        value: 3,
                    },
                    id: 3,
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 9999 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
            ]),
            [
                {
                    id: 4,
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 9999 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
                {
                    embargo: {
                        unit: 'month',
                        value: 3,
                    },
                    id: 3,
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 9999 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
            ],
        );
    });

    it('should handle same start dates with embargo as end dates #3', () => {
        assert.deepEqual(
            parseFullTextHoldings([
                {
                    id: 1,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 2019 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
                {
                    id: 2,
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 2019 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
                {
                    id: 4,
                    embargo: {
                        unit: 'month',
                        value: 4,
                    },
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 9999 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
                {
                    embargo: {
                        unit: 'month',
                        value: 3,
                    },
                    id: 3,
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 9999 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
            ]),
            [
                {
                    embargo: {
                        unit: 'month',
                        value: 3,
                    },
                    id: 3,
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 9999 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
            ],
        );
    });

    it('should handle same end dates', () => {
        assert.deepEqual(
            parseFullTextHoldings([
                {
                    id: 1,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 2019 },
                            start: { day: 1, month: 3, year: 2019 },
                        },
                    ],
                },
                {
                    id: 2,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 2019 },
                            start: { day: 1, month: 2, year: 2019 },
                        },
                    ],
                },
                {
                    id: 3,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 2020 },
                            start: { day: 1, month: 3, year: 2020 },
                        },
                    ],
                },
            ]),
            [
                {
                    id: 2,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 2019 },
                            start: { day: 1, month: 2, year: 2019 },
                        },
                    ],
                },
                {
                    id: 3,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 2020 },
                            start: { day: 1, month: 3, year: 2020 },
                        },
                    ],
                },
            ],
        );
    });

    it('should handle same end dates but one with embargo', () => {
        assert.deepEqual(
            parseFullTextHoldings([
                {
                    id: 1,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 9999 },
                            start: { day: 1, month: 3, year: 2019 },
                        },
                    ],
                    embargo: {
                        unit: 'month',
                        value: 3,
                    },
                },
                {
                    id: 2,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 9999 },
                            start: { day: 1, month: 2, year: 2019 },
                        },
                    ],
                },
            ]),
            [
                {
                    id: 2,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 9999 },
                            start: { day: 1, month: 2, year: 2019 },
                        },
                    ],
                },
            ],
        );
    });

    it('should handle overlapping dates', () => {
        assert.deepEqual(
            parseFullTextHoldings([
                {
                    id: 1,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 2019 },
                            start: { day: 1, month: 3, year: 2019 },
                        },
                    ],
                },
                {
                    id: 2,
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 2019 },
                            start: { day: 10, month: 2, year: 2019 },
                        },
                    ],
                },
                {
                    id: 3,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 2020 },
                            start: { day: 1, month: 3, year: 2020 },
                        },
                    ],
                },
            ]),
            [
                {
                    id: 2,
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 2019 },
                            start: { day: 10, month: 2, year: 2019 },
                        },
                    ],
                },
                {
                    id: 3,
                    coverage: [
                        {
                            end: { day: 2, month: 4, year: 2020 },
                            start: { day: 1, month: 3, year: 2020 },
                        },
                    ],
                },
            ],
        );
    });

    it('should handle overlapping dates with PRESENT', () => {
        assert.deepEqual(
            parseFullTextHoldings([
                {
                    id: 1,
                    coverage: [
                        {
                            end: { day: 1, month: 1, year: 9999 },
                            start: { day: 1, month: 1, year: 2010 },
                        },
                    ],
                },
                {
                    id: 2,
                    coverage: [
                        {
                            end: { day: 1, month: 11, year: 2015 },
                            start: { day: 1, month: 10, year: 2005 },
                        },
                    ],
                },
            ]),
            [
                {
                    id: 1,
                    coverage: [
                        {
                            end: { day: 1, month: 1, year: 9999 },
                            start: { day: 1, month: 1, year: 2010 },
                        },
                    ],
                },
                {
                    id: 2,
                    coverage: [
                        {
                            end: { day: 1, month: 11, year: 2015 },
                            start: { day: 1, month: 10, year: 2005 },
                        },
                    ],
                },
            ],
        );
    });

    it('should return open access document', () => {
        assert.deepEqual(
            parseFullTextHoldings([
                {
                    id: 1,
                    url: 'https://open-access-url.notadomain/document-data',
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 2019 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
                {
                    id: 2,
                    url: 'https://pay-access.bib.cnrs.fr/document-data',
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 2019 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
            ]),
            [
                {
                    id: 1,
                    url: 'https://open-access-url.notadomain/document-data',
                    coverage: [
                        {
                            end: { day: 3, month: 4, year: 2019 },
                            start: { day: 2, month: 3, year: 2019 },
                        },
                    ],
                },
            ],
        );
    });
});
