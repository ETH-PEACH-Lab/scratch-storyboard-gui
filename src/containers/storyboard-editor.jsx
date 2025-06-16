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
            'handleUndo',
            'handleRedo',
            'setRef'
        ]);

        this.redoStack = [];
        this.undoStack = [];

        this.ref = null;
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

    handleDelete () {
        if (this.ref) {
            this.ref.handleDelete();
        }
    }
    handleCopy () {
        if (this.ref) {
            this.ref.handleCopy();
        }
    }

    handleUndo () {
        this.redoStack.push(this.getUndoItem());
        const {samples, sampleRate, trimStart, trimEnd} = this.undoStack.pop();
        if (samples) {
            return this.submitNewSamples(samples, sampleRate, true).then(success => {
                if (success) {
                    this.setState({trimStart: trimStart, trimEnd: trimEnd}, this.handlePlay);
                }
            });
        }
    }
    handleRedo () {
        const {samples, sampleRate, trimStart, trimEnd} = this.redoStack.pop();
        if (samples) {
            this.undoStack.push(this.getUndoItem());
            return this.submitNewSamples(samples, sampleRate, true).then(success => {
                if (success) {
                    this.setState({trimStart: trimStart, trimEnd: trimEnd}, this.handlePlay);
                }
            });
        }
    }

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
    }

    handleChangeStoryboardVariables (variables) {
        this.props.vm.setGlobalVariables(variables);
    }
    handleChangeStoryboardDescription (description) {
        this.props.vm.setStoryboardDescription(description);
    }

    handleOpenFeedback = () => {
        // This function should handle opening the feedback modal or redirecting to a feedback page
        // For now, we will just log a message to the console
        console.log('Open feedback modal');
    };

    
    render () {
        console.log('StoryboardEditor props:', this.props);
        return (
            <StoryboardEditorComponent
                canRedo={this.redoStack.length > 0}
                canUndo={this.undoStack.length > 0}
                behaviors={this.props.vm.editingTarget.sprite.behaviors}
                selectedBehaviorIndex={this.props.selectedBehaviorIndex}
                feedback={this.props.feedback}
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
                onDelete={this.handleDelete}
                onCopy={this.handleCopy}
                onUndo={this.handleUndo}
                onRedo={this.handleRedo}
            />

        );
    }
}

StoryboardEditor.propTypes = {
    selectedBehaviorIndex: PropTypes.number.isRequired,
    behaviors: PropTypes.array.isRequired,
    feedback: PropTypes.string,
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
