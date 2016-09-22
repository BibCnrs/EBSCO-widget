import buildQueryString from '../../../lib/services/buildQueryString';

describe('buildQueryString', function () {
    it('should return empty string if there is no limiter', function () {
        assert.equal(buildQueryString({}), '');
    });

    it('should add queries=queries', function () {
        assert.equal(buildQueryString({ queries: [{ field: 'TI', term: 'my search'}] }), `queries=${encodeURIComponent(JSON.stringify([{ field: 'TI', term: 'my search'}]))}`);
    });

    it('should ignore fullText if itis false', function () {
        assert.equal(buildQueryString({ fullText: false }), '');
    });

    it('should ignore peerReviewedArticle if itis false', function () {
        assert.equal(buildQueryString({ peerReviewedArticle: false }), '');
    });

    it('should ignore peerReviewedPublication if itis false', function () {
        assert.equal(buildQueryString({ peerReviewedPublication: false }), '');
    });

    it('should ignore unknown limiters', function () {
        assert.equal(buildQueryString({ whatever: 'yop' }), '');
    });

    it('should return FT=Y, if fullText is true', function () {
        assert.equal(buildQueryString({ fullText: true }), 'FT=Y');
    });

    it('should return RV=Y, if peerReviewedArticle is true', function () {
        assert.equal(buildQueryString({ peerReviewedArticle: true }), 'RV=Y');
    });

    it('should return RV3=Y, if peerReviewedPublication is true', function () {
        assert.equal(buildQueryString({ peerReviewedPublication: true }), 'RV3=Y');
    });

    it('should return DT1=${to}/${from}, if publicationDate is set', function () {
        assert.equal(buildQueryString({ publicationDate: {
            from: 'from',
            to: 'to'
        } }), 'DT1=from-01/to-01');
    });

    it('should return AU=author, if author is set', function () {
        assert.equal(buildQueryString({ author: 'Isaac Asimov' }), 'AU=Isaac%20Asimov');
    });

    it('should return SO=journalName, if journalName is set', function () {
        assert.equal(buildQueryString({ journalName: 'Picsou magazine' }), 'SO=Picsou%20magazine');
    });

    it('should return Ti=title, if title is set', function () {
        assert.equal(buildQueryString({ title: 'lord' }), 'TI=lord');
    });

    it('should return LA99=language, if language is set', function () {
        assert.equal(buildQueryString({ language: ['Javanese', 'Ni'] }), 'LA99=Javanese&LA99=Ni');
    });

    it('should return currentPage=currentPage, if currentPage is set', function () {
        assert.equal(buildQueryString({ currentPage: 19 }), 'currentPage=19');
    });

    it('should return activeFacets="encoded(activeFacets)" if activeFacets is set', function () {
        assert.equal(buildQueryString({ activeFacets: [ { a: 1 }] }), 'activeFacets=%5B%7B%22a%22%3A1%7D%5D');
    });

    it('should return ignore activeFacets is it is set but empty', function () {
        assert.equal(buildQueryString({ activeFacets: {} }), '');
    });

    it('should add sort=value if sort is set', function () {
        assert.equal(buildQueryString({ sort: 'date' }), 'sort=date');
    });

    it('should add publicationId=value if publicationId is set', function () {
        assert.equal(buildQueryString({ publicationId: { label: 'publicationName', value: 'publication_id'} }), 'publicationId=publication_id');
    });

    it('should separate different delimiter with "&"', function () {
        assert.equal(buildQueryString({
            fullText: true,
            publicationDate: {
                from: 'from',
                to: 'to'
            }
        }), 'FT=Y&DT1=from-01/to-01');
    });
});
