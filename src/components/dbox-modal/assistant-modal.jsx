import React, {useState, useCallback} from 'react';
import {defineMessages, FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import {Storyboard} from './storyboard.jsx';
import styles from './assistant-modal.css'; // reuse styles for now
import closeIcon from './icons/icon--close.svg'; // Placeholder: Add these icons
import checkIcon from './icons/check.svg';

const messages = defineMessages({
    title: {
        id: 'gui.AssistantModal.title',
        defaultMessage: 'Story Board | Problem Decomposition',
        description: 'title for the dbox modal'
    },
    verify: {
        id: 'gui.AssistantModal.verify',
        defaultMessage: 'Verify',
        description: 'verify button text'
    },
    addComponetent: {
        id: 'gui.AssistantModal.addComponent',
        defaultMessage: 'add component',
        description: 'add component button text'
    },
    addRelationship: {
        id: 'gui.AssistantModal.addRelationship',
        defaultMessage: 'add relationship',
        description: 'add relationship button text'
    }
});
const AssistantModal = ({isOpen, onClose = () => {}}) => {

    const [storyboard, setStoryboard] = useState(new Storyboard('My Storyboard Title'));

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleTitleChange = useCallback(e => {
        setStoryboard({...storyboard, title: e.target.value});
    }, [storyboard]);

    const handleVerify = useCallback(() => {}, []);

    if (!isOpen) return null;

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={handleClose}
            className={styles.assistantModalContainer}
            overlayClassName={styles.assistantModalOverlay}
        >
            <div className={styles.modalHeader}>
                <input
                    type="text"
                    className={styles.titleInput}
                    value={storyboard.title}
                    onChange={handleTitleChange}
                    placeholder="Enter Storyboard title..."
                />

                <div className={styles.headerIcons}>
                    <button
                        className={styles.closeButton}
                        onClick={handleClose}
                    >
                        <img
                            className={styles.closeIcon}
                            src={closeIcon}
                        />
                    </button>
                </div>
            </div>

            <div className={styles.modalContent}>
                <div className={styles.storyboardTitle}>
                    {storyboard.title}
                </div>
                {/* Blank workspace area */}
                <button
                    className={styles.addButton}
                    // onClick={this.props.onOpenComponentModal}
                >
                    {/* <img src={closeIcon} className={styles.addIcon} alt="Add Component" /> */}
                    <FormattedMessage {...messages.addComponent} />
                </button>
                <button
                    className={styles.addButton}
                    // onClick={this.props.onOpenRelationshipModal}
                >
                    {/* <img src={closeIcon} className={styles.addIcon} alt="Add Relationship" /> */}
                    <FormattedMessage {...messages.addRelationship} />
                </button>
                <button
                    className={styles.verifyButton}
                    onClick={handleVerify}
                >
                    <img
                        src={checkIcon}
                        alt="Verify"
                    />
                    <FormattedMessage {...messages.verify} />
                </button>
            </div>
        </ReactModal>
    );
};

AssistantModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onOpenComponentModal: PropTypes.func,
    onOpenRelationshipModal: PropTypes.func
};

export default AssistantModal;
