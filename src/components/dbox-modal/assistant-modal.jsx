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
    finish: {
        id: 'gui.AssistantModal.finish',
        defaultMessage: 'Continue',
        description: 'finish button text, minimizes overlay'
    },
    groundTruth: {
        id: 'gui.AssistantModal.groundTruth',
        defaultMessage: 'Add Project',
        description: 'ground truth button text'
    },
    addComponent: {
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

    const [storyboard, setStoryboard] = useState(() => new Storyboard('My Storyboard'));

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleMinimize = useCallback(() => {
        // Handle minimize logic here
        // For example, you might want to set a state variable to control visibility
        // or use a callback to notify the parent component
        console.log('Minimize button clicked');
    }, []);

    const handleTitleChange = useCallback(e => {
        storyboard.title = e.target.value;
        setStoryboard(new Storyboard(
            storyboard.title,
            storyboard.description,
            storyboard.components,
            storyboard.relationships
        ));
    }, [storyboard]);

    const handleDescriptionChange = useCallback(e => {
        storyboard.description = e.target.value;
        setStoryboard(new Storyboard(
            storyboard.title,
            storyboard.description,
            storyboard.components,
            storyboard.relationships
        ));
    }, [storyboard]);

    const handleComponentNameChange = useCallback(e => {
        const index = e.target.dataset.index;
        const newComponents = [...storyboard.components];
        newComponents[index].name = e.target.value;
        setStoryboard(new Storyboard(
            storyboard.title,
            storyboard.description,
            newComponents,
            storyboard.relationships
        ));
    }, [storyboard]);

    const handleComponentDescriptionChange = useCallback(e => {
        const index = e.target.dataset.index;
        const newComponents = [...storyboard.components];
        newComponents[index].description = e.target.value;
        setStoryboard(new Storyboard(
            storyboard.title,
            storyboard.description,
            newComponents,
            storyboard.relationships
        ));
    }, [storyboard]);

    const handleAddComponent = useCallback(
        () => {
            storyboard.addComponent('Component1', 'Description1');
            setStoryboard(new Storyboard(
                storyboard.title,
                storyboard.description,
                storyboard.components,
                storyboard.relationships
            ));
        },
        [storyboard]
    );

    const handleAddRelationship = useCallback(
        () => {
            storyboard.addRelationship('Relationship1', 'Description1');
            setStoryboard(new Storyboard(
                storyboard.title,
                storyboard.description,
                storyboard.components,
                storyboard.relationships
            ));
        },
        [storyboard]
    );

    const handleAddGroundTruth = useCallback(() => {
        console.log('Teacher added a final project');
    }, []);

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
                <div className={styles.headerTitle}>
                    <FormattedMessage
                        {...messages.title}
                    />
                </div>

   
                <button
                    className={styles.groundTruthButton}
                    onClick={handleAddGroundTruth}
                >
                    <FormattedMessage
                        {...messages.groundTruth}
                    />
                </button>

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
                <span className={styles.storyboardTitleContainer}>
                    {'Title:'}
                    <input
                        type="text"
                        className={styles.storyboardTitle}
                        value={storyboard.title}
                        onChange={handleTitleChange}
                        placeholder="Enter Storyboard title..."
                    />
                </span>
                <span className={styles.storyboardTitleContainer}>
                    {'Description:'}
                    <input
                        type="text"
                        className={styles.storyboardDescription}
                        value={storyboard.description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter Storyboard description..."
                    />
                </span>
                
                {/* Blank workspace area */}
                <div className="componentList">
                    {/* Liste von Komponenten, z.B.: */}
                    {storyboard.components.map((component, index) => (
                        <div
                            key={index}
                            className="componentCard"
                        >
                            <strong>{'Name'}</strong>
                            <input
                                type="text"
                                className={styles.componentName}
                                value={component.name}
                                onChange={handleComponentNameChange}
                                placeholder="Enter Component name..."
                            />
                            <strong>{'Description'}</strong>
                            <input
                                type="text"
                                className={styles.componentDescription}
                                value={component.description}
                                onChange={handleComponentDescriptionChange}
                                placeholder="Enter Component description..."
                            />
                        </div>
                    ))}
                </div>
                <div className="relationshipList">
                    {/* Liste von Beziehungen, z.B.: */}
                    {storyboard.relationships.map((relationship, index) => (
                        <div
                            key={index}
                            className="relationshipCard"
                        >
                            <strong>{relationship.name}</strong>
                            <p>{relationship.description}</p>
                        </div>
                    ))}
                </div>
                <div className="actions">
                    <button
                        className={styles.addButton}
                        onClick={handleAddComponent}
                    >
                        {/* <img src={closeIcon} className={styles.addIcon} alt="Add Component" /> */}
                        <FormattedMessage {...messages.addComponent} />
                    </button>
                    <button
                        className={styles.addButton}
                        onClick={handleAddRelationship}
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
                    <button
                        className={styles.verifyButton}
                        onClick={handleMinimize}
                    >
                        <FormattedMessage
                            {...messages.finish}
                        />
                    </button>
                </div>
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
