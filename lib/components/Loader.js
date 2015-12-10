import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import Modal from 'react-modal';

const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderColor: 'none'
    }
};

const InputLimiter = ({ open }) => (

    <Modal
        isOpen={open}
        style={customStyles}
    >
         <Icon spin name="spinner" size="5x"/>
    </Modal>
);

InputLimiter.propTypes = {
    open: PropTypes.bool.isRequired
};

export default InputLimiter;
