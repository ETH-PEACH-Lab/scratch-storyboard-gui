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
            'handleChangeStoryboardVariables',
            'handleChangeStoryboardDescription',
            'handleDelete',
            'handleCopy',
            'setRef',
            'handleToggleVariable',
            'handleToggleRelatedSprites'
        ]);

        this.ref = null;

        this.variableList = [
            ...this.props.vm.storyboardOverall.globalVariables,
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

        this.relatedSprites = this.props.vm.runtime.targets.map(target => target.getName())
            .filter(name => name !== this.props.vm.editingTarget.sprite.name);

    }

    componentWillReceiveProps (newProps) {
        if (newProps.selectedBehaviorIndex !== this.props.selectedBehaviorIndex) {
            this.redoStack = [];
            this.undoStack = [];
        }
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

    handleDelete () {
        if (this.ref) {
            this.ref.handleDelete();
        }
    }
    handleCopy () {
        this.props.vm.copyStoryboardToComments();
    }

    handlePlanning () {
        console.log('Planning phase started');
        this.setState({phase: 'Planning'});
        this.forceUpdate();
        console.log(this.state.phase);
        console.log(this.props.phase);
    }

    handleUnderstanding () {
        this.setState({phase: 'Understanding'});
        this.forceUpdate();
    }

    // handleUndo () {
    //     this.redoStack.push(this.getUndoItem());
    //     const {samples, sampleRate, trimStart, trimEnd} = this.undoStack.pop();
    //     if (samples) {
    //         return this.submitNewSamples(samples, sampleRate, true).then(success => {
    //             if (success) {
    //                 this.setState({trimStart: trimStart, trimEnd: trimEnd}, this.handlePlay);
    //             }
    //         });
    //     }
    // }
    // handleRedo () {
    //     const {samples, sampleRate, trimStart, trimEnd} = this.redoStack.pop();
    //     if (samples) {
    //         this.undoStack.push(this.getUndoItem());
    //         return this.submitNewSamples(samples, sampleRate, true).then(success => {
    //             if (success) {
    //                 this.setState({trimStart: trimStart, trimEnd: trimEnd}, this.handlePlay);
    //             }
    //         });
    //     }
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

    handleChangeStoryboardVariables (variables) {
        this.props.vm.setStoryboardGlobalVariables(variables);
        this.forceUpdate();
    }
    handleChangeStoryboardDescription (description) {
        this.props.vm.setStoryboardDescription(description);
        this.forceUpdate();
    }

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
                relatedSprites={this.relatedSprites}
                storyboardDescription={this.props.vm.storyboardOverall.description}
                storyboardVariables={this.props.vm.storyboardOverall.globalVariables}
                behaviors={this.props.vm.editingTarget.sprite.behaviors}
                selectedBehaviorIndex={this.props.selectedBehaviorIndex}
                understandingFeedback={this.props.understandingFeedback}
                planningFeedback={this.props.planningFeedback}
                phase={this.props.phase}
                setRef={this.setRef}
                onChangeName={this.handleChangeName}
                onChangeDescription={this.handleChangeDescription}
                onChangeVariables={this.handleChangeVariables}
                onChangeCostumes={this.handleChangeCostumes}
                onChangeSounds={this.handleChangeSounds}
                onChangeRelatedSprites={this.handleChangeRelatedSprites}
                onChangePossibleBlocks={this.handleChangePossibleBlocks}
                onChangeTitle={this.handleChangeTitle}
                onChangeStoryboardVariables={this.handleChangeStoryboardVariables}
                onChangeStoryboardDescription={this.handleChangeStoryboardDescription}
                onToggleVariable={this.handleToggleVariable}
                onToggleRelatedSprites={this.handleToggleRelatedSprites}
                onDelete={this.handleDelete}
                onCopy={this.handleCopy}
                onPlanning={this.props.onHandlePlanning}
                onUnderstanding={this.props.onHandleUnderstanding}
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
    onHandlePlanning: PropTypes.func.isRequired,
    onHandleUnderstanding: PropTypes.func.isRequired,
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
