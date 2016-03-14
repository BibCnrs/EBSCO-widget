import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import Icon from 'react-fa';
import DL from './DL';
import ArticleLink from '../containers/ArticleLink';

const Notice = ({ index, notice, showNotice }) => {
    return (
        <Modal
            isOpen={!!notice}
            onRequestClose={() => showNotice(index, false)}
        >
            <div className="notice">
                <a className="close_notice" onClick={() => showNotice(index, false)}><Icon name="close"/></a>
                <h4>Notice détaillée</h4>
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

Notice.propTypes = {
    index: PropTypes.number,
    notice: PropTypes.array,
    showNotice: PropTypes.func.isRequired
};

export default Notice;
