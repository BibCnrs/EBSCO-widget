'use strict';

import limitersToQueryString from '../../../lib/services/limitersToQueryString';

describe('limitersToQueryString', function () {
    it('should return empty string if there is no limiter', function () {
        assert.equal(limitersToQueryString({}), '');
    });

    it('should ignore fullText if it is false', function () {
        assert.equal(limitersToQueryString({ fullText: false }), '');
    });

    it('should ignore peerReviewed if it is false', function () {
        assert.equal(limitersToQueryString({ peerReviewed: false }), '');
    });

    it('should ignore unknown limiters', function () {
        assert.equal(limitersToQueryString({ whatever: 'yop' }), '');
    });

    it ('should return FT=Y, if fullText is true', function () {
        assert.equal(limitersToQueryString({ fullText: true }), 'FT=Y');
    });

    it ('should return RV=Y, if peerReviewed is true', function () {
        assert.equal(limitersToQueryString({ peerReviewed: true }), 'RV=Y');
    });

    it ('should return DT1=${to}/${from}, if publicationDate is set', function () {
        assert.equal(limitersToQueryString({ publicationDate: {
            from: 'from',
            to: 'to'
        } }), 'DT1=from/to');
    });

    it ('should return AU=author, if author is set', function () {
        assert.equal(limitersToQueryString({ author: 'Isaac Asimov' }), 'AU=Isaac Asimov');
    });

    it ('should separate different delimiter wit "&"', function () {
        assert.equal(limitersToQueryString({
            fullText: true,
            publicationDate: {
                from: 'from',
                to: 'to'
            }
        }), 'FT=Y&DT1=from/to');
    });
});
