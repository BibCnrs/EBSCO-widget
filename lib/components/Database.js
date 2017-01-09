import React, { PropTypes } from 'react';

import DatabaseItem from './DatabaseItem';

export const Database = ({ databases, language }) => (
    <div className='databases'>
        <ul>
            {Object.keys(databases).map(letter => (
                <li>
                    {letter.toUpperCase()}
                    <ul>
                        {databases[letter].map(database => (
                            <li className="db">
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
