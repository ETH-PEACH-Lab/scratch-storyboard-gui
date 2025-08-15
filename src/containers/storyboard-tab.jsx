import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {defineMessages, intlShape, injectIntl} from 'react-intl';
import VM from 'scratch-vm';

import AssetPanel from '../components/asset-panel/asset-panel.jsx';
// import fileUploadIcon from '../components/action-menu/icon--file-upload.svg';
import addComponentIcon from '../components/action-menu/icon--backdrop.svg';
import surpriseIcon from '../components/action-menu/icon--surprise.svg';
import addBehaviorIcon from '../components/action-menu/icon--addBehavior.svg';
import behaviorIcon from '../components/action-menu/icon--behavior.svg';

import StoryboardEditor from './storyboard-editor.jsx';

// import {handleFileUpload, referenceUpload, spriteUpload} from '../lib/file-uploader.js';
import referenceProject from '../lib/storyboard-project/reference-project.json';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import DragConstants from '../lib/drag-constants';

import pseudocode from '../lib/storyboard-project/reference_project_pseudo.txt?raw';
import {connect} from 'react-redux';

import {

} from '../reducers/modals';

import {
    activateTab,
    SOUNDS_TAB_INDEX,
    COSTUMES_TAB_INDEX,
    STORYBOARD_TAB_INDEX,
    BLOCKS_TAB_INDEX
} from '../reducers/editor-tab';

import {setRestore} from '../reducers/restore-deletion';
import {showStandardAlert, closeAlertWithId} from '../reducers/alerts';

const messages = defineMessages({
    storyboardMenu: {
        defaultMessage: 'Storyboard Menu',
        description: 'Label for the storyboard menu in the editor tab',
        id: 'gui.storyboardTab.storyboardMenu'
    },
    fileUploadReference: {
        defaultMessage: 'Upload Reference Project',
        description: 'Button to upload reference project file in the editor tab',
        id: 'gui.storyboardTab.fileUploadReference'
    },
    // addComponent: {
    //     defaultMessage: 'Add Component',
    //     description: 'Button to add a component in the editor tab',
    //     id: 'gui.storyboardTab.addComponent'
    // },
    // addRelationship: {
    //     defaultMessage: 'Add Relationship',
    //     description: 'Button to add a relationship in the editor tab',
    //     id: 'gui.storyboardTab.addRelationship'
    // },
    behavior: {
        defaultMessage: 'Behavior',
        description: 'Label for a behavior in the editor tab',
        id: 'gui.storyboardTab.behavior'
    },
    addBehavior: {
        defaultMessage: 'Add Behavior',
        description: 'Button to add a behavior in the editor tab',
        id: 'gui.storyboardTab.addBehavior'
    },
    verifyUnderstanding: {
        defaultMessage: 'Get Understanding Feedback',
        description: 'Button to get understanding feedback in the editor tab',
        id: 'gui.storyboardTab.verifyUnderstanding'
    },
    verifyPlanning: {
        defaultMessage: 'Get Planning Feedback',
        description: 'Button to get planning feedback in the editor tab',
        id: 'gui.storyboardTab.verifyPlanning'
    },
    variables: {
        defaultMessage: 'Variables: ',
        description: 'Label for variables in the editor tab',
        id: 'gui.storyboardTab.variables'
    },
    relatedSprites: {
        defaultMessage: 'Related Sprites: ',
        description: 'Label for related sprites in the editor tab',
        id: 'gui.storyboardTab.relatedSprites'
    }
});
const Phase = {
    Understanding: 'Understanding',
    Planning: 'Planning'
};

const feedbackLoading = {
    NotStarted: 'NotStarted',
    Loading: 'Loading',
    Loaded: 'Loaded'
};

const feedbackColors = {
    Complete: '#4CAF50', // Green
    Incomplete: '#EE7600', // Orange
    NeedsImprovement: '#FFC107'// Yellow
};


