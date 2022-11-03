import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Icon from 'react-fa';
import _ from 'lodash';

import sortBy from 'lodash/sortBy';
import DatabaseItem from './DatabaseItem';
import { proxify } from './OALink';
import { Checkbox } from 'react-bootstrap';
import SearchDomains from './SearchDomains';

export const onDbClick = _.memoize(
    (clickDb, domain, name) => () => clickDb(domain, name),
    (clickDb, domain, name) => `${domain}${name}`,
);

export const DatabaseLetter = ({
    databases,
    isLogged,
    language,
    domain,
    apiUrl,
    clickDb,
}) => {
    const isDatabase = true;
    return (
        <ul>
            {databases.map(database => {
                const name = database[`name_${language}`];
                const url = database[`url_${language}`];
                const databaseUrl = database.use_proxy
                    ? `https://${domain.toLowerCase()}.bib.cnrs.fr/login?url=${url}`
                    : proxify(
                          apiUrl,
                          url,
                          null,
                          domain,
                          name,
                          isDatabase,
                          isLogged,
                      );
                return (
                    <li key={name.replace(' ', '_')}>
                        <a
                            className="link-database"
                            onClick={onDbClick(clickDb, domain, name)}
                            href={databaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <DatabaseItem
                                name={name}
                                image={database.image}
                                url={databaseUrl}
                                title={database[`text_${language}`]}
                                domain={domain}
                                oa={database.oa}
                            />
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};

DatabaseLetter.propTypes = {
    databases: PropTypes.array,
    isLogged: PropTypes.bool.isRequired,
    language: PropTypes.string.isRequired,
    domain: PropTypes.string,
    apiUrl: PropTypes.string.isRequired,
    clickDb: PropTypes.func.isRequired,
};

export const Database = ({
    databases,
    isLogged,
    language,
    domain,
    apiUrl,
    clickDb,
    text,
}) => {
    const [filterByOa, setFilterByOa] = React.useState(false);
    const [filteredDatabase, setFilteredDatabase] = React.useState(
        databases || [],
    );
    const letters = sortBy(Object.keys(databases), v => v);

    useEffect(() => {
        if (filterByOa && databases) {
            const filtered = Object.keys(databases).reduce((acc, letter) => {
                acc[letter] = databases[letter].filter(db => db.oa);
                return acc;
            }, {});
            setFilteredDatabase(filtered);
        } else {
            setFilteredDatabase(databases);
        }
    }, [filterByOa, databases]);

    if (!letters.length) {
        return <Icon name="spinner" spin={true} size="2x" />;
    }
    return (
        <div className="database-block">
            <div className="search-bar">
                <SearchDomains />
            </div>
            <div className="database-block__filter">
                {isLogged ? (
                    <Checkbox
                        type="checkbox"
                        className="database-block__filter-checkbox"
                        onChange={event => setFilterByOa(event.target.checked)}
                        checked={!!filterByOa}
                    >
                        {text.openAccess}
                    </Checkbox>
                ) : (
                    <div className="inist-message">
                        <p>{text.databaseMess}</p>
                    </div>
                )}
            </div>
            <ul className="databases">
                {letters.map(letter => {
                    let letterDatabases = [];
                    // if not domain, display oa database only
                    if (!domain) {
                        letterDatabases = filteredDatabase[letter]
                            .filter(db => db.oa === true)
                            .map(db => ({
                                ...db,
                                use_proxy: false,
                            }));
                    } else {
                        letterDatabases = filteredDatabase[letter].filter(
                            db => db.domains.indexOf(domain) !== -1,
                        );
                    }
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
                                isLogged={isLogged}
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
    isLogged: PropTypes.bool.isRequired,
    language: PropTypes.string.isRequired,
    domain: PropTypes.string,
    apiUrl: PropTypes.string.isRequired,
    clickDb: PropTypes.func.isRequired,
    text: PropTypes.object,
};

Database.defaultProps = {
    text: {
        databaseMess:
            'Connectez-vous pour accéder à toutes les bases / Sign in to access all databases',
    },
};

export default Database;
