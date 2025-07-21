import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import classNames from 'classnames';
import VM from 'scratch-vm';

import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import dropdownCaret from './dropdown-caret.svg';
// import droprightCaret from './dropright-caret.svg';
// import {MenuItem} from '../menu/menu.jsx';

import styles from './storyboard-editor.css';

import redoIcon from './icon--redo.svg';
import undoIcon from './icon--undo.svg';
import tickIcon from './icon--tick.svg';
import cautionIcon from './icon--caution.svg';
// import surpriseIcon from '../action-menu/icon--surprise.svg';
// import copyIcon from './icon--copy.svg';
// import IconButton from '../icon-button/icon-button.jsx';
import ReactTooltip from 'react-tooltip';
import SpinnerComponent from '../spinner/spinner.jsx';
// import getCostumeUrl from '../../lib/get-costume-url';

const BufferedInput = BufferedInputHOC(Input);

const messages = defineMessages({
    storyboardTitle: {
        id: 'gui.storyboardEditor.storyboardTitle',
        description: 'Title of the storyboard editor',
        defaultMessage: 'Project Title'
    },
    storyboardDescription: {
        id: 'gui.storyboardEditor.storyboardDescription',
        description: 'Description of the storyboard editor',
        defaultMessage: 'Project Description'
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
        defaultMessage: 'Sounds'
    },
    behaviorCostumes: {
        id: 'gui.storyboardEditor.behaviorCostumes',
        description: 'Costumes of the behavior in the storyboard editor',
        defaultMessage: 'Costumes'
    },
    behaviorPossibleBlocks: {
        id: 'gui.storyboardEditor.behaviorPossibleBlocks',
        description: 'Possible blocks for the behavior in the storyboard editor',
        defaultMessage: 'Possible Blocks (comma separated)'
    },
    copy: {
        id: 'gui.storyboardEditor.copy',
        description: 'Title of the button to copy the storyboard',
        defaultMessage: 'Your storyboard will be copied to the code tab as comments.'
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
        id: 'gui.storyboardEditor.phase',
        description: 'Info about current phase of the storyboard in the editor tab',
        defaultMessage: 'Project Phase'
    },
    planning: {
        id: 'gui.storyboardEditor.planning',
        description: 'Planning phase of the storyboard in the editor tab',
        defaultMessage: 'Planning'
    },
    understanding: {
        id: 'gui.storyboardEditor.understanding',
        description: 'Understanding phase of the storyboard in the editor tab',
        defaultMessage: 'Understanding'
    },
    coding: {
        id: 'gui.storyboardEditor.coding',
        description: 'Coding phase of the storyboard in the editor tab',
        defaultMessage: 'Coding'
    },
    planningPhase: {
        id: 'gui.storyboardEditor.planningPhase',
        description: 'Planning phase of the storyboard in the editor tab',
        defaultMessage: 'Planning Phase'
    },
    understandingPhase: {
        id: 'gui.storyboardEditor.understandingPhase',
        description: 'Understanding phase of the storyboard in the editor tab',
        defaultMessage: 'Understanding Phase'
    },
    prepareCodingPhase: {
        id: 'gui.storyboardEditor.prepareCodingPhase',
        description: 'Button to prepare the coding phase in the storyboard editor',
        defaultMessage: 'Prepare Coding Phase'
    },
    feedback: {
        id: 'gui.storyboardEditor.feedback',
        description: 'Button to provide feedback on the storyboard in the editor tab',
        defaultMessage: 'Feedback'
    },
    feedbackLoading: {
        id: 'gui.storyboardEditor.feedbackLoading',
        description: 'Loading state for feedback in the storyboard editor',
        defaultMessage: 'Feedback is loading ...'
    },
    question: {
        id: 'gui.storyboardEditor.question',
        description: 'Question for the user in the storyboard tab',
        defaultMessage: 'Have you listed all behaviors for all sprites?'
    }

});

const feedbackColors = {
    Complete: '#4CAF50', // Green
    Incomplete: '#EE7600', // Orange
    NeedsImprovement: '#FFC107'// Yellow
};