class StoryboardTab extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelectBehavior',
            'handleDeleteBehavior',
            'handleNewBehavior',
            'handleUnderstanding',
            'handlePlanning',
            'handleUnderstandingVerification',
            'handlePlanningVerification',
            'handleCoding',
            // 'handleReferenceUpload',
            'handleFileUploadClick',
            'handleDrop',
            'setFileInput'
        ]);

        this.props.vm.addReferenceProjectPseudocode(pseudocode);

        this.state = {
            selectedBehaviorIndex: 0,
            understandingFeedback: null,
            planningFeedback: null,
            referenceProject: this.props.vm.addReferenceProject(referenceProject) || null,
            phase: Phase.Understanding,
            feedbackLoading: feedbackLoading.NotStarted,
            selectedVariables: [],
            showVariablesDropdown: false,
            selectedRelatedSprites: [],
            showRelatedSpritesDropdown: false
        };
    }

    componentWillReceiveProps (nextProps) {
        const {
            editingTarget,
            sprites,
            stage
        } = nextProps;

        const target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;
        if (!target || !target.behaviors) {
            return;
        }
        if (this.props.editingTarget !== editingTarget) {
            if (this.state.selectedBehaviorIndex !== 0) {
                this.setState({selectedBehaviorIndex: 0});
            }
        } else if (
            this.state.selectedBehaviorIndex > target.behaviors.length - 1 &&
        this.state.selectedBehaviorIndex !== Math.max(target.behaviors.length - 1, 0)
        ) {
            this.setState({
                selectedBehaviorIndex: Math.max(target.behaviors.length - 1, 0)
            });
        }
    }

    handleSelectBehavior (behaviorIndex) {
        this.setState({selectedBehaviorIndex: behaviorIndex});
    }

    handleDeleteBehavior (behaviorIndex) {
        const restoreFun = this.props.vm.deleteBehavior(behaviorIndex);
        if (behaviorIndex >= this.state.selectedBehaviorIndex) {
            this.setState({selectedBehaviorIndex: Math.max(0, behaviorIndex - 1)});
        }
        this.props.dispatchUpdateRestore({restoreFun, deletedItem: 'Behavior'});
    }

    handleNewBehavior () {
        const vmBehavior = {
            name: '',
            description: '',
            variables: [],
            costumes: [],
            sounds: [],
            relatedSprites: [],
            feedback: {
                variables: {text: '', color: null},
                description: {text: '', color: null},
                costumes: {text: '', color: null},
                sounds: {text: '', color: null},
                relatedSprites: {text: '', color: null}
            }
        };

        this.props.vm.addBehavior(vmBehavior);

        if (!this.props.vm.editingTarget) {
            return null;
        }

        const sprite = this.props.vm.editingTarget.sprite;
        const behaviors = sprite.behaviors ? sprite.behaviors : [];
        this.setState({selectedBehaviorIndex: Math.max(behaviors.length - 1, 0)});
    }


    handleFileUploadClick () {
        if (this.fileInput) {
            this.fileInput.click();
        }
    }

    handleDrop (dropInfo) {
    }

    setFileInput (input) {
        this.fileInput = input;
    }

    handlePlanning () {
        this.setState({phase: 'Planning'});
        this.forceUpdate();
    }

    handleUnderstanding () {
        this.setState({phase: 'Understanding'});
        this.forceUpdate();
    }

    handleCoding () {
        this.setState({phase: 'Coding'});
        this.forceUpdate();
    }

    async handleVerifyStoryboard (behaviorIndex) {
        this.setState({feedbackLoading: feedbackLoading.Loading});
        const behaviorFeedback = await this.props.vm.getBehaviorFeedback(behaviorIndex);
        console.log('Feedback response', behaviorFeedback);
        this.setState({feedbackLoading: feedbackLoading.Loaded});
    }

    async handleUnderstandingVerification (){
        this.setState({feedbackLoading: feedbackLoading.Loading});
        const feedback = await this.props.vm.getUnderstandingFeedback();
        this.setState({feedbackLoading: feedbackLoading.Loaded});
        this.setState({understandingFeedback: feedback});
    }

    async handlePlanningVerification (){
        this.setState({feedbackLoading: feedbackLoading.Loading});
        const feedback = await this.props.vm.getPlanningFeedback();
        this.setState({feedbackLoading: feedbackLoading.Loaded});
        // set the feedback colors based on the response

        this.props.vm.runtime.targets.forEach(target => {
            target.sprite.behaviors.forEach((behavior, index) => {
                behavior.feedback.variables.color = (feedbackColors[behavior.feedback.variables.color] ||
                    feedbackColors.Complete);
                behavior.feedback.description.color = (feedbackColors[behavior.feedback.description.color] ||
                    feedbackColors.Complete);
                behavior.feedback.costumes.color = (feedbackColors[behavior.feedback.costumes.color] ||
                    feedbackColors.Complete);
                behavior.feedback.sounds.color = (feedbackColors[behavior.feedback.sounds.color] ||
                    feedbackColors.Complete);
                behavior.feedback.relatedSprites.color = (feedbackColors[behavior.feedback.relatedSprites.color] ||
                    feedbackColors.Complete);
            });
        })

        // eslint-disable-next-line max-len
        this.props.vm.storyboardOverall.descriptionFeedback.color = (feedbackColors[this.props.vm
            .storyboardOverall.descriptionFeedback.color] || feedbackColors.Complete);
        this.props.vm.storyboardOverall.globalVariablesFeedback.color = (feedbackColors[this.props.vm
            .storyboardOverall.globalVariablesFeedback.color] || feedbackColors.Complete);
        this.setState({planningFeedback: feedback});

        // const projectJson = await this.props.vm.descriptionToBlocks();
        // this.setState({feedbackLoading: feedbackLoading.Loaded});
    }

    handleCopy (variable_string, related_sprites_string) {
        this.props.vm.copyStoryboardToComments(variable_string, related_sprites_string);
        this.setState({phase: 'Coding'});
        this.props.onActivateBlocksTab();
        this.forceUpdate();
    }


    render () {
        const {
            dispatchUpdateRestore, // eslint-disable-line no-unused-vars
            intl,
            isRtl,
            vm
        } = this.props;

        // you should still be able to describe overall stroyboard behavior
        if (!vm.editingTarget) {
            return null;
        }

        const sprite = vm.editingTarget.sprite;

        const behaviors = sprite.behaviors ? sprite.behaviors.map(behavior => (
            {
                url: isRtl ? addComponentIcon : behaviorIcon,
                name: behavior.name ? behavior.name : `${intl.formatMessage(messages.behavior)} ` +
                    `${sprite.behaviors.indexOf(behavior) + 1}`,
                details: '',
                dragPayload: behavior.name
            }
        )) : [];

        const buttons = [
            {
                title: intl.formatMessage(messages.storyboardMenu),
                img: addComponentIcon
            },
            {
                title: intl.formatMessage(messages.addBehavior),
                img: addBehaviorIcon,
                onClick: this.handleNewBehavior
            }
        ];

        // if (sprite) {
        //     buttons.push({
        //         title: intl.formatMessage(messages.addBehavior),
        //         img: addBehaviorIcon,
        //         onClick: this.handleNewBehavior
        //     });
        // }

        // if (this.state.referenceProject) {
        //     buttons.push({
        //         title: intl.formatMessage(messages.verify),
        //         img: surpriseIcon,
        //         onClick: this.handleVerifyStoryboard
        //     });
        // }

        return (
            <AssetPanel
                buttons={buttons}
                dragType={DragConstants.SOUND}
                isRtl={isRtl}
                items={behaviors}
                selectedItemIndex={this.state.selectedBehaviorIndex}
                onDeleteClick={this.handleDeleteBehavior}
                onDrop={this.handleDrop}
                onItemClick={this.handleSelectBehavior}
                visible={this.state.phase == 'Planning'}
            >
                {sprite.behaviors ? (
                    <StoryboardEditor
                        selectedBehaviorIndex={this.state.selectedBehaviorIndex}
                        behavior={sprite.behaviors[this.state.selectedBehaviorIndex]}
                        understandingFeedback={this.state.understandingFeedback}
                        planningFeedback={this.state.planningFeedback}
                        phase={this.state.phase}
                        feedbackLoading={this.state.feedbackLoading}
                        onHandleUnderstanding={this.handleUnderstanding}
                        onHandlePlanning={this.handlePlanning}
                        onHandleCoding={this.handleCoding}
                        onPlanningFeedback={this.handlePlanningVerification}
                        onUnderstandingFeedback={this.handleUnderstandingVerification}
                        onHandleNewBehavior={this.handleNewBehavior}
                        onHandleCopy={this.handleCopy}
                        onSelectBehavior={this.handleSelectBehavior}
                        variables_string={intl.formatMessage(messages.variables)}
                        related_sprites_string={intl.formatMessage(messages.relatedSprites)}
                        vm={vm}
                    />
                ) : null}
            </AssetPanel>
        );
    }
}

