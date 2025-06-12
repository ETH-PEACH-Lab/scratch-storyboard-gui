import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';

import styles from './storyboard-editor.css';

import redoIcon from './icon--redo.svg';
import undoIcon from './icon--undo.svg';
import surpriseIcon from '../action-menu/icon--surprise.svg';
import ReactTooltip from 'react-tooltip';

const BufferedInput = BufferedInputHOC(Input);

const messages = defineMessages({
    storyboardTitle: {
        id: 'gui.storyboardEditor.storyboardTitle',
        description: 'Title of the storyboard editor',
        defaultMessage: 'Storyboard Title'
    },
    storyboardDescription: {
        id: 'gui.storyboardEditor.storyboardDescription',
        description: 'Description of the storyboard editor',
        defaultMessage: 'Storyboard Description'
    },
    storyboardVariables: {
        id: 'gui.storyboardEditor.storyboardVariables',
        description: 'Variables for the storyboard editor',
        defaultMessage: 'Global Variables (comma separated)'
    },
    componentTitle: {
        id: 'gui.storyboardEditor.componentTitle',
        description: 'Title of the component editor',
        defaultMessage: 'Title'
    },
    componentLooks: {
        id: 'gui.storyboardEditor.componentLooks',
        description: 'Looks of the component editor',
        defaultMessage: 'Looks'
    },
    componentBehavior: {
        id: 'gui.storyboardEditor.componentBehavior',
        description: 'Behavior of the component editor',
        defaultMessage: 'Behavior and Actions'
    },
    componentDescription: {
        id: 'gui.storyboardEditor.componentDescription',
        description: 'Description of the component editor',
        defaultMessage: 'Description'
    },
    behaviorName: {
        id: 'gui.storyboardEditor.behaviorName',
        description: 'Name of the behavior in the storyboard editor',
        defaultMessage: 'Behavior Name'
    },
    behaviorVariables: {
        id: 'gui.storyboardEditor.behaviorVariables',
        description: 'Variables of the behavior in the storyboard editor',
        defaultMessage: 'Behavior Variables (comma separated)'
    },
    behaviorDescription: {
        id: 'gui.storyboardEditor.behaviorDescription',
        description: 'Description of the behavior in the storyboard editor',
        defaultMessage: 'Behavior Description'
    },
    behaviorRelatedSprites: {
        id: 'gui.storyboardEditor.behaviorRelatedSprites',
        description: 'Related sprites of the behavior in the storyboard editor',
        defaultMessage: 'Related Sprites (comma separated)'
    },
    behaviorPossibleBlocks: {
        id: 'gui.storyboardEditor.behaviorPossibleBlocks',
        description: 'Possible blocks for the behavior in the storyboard editor',
        defaultMessage: 'Possible Blocks (comma separated)'
    },
    copy: {
        id: 'gui.storyboardEditor.copy',
        description: 'Title of the button to copy the storyboard',
        defaultMessage: 'Copy'
    },
    paste: {
        id: 'gui.storyboardEditor.paste',
        description: 'Title of the button to paste the storyboard',
        defaultMessage: 'Paste'
    },
    delete: {
        id: 'gui.storyboardEditor.delete',
        description: 'Title of the button to delete the storyboard',
        defaultMessage: 'Delete'
    },
    save: {
        id: 'gui.storyboardEditor.save',
        description: 'Title of the button to save trimmed storyboard',
        defaultMessage: 'Save'
    },
    undo: {
        id: 'gui.storyboardEditor.undo',
        description: 'Title of the button to undo',
        defaultMessage: 'Undo'
    },
    redo: {
        id: 'gui.storyboardEditor.redo',
        description: 'Title of the button to redo',
        defaultMessage: 'Redo'
    },
    verify: {
        id: 'gui.storyboardTab.verifyStoryboard',
        description: 'Button to verify the storyboard in the editor tab',
        defaultMessage: 'Verify Storyboard'
    },
    feedback: {
        id: 'gui.storyboardTab.feedback',
        description: 'Button to provide feedback on the storyboard in the editor tab',
        defaultMessage: 'Feedback'
    }

});


