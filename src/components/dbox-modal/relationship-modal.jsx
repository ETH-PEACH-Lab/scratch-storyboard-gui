import React, {useState, useCallback} from 'react';
import ReactModal from 'react-modal';
import styles from './assistant-modal.css';
import PropTypes from 'prop-types';
import closeIcon from './icons/icon--close.svg';
import {Relationship} from './storyboard.jsx';

// RelationshipModal component
const RelationshipModal = ({isOpen, onClose = () => {}}) => {
    const [relationship, setRelationship] = useState(() => new Relationship('My Relationship'));

    const handleNameChange = useCallback(e => {
        setRelationship({...relationship, name: e.target.value});
    }, [relationship]);

    const handleDescriptionChange = useCallback(e => {
        setRelationship({...relationship, description: e.target.value});
    }, [relationship]);

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
                    {'Relationship Form'}
                </div>
                <div className={styles.headerIcons}>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
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
                    <label htmlFor="relationship-name">
                        {'Relationship Name:'}
                        <input
                            id="relationship-name"
                            type="text"
                            className={styles.titleInput}
                            value={relationship.name}
                            onChange={handleNameChange}
                            placeholder=""
                        />
                    </label>
                    <button type="submit">{'Save'}</button>
                    <label htmlFor="relationship-description">
                        {'Relationship Description:'}
                        <input
                            id="relationship-description"
                            type="text"
                            className={styles.titleInput}
                            value={relationship.description}
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

RelationshipModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
};

export default RelationshipModal;