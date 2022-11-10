import PropTypes from 'prop-types';
import React from 'react';

import PrettyLimiter from './PrettyLimiter';
import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';
import AlertButton from './AlertButton';

export const HistoryItem = ({
    query,
    text,
    reloadHistory,
    restoreHistory,
    deleteHistory,
    saveAlert,
    removeAlert,
    isAlertEnabled,
    disableAlert,
}) => {
    const fieldLabel = {
        [null]: text.all,
        AU: text.author,
        AR: text.exactAuthor,
        TI: text.title,
        SU: text.subject,
        SO: text.source,
        AB: text.abstract,
        IS: 'ISSN',
        IB: 'ISBN',
        PB: text.publisher,
    };

    return (
        <tr>
            <td>
                {query.queries
                    .map(q => `${fieldLabel[q.field] || q.field}: ${q.term}`)
                    .join(', ')}
            </td>
            <td>{query.domain}</td>
            <td>
                <PrettyLimiter data={query.limiters} />
            </td>
            <td>
                <PrettyLimiter data={query.activeFacets} />
            </td>
            <td>
                <BibButton
                    className="refresh"
                    label={` ${
                        query.totalHits > 1
                            ? text.results.replace('<x>', query.totalHits)
                            : text.result
                    }`}
                    icon={{ name: 'refresh' }}
                    onClick={() => reloadHistory(query)}
                    tooltip={text.reload}
                    aria-label={text.reloadLabel}
                />
                <BibButton
                    className="edit"
                    icon={{ name: 'edit' }}
                    onClick={() => restoreHistory(query)}
                    tooltip={text.modify}
                    aria-label={text.modifyLabel}
                />
                <BibButton
                    className="delete"
                    icon={{ name: 'trash' }}
                    onClick={() => deleteHistory(query)}
                    tooltip={text.delete}
                    aria-label={text.deleteLabel}
                />
                {isAlertEnabled && (
                    <AlertButton
                        saveAlert={saveAlert}
                        removeAlert={removeAlert}
                        disableAlert={disableAlert}
                        id={query.id}
                        alertExists={query.hasAlert}
                        frequence={query.frequence}
                        active={query.active}
                    />
                )}
            </td>
        </tr>
    );
};

HistoryItem.propTypes = {
    deleteHistory: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
    reloadHistory: PropTypes.func.isRequired,
    restoreHistory: PropTypes.func.isRequired,
    saveAlert: PropTypes.func.isRequired,
    removeAlert: PropTypes.func.isRequired,
    disableAlert: PropTypes.func.isRequired,
    text: PropTypes.object.isRequired,
    isAlertEnabled: PropTypes.bool.isRequired,
};

HistoryItem.defaultProps = {
    text: {
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
};

export default translate(HistoryItem);
