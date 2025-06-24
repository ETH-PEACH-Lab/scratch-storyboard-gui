import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import dropdownCaret from './dropdown-caret.svg';
// import {MenuItem} from '../menu/menu.jsx';

import styles from './storyboard-editor.css';

import redoIcon from './icon--redo.svg';
import undoIcon from './icon--undo.svg';
import surpriseIcon from '../action-menu/icon--surprise.svg';
import copyIcon from './icon--copy.svg';
import IconButton from '../icon-button/icon-button.jsx';
import ReactTooltip from 'react-tooltip';
import SpinnerComponent from '../spinner/spinner.jsx';

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
        defaultMessage: 'Behavior Variables'
    },
    behaviorSelectedVariables: {
        id: 'gui.storyboardEditor.behaviorSelectedVariables',
        description: 'Selected variables of the behavior in the storyboard editor',
        defaultMessage: 'Select Variables'
    },
    behaviorDescription: {
        id: 'gui.storyboardEditor.behaviorDescription',
        description: 'Description of the behavior in the storyboard editor',
        defaultMessage: 'Behavior Description'
    },
    behaviorRelatedSprites: {
        id: 'gui.storyboardEditor.behaviorRelatedSprites',
        description: 'Related sprites of the behavior in the storyboard editor',
        defaultMessage: 'Related Sprites'
    },
    behaviorSelectedRelatedSprites: {
        id: 'gui.storyboardEditor.behaviorSelectedRelatedSprites',
        description: 'Selected related sprites of the behavior in the storyboard editor',
        defaultMessage: 'Select Related Sprites'
    },
    behaviorSounds: {
        id: 'gui.storyboardEditor.behaviorSounds',
        description: 'Sounds of the behavior in the storyboard editor',
        defaultMessage: 'Sounds (comma separated)'
    },
    behaviorCostumes: {
        id: 'gui.storyboardEditor.behaviorCostumes',
        description: 'Costumes of the behavior in the storyboard editor',
        defaultMessage: 'Costumes (comma separated)'
    },
    behaviorPossibleBlocks: {
        id: 'gui.storyboardEditor.behaviorPossibleBlocks',
        description: 'Possible blocks for the behavior in the storyboard editor',
        defaultMessage: 'Possible Blocks (comma separated)'
    },
    copy: {
        id: 'gui.storyboardEditor.copy',
        description: 'Title of the button to copy the storyboard',
        defaultMessage: 'Copy to Comments' // 'Copy Storyboard to Comments in Coding Area'
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
    phase: {
        id: 'gui.storyboardTab.phase',
        description: 'Info about current phase of the storyboard in the editor tab',
        defaultMessage: 'Storyboard Phase: '
    },
    feedback: {
        id: 'gui.storyboardTab.feedback',
        description: 'Button to provide feedback on the storyboard in the editor tab',
        defaultMessage: 'Feedback'
    }

});


