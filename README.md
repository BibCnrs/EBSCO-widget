# EBSCO-widget

widget React pour interroger BibApi

## Installation
Installer avec npm `npm install ebsco-widget`
Ajouter le js et le css
```html
<link rel="stylesheet" id="ebsco_widget-css" href="/build/app.css?ver=0.13.1" type="text/css" media="all">
<script type="text/javascript" src="/build/app.js?ver=0.13.1"></script>
```

Ajouter la div qui contiendra le widget:
```html
<div id="ebsco_widget"></div>
```
Et initialiser le widget avec:
```js
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        var rootElement = document.getElementById('ebsco_widget');
        window.ReactDom.render(React.createElement(window.EbscoWidget, { // options
            url: 'https://bib.crns.fr/api/ebsco', //obligatoire: url de bibapi
            domain: 'default domain' // facultatif: l'institut que le widget utlisera par défaut si disponible
        }), rootElement);
    }
};
```

## développement

### dépendance:
    `make install`
### serveur de développement
Lancer webpack dev server: `make run-dev`
Ensuite aller sur `localhost:3001/webpack-dev-server`
Il est possible d'ajouter `?debug_session=<name>` pour créer une session qui sauvegardera l'état du widget' dans le localstorage.
Il est également  nécessaire d'avoir BibApi de lancer sur  localhost:3000

### build
Construire build/app.js et build/app.css :`make build`

### serve

Servir une page html de test incorporant le widget construit: `make serve`

Le serveur web écoutera ensuite sur l'url suivante : http://127.0.0.1:3002/

## Test

- `make test`: lancer tout les tests
- `make test-mocha`: lancer les tests unitaires mocha
- `make selenium`: lancer selenium hub et chrome (nécessaire pour les tests "end to end")
- `make selenium-debug`: lancer selenium en mode debug ce qui permet de s'y connecter avec [VNC](https://www.realvnc.com/products/vnc/) pour un retour graphique
[Application chrome gratuite VNC](https://chrome.google.com/webstore/detail/vnc%C2%AE-viewer-for-google-ch/iabmpiboiopbgfabjmgeedhcmjenhbla?hl=en)
- `make test-e2e`: lancer les tests "end to end" nightwatch

## Useful commands

`make` liste toutes les commandes disponible ainsi que leurs aides

`make npm`: permet de lancer les commandes npm dockerizé
example: `make npm install koa --save`

```sh
see [npm documentation](https://docs.npmjs.com/all)
```
