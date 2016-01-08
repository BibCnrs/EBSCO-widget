import PrettyLimiter from '../../../lib/components/PrettyLimiter';

describe('PrettyLimiter', function () {
    const getComponent = (data) => enzyme.shallow(<PrettyLimiter data={data} />);

    it('should display limiter', function () {
        const data = {
            fullText: true,
            peerReviewed: true,
            language: 'french',
            publicationDate: {
                from: '1000-01',
                to: '2015-01'
            },
            author: 'john',
            journalName: 'le monde',
            title: 'sir'
        };
        const component = getComponent(data);
        const span = component.find('span');
        assert.deepEqual(span.text().split('; '), [
            'Texte intégral',
            'Relu par un comité de lecture',
            'Langue: french',
            'Date de publication: 1000-01/2015-01',
            'Auteur: john',
            'Journal: le monde',
            'Titre: sir'
        ]);
    });

    it('should ignore undefined value', function () {
        const component = getComponent({
            fullText: true,
            b: undefined
        });
        const span = component.find('span');
        assert.deepEqual(span.text(), 'Texte intégral');
    });

    it('should ignore undefined value', function () {
        const component = getComponent({
            fullText: true,
            peerReviewed: undefined
        });
        const span = component.find('span');
        assert.deepEqual(span.text(), 'Texte intégral');
    });

    it('should ignore null value', function () {
        const component = getComponent({
            fullText: true,
            peerReviewed: null
        });
        const span = component.find('span');
        assert.deepEqual(span.text(), 'Texte intégral');
    });

    it('should ignore false value', function () {
        const component = getComponent({
            fullText: true,
            peerReviewed: false
        });
        const span = component.find('span');
        assert.deepEqual(span.text(), 'Texte intégral');
    });

    it('should ignore empty string value', function () {
        const component = getComponent({
            fullText: true,
            author: ''
        });
        const span = component.find('span');
        assert.deepEqual(span.text(), 'Texte intégral');
    });

});
