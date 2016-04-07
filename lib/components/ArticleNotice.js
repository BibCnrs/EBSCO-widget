import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import Icon from 'react-fa';
import DL from './DL';
import ArticleLink from '../containers/ArticleLink';
import translate from '../higherOrderComponents/translate';

const ArticleNotice = ({ index, notice, text, showNotice }) => {
    return (
        <Modal
            isOpen={!!notice}
            onRequestClose={() => showNotice(index, false)}
        >
            <div className="notice">
                <a className="close_notice" onClick={() => showNotice(index, false)}><Icon name="close"/></a>
                <h4>{text.title}</h4>
                <h3>{notice && notice.length ? notice[0].value : undefined}</h3>
                {
                    notice ? <DL className="notice-list" data={
                        notice
                        .slice(1)
                        .reduce((result, datum) => ({ ...result, [datum.label]: datum.value }), {})
                    }/> : null
                }
                <ArticleLink index={index} />
            </div>
        </Modal>
    );
};

ArticleNotice.propTypes = {
    index: PropTypes.number,
    notice: PropTypes.array,
    showNotice: PropTypes.func.isRequired
};

ArticleNotice.defaultProps = {
    text: {
        title: 'Notice détaillée'
    }
};

export default translate(ArticleNotice);
