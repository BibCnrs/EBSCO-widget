import React, { PropTypes } from 'react';

import DatabaseItem from './DatabaseItem';

export const Database = ({ databases, language }) => (
    <div>
        <ul className='database'>
            {Object.keys(databases).sort((prev, cur) => prev > cur).map(letter => (
                <li className="letter">
                    {letter.toUpperCase()}
                    <ul>
                        {databases[letter].map(database => (
                            <li>
                                <DatabaseItem
                                    name={database.name}
                                    image={database.image}
                                    url={database[`url_${language}`]}
                                    title={database[`text_${language}`]}
                                />
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    </div>
);

Database.propTypes = {
    databases: PropTypes.object,
    language: PropTypes.string.required,
};


export default Database;
