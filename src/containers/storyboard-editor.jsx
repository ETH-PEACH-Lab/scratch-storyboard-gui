import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import StoryboardEditorComponent from '../components/storyboard-editor/storyboard-editor.jsx';

import {connect} from 'react-redux';

class StoryboardEditor extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeName',
            'handleChangeDescription',
            'handleChangeVariables',
            'handleChangePossibleBlocks',
            'handleChangeRelatedSprites',
            'handleChangeCostumes',
            'handleChangeSounds',
            'handleChangeTitle',
            'handleChangeStoryboardDescription',
            'handleDeleteBehavior',
            'handleCopy',
            'setRef',
            'handleToggleVariable',
            'handleToggleRelatedSprites',
            'handleToggleCostume',
            'handleToggleSound',
            'handleAddGlobalVariable',
            'handleChangeGlobalVariable',
        ]);

        this.ref = null;

        this.variableList = [
            ...this.props.vm.storyboardOverall.globalVariables.filter(variable => variable !== ''),
            'x position',
            'y position',
            'direction',
            'mouse-x',
            'mouse-y',
            'mouse-pointer',
            'answer',
            'username',
            'loudness',
            'volume',
            'timer'
        ];

    }

    setRef (element) {
        this.ref = element;
    }

    handleToggleVariable (option){
        // eslint-disable-next-line no-negated-condition
        if (!this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex]
            .variables.includes(option)) {
            this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex]
                .variables.push(option);
        } else {
            this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex]
                .variables.pop(option);
        }
        this.forceUpdate();
    }

    handleToggleRelatedSprites (option){
        // eslint-disable-next-line no-negated-condition
        if (!this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex]
            .relatedSprites.includes(option)) {
            this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex]
                .relatedSprites.push(option);
        } else {
            this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex]
                .relatedSprites.pop(option);
        }
        this.forceUpdate();
    }

    handleToggleCostume (option){
        // eslint-disable-next-line no-negated-condition
        if (!this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex]
            .costumes.includes(option)) {
            this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex]
                .costumes.push(option);
        } else {
            this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex]
                .costumes.pop(option);
        }
        this.forceUpdate();
    }

    handleToggleSound (option){
        // eslint-disable-next-line no-negated-condition
        if (!this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex]
            .sounds.includes(option)) {
            this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex]
                .sounds.push(option);
        } else {
            this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex]
                .sounds.pop(option);
        }
        this.forceUpdate();
    }

    handleCopy () {
        this.props.vm.copyStoryboardToComments();
        this.setState({phase: 'Coding'});
        this.props.onHandleCoding();
        this.forceUpdate();
    }

    // handlePlanning () {
    //     this.setState({phase: 'Planning'});
    //     this.forceUpdate();
    // }

    // handleUnderstanding () {
    //     this.setState({phase: 'Understanding'});
    //     this.forceUpdate();
    // }

    handleChangeName (name) {
        this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex].name = name;
        this.forceUpdate();
    }

    handleChangeDescription (description) {
        this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex].description = description;
        this.forceUpdate();
    }

    handleChangeVariables (variables) {
        this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex].variables = variables;
        this.forceUpdate();
    }

    handleChangePossibleBlocks (possibleBlocks) {
        this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex].possibleBlocks = possibleBlocks;
        this.forceUpdate();
    }

    handleChangeCostumes (costumes) {
        this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex].costumes = costumes;
        this.forceUpdate();
    }

    handleChangeSounds (sounds) {
        this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex].sounds = sounds;
        this.forceUpdate();
    }

    handleChangeRelatedSprites (relatedSprites) {
        this.props.vm.editingTarget.sprite.behaviors[this.props.selectedBehaviorIndex].relatedSprites = relatedSprites;
        this.forceUpdate();
    }

    handleChangeTitle (title) {
        this.props.vm.setStoryboardTitle(title);
        this.forceUpdate();
    }

    handleChangeStoryboardDescription (description) {
        this.props.vm.setStoryboardDescription(description);
        this.forceUpdate();
    }

    handleAddGlobalVariable () {
        this.props.vm.addGlobalVariable();
        this.forceUpdate();
    };

    handleChangeGlobalVariable (variable, index) {
        this.props.vm.setGlobalVariable(variable, index);
        this.variableList = [
            ...this.props.vm.storyboardOverall.globalVariables.filter(variable => variable !== ''),
            'x position',
            'y position',
            'direction',
            'mouse-x',
            'mouse-y',
            'mouse-pointer',
            'answer',
            'username',
            'loudness',
            'volume',
            'timer'
        ];
        this.forceUpdate();
    };

    handleDeleteBehavior (behaviorName) {
        const behaviors = this.props.vm.editingTarget.sprite.behaviors;
        const index = behaviors.findIndex(behavior => behavior.name === behaviorName);
        if (index !== -1) {
            behaviors.splice(index, 1);
            this.props.vm.editingTarget.sprite.behaviors = behaviors;
            this.forceUpdate();
        }
    };

    // handleOpenFeedback = () => {
    //     // This function should handle opening the feedback modal or redirecting to a feedback page
    //     // For now, we will just log a message to the console
    //     console.log('Open feedback modal');
    // };
    
    render () {
        console.log('StoryboardEditor props:', this.props);
        return (
            <StoryboardEditorComponent
                title={this.props.vm.storyboardOverall.title}
                variables={this.variableList}
                storyboardDescription={this.props.vm.storyboardOverall.description}
                storyboardVariables={this.props.vm.storyboardOverall.globalVariables}
                behaviors={this.props.vm.editingTarget.sprite.behaviors}
                selectedBehaviorIndex={this.props.selectedBehaviorIndex}
                understandingFeedback={this.props.understandingFeedback}
                planningFeedback={this.props.planningFeedback}
                phase={this.props.phase}
                feedbackLoading={this.props.feedbackLoading}
                setRef={this.setRef}
                onChangeName={this.handleChangeName}
                onChangeDescription={this.handleChangeDescription}
                onChangeVariables={this.handleChangeVariables}
                onChangeCostumes={this.handleChangeCostumes}
                onChangeSounds={this.handleChangeSounds}
                onChangeRelatedSprites={this.handleChangeRelatedSprites}
                onChangePossibleBlocks={this.handleChangePossibleBlocks}
                onChangeTitle={this.handleChangeTitle}
                onAddGlobalVariable={this.handleAddGlobalVariable}
                onChangeGlobalVariable={this.handleChangeGlobalVariable}
                onChangeStoryboardDescription={this.handleChangeStoryboardDescription}
                onToggleVariable={this.handleToggleVariable}
                onToggleRelatedSprites={this.handleToggleRelatedSprites}
                onToggleCostume={this.handleToggleCostume}
                onToggleSound={this.handleToggleSound}
                onDeleteBehavior={this.handleDeleteBehavior}
                onAddBehavior={this.props.onHandleNewBehavior}
                onCopy={this.handleCopy}
                onPlanning={this.props.onHandlePlanning}
                onUnderstanding={this.props.onHandleUnderstanding}
                onUnderstandingFeedback={this.props.onUnderstandingFeedback}
                onPlanningFeedback={this.props.onPlanningFeedback}
                vm={this.props.vm}
            />

        );
    }
}

StoryboardEditor.propTypes = {
    selectedBehaviorIndex: PropTypes.number.isRequired,
    behaviors: PropTypes.array.isRequired,
    understandingFeedback: PropTypes.string,
    planningFeedback: PropTypes.string,
    phase: PropTypes.string,
    feedbackLoading: PropTypes.string,
    onHandlePlanning: PropTypes.func.isRequired,
    onHandleUnderstanding: PropTypes.func.isRequired,
    onHandleCoding: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = (state, {behaviorIndex}) => {
    const sprite = state.scratchGui.vm.editingTarget.sprite;
    const index = behaviorIndex < sprite.behaviors.length ? behaviorIndex : sprite.behaviors.length - 1;
    return {
        behaviorIndex: index,
        vm: state.scratchGui.vm
    };
    
};

export default connect(
    mapStateToProps
)(StoryboardEditor);
