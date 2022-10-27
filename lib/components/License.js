import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import translate from '../higherOrderComponents/translate';
import { connect } from 'react-redux';
import * as fromState from '../selectors';

function debugBase64(base64URL) {
    var win = window.open();
    win.document.write(
        '<iframe src="' +
            base64URL +
            '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>',
    );
}

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
        <div className="licenses_loading">{text.loading}</div>;
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
                                rel="noopener noreferrer"
                                target="_blank"
                                onClick={() =>
                                    debugBase64(selectedLicense.pdf.src)
                                }
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