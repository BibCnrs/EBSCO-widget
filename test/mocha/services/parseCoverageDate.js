import parseCoverageDate from '../../../lib/services/parseCoverageDate';

describe('parseCoverageDate', function () {
    it('should return a literal with day, month and year', function () {
        assert.equal(parseCoverageDate({
            date: 'year: <year> month: <month> day: <day>',
            now: 'now string'
        }, '19991231'), 'year: 1999 month: 12 day: 31');
    });

    it('should return now if rawdate start with 9999', function () {
        assert.equal(parseCoverageDate({
            date: 'year: <year> month: <month> day: <day>',
            now: 'now string'
        }, '99991231'), 'now string');
    });
});
