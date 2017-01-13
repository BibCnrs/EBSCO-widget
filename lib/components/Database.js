import React, { PropTypes } from 'react';
import Icon from 'react-fa';

import DatabaseItem from './DatabaseItem';
import createDomainSelectorContainer from '../containers/createDomainSelectorContainer';

const DomainSelector = createDomainSelectorContainer('database');

export const DatabaseLetter = ({ databases, language, domain }) => {
    return (
        <ul>
            {databases.map((database) => {
                const name = database[`name_${language}`];
                return (
                    <li key={name.replace(' ', '_')}>
                        <DatabaseItem
                            name={name}
                            image={database.image}
                            url={ domain !== 'ALL' ? `https://${domain.toLowerCase()}.bib.cnrs.fr/login?url=${encodeURIComponent(database[`url_${language}`])}` : null}
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
    const letters = Object.keys(databases);
    if (!letters.length) {
        return <Icon name="spinner" spin={true} size="2x"/>;
    }
    return (
        <div>
            <DomainSelector/>
            <ul className='database'>
                {letters.sort((prev, cur) => prev > cur).map(letter => {
                    const letterDatabases = domain !== 'ALL' ? databases[letter].filter(db => db.domains.indexOf(domain) !== -1) : databases[letter];
                    if (!letterDatabases.length) {
                        return <span/>;
                    }
                    return (
                        <li className="letter" key={letter}>
                            <span className="header">{letter.toUpperCase()}</span>
                            <DatabaseLetter databases={letterDatabases} language={language} domain={domain}/>
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