const StoryboardEditor = props => (
    <div
        className={styles.editorContainer}
        ref={props.setRef}
    >
        <div className={styles.headerRow}>
            
            <Label text={props.intl.formatMessage(messages.storyboardTitle)}>
                <BufferedInput
                    className={styles.titleInput}
                    tabIndex="1"
                    type="text"
                    value={props.title}
                    onSubmit={props.onChangeTitle}
                />
            </Label>
            <div className={styles.buttonGroupTopRight}>
                <button
                    className={styles.button}
                    disabled={!props.canUndo}
                    title={props.intl.formatMessage(messages.undo)}
                    onClick={props.onUndo}
                >
                    <img
                        className={styles.undoIcon}
                        draggable={false}
                        src={undoIcon}
                    />
                </button>
                <button
                    className={styles.button}
                    disabled={!props.canRedo}
                    title={props.intl.formatMessage(messages.redo)}
                    onClick={props.onRedo}
                >
                    <img
                        className={styles.redoIcon}
                        draggable={false}
                        src={redoIcon}
                    />
                </button>
            </div>
        </div>
        <div className={styles.row}>
            <Label text={props.intl.formatMessage(messages.storyboardDescription)}>
                <BufferedInput
                    className={styles.descriptionInput}
                    tabIndex="1"
                    type="text"
                    value={props.storyboardDescription}
                    onSubmit={props.onChangeStoryboardDescription}
                />
            </Label>
            {props.feedback && (
                <div className={styles.feedbackButtonGroup}>
                    <button
                        className={styles.feedbackButton}
                        disabled={!props.feedback}
                        title={props.intl.formatMessage(messages.feedback)}
                        onClick={props.handleOpenFeedback}
                        data-for={messages.storyboardDescription.id}
                        data-tip={'TDB Storyboard Description Feedback' +
                            '\n more lines \n more lines not on multiple lines wrap around'}
                    >
                        <img
                            className={styles.feedbackIcon}
                            draggable={false}
                            src={surpriseIcon}
                        />
                    </button>
                    <ReactTooltip
                        className={styles.tooltip}
                        effect="solid"
                        id={messages.storyboardDescription.id}
                        place={'left'}
                    />
                </div>)
            }
        </div>
        <div className={styles.row}>
            <Label text={props.intl.formatMessage(messages.storyboardVariables)}>
                <BufferedInput
                    className={styles.variableInput}
                    tabIndex="1"
                    type="text"
                    value={props.storyboardVariables}
                    onSubmit={props.onChangeStoryboardVariables}
                />
            </Label>
            {props.feedback && (
                <div className={styles.feedbackButtonGroup}>
                    <button
                        className={styles.feedbackButton}
                        disabled={!props.feedback}
                        title={props.intl.formatMessage(messages.feedback)}
                        data-for={messages.storyboardVariables.id}
                        data-tip={'TDB Storyboard Variables Feedback' +
                            '\n more lines \n more lines not on multiple lines wrap around'}
                        // onClick={props.openFeedback}
                    >
                        <img
                            className={styles.feedbackIcon}
                            draggable={false}
                            src={surpriseIcon}
                        />
                    </button>
                    <ReactTooltip
                        className={styles.tooltip}
                        effect="solid"
                        id={messages.storyboardVariables.id}
                        place={'left'}
                    />
                </div>)
            }
        </div>
        <div className={styles.divider} />
        {props.behaviors.length > 0 && props.selectedBehaviorIndex > -1 && (<>
            <div className={styles.row}>
                <Label text={props.intl.formatMessage(messages.behaviorName)}>
                    <BufferedInput
                        tabIndex="1"
                        type="text"
                        value={props.behaviors[props.selectedBehaviorIndex].name}
                        onSubmit={props.onChangeName}
                    />
                </Label>
            </div>
            <div className={styles.row}>
                <Label text={props.intl.formatMessage(messages.behaviorVariables)}>
                    <BufferedInput
                        tabIndex="1"
                        type="text"
                        value={props.behaviors[props.selectedBehaviorIndex].variables}
                        onSubmit={props.onChangeVariables}
                    />
                </Label>
                {props.feedback && (
                    <div className={styles.feedbackButtonGroup}>
                        <button
                            className={styles.feedbackButton}
                            disabled={!props.feedback}
                            title={props.intl.formatMessage(messages.feedback)}
                            data-for={messages.behaviorVariables.id}
                            data-tip={`Behavior Variable Feedback: ${
                                props.behaviors[props.selectedBehaviorIndex].feedback.variables
                            }`}
                        // onClick={props.openFeedback}
                        >
                            <img
                                className={styles.feedbackIcon}
                                draggable={false}
                                src={surpriseIcon}
                            />
                        </button>
                        <ReactTooltip
                            className={styles.tooltip}
                            effect="solid"
                            id={messages.behaviorVariables.id}
                            place={'left'}
                        />
                    </div>)
                }
            </div>
            <div className={styles.row}>
                <Label text={props.intl.formatMessage(messages.behaviorDescription)}>
                    <BufferedInput
                        tabIndex="1"
                        type="text"
                        className={styles.descriptionInput}
                        value={props.behaviors[props.selectedBehaviorIndex].description}
                        onSubmit={props.onChangeDescription}
                    />
                </Label>
                {props.feedback && (
                    <div className={styles.feedbackButtonGroup}>
                        <button
                            className={styles.feedbackButton}
                            disabled={!props.feedback}
                            title={props.intl.formatMessage(messages.feedback)}
                            data-for={messages.behaviorDescription.id}
                            data-tip={`Behavior Description Feedback: ${
                                props.behaviors[props.selectedBehaviorIndex].feedback.description
                            }`}
                        // onClick={props.openFeedback}
                        >
                            <img
                                className={styles.feedbackIcon}
                                draggable={false}
                                src={surpriseIcon}
                            />
                        </button>
                        <ReactTooltip
                            className={styles.tooltip}
                            effect="solid"
                            id={messages.behaviorDescription.id}
                            place={'left'}
                        />
                    </div>)
                }
            </div>
            <div className={styles.row}>
                <Label text={props.intl.formatMessage(messages.behaviorRelatedSprites)}>
                    <BufferedInput
                        tabIndex="1"
                        type="text"
                        className={styles.descriptionInput}
                        value={props.behaviors[props.selectedBehaviorIndex].relatedSprites}
                        onSubmit={props.onChangeRelatedSprites}
                    />
                </Label>
                {props.feedback && (
                    <div className={styles.feedbackButtonGroup}>
                        <button
                            className={styles.feedbackButton}
                            disabled={!props.feedback}
                            title={props.intl.formatMessage(messages.feedback)}
                            data-for={messages.behaviorRelatedSprites.id}
                            data-tip={`Behavior Related Sprites Feedback: ${
                                props.behaviors[props.selectedBehaviorIndex].feedback.relatedSprites
                            }`}
                        // onClick={props.openFeedback}
                        >
                            <img
                                className={styles.feedbackIcon}
                                draggable={false}
                                src={surpriseIcon}
                            />
                        </button>
                        <ReactTooltip
                            className={styles.tooltip}
                            effect="solid"
                            id={messages.behaviorRelatedSprites.id}
                            place={'left'}
                        />
                    </div>)
                }
            </div>
            <div className={styles.row}>
                <Label text={props.intl.formatMessage(messages.behaviorPossibleBlocks)}>
                    <BufferedInput
                        tabIndex="1"
                        type="text"
                        className={styles.descriptionInput}
                        value={props.behaviors[props.selectedBehaviorIndex].possibleBlocks}
                        onSubmit={props.onChangePossibleBlocks}
                    />
                </Label>
                {props.feedback && (
                    <div className={styles.feedbackButtonGroup}>
                        <button
                            className={styles.feedbackButton}
                            disabled={!props.feedback}
                            title={props.intl.formatMessage(messages.feedback)}
                            data-for={messages.behaviorPossibleBlocks.id}
                            data-tip={`Behavior Possible Blocks Feedback: ${
                                props.behaviors[props.selectedBehaviorIndex].feedback.possibleBlocks
                            }`}
                        // onClick={props.openFeedback}
                        >
                            <img
                                className={styles.feedbackIcon}
                                draggable={false}
                                src={surpriseIcon}
                            />
                        </button>
                        <ReactTooltip
                            className={styles.tooltip}
                            effect="solid"
                            id={messages.behaviorPossibleBlocks.id}
                            place={'left'}
                        />
                    </div>)
                }
            </div>
        </>)}
        
    </div>
);

StoryboardEditor.propTypes = {
    canUndo: PropTypes.bool.isRequired,
    canRedo: PropTypes.bool.isRequired,
    feedback: PropTypes.string,
    handleOpenFeedback: PropTypes.func.isRequired,
    setRef: PropTypes.func.isRequired,
    intl: intlShape,
    title: PropTypes.string.isRequired,
    storyboardDescription: PropTypes.string.isRequired,
    storyboardVariables: PropTypes.string.isRequired,
    behaviors: PropTypes.array.isRequired,
    selectedBehaviorIndex: PropTypes.number.isRequired,
    onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    onChangeTitle: PropTypes.func.isRequired,
    onChangeStoryboardVariables: PropTypes.func.isRequired,
    onChangeStoryboardDescription: PropTypes.func.isRequired,
    onChangeName: PropTypes.func.isRequired,
    onChangeDescription: PropTypes.func.isRequired,
    onChangeVariables: PropTypes.func.isRequired,
    onChangeRelatedSprites: PropTypes.func.isRequired,
    onChangePossibleBlocks: PropTypes.func.isRequired
};

export default injectIntl(StoryboardEditor);
