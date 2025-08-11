import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {connect} from 'react-redux';
import {setStoryboardMode} from '../reducers/mode';

import ControlsComponent from '../components/controls/controls.jsx';

class Controls extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleGreenFlagClick',
            'handleStopAllClick',
            'handleModeToggle'
        ]);
    }
    handleGreenFlagClick (e) {
        e.preventDefault();
        if (e.shiftKey) {
            this.props.vm.setTurboMode(!this.props.turbo);
        } else {
            if (!this.props.isStarted) {
                this.props.vm.start();
            }
            this.props.vm.greenFlag(this.props.storyboardMode ? 1 : 0);
        }
    }
    handleStopAllClick (e) {
        e.preventDefault();
        this.props.vm.stopAll();
    }

    handleModeToggle () {
        const current = this.props.storyboardMode;
        console.log('handleModeToggle', current);
        this.props.onToggleStoryboardMode(!current);
    }

    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            isStarted, // eslint-disable-line no-unused-vars
            projectRunning,
            turbo,
            activeTabIndex,
            storyboardMode,
            ...props
        } = this.props;
        return (
            <ControlsComponent
                {...props}
                activeTabIndex={activeTabIndex}
                storyboardMode={storyboardMode}
                active={projectRunning}
                turbo={turbo}
                onGreenFlagClick={this.handleGreenFlagClick}
                onStopAllClick={this.handleStopAllClick}
                onModeToggle={this.handleModeToggle}
            />
        );
    }
}

Controls.propTypes = {
    isStarted: PropTypes.bool.isRequired,
    activeTabIndex: PropTypes.number.isRequired,
    projectRunning: PropTypes.bool.isRequired,
    turbo: PropTypes.bool.isRequired,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    isStarted: state.scratchGui.vmStatus.running,
    projectRunning: state.scratchGui.vmStatus.running,
    turbo: state.scratchGui.vmStatus.turbo,
    storyboardMode: state.scratchGui.mode.storyboardMode
});
// no-op function to prevent dispatch prop being passed to component
const mapDispatchToProps = dispatch => ({
    onToggleStoryboardMode: enabled => dispatch(setStoryboardMode(enabled))
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
