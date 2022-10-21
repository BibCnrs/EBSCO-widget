import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import translate from '../higherOrderComponents/translate';

const License = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [licences, setLicenses] = useState([]);
    const [selectedLicense, setSelectedLicense] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${window.__SERVER_URL__}/licenses`);
            const data = await response.json();
            setLicenses(data);
            setSelectedLicense(data[0]);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    if (isLoading) {
        <div>Loading...</div>;
    }

    if (licences.length === 0) {
        return <div>No licenses found</div>;
    }

    return (
        <div className="licenses">
            <div className="licenses__list">
                {isLoading ? (
                    <div>Chargement...</div>
                ) : (
                    licences.map(license => (
                        <div
                            key={license.id}
                            className={`licenses__list__item ${
                                license.id === selectedLicense.id
                                    ? 'selected'
                                    : ''
                            }`}
                            onClick={() => setSelectedLicense(license)}
                        >
                            {license.name_fr}
                        </div>
                    ))
                )}
            </div>
            <div className="license_selected_content">
                <div className="license_selected_content__title">
                    <h3>{selectedLicense.name_fr}</h3>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: selectedLicense.content_fr,
                        }}
                    />
                    {selectedLicense.pdf && (
                        <p>
                            Lien PDF:{' '}
                            <a href={selectedLicense.pdf.src}>
                                {selectedLicense.pdf.title}
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

License.propTypes = {
    text: PropTypes.object,
};

export default translate(License);
