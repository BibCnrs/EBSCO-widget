export default {
    ActiveFacet: {
        label: 'Appliquer vos filtres'
    },
    ArticleLink: {
        fullTextLinks: 'Accès à l\'article',
        pdfLinks: 'Accès au pdf',
        urls: 'Urls',
        html: 'html',
        noLinks: 'Pas d\'accès pour cet article.',
        linksLoading: 'Chargement des liens',
        'Access URL': 'URL d\'accès',
        'Other URLs': 'Autres URLs',
        Availability: 'Disponibilité',
        'Lien(s) texte intégral': 'Lien(s) texte intégral'
    },
    ArticleRecord: {
        by: 'Par',
        export: 'Exporter'
    },
    ArticleSearchInputList: {
        add: 'ajouter un nouveau champ à la recherche',
        remove: 'retirer le champ de la recherche'
    },
    ArticleSearchMenu: {
        history: 'l\'historique',
        historyInfo: 'Consulter l\'historique de vos recherche.',
        show: 'afficher',
        hide: 'cacher'
    },
    Authentication: {
        login: 'identifiant',
        password: 'mot de passe',
        title: 'Identifiez-vous',
        info: 'La ressource ou le service souhaité est réservé aux ayants droit du CNRS. Pour y accéder il est nécessaire de s\'identifier.',
        connection: 'Connexion',
        janus: 'se connecter avec janus',
        labintelAccount: 'Via le gestionnaire d\'identité janus',
        inistAccount: 'Via votre ancien code d\'accès portail',
        contact: 'nous contacter',
        askAccount: 'demander un compte',
        janusExplanation: 'Compte personnel pour l\'ensemble des services du CNRS : Agate, Simbad...'
    },
    BatchExport: {
        export: 'Exporter sélection',
        'Exporter en format RIS': 'format RIS',
        'Exporter en format BIBTEX': 'format BIBTEX'
    },
    BibNavbar: {
        article: 'Un article',
        title: 'Une revue, un ouvrage',
        db: 'Une base de données',
        search: 'Rechercher :',
        close: 'fermer',
        fullScreen: 'plein écran',
        connect: 'Connexion',
        disconnect: 'Déconnexion',
        Availability: 'Disponibilité'
    },
    DL: {
        fullTextLinks: 'Accès à l\'article',
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
        DateEntry: 'Date d\'entrée',
        DateUpdate: 'Date de mises à jour',
        SubjectOther: 'Autres mots clés',
        DatePubCY: 'Année de publication',
        AffiliationAuthor: 'Affiliation auteur',
        Copyright: 'Droit d\'auteur',
        Publisher: 'Editeur',
        Subset: 'Sous catégorie',
        Subject: 'Mot clé',
        TypeDocument: 'Type de document',
        Keyword: 'Mot clé',
        AbstractSuppliedCopyright: 'Droit d\'auteur résumé',
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
        'Access URL': 'URL d\'accès',
        'Other URLs': 'Autres URLs',
        PubInfo: 'Fréquence',
        NoteScope: 'Description',
        PeerReviewed: 'Relu par un comité de lecture',
        SubjectBISAC: 'Mot clé BISAC',
        AN: 'Numéro d\'accès',
        fullTextHoldings: 'Accès ressource ',
        Availability: 'Disponibilité',
        FullTextWordCount: 'Nombre de mot dans le texte intégral',
        SubjectPerson: 'Mot clé personne',
        TitleTranslated: 'Titre traduit'
    },
    DomainSelector: {
        title: 'Choisissez le domaine de votre recherche.',
        available: 'Vous avez accès à ce domaine',
        unavailable: 'Vous n\'avez pas accès à ce domaine',
        INSB: 'biologie',
        INC: 'chimie',
        INEE: 'écologie & environnement',
        INSHS: 'homme & société',
        INSIS: 'ingénierie & systèmes',
        INSMI: 'mathématiques',
        IN2P3: 'nucléaire & particules',
        INP: 'physique',
        INS2I: 'sciences de l\'information',
        INSU: 'terre & univers',
        noDomain: 'Aucun domaine',
        noDomainTooltip: 'Le système n’a pas pu lier votre compte à un domaine scientifique. Veuillez contacter l’équipe d’assistance technique.'
    },
    EDS: {
        refine: 'Affiner votre recherche'
    },
    Etc: {
        other: 'et 1 autre',
        others: 'et <x> autres'
    },
    Error: {
        LOGIN_ERROR: 'L\'authentification à échoué',
        RETRIEVE_ERROR: 'La notice de l\'article n\'a put être récupéré',
        RETRIEVE_LINK_ERROR: 'Les liens vers le texte intégral n\'ont pu être récupéré',
        SEARCH_ERROR: 'La recherche à échoué',
        FETCH_DOMAINS_ERROR: 'La liste des domaines n\'a pu être récupéré',
        ACCESS_ERROR: 'Vous n\'avez pas accès aux notices de ce domaine',
        EXPORT_NOTICE_ERROR: 'Les notices sélectionnées n\'ont put être exportées',
        DISCONNECTED: 'Votre session a expiré.',
        NO_DOMAIN_ERROR: 'Le système n’a pas pu lier votre compte à un domaine scientifique.',
        0: 'L\'api n\'as put être contactée',
        1: 'S\'il vous plait reconnectez-vous.',
        2: 'Veuillez contacter l’équipe d’assistance technique.',
        400: '400 - Bad Request',
        401: '401 - Unauthorized',
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
        502: '502 - Bad Gateway',
        503: '503 - Service Unavailable',
        504: '504 - Gateway Timeout',
        505: '505 - HTTP Version Not Supported',
        failedFetch: 'La requête à échoué'
    },
    ExactMatchPlacard: {
        placeholder: 'Rechercher dans la publication'
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
        ContentProvider: 'Fournisseur de contenu'
    },
    FullTextHolding: {
        date: '<day>/<month>/<year>',
        now: 'présent'
    },
    FullTextHoldings: {
        access: 'Accès ressource'
    },
    History: {
        searchedTerm: 'Terme recherchés',
        domain: 'Domaine',
        limits: 'Limites',
        facets: 'Facettes',
        actions: 'Actions',
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
        publisher: 'Editeur'
    },
    NoAccessToDomain: {
        forbid: 'Non autorisée',
        message: 'Vous n\'avez pas accès au domaine'
    },
    PrettyLimiter: {
        fullText: 'Texte intégral',
        peerReviewedArticle: 'Relu par un comité de lecture',
        publicationDate: 'Date de publication',
        Journal: 'Journal',
        SubjectEDS: 'Mots clé',
        Publisher: 'Editeur',
        Publication: 'Publication',
        Language: 'Langue',
        Category: 'Categorie',
        ContentProvider: 'Fournisseur de contenu'
    },
    Publication: {
        refine: 'Affiner votre recherche'
    },
    PublicationDateLimiter: {
        date: 'Date',
        to: 'à'
    },
    PublicationIdLimiter: {
        publication: 'Publication'
    },
    PublicationRecord: {
        type: 'Type',
        access: 'Accès ressource'
    },
    ArticleSearchInput: {
        searchPlaceholder: 'Rechercher des articles, des chapitres de livre...'
    },
    fullTextLimiter: {
        fullText: 'Texte Intégral'
    },
    peerReviewedArticleLimiter: {
        peerReviewedArticle: 'Relu par un comité de lecture'
    },
    peerReviewedPublicationLimiter: {
        peerReviewedPublication: 'Relu par un comité de lecture'
    },
    PublicationSearchInput: {
        searchPlaceholder: 'Rechercher des titres de revues, de livres...'
    },
    RecordList: {
        noResults: 'Aucun résultat trouvé.'
    },
    Search: {
        search: 'Rechercher'
    },
    SearchResult: {
        searchResults: 'Résultats de recherche'
    },
    SortSelector: {
        sortBy: 'Tri',
        relevance: 'pertinence',
        title: 'alphabétique',
        new: '+ récent',
        old: '+ ancien'
    },
    FieldSelector: {
        all: 'Tout',
        author: 'Auteur',
        exactAuthor: 'Auteur exact',
        title: 'Titre',
        subject: 'Sujet',
        abstract: 'Résumé',
        publisher: 'Editeur',
        fieldInfo: 'Vous pouvez préciser ici le champ sur lequel lancer votre recherche'
    }
};
