import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'react-fa';

import sortBy from 'lodash/sortBy';
import DatabaseItem from './DatabaseItem';
import createDomainSelectorContainer from '../containers/createDomainSelectorContainer';

const DomainSelector = createDomainSelectorContainer('database');

export const DatabaseLetter = ({ databases, language, domain }) => {
    return (
        <ul>
            {databases.map(database => {
                const name = database[`name_${language}`];
                return (
                    <li key={name.replace(' ', '_')}>
                        <DatabaseItem
                            name={name}
                            image={database.image}
                            url={
                                domain !== 'ALL'
                                    ? `https://${domain.toLowerCase()}.bib.cnrs.fr/login?url=${
                                          database[`url_${language}`]
                                      }`
                                    : null
                            }
                            title={database[`text_${language}`]}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

DatabaseLetter.propTypes = {
    databases: PropTypes.array,
    language: PropTypes.string.isRequired,
    domain: PropTypes.string,
};

export const Database = ({ databases, language, domain }) => {
    const letters = sortBy(Object.keys(databases), v => v);

    if (!letters.length) {
        return <Icon name="spinner" spin={true} size="2x" />;
    }
    return (
        <div>
            <DomainSelector />
            <ul className="database">
                {letters.map(letter => {
                    const letterDatabases =
                        domain !== 'ALL'
                            ? databases[letter].filter(
                                  db => db.domains.indexOf(domain) !== -1,
                              )
                            : databases[letter];
                    if (!letterDatabases.length) {
                        return <span key={letter} />;
                    }
                    return (
                        <li className="letter" key={letter}>
                            <span className="header">
                                {letter.toUpperCase()}
                            </span>
                            <DatabaseLetter
                                databases={letterDatabases}
                                language={language}
                                domain={domain}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

Database.propTypes = {
    databases: PropTypes.object,
    language: PropTypes.string.isRequired,
    domain: PropTypes.string,
};

export default Database;
