import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import translate from '../higherOrderComponents/translate';
import { connect } from 'react-redux';
import * as fromState from '../selectors';

const License = ({ text, language, domains, urlAPI }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [licenses, setLicenses] = useState([]);
    const [selectedLicense, setSelectedLicense] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `${urlAPI}/licenses?` +
                    new URLSearchParams({
                        domains: domains,
                    }),
                {
                    credentials: 'include',
                },
            );
            const data = await response.json();
            setLicenses(data);
            setSelectedLicense(data[0]);
            setIsLoading(false);
        };
        try {
            fetchData();
        } catch (e) {
            setLicenses([]);
            setSelectedLicense(null);
        }
    }, []);

    if (isLoading) {
        return <div className="licenses_loading">{text.loading}</div>;
    }

    if (licenses.length === 0) {
        return <div className="licenses_not_found">{text.notFound}</div>;
    }

    return (
        <div className="licenses">
            <div className="licenses__list">
                {isLoading ? (
                    <div>{text.loading}</div>
                ) : (
                    licenses.map(license => (
                        <div
                            key={license.id}
                            className={`licenses__list__item ${
                                license.id === selectedLicense.id
                                    ? 'selected'
                                    : ''
                            }`}
                            onClick={() => setSelectedLicense(license)}
                        >
                            {license[`name_${language}`]}
                        </div>
                    ))
                )}
            </div>
            <div className="license_selected_content">
                <div className="license_selected_content__title">
                    <h3>{selectedLicense[`name_${language}`]}</h3>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: selectedLicense[`content_${language}`],
                        }}
                    />
                    {selectedLicense.pdf && (
                        <p>
                            {text.pdf}{' '}
                            <a
                                download={selectedLicense.pdf.title}
                                href={selectedLicense.pdf.src}
                            >
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
    domains: PropTypes.array,
    language: PropTypes.string,
    urlAPI: PropTypes.string,
};

const mapStateToProps = state => {
    const domains = fromState.getRights(state);
    const urlAPI = fromState.getUrl(state);
    return {
        domains,
        language: fromState.getLanguage(state),
        urlAPI,
    };
};

export default translate(connect(mapStateToProps)(License), 'License');
