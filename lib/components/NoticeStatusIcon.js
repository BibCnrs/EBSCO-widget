import React, { PropTypes } from 'react';
import Icon from 'react-fa';

const NoticeStatusIcon = ({noticeShown, noticeLoaded}) => {
    if(noticeShown && noticeLoaded) {
        return <Icon name="chevron-down" />;
    }

    if(noticeShown) {
        return <Icon name="spinner" spin={true} />;
    }

    return <Icon name="chevron-right" />;
};

NoticeStatusIcon.propTypes = {
    noticeShown: PropTypes.bool.isRequired,
    noticeLoaded: PropTypes.bool.isRequired
};

export default NoticeStatusIcon;
