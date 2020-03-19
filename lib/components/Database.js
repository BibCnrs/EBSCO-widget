import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'react-fa';
import memoize from 'lodash.memoize';

import sortBy from 'lodash/sortBy';
import DatabaseItem from './DatabaseItem';
import createDomainSelectorContainer from '../containers/createDomainSelectorContainer';
import { proxify } from './OALink';

const DomainSelector = createDomainSelectorContainer('database');

export const onDbClick = memoize(
    (clickDb, domain, name) => () => clickDb(domain, name),
    (clickDb, domain, name) => `${domain}${name}`,
);

export const DatabaseLetter = ({
    databases,
    language,
    domain,
    apiUrl,
    clickDb,
}) => {
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
                                database.use_proxy
                                    ? `https://${domain.toLowerCase()}.bib.cnrs.fr/login?url=${
                                          database[`url_${language}`]
                                      }`
                                    : proxify(
                                          apiUrl,
                                          database[`url_${language}`],
                                          null,
                                          domain,
                                          name,
                                          true,
                                      )
                            }
                            title={database[`text_${language}`]}
                            domain={domain}
                            oa={database.oa}
                            onDbClick={onDbClick(clickDb, domain, name)}
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
    apiUrl: PropTypes.string.isRequired,
    clickDb: PropTypes.func.isRequired,
};

export const Database = ({ databases, language, domain, apiUrl, clickDb }) => {
    const letters = sortBy(Object.keys(databases), v => v);

    if (!letters.length) {
        return <Icon name="spinner" spin={true} size="2x" />;
    }
    return (
        <div>
            <DomainSelector />
            <ul className="database">
                {letters.map(letter => {
                    const letterDatabases = databases[letter].filter(
                        db => db.domains.indexOf(domain) !== -1,
                    );
                    if (!letterDatabases.length) {
                        return <span key={letter} />;
                    }
                    return (
                        <li className={`letter letter_${letter}`} key={letter}>
                            <span className="header">
                                {letter.toUpperCase()}
                            </span>
                            <DatabaseLetter
                                databases={letterDatabases}
                                language={language}
                                domain={domain}
                                apiUrl={apiUrl}
                                clickDb={clickDb}
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
    apiUrl: PropTypes.string.isRequired,
    clickDb: PropTypes.func.isRequired,
};

export default Database;