const StoryboardEditor = props => {
    const [showVariablesDropdown, setShowVariablesDropdown] = useState(false);
    const [showRelatedSpritesDropdown, setShowRelatedSpritesDropdown] = useState(false);
    const [expanded, setExpanded] = useState(true);
    // const [openBehaviorName, setOpenBehaviorName] = useState(null);

    const toggleExpanded = () => setExpanded(prev => !prev);

    const relatedSprites = props.vm.runtime.targets.map(target => target.getName());
    // const relatedSpritesImages = props.vm.runtime.targets;
    const phases = ['Understanding', 'Planning', 'Coding'];

    return (
        <div
            className={styles.editorContainer}
            ref={props.setRef}
        >
            <div className={styles.headerRow}>
                <Label text={`${props.intl.formatMessage(messages.phase)}`} />
                <div className={styles.phaseTrackerContainer}>
                    <div className={styles.phaseLine} />
                    <div className={styles.phaseTracker}>
                        {phases.map((phase, index) => {
                            const isCompleted = index < phases.indexOf(props.phase);
                            const isCurrent = index === phases.indexOf(props.phase);

                            return (
                                <div
                                    key={phase}
                                    className={styles.phaseItem}
                                >
                                    <div
                                        className={`${styles.phaseDot} ${
                                            isCompleted ?
                                                styles.completed :
                                                isCurrent ?
                                                    styles.current :
                                                    styles.upcoming
                                        }`}
                                    />
                                    <div
                                        className={`${styles.phaseLabel} ${
                                            isCurrent ? styles.active : ''
                                        }`}
                                    >
                                        {messages[phase.toLowerCase()].id ? (
                                            props.intl.formatMessage(messages[phase.toLowerCase()])
                                        ) : (
                                            phase
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.buttonGroupTopRight}>
                    {props.phase === 'Planning' && (<button
                        className={styles.phaseButton}
                        disabled={props.phase !== 'Planning'}
                        onClick={props.onUnderstanding}
                    >
                        <span>{props.intl.formatMessage(messages.understandingPhase)}</span>
                        <img
                            className={styles.undoIcon}
                            draggable={false}
                            src={undoIcon}
                        />
                    </button>)
                    }
                    {props.phase === 'Understanding' && (<button
                        className={styles.phaseButton}
                        disabled={props.phase !== 'Understanding'}
                        onClick={props.onPlanning}
                    >
                        <span>{props.intl.formatMessage(messages.planningPhase)}</span>
                        <img
                            className={styles.redoIcon}
                            draggable={false}
                            src={redoIcon}
                        />
                    </button>
                    )}
                    {props.phase === 'Planning' && (
                        <div>
                            <button
                                className={styles.phaseButton}
                                disabled={props.phase !== 'Planning'}
                                onClick={props.onCopy}
                                data-tip={props.intl.formatMessage(messages.copy)}
                                data-for={messages.copy.id}
                            >
                                <span>{props.intl.formatMessage(messages.prepareCodingPhase)}</span>
                                <img
                                    className={styles.redoIcon}
                                    draggable={false}
                                    src={redoIcon}
                                />
                            </button>

                            <ReactTooltip
                                id={messages.copy.id}
                                place="right"
                                effect="solid"
                                className={styles.tooltip}
                            />
                        </div>
                    )}
                    {/* {props.phase === 'Planning' && (<IconButton
                        className={styles.toolButton}
                        img={copyIcon}
                        title={props.intl.formatMessage(messages.copy)}
                        onClick={props.onCopy}
                    />)} */}
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
                {props.planningFeedback && (
                    <div className={styles.feedbackButtonGroup}>
                        <button
                            className={styles.feedbackButton}
                            disabled={!props.planningFeedback}
                            title={props.intl.formatMessage(messages.feedback)}
                            onClick={props.handleOpenFeedback}
                            data-for={messages.storyboardDescription.id}
                            data-tip={`Storyboard Description Feedback: 
                                ${props.vm.storyboardOverall.descriptionFeedback.text}`}
                            style={{backgroundColor: props.vm.storyboardOverall.descriptionFeedback.color}}
                        >
                            <img
                                className={styles.feedbackIcon}
                                draggable={false}
                                src={props.vm.storyboardOverall.descriptionFeedback.color ===
                                        feedbackColors.Complete ? tickIcon : cautionIcon}
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
                {props.planningFeedback && (
                    <div className={styles.feedbackButtonGroup}>
                        <button
                            className={styles.feedbackButton}
                            disabled={!props.planningFeedback}
                            title={props.intl.formatMessage(messages.feedback)}
                            data-for={messages.storyboardVariables.id}
                            data-tip={props.vm.storyboardOverall.globalVariablesFeedback.text}
                            style={{backgroundColor: props.vm.storyboardOverall.globalVariablesFeedback.color}}
                        // onClick={props.openFeedback}
                        >
                            <img
                                className={styles.feedbackIcon}
                                draggable={false}
                                src={props.vm.storyboardOverall.globalVariablesFeedback.color ===
                                        feedbackColors.Complete ? tickIcon : cautionIcon}
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
            {props.feedbackLoading === 'Loading' && (
                <div className={styles.loadingContainer}>
                    <SpinnerComponent
                        level="primary"
                    />
                    <Label
                        text={`${props.intl.formatMessage(messages.feedbackLoading)}
                    \n ${props.intl.formatMessage(messages.question)} `}
                    />
                </div>
            )}
            {props.understandingFeedback && props.phase === 'Understanding' && (
                <div className={styles.feedbackTextBox}>
                    <Label text={props.intl.formatMessage(messages.feedback)}>
                        <div className={styles.textRow}>
                            <div
                                className={classNames(styles.textContainer, {
                                    [styles.expanded]: expanded
                                })}
                                style={{whiteSpace: 'pre-wrap'}}
                            >
                                {props.understandingFeedback || 'No feedback available'}
                            </div>
                            <button
                                className={styles.toggleButton}
                                // eslint-disable-next-line react/jsx-no-bind
                                onClick={toggleExpanded}
                            >
                                {expanded ? 'Show less' : 'Show more'}
                            </button>
                        </div>
                    </Label>
                </div>
            )}
            <div className={styles.divider} />
            {props.phase === 'Understanding' && (
                <div className={styles.scrollWrapper}>
                    <div className={styles.wrapper}>
                        {props.vm.runtime.targets.map(target => (
                            !target.isStage && (
                                <div
                                    key={target.sprite.name}
                                    className={styles.innerBox}
                                >
                                    {/* Stick to top */}
                                    <div className={styles.spriteHeader}>
                                        <div>{target.sprite.name}</div>
                                        <div className={styles.divider} />
                                    </div>

                                    {/* Background fills to bottom */}
                                    <div className={styles.behaviorsList}>
                                        {target.sprite.behaviors.map(behavior => (
                                            <div key={behavior.name}>
                                                <BufferedInput
                                                    tabIndex="1"
                                                    type="text"
                                                    className={styles.nameInput}
                                                    value={behavior.name}
                                                    onSubmit={props.onChangeName}
                                                    disabled={target.sprite.name !== props.vm.editingTarget.getName()}
                                                />
                                                {/* <div className={styles.droprightContainer}>
                                                <button
                                                    className={styles.droprightButton}
                                                    // eslint-disable-next-line react/jsx-no-bind
                                                    onClick={() => {
                                                        if (target.sprite.name === props.vm.editingTarget.getName()) {
                                                            setOpenBehaviorName(openBehaviorName === behavior.name ?
                                                                null : behavior.name);
                                                        }
                                                    }}
                                                    disabled={target.sprite.name !== props.vm.editingTarget.getName()}
                                                >
                                                    <span>
                                                        {props.intl.formatMessage(
                                                            messages.behaviorSelectedRelatedSprites
                                                        )}
                                                    </span>
                                                    <img
                                                        src={droprightCaret}
                                                        alt="Dropright caret"
                                                    />
                                                </button>
                                                {openBehaviorName === behavior.name && (
                                                    <div className={styles.droprightMenu}>
                                                        {relatedSpritesImages.map(option => (
                                                            <label
                                                                key={option.sprite.name}
                                                                className={styles.droprightOption}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        props.behaviors[props.selectedBehaviorIndex]
                                                                            .relatedSprites.includes(option.getName())
                                                                    }
                                                                    onChange={() => props.onToggleRelatedSprites(option.getName())}
                                                                />
                                                                <img
                                                                    src={option.sprite.costumes[0]}
                                                                    alt="Sprite image"
                                                                />
                                                                <span className={styles.labelText}>
                                                                    {option.getName()}
                                                                </span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}
                                            </div> */}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}
            {props.phase === 'Planning' && (
                <div>{props.behaviors.length > 0 && props.selectedBehaviorIndex > -1 && (<>
                    <div className={styles.row}>
                        <Label text={props.intl.formatMessage(messages.behaviorName)}>
                            <BufferedInput
                                tabIndex="1"
                                type="text"
                                value={props.behaviors[props.selectedBehaviorIndex].name || ''}
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
                        {props.planningFeedback && (
                            <div className={styles.feedbackButtonGroup}>
                                <button
                                    className={styles.feedbackButton}
                                    disabled={!props.planningFeedback}
                                    title={props.intl.formatMessage(messages.feedback)}
                                    data-for={messages.behaviorVariables.id}
                                    data-tip={props.behaviors[props.selectedBehaviorIndex].feedback.variables.text}
                                    style={{backgroundColor: props.behaviors[props.selectedBehaviorIndex]
                                        .feedback.variables.color}}
                                >
                                    <img
                                        className={styles.feedbackIcon}
                                        draggable={false}
                                        src={props.behaviors[props.selectedBehaviorIndex]
                                            .feedback.variables.color ===
                                                feedbackColors.Complete ? tickIcon : cautionIcon}
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
                        {props.planningFeedback && (
                            <div className={styles.feedbackButtonGroup}>
                                <button
                                    className={styles.feedbackButton}
                                    disabled={!props.planningFeedback}
                                    title={props.intl.formatMessage(messages.feedback)}
                                    data-for={messages.behaviorDescription.id}
                                    data-tip={props.behaviors[props.selectedBehaviorIndex].feedback.description.text}
                                    style={{backgroundColor: props.behaviors[props.selectedBehaviorIndex]
                                        .feedback.description.color}}
                                // onClick={props.openFeedback}
                                >
                                    <img
                                        className={styles.feedbackIcon}
                                        draggable={false}
                                        src={props.behaviors[props.selectedBehaviorIndex]
                                            .feedback.description.color ===
                                        feedbackColors.Complete ? tickIcon : cautionIcon}
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
                                            {relatedSprites.map(option => (
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
                        {props.planningFeedback && (
                            <div className={styles.feedbackButtonGroup}>
                                <button
                                    className={styles.feedbackButton}
                                    disabled={!props.planningFeedback}
                                    title={props.intl.formatMessage(messages.feedback)}
                                    data-for={messages.behaviorRelatedSprites.id}
                                    data-tip={props.behaviors[props.selectedBehaviorIndex].feedback.relatedSprites.text}
                                    style={{backgroundColor: props.behaviors[props.selectedBehaviorIndex]
                                        .feedback.relatedSprites.color}}
                                // onClick={props.openFeedback}
                                >
                                    <img
                                        className={styles.feedbackIcon}
                                        draggable={false}
                                        src={props.behaviors[props.selectedBehaviorIndex]
                                            .feedback.relatedSprites.color ===
                                                feedbackColors.Complete ? tickIcon : cautionIcon}
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
                        {props.planningFeedback && (
                            <div className={styles.feedbackButtonGroup}>
                                <button
                                    className={styles.feedbackButton}
                                    disabled={!props.planningFeedback}
                                    title={props.intl.formatMessage(messages.feedback)}
                                    data-for={messages.behaviorSounds.id}
                                    data-tip={props.behaviors[props.selectedBehaviorIndex].feedback.sounds.text}
                                    style={{backgroundColor: props.behaviors[props.selectedBehaviorIndex]
                                        .feedback.sounds.color}}
                                // onClick={props.openFeedback}
                                >
                                    <img
                                        className={styles.feedbackIcon}
                                        draggable={false}
                                        src={props.behaviors[props.selectedBehaviorIndex]
                                            .feedback.sounds.color ===
                                                feedbackColors.Complete ? tickIcon : cautionIcon}
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
                        {props.planningFeedback && (
                            <div className={styles.feedbackButtonGroup}>
                                <button
                                    className={styles.feedbackButton}
                                    disabled={!props.planningFeedback}
                                    title={props.intl.formatMessage(messages.feedback)}
                                    data-for={messages.behaviorCostumes.id}
                                    data-tip={props.behaviors[props.selectedBehaviorIndex].feedback.costumes.text}
                                    style={{backgroundColor: props.behaviors[props.selectedBehaviorIndex]
                                        .feedback.costumes.color}}
                                // onClick={props.openFeedback}
                                >
                                    <img
                                        className={styles.feedbackIcon}
                                        draggable={false}
                                        src={props.behaviors[props.selectedBehaviorIndex]
                                            .feedback.costumes.color ===
                                                feedbackColors.Complete ? tickIcon : cautionIcon}
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
    understandingFeedback: PropTypes.string,
    planningFeedback: PropTypes.string,
    phase: PropTypes.string,
    feedbackLoading: PropTypes.string,
    handleOpenFeedback: PropTypes.func,
    setRef: PropTypes.func.isRequired,
    intl: intlShape,
    title: PropTypes.string,
    variables: PropTypes.arrayOf(PropTypes.string).isRequired,
    storyboardDescription: PropTypes.string,
    storyboardVariables: PropTypes.string,
    behaviors: PropTypes.array.isRequired,
    selectedBehaviorIndex: PropTypes.number.isRequired,
    onPlanning: PropTypes.func.isRequired,
    onUnderstanding: PropTypes.func.isRequired,
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
    onToggleVariable: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default injectIntl(StoryboardEditor);
