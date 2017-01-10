import React, { PropTypes } from 'react';

import DatabaseItem from './DatabaseItem';
import createDomainSelectorContainer from '../containers/createDomainSelectorContainer';

const DomainSelector = createDomainSelectorContainer('database');

export const DatabaseLetter = ({ databases, language }) => {
    return (
        <ul>
            {databases.map(database => (
                <li key={database.name.replace(' ', '_')}>
                    <DatabaseItem
                        name={database.name}
                        image={database.image}
                        url={database[`url_${language}`]}
                        title={database[`text_${language}`]}
                    />
                </li>
            ))}
        </ul>
    );
};

DatabaseLetter.propTypes = {
    databases: PropTypes.array,
    language: PropTypes.string.isRequired,
};

export const Database = ({ databases, language, domain }) => (
    <div>
        <DomainSelector/>
        <ul className='database'>
            {Object.keys(databases).sort((prev, cur) => prev > cur).map(letter => {
                const letterDatabases = domain !== 'ALL' ? databases[letter].filter(db => db.domains.indexOf(domain) !== -1) : databases[letter];
                if (!letterDatabases.length) {
                    return <span/>;
                }
                return (
                    <li className="letter" key={letter}>
                        <span className="header">{letter.toUpperCase()}</span>
                        <DatabaseLetter databases={letterDatabases} language={language}/>
                    </li>
                );
            })}
        </ul>
    </div>
);

Database.propTypes = {
    databases: PropTypes.object,
    language: PropTypes.string.isRequired,
    domain: PropTypes.string,
};


export default Database;
