# EBSCO-widget

Widget permettant d'intégrer [BibCNRS](https://bib.cnrs.fr) dans un site web tiers (le votre par exemple). Ce widget utilise la technologie ReactJS. A noter que des compétences d'informaticien/webmestre sont nécessaires pour intégrer le widget dans votre site web.

## Installation
Installer le code source du widget avec npm : `npm install ebsco-widget`
Ajouter ensuite le JS et le CSS du widget dans la partie <head> de votre page web.
```html
<link rel="stylesheet" id="ebsco_widget-css" href="/node_modules/ebsco-widget/build/app.css?ver=0.13.1" type="text/css" media="all">

<script type="text/javascript" src="/node_modules/babel-polyfill/dist/polyfill.js?ver=6.16.0"></script>
<script type="text/javascript" src="/node_modules/react/dist/react-with-addons.js?ver=15.3.2"></script>
<script type="text/javascript" src="/node_modules/react-dom/dist/react-dom.js?ver=15.3.2"></script>
<script type="text/javascript" src="/node_modules/ebsco-widget/build/app.js?ver=0.13.1"></script>
```

Ajouter la <div> qui contiendra le widget à l'endroit souhaité dans votre page web :
```html
<div id="ebsco_widget"></div>
```
Et initialiser le widget à la fin de votre page web avec le bloc suivant :
```js
<script type="text/javascript">

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    var rootElement = document.getElementById('ebsco_widget');
    window.ReactDom.render(React.createElement(window.EbscoWidget, { // options
      url: 'https://bib.cnrs.fr/api/ebsco', //obligatoire: url de bibapi
      domain: 'default domain' // facultatif: l'institut que le widget utlisera par défaut si disponible
    }), rootElement);
  }
};

</script>
```

## Développement

### Installer les dépendances
    make install
### Lancer un serveur de développement
Lancer webpack dev server: `make run-dev`
Ensuite aller sur `localhost:3001/webpack-dev-server`
Il est possible d'ajouter `?debug_session=<name>` pour créer une session qui sauvegardera l'état du widget' dans le localstorage.
Il est également  nécessaire d'avoir BibApi de lancer sur  localhost:3000

### Construire le widget (build)
Construire build/app.js et build/app.css : `make build`

### Tester le widget dans une page web

Servir une page html de test incorporant le widget construit: `make serve`

Le serveur web écoutera ensuite sur l'url suivante : http://127.0.0.1:3002/

## Tests

- `make test`: lancer tout les tests
- `make test-mocha`: lancer les tests unitaires mocha
- `make test-e2e`: lancer les tests "end to end" [Cypress](https://docs.cypress.io/)

## Commandes utiles

`make` liste toutes les commandes disponible ainsi que leurs aides

`make npm`: permet de lancer les commandes npm dockerizé
example: `make npm install koa --save`

```sh
see [npm documentation](https://docs.npmjs.com/all)
```

## Déploiement

Tout d'abord, on incrémente la version dans le package.json (selon le niveau de changement)

- Sur NPM : 
```bash
  npm login (avec les idenfiants de bibcnrs)
```
 puis :
```bash
  npm deploy
```