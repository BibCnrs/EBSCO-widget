import React from 'react';
import PropTypes from 'prop-types';

import translate from '../higherOrderComponents/translate';

const GoogleScholarParameter = ({ text }) => (
    <div>
        <p>{text.explanation}</p>
        <p>
            <a
                href="https://scholar.google.fr/scholar_setprefs?scilib=1&inststart=10&num=10&scis=no&scisf=4&hl=fr&lang=all&instq=cnrs"
                rel="noopener noreferrer"
                target="_blank"
            >
                {text.goHere}
            </a>
        </p>
        <p>{text.chooseDomain}</p>
        <p>{text.saveSettings}</p>
    </div>
);

GoogleScholarParameter.propTypes = {
    text: PropTypes.any,
};

GoogleScholarParameter.defaultProps = {
    text: {
        explanation: `To facilitate access to full text articles on Google Scholar which are accessible via BibCnrs, you first need to modify your search engine settings. You will then instantly be shown full text articles in your field in the Google Scholar results list.`,
        goHere: 'go here',
        chooseDomain:
            'Click on the magnifying glass icon and select your chosen field.',
        saveSettings:
            'To save these settings, you also need to activate cookies on the site. Finally, click on the "Save" button.',
    },
};

export default translate(GoogleScholarParameter);
