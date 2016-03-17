export const availableSort = [
    {
        label: 'pertinence',
        value: 'relevance'
    }, {
        label: `date (récent - ancien)`,
        value: 'date'
    }, {
        label: `date (ancien - récent)`,
        value: 'date2'
    }
];

export const availableFields = [
    {
        label: 'Tout',
        value: null
    }, {
        label: `Auteur`,
        value: 'AU'
    }, {
        label: `Titre`,
        value: 'TI'
    }, {
        label: `Sujet`,
        value: 'SU'
    }, {
        label: `Source`,
        value: 'S0'
    }, {
        label: `Résumé`,
        value: 'AB'
    }, {
        label: `ISSN`,
        value: 'IS'
    }, {
        label: `ISBN`,
        value: 'IB'
    }
];

export const availableBoolean = [
    'AND',
    'OR',
    'NOT'
];
