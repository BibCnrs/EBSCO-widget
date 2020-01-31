import Blob from '../../../lib/components/Blob';

describe('Blob', function() {
    const getComponent = data =>
        enzyme.shallow(<Blob data={data} currentGate="INSHS" doi="DOI" />);

    it('should display object with DL component', function() {
        const data = {
            a: '1',
            b: '2',
        };
        const component = getComponent(data);
        const dl = component.find('.dl');
        assert.deepEqual(dl.props().data, data);
    });

    it('should display object with an indice property with <sup>indice</sup>', function() {
        const data = {
            indice: 'indice',
        };
        const component = getComponent(data);
        const sup = component.find('sup');
        assert.equal(sup.text(), data.indice);
    });

    it('should display object with url  and name property with FullTextHolding', function() {
        const data = {
            url: 'http://google.com',
            name: 'google',
        };
        const component = getComponent(data);
        const fullTextHolding = component.find('Connect');
        assert.equal(
            fullTextHolding.getElement().type.displayName,
            'Connect(TranslatedComponent)',
        );
        assert.deepEqual(fullTextHolding.props(), data);
    });

    it('should display object with url and value property with a', function() {
        const data = {
            url: 'http://google.com',
            value: 'google',
        };
        const component = getComponent(data);
        const a = component.find('OALinkContainer');
        assert.deepEqual(a.props().url, data.url);
        assert.deepEqual(a.props().children, data.value);
    });

    it('should display object with term, field and value property with SearchableLink', function() {
        const data = {
            term: 'a term',
            value: 'a value',
            field: 'a field',
        };
        const component = getComponent(data);
        const searchLink = component.find('Connect');
        assert.equal(
            searchLink.getElement().type.displayName,
            'Connect(SearchLink)',
        );
        assert.deepEqual(searchLink.props(), data);
    });

    it('should display true boolean with check Icon', function() {
        const component = getComponent(true);
        const icon = component.find('Icon');
        assert.equal(icon.props().name, 'check');
    });

    it('should display false boolean with close Icon', function() {
        const component = getComponent(false);
        const icon = component.find('Icon');
        assert.equal(icon.props().name, 'close');
    });

    it('should display array with UL component', function() {
        const data = [1, 2, 3];
        const component = getComponent(data);
        const ul = component.find('UL');
        assert.deepEqual(ul.props().data, data);
    });

    it('should display string with span component', function() {
        const data = 'hello';
        const component = getComponent(data);
        const span = component.find('span');
        assert.equal(span.text(), data);
    });

    it('should display span with math formula', function() {
        const data = {
            notation: 'LaTeX',
            value: `(1,s)`,
        };
        const component = getComponent(data);
        const span = component.find('span');
        assert.equal(
            span.props().dangerouslySetInnerHTML.__html,
            '<span class="katex"><span class="katex-mathml"><math><semantics><mrow><mo>(</mo><mn>1</mn><mo separator="true">,</mo><mi>s</mi><mo>)</mo></mrow><annotation encoding="application/x-tex">(1,s)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.75em;"></span><span class="strut bottom" style="height:1em;vertical-align:-0.25em;"></span><span class="base"><span class="mopen">(</span><span class="mord">1</span><span class="mpunct">,</span><span class="mord rule" style="margin-right:0.16666666666666666em;"></span><span class="mord mathit">s</span><span class="mclose">)</span></span></span></span>',
        );
    });

    it('should interpret inline formula', function() {
        const data = 'The formula is: $(1,s)$';
        const component = getComponent(data);
        assert.equal(component.text(), 'The formula is: ');
        const span = component.find('span');
        assert.equal(
            span.at(1).props().dangerouslySetInnerHTML.__html,
            '<span class="katex"><span class="katex-mathml"><math><semantics><mrow><mo>(</mo><mn>1</mn><mo separator="true">,</mo><mi>s</mi><mo>)</mo></mrow><annotation encoding="application/x-tex">(1,s)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.75em;"></span><span class="strut bottom" style="height:1em;vertical-align:-0.25em;"></span><span class="base"><span class="mopen">(</span><span class="mord">1</span><span class="mpunct">,</span><span class="mord rule" style="margin-right:0.16666666666666666em;"></span><span class="mord mathit">s</span><span class="mclose">)</span></span></span></span>',
        );
    });
});