const StoryboardEditor = props => {
    const [showVariablesDropdown, setShowVariablesDropdown] = useState(false);
    const [showRelatedSpritesDropdown, setShowRelatedSpritesDropdown] = useState(false);

    return (
        <div
            className={styles.editorContainer}
            ref={props.setRef}
        >
            <div className={styles.headerRow}>
                <Label text={`${props.intl.formatMessage(messages.phase)} ${props.phase}`} />
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
                        {/* <span>{'planning'}</span> */}
                        <img
                            className={styles.redoIcon}
                            draggable={false}
                            src={redoIcon}
                        />
                    </button>
                    <IconButton
                        className={styles.toolButton}
                        img={copyIcon}
                        title={props.intl.formatMessage(messages.copy)}
                        onClick={props.onCopy}
                    />
                </div>
            </div>
            <div className={styles.row}>
                <Label
                    text={props.intl.formatMessage(messages.storyboardTitle)}
                    className={styles.titleLabel}
                >
                    <BufferedInput
                        className={styles.titleInput}
                        tabIndex="1"
                        type="text"
                        value={props.title}
                        onSubmit={props.onChangeTitle}
                    />
                </Label>
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
            {props.phase === 'loading' && (
                <div className="spinner-container">
                    <Label text={'waiting for feedback'} />
                    <SpinnerComponent className="spinner feedback large" />
                </div>
            
            )}
            {props.feedback && (
                <div className={styles.feedbackTextBox}>
                    <Label text={props.intl.formatMessage(messages.feedback)}>
                        <div
                            className={styles.textContainer}
                            style={{whiteSpace: 'pre-wrap'}}
                        >
                            {props.feedback || 'No feedback available'}
                        </div>
                    </Label>
                </div>
            )}
            <div className={styles.divider} />
            {props.phase === 'understanding' && (
                <div>{'understanding content'}</div>
            )}
            {props.phase === 'planning' && (
                <div>{props.behaviors.length > 0 && props.selectedBehaviorIndex > -1 && (<>
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
                            {/* <BufferedInput
                        tabIndex="1"
                        type="text"
                        value={props.behaviors[props.selectedBehaviorIndex].variables}
                        onSubmit={props.onChangeVariables}
                    /> */}
                            <div className={styles.selectedItemsContainer}>
                                {props.behaviors[props.selectedBehaviorIndex].variables.map(variable => (
                                    <span
                                        key={variable}
                                        className={styles.selectedItem}
                                    >
                                        {variable}
                                    </span>
                                ))}
                                <div className={styles.dropdownWrapper}>
                                    <button
                                        type="button"
                                        className={styles.dropdownButton}
                                        // eslint-disable-next-line react/jsx-no-bind
                                        onClick={() => setShowVariablesDropdown(prev => !prev)}
                                    >
                                        {props.intl.formatMessage(messages.behaviorSelectedVariables)}
                                        <img
                                            src={dropdownCaret}
                                            alt="Dropdown caret"
                                            style={{marginLeft: '4px'}}
                                        />
                                    </button>
                                    {showVariablesDropdown && (
                                        <div className={styles.dropdownMenu}>
                                            {props.variables.map(option => (
                                                <label
                                                    key={option}
                                                    className={styles.dropdownOption}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={props.behaviors[props.selectedBehaviorIndex]
                                                            .variables.includes(option)}
                                                        // eslint-disable-next-line react/jsx-no-bind
                                                        onChange={() => props.onToggleVariable(option)}
                                                    />
                                                    <span className={styles.labelText}>{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
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
                            {/* <BufferedInput
                            tabIndex="1"
                            type="text"
                            className={styles.descriptionInput}
                            value={props.behaviors[props.selectedBehaviorIndex].relatedSprites}
                            onSubmit={props.onChangeRelatedSprites}
                        /> */}
                            <div className={styles.selectedItemsContainer}>
                                {props.behaviors[props.selectedBehaviorIndex].relatedSprites.map(variable => (
                                    <span
                                        key={variable}
                                        className={styles.selectedItem}
                                    >
                                        {variable}
                                    </span>
                                ))}
                                <div className={styles.dropdownWrapper}>
                                    <button
                                        type="button"
                                        className={styles.dropdownButton}
                                        // eslint-disable-next-line react/jsx-no-bind
                                        onClick={() => setShowRelatedSpritesDropdown(prev => !prev)}
                                    >
                                        {props.intl.formatMessage(messages.behaviorSelectedRelatedSprites)}
                                        <img
                                            src={dropdownCaret}
                                            alt="Dropdown caret"
                                            style={{marginLeft: '4px'}}
                                        />
                                    </button>
                                    {showRelatedSpritesDropdown && (
                                        <div className={styles.dropdownMenu}>
                                            {props.relatedSprites.map(option => (
                                                <label
                                                    key={option}
                                                    className={styles.dropdownOption}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={props.behaviors[props.selectedBehaviorIndex]
                                                            .relatedSprites.includes(option)}
                                                        // eslint-disable-next-line react/jsx-no-bind, react/prop-types
                                                        onChange={() => props.onToggleRelatedSprites(option)}
                                                    />
                                                    <span className={styles.labelText}>{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
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
                        <Label text={props.intl.formatMessage(messages.behaviorSounds)}>
                            <BufferedInput
                                tabIndex="1"
                                type="text"
                                className={styles.descriptionInput}
                                value={props.behaviors[props.selectedBehaviorIndex].sounds}
                                onSubmit={props.onChangeSounds}
                            />
                        </Label>
                        {props.feedback && (
                            <div className={styles.feedbackButtonGroup}>
                                <button
                                    className={styles.feedbackButton}
                                    disabled={!props.feedback}
                                    title={props.intl.formatMessage(messages.feedback)}
                                    data-for={messages.behaviorSounds.id}
                                    data-tip={`Behavior Sounds Feedback: ${
                                        props.behaviors[props.selectedBehaviorIndex].feedback.sounds
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
                                    id={messages.behaviorSounds.id}
                                    place={'left'}
                                />
                            </div>)
                        }
                    </div>
                    <div className={styles.row}>
                        <Label text={props.intl.formatMessage(messages.behaviorCostumes)}>
                            <BufferedInput
                                tabIndex="1"
                                type="text"
                                className={styles.descriptionInput}
                                value={props.behaviors[props.selectedBehaviorIndex].costumes}
                                onSubmit={props.onChangeCostumes}
                            />
                        </Label>
                        {props.feedback && (
                            <div className={styles.feedbackButtonGroup}>
                                <button
                                    className={styles.feedbackButton}
                                    disabled={!props.feedback}
                                    title={props.intl.formatMessage(messages.feedback)}
                                    data-for={messages.behaviorCostumes.id}
                                    data-tip={`Behavior Costumes Feedback: ${
                                        props.behaviors[props.selectedBehaviorIndex].feedback.costumes
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
                                    id={messages.behaviorCostumes.id}
                                    place={'left'}
                                />
                            </div>)
                        }
                    </div>
                    {/* <div className={styles.row}>
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
            </div> */}
                </>)}</div>
            )}

        
        </div>
    );
};

StoryboardEditor.propTypes = {
    canUndo: PropTypes.bool.isRequired,
    canRedo: PropTypes.bool.isRequired,
    feedback: PropTypes.string,
    phase: PropTypes.string,
    handleOpenFeedback: PropTypes.func,
    setRef: PropTypes.func.isRequired,
    intl: intlShape,
    title: PropTypes.string,
    variables: PropTypes.arrayOf(PropTypes.string).isRequired,
    // selectedVariables: PropTypes.arrayOf(PropTypes.string),
    relatedSprites: PropTypes.arrayOf(PropTypes.string).isRequired,
    // selectedRelatedSprites: PropTypes.arrayOf(PropTypes.string),
    storyboardDescription: PropTypes.string,
    storyboardVariables: PropTypes.string,
    behaviors: PropTypes.array.isRequired,
    selectedBehaviorIndex: PropTypes.number.isRequired,
    onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
    onChangeTitle: PropTypes.func.isRequired,
    onChangeStoryboardVariables: PropTypes.func.isRequired,
    onChangeStoryboardDescription: PropTypes.func.isRequired,
    onChangeName: PropTypes.func.isRequired,
    onChangeDescription: PropTypes.func.isRequired,
    // onChangeVariables: PropTypes.func.isRequired,
    onChangeSounds: PropTypes.func.isRequired,
    onChangeCostumes: PropTypes.func.isRequired,
    // onChangeRelatedSprites: PropTypes.func.isRequired,
    onToggleVariable: PropTypes.func.isRequired
};

export default injectIntl(StoryboardEditor);
