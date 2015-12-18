import buildQueryString from '../../../lib/services/buildQueryString';

describe('buildQueryString', function () {
    it('should return empty string if there is no limiter', function () {
        assert.equal(buildQueryString({}), '');
    });

    it('should ignore fullText if it is false', function () {
        assert.equal(buildQueryString({ fullText: false }), '');
    });

    it('should ignore peerReviewed if it is false', function () {
        assert.equal(buildQueryString({ peerReviewed: false }), '');
    });

    it('should ignore unknown limiters', function () {
        assert.equal(buildQueryString({ whatever: 'yop' }), '');
    });

    it ('should return FT=Y, if fullText is true', function () {
        assert.equal(buildQueryString({ fullText: true }), 'FT=Y');
    });

    it ('should return RV=Y, if peerReviewed is true', function () {
        assert.equal(buildQueryString({ peerReviewed: true }), 'RV=Y');
    });

    it ('should return DT1=${to}/${from}, if publicationDate is set', function () {
        assert.equal(buildQueryString({ publicationDate: {
            from: 'from',
            to: 'to'
        } }), 'DT1=from/to');
    });

    it ('should return AU=author, if author is set', function () {
        assert.equal(buildQueryString({ author: 'Isaac Asimov' }), 'AU=Isaac Asimov');
    });

    it ('should return SO=journalName, if journalName is set', function () {
        assert.equal(buildQueryString({ journalName: 'Picsou magazine' }), 'SO=Picsou magazine');
    });

    it ('should return Ti=title, if title is set', function () {
        assert.equal(buildQueryString({ title: 'lord' }), 'TI=lord');
    });

    it ('should return LA99=language, if language is set', function () {
        assert.equal(buildQueryString({ language: 'Javanais' }), 'LA99=Javanais');
    });

    it ('should return currentPage=currentPage, if currentPage is set', function () {
        assert.equal(buildQueryString({ currentPage: 19 }), 'currentPage=19');
    });

    it ('should separate different delimiter with "&"', function () {
        assert.equal(buildQueryString({
            fullText: true,
            publicationDate: {
                from: 'from',
                to: 'to'
            }
        }), 'FT=Y&DT1=from/to');
    });
});