StoryboardTab.propTypes = {
    dispatchUpdateRestore: PropTypes.func,
    editingTarget: PropTypes.string,
    // referenceProject: PropTypes.object,
    intl: intlShape,
    isRtl: PropTypes.bool,
    onActivateCostumesTab: PropTypes.func.isRequired,
    // onCloseImporting: PropTypes.func.isRequired,
    // onShowImporting: PropTypes.func.isRequired,
    sprites: PropTypes.shape({
        id: PropTypes.shape({
            behaviors: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string.isRequired
            }))
        })
    }),
    stage: PropTypes.shape({
        behaviors: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        }))
    }),
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    editingTarget: state.scratchGui.targets.editingTarget,
    isRtl: state.locales.isRtl,
    sprites: state.scratchGui.targets.sprites,
    stage: state.scratchGui.targets.stage,
    referenceProject: state.scratchGui.vm.referenceProject,
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    onActivateCostumesTab: () => dispatch(activateTab(COSTUMES_TAB_INDEX)),
    onActivateSoundsTab: () => dispatch(activateTab(SOUNDS_TAB_INDEX)),
    onActiveStoryboardTab: () => dispatch(activateTab(STORYBOARD_TAB_INDEX)),
    onActivateBlocksTab: () => dispatch(activateTab(BLOCKS_TAB_INDEX)),
    dispatchUpdateRestore: restoreState => {
        dispatch(setRestore(restoreState));
    },
    onCloseImporting: () => dispatch(closeAlertWithId('importingAsset')),
    onShowImporting: () => dispatch(showStandardAlert('importingAsset'))
});

export default errorBoundaryHOC('Storyboard Tab')(
    injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps
    )(StoryboardTab))
);
