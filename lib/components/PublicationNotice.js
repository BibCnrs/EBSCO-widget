import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import Icon from 'react-fa';

import DL from './DL';
import FullTextHoldings from './FullTextHoldings';
import translate from '../higherOrderComponents/translate';

export const PublicationNotice = ({ index, notice, fullTextHoldings, text, showNotice }) => {
    return (
        <Modal
            isOpen={!!notice}
            onRequestClose={() => showNotice(index, false)}
        >
            <div className="notice">
                <a className="close_notice" onClick={() => showNotice(index, false)}><Icon name="close"/></a>
                <h4>{text.detailedNotice}</h4>
                <h3>{notice && notice.length ? notice[0].value : undefined}</h3>
                {
                    notice ? <DL className="notice" data={{
                        ...notice
                        .slice(1)
                        .reduce((result, datum) => ({ ...result, [datum.label]: datum.value}), {}),
                        [text.fullText]: fullTextHoldings
                    }}/> : null
                }
            </div>
        </Modal>
    );
};

PublicationNotice.propTypes = {
    index: PropTypes.number,
    notice: PropTypes.array,
    showNotice: PropTypes.func.isRequired
};

PublicationNotice.defaultProps = {
    text: {
        detailedNotice: 'Notice détaillée',
        fullText: 'Texte Intégral'
    }
};

export default translate(PublicationNotice);
