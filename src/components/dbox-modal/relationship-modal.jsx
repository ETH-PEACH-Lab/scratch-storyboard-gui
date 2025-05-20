import React from 'react';
import ReactModal from 'react-modal';
import styles from './assistant-modal.css';
import PropTypes from 'prop-types';
import closeIcon from './icons/icon--close.svg';

// RelationshipModal component
const RelationshipModal = ({isOpen, onClose}) => (
    <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
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
            <form>
                <label>
                    {'Relationship Name:'}
                    <input type="text" />
                </label>
                <button type="submit">{'Save'}</button>
            </form>
        </div>
    </ReactModal>
);

RelationshipModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
};

export default RelationshipModal;