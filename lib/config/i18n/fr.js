export default {
    ActiveFacet: {
        label: 'Réinitialiser vos filtres',
    },
    AlertButton: {
        save: 'Enregistrer',
        title: 'Réglages Alerte',
        month: 'Mensuelle',
        week: 'Hebdomadaire',
        day: 'Quotidienne',
        none: 'Jamais',
        createAlert: 'Créer une alerte',
        editAlert: `Modifier l'alerte`,
        disableAlert: 'Désactiver/réactiver une alerte',
        disabled: 'Inactif',
    },
    ArticleLink: {
        fullTextLinks: "Accès à l'article",
        pdfLinks: 'Accès au pdf',
        urls: 'Urls',
        html: 'html',
        noLinks: "Pas d'accès pour cet article.",
        linksLoading: 'Chargement des liens',
        'Access URL': "URL d'accès",
        'Other URLs': 'Autres URLs',
        Availability: 'Disponibilité',
        'Lien(s) texte intégral': 'Lien(s) texte intégral',
    },
    ArticleRecord: {
        by: 'Par',
        export: 'Exporter',
    },
    ArticleSearchInputList: {
        add: 'ajouter un nouveau champ à la recherche',
        remove: 'retirer le champ de la recherche',
    },
    ArticleSearchMenu: {
        history: "l'historique",
        historyInfo: "Consulter l'historique de vos recherches.",
        show: 'afficher',
        hide: 'cacher',
    },
    Authentication: {
        login: 'identifiant',
        password: 'mot de passe',
        title: 'Identifiez-vous',
        info:
            "La ressource ou le service souhaité est réservé aux ayants droit du CNRS. Pour y accéder il est nécessaire de s'identifier.",
        chooseMode: 'Veuillez sélectionner votre mode de connexion :',
        connection: 'Connexion',
        janus: 'se connecter avec janus',
        labintelAccount: "Via le gestionnaire d'identité janus",
        inistAccount: "Via votre ancien code d'accès portail",
        contact: 'nous contacter',
        askAccount: 'demander un compte janus',
        janusExplanation:
            "Compte personnel pour l'ensemble des services du CNRS : Agate, Simbad...",
    },
    Profile: {
        form: {
            title: 'Titre',
            url: 'Url',
        },
        favouriteResourcesTooltip:
            'liste des articles, des revues ou des bases de données bookmarqués depuis BibCnrs',
        personalResourceTooltip:
            'liste des ressources bookmarquées manuellement hors BibCnrs',
        account: 'Vos préférences pour le compte:',
        contact: 'Nous contacter',
        favoriteDomain:
            'Sélectionnez votre domaine favori dans la liste ci-dessous',
        info: `
<p>Si vous êtes ayant-droit de plusieurs domaines, vous pouvez définir le domaine par défaut sur lequel porteront vos recherches.</p>
<p>La prise en compte de votre domaine favori nécessite la déconnexion puis la reconnexion à BibCnrs dès que vous enregistrez un autre domaine.</p>
<p>A tout moment, vous pouvez changer votre domaine favori.</p>`,
        invalidFavoriteDomain:
            "Vous n'avez pas/plus accès à votre communauté favorite.",
        save: 'Enregistrer',
        saveSuccess: 'Votre domaine favori a été enregistré.',
        title: 'Mon profil',
        favouriteDomainTab: 'Domaine favori',
        domainsTab: 'Mes domaines',
        oneDomain: 'Mon domaine',
        favouriteResourcesTab: 'Ressources favorites',
        personalResourceTab: 'Ressources personnelles',
        favouriteDomainHelp: username => `
    Vos préférences pour le compte: ${username}
    <br>
    Si vous êtes ayant-droit de plusieurs
    domaines, vous pouvez définir le domaine par
    défaut sur lequel porteront vos recherches.<br>
    A tout moment, vous pouvez changer votre
    domaine favori sélectionné en cliquant sur
    un autre domaine. <br>
    La prise en compte de
    votre domaine favori nécessite la
    déconnexion puis la reconnexion à BibCnrs
    dès que vous enregistrez un autre domaine
        `,
    },
    BatchExport: {
        export: 'Exporter sélection',
        ris: 'format RIS',
        bibtex: 'format BIBTEX',
    },
    BibNavbar: {
        article: 'Un article',
        title: 'Une revue, un ouvrage',
        db: 'Une base de données',
        search: 'Rechercher :',
        close: 'fermer',
        Availability: 'Disponibilité',
        metadore: 'Données de recherche',
    },
    BookmarkButton: {
        tooltipAdd: 'Ajouter aux ressources favorites',
        tooltipRemove: 'Retirer des ressources favorites',
    },
    Connection: {
        connect: 'Connexion',
        disconnect: 'Déconnexion',
    },
    DL: {
        fullTextLinks: "Accès à l'article",
        pdfLinks: 'Accès au pdf',
        dbId: 'Id base de données',
        Author: 'Auteur',
        TitleSource: 'Source',
        TypePub: 'Type de publication',
        Language: 'Langue',
        PublisherInfo: 'Info éditeur',
        SubjectMESH: 'Mot clé MESH',
        Abstract: 'Résumé',
        Comment: 'Commentaire',
        NumberCAS: 'Numéro CAS',
        DateEntry: "Date d'entrée",
        DateUpdate: 'Date de mises à jour',
        SubjectOther: 'Autres mots clés',
        DatePubCY: 'Année de publication',
        AffiliationAuthor: 'Affiliation auteur',
        Copyright: "Droit d'auteur",
        Publisher: 'Editeur',
        Subset: 'Sous catégorie',
        Subject: 'Mot clé',
        TypeDocument: 'Type de document',
        Keyword: 'Mot clé',
        AbstractSuppliedCopyright: "Droit d'auteur résumé",
        SubjectGeographic: 'Mot clé géographique',
        SubjectCompany: 'Mot clé compagnie',
        PhysDesc: 'Description physique',
        SubjectThesaurus: 'Mot clé thésaurus',
        CodeClass: 'Classification',
        PatentInfo: 'Brevet',
        Treatment: 'Traitement',
        NumberRef: 'Numéro de référence',
        Avail: 'Disponibilité',
        CodeNAICS: 'Code NAICS',
        'Access URL': "URL d'accès",
        'Other URLs': 'Autres URLs',
        PubInfo: 'Fréquence',
        NoteScope: 'Description',
        PeerReviewed: 'Relu par un comité de lecture',
        SubjectBISAC: 'Mot clé BISAC',
        AN: "Numéro d'accès",
        fullTextHoldings: 'Accès ressource ',
        Availability: 'Disponibilité',
        FullTextWordCount: 'Nombre de mot dans le texte intégral',
        SubjectPerson: 'Mot clé personne',
        TitleTranslated: 'Titre traduit',
    },
    DomainSelector: {
        title: 'Choisissez le domaine de votre recherche.',
        available: 'Vous avez accès à ce domaine',
        unavailable: "Vous n'avez pas accès à ce domaine",
        INSB: 'biologie',
        INC: 'chimie',
        INEE: 'écologie & environnement',
        INSHS: 'homme & société',
        INSIS: 'ingénierie & systèmes',
        INSMI: 'mathématiques',
        IN2P3: 'nucléaire & particules',
        INP: 'physique',
        INS2I: "sciences de l'information",
        INSU: 'terre & univers',
        noDomain: 'Aucun domaine',
        noDomainTooltip:
            'Le système n’a pas pu lier votre compte à un domaine scientifique. Veuillez contacter l’équipe d’assistance technique.',
    },
    EDS: {
        refine: 'Affiner votre recherche',
        inistExplanation: `Vous n'êtes pas connecté au niveau individuel. Grâce à la connexion via janus, vous pouvez disposer d'un profil personnel vous permettant un accès rapide à vos ressources favorites ou à la personnalisation de votre domaine de recherche.`,
    },
    Database: {
        databaseMess: 'Pour voir toutes les bases connectez-vous',
    },
    Etc: {
        other: 'et 1 autre',
        others: 'et <x> autres',
    },
    Error: {
        LOGIN_ERROR: "L'authentification à échoué",
        RETRIEVE_ERROR: "La notice de l'article n'a pas pu être récupérée",
        RETRIEVE_ERROR_401: `Saisie identifiant / mot de passe erronée. Merci de bien vouloir essayer à nouveau (en majuscule sans espace).
Si le problème persiste, n'hésitez pas à contacter assistance-portail@inist.fr`,
        RETRIEVE_LINK_ERROR:
            "Les liens vers le texte intégral n'ont pu être récupéré",
        SEARCH_ERROR: 'La recherche à échoué',
        FETCH_DOMAINS_ERROR: "La liste des domaines n'a pu être récupéré",
        ACCESS_ERROR: "Vous n'avez pas accès aux notices de ce domaine",
        EXPORT_NOTICE_ERROR:
            "Les notices sélectionnées n'ont put être exportées",
        DISCONNECTED: 'Votre session a expiré.',
        NO_DOMAIN_ERROR:
            'Le système n’a pas pu lier votre compte à un domaine scientifique.',
        0: "L'api n'a pu être contactée",
        1: "S'il vous plait reconnectez-vous.",
        2: 'Veuillez contacter l’équipe d’assistance technique.',
        400: '400 - Bad Request',
        401: `L'identifiant/mot de passe saisi n'a pas permis de vous connecter au portail, veuillez essayer à nouveau en majuscule sans espace. Si le problème persiste, n'hésitez pas à contacter assistance-portail@inist.fr`,
        403: '403 - Forbidden',
        404: '404 - Not Found',
        405: '405 - Method Not Allowed',
        406: '406 - Not acceptable',
        407: '407 - Proxy Authentication Required',
        408: '408 - Request timeout',
        409: '409 - Conflict',
        410: '410 - Gone',
        411: '411 - Length required',
        412: '412 - Precondition failed',
        413: '413 - Request Entity Too Large',
        414: '414 - Request-URI Too Long',
        415: '415 - Unsupported Media Type',
        416: '416 - Requested Range Not Satisfiable',
        417: '417 - Expectation Failed',
        500: '500 - Internal Server Error',
        501: '501 - Not Implemented',
        502: `Suite à une erreur internet, la requête n'a pas pu aboutir. Merci de la relancer ultérieurement`,
        503: '503 - Service Unavailable',
        504: '504 - Gateway Timeout',
        505: '505 - HTTP Version Not Supported',
        failedFetch: 'La requête à échoué',
    },
    ExactMatchPlacard: {
        placeholder: 'Rechercher dans la publication',
    },
    Facet: {
        SubjectPubDb: 'Mot clé',
        TypePublicationPubD: 'Type de publication',
        PublisherPubDb: 'Editeur',
        SourceType: 'Type de ressource',
        SubjectEDS: 'Mot clé',
        Journal: 'Titre de publication',
        Language: 'Langue',
        PublicationYear: 'Année de publication',
        Publisher: 'Editeur',
        ContentProvider: 'Fournisseur de contenu',
    },
    FullTextHolding: {
        date: ({ day, month, year }) =>
            year === '9999' ? 'présent' : `${day}/${month}/${year}`,
    },
    FullTextHoldings: {
        access: 'Accès ressource',
    },
    Header: {
        authorizations: 'Domaines autorisés',
        connect: 'Connexion',
        disconnect: 'Déconnexion',
    },
    History: {
        alert: 'alertes',
        search: 'recherches',
        searchedTerm: 'Terme recherchés',
        domain: 'Domaine',
        limits: 'Limites',
        facets: 'Facettes',
        actions: 'Actions',
        showOnlyAlert: 'Afficher uniquement les alertes',
        removeAllSearchNotAlert: "Supprimer l'historique",
        toggleAllAlert: 'Activer/désactiver toutes les alertes',
        confirmDeleteAll:
            "Voulez vous vraiment supprimer tout l'historique (hors alertes) ?",
    },
    HistoryItem: {
        reload: 'recharger',
        modify: 'modifier',
        delete: 'supprimer',
        result: '1 résultat',
        results: '<x> résultats',
        all: 'Tout',
        author: 'Auteur',
        exactAuthor: 'Auteur exact',
        title: 'Titre',
        subject: 'Sujet',
        source: 'Source',
        abstract: 'Résumé',
        publisher: 'Editeur',
    },
    NoAccessToDomain: {
        forbid: 'Non autorisée',
        message: "Vous n'avez pas accès au domaine",
    },
    PrettyLimiter: {
        fullText: 'Texte intégral',
        openAccess: 'Accès libre',
        peerReviewedArticle: 'Relu par un comité de lecture',
        publicationDate: 'Date de publication',
        Journal: 'Journal',
        SubjectEDS: 'Mots clé',
        Publisher: 'Editeur',
        Publication: 'Publication',
        Language: 'Langue',
        Category: 'Categorie',
        ContentProvider: 'Fournisseur de contenu',
    },
    ProfileButton: {
        profile: 'Ouvrir mon profil',
        favorite_domain: 'Domaine favori',
        authorizations: 'Domaines autorisés',
    },
    Publication: {
        refine: 'Affiner votre recherche',
    },
    PublicationDateLimiter: {
        date: 'Date',
        to: 'à',
    },
    PublicationIdLimiter: {
        publication: 'Publication',
    },
    PublicationRecord: {
        type: 'Type',
        access: 'Accès ressource',
        notConnected: 'Connectez-vous et relancez la recherche',
        diamond: 'Revue diamant',
    },
    ArticleSearchInput: {
        searchPlaceholder:
            'Rechercher des articles, des chapitres de livre, des DOIs, des auteurs, des mots du résumé du titre, ISSN, ISBN.',
    },
    fullTextLimiter: {
        fullText: 'Texte Intégral',
    },
    openAccessLimiter: {
        openAccess: 'Accès libre',
    },
    peerReviewedArticleLimiter: {
        peerReviewedArticle: 'Relu par un comité de lecture',
    },
    peerReviewedPublicationLimiter: {
        peerReviewedPublication: 'Relu par un comité de lecture',
    },
    PublicationSearchInput: {
        searchPlaceholder: 'Rechercher des titres de revues, de livres...',
    },
    MetaDoreSearchInput: {
        searchPlaceholder: 'Recherche',
    },
    RecordList: {
        noResults: 'Aucun résultat trouvé.',
        noFullTextResults: `Pas d'accès au texte intégral pour cet article.`,
        noticeOnly:
            'Seule la notice correspondant à votre DOI est disponible :',
    },
    SearchInput: {
        search: 'Rechercher',
    },
    SearchResult: {
        searchResults: 'Résultats de recherche',
    },
    ShowResultButton: {
        openTooltip: 'Afficher les résultats de la dernière requête',
        closeTooltip: 'Masquer les résultats de la dernière requête',
    },
    SortSelector: {
        sortBy: 'Tri',
        relevance: 'pertinence',
        title: 'alphabétique',
        new: '+ récent',
        old: '+ ancien',
    },
    FieldSelector: {
        all: 'Tout',
        author: 'Auteur',
        exactAuthor: 'Auteur exact',
        title: 'Titre',
        subject: 'Sujet',
        abstract: 'Résumé',
        publisher: 'Editeur',
        fieldInfo:
            'Vous pouvez préciser ici le champ sur lequel lancer votre recherche',
    },
};
