import { PrettyLimiter } from '../../../lib/components/PrettyLimiter';

describe('PrettyLimiter', function() {
    const getComponent = data => enzyme.shallow(<PrettyLimiter data={data} />);

    it('should display limiter', function() {
        const data = {
            fullText: true,
            peerReviewedArticle: true,
            Language: ['french', 'english'],
            publicationDate: {
                from: '1000-01',
                to: '2015-01',
            },
            Journal: 'le monde',
        };
        const component = getComponent(data);
        const span = component.find('span');
        assert.deepEqual(span.text().split('; '), [
            'Texte intégral',
            'Relu par un comité de lecture',
            'Langue: french, english',
            'Date de publication: 1000-01/2015-01',
            'Journal: le monde',
        ]);
    });

    it('should ignore undefined value', function() {
        const component = getComponent({
            fullText: true,
            b: undefined,
        });
        const span = component.find('span');
        assert.deepEqual(span.text(), 'Texte intégral');
    });

    it('should ignore undefined value', function() {
        const component = getComponent({
            fullText: true,
            peerReviewedArticle: undefined,
        });
        const span = component.find('span');
        assert.deepEqual(span.text(), 'Texte intégral');
    });

    it('should ignore null value', function() {
        const component = getComponent({
            fullText: true,
            peerReviewedArticle: null,
        });
        const span = component.find('span');
        assert.deepEqual(span.text(), 'Texte intégral');
    });

    it('should ignore false value', function() {
        const component = getComponent({
            fullText: true,
            peerReviewedArticle: false,
        });
        const span = component.find('span');
        assert.deepEqual(span.text(), 'Texte intégral');
    });

    it('should ignore empty string value', function() {
        const component = getComponent({
            fullText: true,
            author: '',
        });
        const span = component.find('span');
        assert.deepEqual(span.text(), 'Texte intégral');
    });
});
