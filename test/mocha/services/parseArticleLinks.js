import parseArticleLinks from '../../../lib/services/parseArticleLinks';

describe('parseArticleLinks', () => {
    it('should return array with fullTextLinks adding icon th-link', () => {
        assert.deepEqual(
            parseArticleLinks({
                fullTextLinks: [{ link: 1 }, { link: 2 }],
            }),
            [{ link: 1, icon: 'th-list' }, { link: 2, icon: 'th-list' }],
        );
    });

    it('should return array with pdfLinks adding proxifying if needed', () => {
        assert.deepEqual(
            parseArticleLinks(
                {
                    pdfLinks: [
                        { url: 'www.google.fr' },
                        {
                            url:
                                'http://currentGate/login?url=content.ebsco.com',
                        },
                    ],
                },
                'currentGate',
                { pdfLinks: 'pdfLinks' },
            ),
            [
                {
                    url:
                        'http://currentGate.bib.cnrs.fr/login?url=www.google.fr',
                    name: 'pdfLinks',
                    icon: 'file-pdf-o',
                },
                {
                    url: 'http://currentGate/login?url=content.ebsco.com',
                    name: 'pdfLinks',
                    icon: 'file-pdf-o',
                },
            ],
        );
    });

    it('should return array of urls', () => {
        assert.deepEqual(
            parseArticleLinks(
                {
                    urls: [
                        { url: 'www.google.fr', name: 'name1' },
                        { url: 'http://wikipedia.com', name: 'name2' },
                    ],
                },
                'currentGate',
                { name1: 'label1', name2: 'label2' },
            ),
            [
                {
                    url: 'www.google.fr',
                    name: 'label1',
                    icon: 'link',
                },
                {
                    url: 'http://wikipedia.com',
                    name: 'label2',
                    icon: 'link',
                },
            ],
        );
    });

    it('should add data url for html if any', () => {
        assert.deepEqual(
            parseArticleLinks({
                html: 'html content',
            }),
            [
                {
                    name: 'html',
                    url: 'data:text/html;charset=utf-8,html%20content',
                    icon: 'file-code-o',
                    download: true,
                    onClick: undefined,
                },
            ],
        );
    });

    it('should do all at once', () => {
        assert.deepEqual(
            parseArticleLinks(
                {
                    fullTextLinks: [{ link: 1 }],
                    pdfLinks: [{ url: 'www.google.fr' }],
                    urls: [{ url: 'www.google.fr', name: 'name1' }],
                    html: 'html content',
                },
                'currentGate',
                { pdfLinks: 'pdfLinks', name1: 'label1' },
            ),
            [
                { link: 1, icon: 'th-list' },
                {
                    url:
                        'http://currentGate.bib.cnrs.fr/login?url=www.google.fr',
                    name: 'pdfLinks',
                    icon: 'file-pdf-o',
                },
                {
                    url: 'www.google.fr',
                    name: 'label1',
                    icon: 'link',
                },
                {
                    name: 'html',
                    url: 'data:text/html;charset=utf-8,html%20content',
                    icon: 'file-code-o',
                    download: true,
                    onClick: undefined,
                },
            ],
        );
    });
});
