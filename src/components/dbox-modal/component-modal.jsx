import React, {useState, useCallback} from 'react';
import ReactModal from 'react-modal';
import styles from './assistant-modal.css';
import PropTypes from 'prop-types';
import closeIcon from './icons/icon--close.svg';
import {Component} from './storyboard.jsx';

// ComponentModal component (example, adjust as needed)
const ComponentModal = ({isOpen, onClose = () => {}}) => {

    const [component, setComponent] = useState(() => new Component('My Component'));

    const handleNameChange = useCallback(e => {
        setComponent({...component, name: e.target.value});
    }, [component]);

    const handleDescriptionChange = useCallback(e => {
        setComponent({...component, description: e.target.value});
    }, [component]);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleFormSubmit = useCallback(e => {
        e.preventDefault();
        // Handle form submission logic here
    }, []);
    
    if (!isOpen) return null;
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={handleClose}
            className={styles.assistantModalContainer}
            overlayClassName={styles.assistantModalOverlay}
        >
            <div className={styles.modalHeader}>
                <div className={styles.headerTitle}>
                    {'Component Form'}
                </div>
                <div className={styles.headerIcons}>
                    <button
                        className={styles.closeButton}
                        onClick={handleClose}
                    >
                        <img
                            className={styles.closeIcon}
                            src={closeIcon}
                            alt="Close"
                        />
                    </button>
                </div>
            </div>
            <div className={styles.modalContent}>
                {/* Replace with your actual form */}
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="component-name">
                        {'Component Name:'}
                        <input
                            id="component-name"
                            type="text"
                            className={styles.titleInput}
                            value={component.name}
                            onChange={handleNameChange}
                            placeholder=""
                        />
                    </label>
                    <button type="submit">{'Save'}</button>
                    <label htmlFor="component-description">
                        {'Component Description:'}
                        <input
                            id="component-description"
                            type="text"
                            className={styles.titleInput}
                            value={component.description}
                            onChange={handleDescriptionChange}
                            placeholder=""
                        />
                    </label>
                    <button type="submit">{'Save'}</button>
                </form>
            </div>
        </ReactModal>
    );
};

ComponentModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
};

export default ComponentModal;
