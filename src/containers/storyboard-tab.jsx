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
    STORYBOARD_TAB_INDEX
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
    }
});
const Phase = {
    Understanding: 'understanding',
    Loading: 'loading',
    Planning: 'planning'
};


class StoryboardTab extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelectBehavior',
            'handleDeleteBehavior',
            'handleNewBehavior',
            // 'handleVerifyStoryboard',
            'handleUnderstandingVerification',
            'handlePlanningVerification',
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
            phase: Phase.Planning,
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
            variables: '',
            costumes: '',
            sounds: '',
            relatedSprites: '',
            possibleBlocks: '',
            feedback: {
                variables: '',
                description: '',
                costumes: '',
                sounds: '',
                relatedSprites: '',
                possibleBlocks: ''
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
        if (dropInfo.dragType === DragConstants.SOUND) {
            const sprite = this.props.vm.editingTarget.sprite;
            const activeBehavior = sprite.behaviors[this.state.selectedBehaviorIndex];

            this.props.vm.reorderBehavior(this.props.vm.editingTarget.id,
                dropInfo.index, dropInfo.newIndex);

            this.setState({selectedBehaviorIndex: sprite.behaviors.indexOf(activeBehavior)});
        } else if (dropInfo.dragType === DragConstants.BACKPACK_COSTUME) {
            this.props.onActivateCostumesTab();
            this.props.vm.addCostume(dropInfo.payload.body, {
                name: dropInfo.payload.name
            });
        } else if (dropInfo.dragType === DragConstants.BACKPACK_SOUND) {
            this.props.vm.addSound({
                md5: dropInfo.payload.body,
                name: dropInfo.payload.name
            }).then(this.handleNewSound);
        }
    }

    setFileInput (input) {
        this.fileInput = input;
    }

    async handleVerifyStoryboard () {

        const feedback = await this.props.vm.getFeedback();
        console.log('Feedback response', feedback);

        this.setState({feedback: feedback});
    }

    async handleUnderstandingVerification (){
        this.setState({phase: Phase.Loading});
        const feedback = await this.props.vm.getUnderstandingFeedback();
        this.setState({phase: Phase.Planning});
        this.setState({understandingFeedback: feedback});
        // console.log('TODO test verification logic edge cases');
    }

    async handlePlanningVerification (){
        this.setState({phase: Phase.Loading});
        const feedback = await this.props.vm.getPlanningFeedback();
        this.setState({phase: Phase.Planning});
        this.setState({planningFeedback: feedback});

        // const projectJson = await this.props.vm.descriptionToBlocks();
        // console.log(projectJson, 'Response for verification');
        // console.log('TODO test project json format');
        // console.log('TODO implement description to blocks conversion');
    }

    // handleReferenceUpload (e) {
    //     const file = e.target.files[0];
    //     if (!file || !file.name.endsWith('.json')) {
    //         return;
    //     }

    //     const reader = new FileReader();
    //     this.props.onShowImporting();

    //     const storage = this.props.vm.runtime.storage;

    //     reader.onload = () => {
    //         try {
    //             const json = JSON.parse(reader.result);

    //             if (!json.targets || !Array.isArray(json.targets)) {
    //                 throw new Error('Invalid Scratch project structure.');
    //             }

    //             // add minimal sprites
    //             for (const target of json.targets) {
    //                 if (target.isStage) {
    //                     continue; // Skip stage targets
    //                 }
    //                 const copyTarget = JSON.parse(JSON.stringify(target));
    //                 copyTarget.blocks = {}; // No blocks
    //                 copyTarget.currentCostume = 0; // Default to first costume
    //                 copyTarget.comments = {}; // No comments
    //                 copyTarget.list = []; // No lists
    //                 copyTarget.variables = {}; // No variables
    //                 copyTarget.clones = []; // No clones
    //                 copyTarget.visible = true; // Ensure the sprite is visible
    //                 copyTarget.x = 0; // Default position
    //                 copyTarget.y = 0; // Default position
    //                 copyTarget.size = 100; // Default size
    //                 copyTarget.direction = 90; // Default direction
    //                 copyTarget.rotationStyle = 'all around'; // Default rotation style
    //                 copyTarget.costumes = copyTarget.costumes.slice(0, 1); // Keep only the first costume

    //                 const loadCostumePromises = [];
    //                 copyTarget.costumes.forEach(costume => {
    //                     const md5ext = costume.md5ext;
    //                     const [assetId, ext] = md5ext.split('.');
    //                     const assetType = ext === 'svg' ?
    //                         storage.AssetType.ImageVector :
    //                         storage.AssetType.ImageBitmap;

    //                     const loadPromise = storage.load(assetType, assetId, ext)
    //                         .then(asset => {
    //                             costume.asset = asset;
    //                         });

    //                     loadCostumePromises.push(loadPromise);
    //                 });

    //                 copyTarget.sounds = []; // No sounds
    //                 copyTarget.behaviors = []; // No behaviors

    //                 // Wait for all assets to be loaded
    //                 Promise.all([...loadCostumePromises])
    //                     .then(() => {
    //                         // All assets are in storage, safe to add sprite
    //                         this.props.vm.addSprite(JSON.stringify({
    //                             targets: [copyTarget],
    //                             meta: {
    //                                 semver: '3.0.0',
    //                                 vm: '0.2.0',
    //                                 agent: 'sprite-import'
    //                             }
    //                         })).then(() => {
    //                             console.log('Sprite added successfully');
    //                         })
    //                             .catch(err => {
    //                                 console.error('Error adding sprite:', err);
    //                             });
    //                     })
    //                     .catch(err => {
    //                         console.error('Error loading assets:', err);
    //                     });

    //                 // const spriteJson = {
    //                 //     targets: [copyTarget],
    //                 //     meta: {
    //                 //         semver: '3.0.0',
    //                 //         vm: '0.2.0',
    //                 //         agent: 'custom-import'
    //                 //     }
    //                 // };

    //                 // const response = this.props.vm.addSprite(JSON.stringify(spriteJson));
    //                 // console.log(response, 'A sprite after upload');
    //             }

    //             console.log(this.props.sprites, 'A sprites after upload');
    //             console.log(this.props.vm.runtime.targets, 'B sprites after upload');

    //             // Set a name from the file
    //             json.name = file.name.replace(/\.json$/, '');

    //             // Save reference project json as string for verification
    //             this.props.vm.addReferenceProject(json);

    //             this.setState({
    //                 referenceProject: json
    //             });

    //             this.props.onCloseImporting();

    //         } catch (err) {
    //             console.error('Failed to parse project JSON:', err);
    //             this.props.onCloseImporting();
    //         }
    //     };

    //     reader.readAsText(file);
    // }


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
            },
            {
                title: intl.formatMessage(messages.verifyUnderstanding),
                img: surpriseIcon,
                onClick: this.handleUnderstandingVerification
            },
            {
                title: intl.formatMessage(messages.verifyPlanning),
                img: surpriseIcon,
                onClick: this.handlePlanningVerification
            }
            // , {
            //     title: intl.formatMessage(messages.fileUploadReference),
            //     img: fileUploadIcon,
            //     onClick: this.handleFileUploadClick,
            //     fileAccept: '.json', // '.sb,.sb2,.sb3',
            //     fileChange: this.handleReferenceUpload,
            //     fileInput: this.setFileInput,
            //     fileMultiple: true
            // }
            // ,{
            //     title: intl.formatMessage(messages.addBehavior),
            //     img: addBehaviorIcon,
            //     onClick: this.handleNewBehavior
            // }
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
            >
                {sprite.behaviors ? (
                    <StoryboardEditor
                        selectedBehaviorIndex={this.state.selectedBehaviorIndex}
                        behavior={sprite.behaviors[this.state.selectedBehaviorIndex]}
                        understandingFeedback={this.state.understandingFeedback}
                        planningFeedback={this.state.planningFeedback}
                        phase={this.state.phase}
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
