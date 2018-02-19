export default (articleLinks, currentGate, text) => {
    const { fullTextLinks = [], pdfLinks = [], urls = [], html } = articleLinks;

    if (
        (!fullTextLinks || !fullTextLinks.length) &&
        (!pdfLinks || !pdfLinks.length) &&
        (!urls || !urls.length) &&
        !html
    ) {
        return null;
    }

    const htmlLists = html
        ? [
              {
                  name: 'html',
                  icon: 'file-code-o',
                  url:
                      'data:text/html;charset=utf-8,' +
                      encodeURIComponent(html),
                  download: true,
              },
          ]
        : [];

    return []
        .concat(fullTextLinks.map(link => ({ ...link, icon: 'th-list' })))
        .concat(
            pdfLinks.map(({ url }) => ({
                url: url.match(currentGate)
                    ? url
                    : `http://${currentGate}.bib.cnrs.fr/login?url=${url}`,
                name: text.pdfLinks,
                icon: 'file-pdf-o',
            })),
        )
        .concat(
            urls.map(link => ({
                ...link,
                name: text[link.name] || link.name,
                icon: 'link',
            })),
        )
        .concat(htmlLists);
};
