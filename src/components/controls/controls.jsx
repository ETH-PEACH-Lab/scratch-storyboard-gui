import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import GreenFlag from '../green-flag/green-flag.jsx';
import StopAll from '../stop-all/stop-all.jsx';
import TurboMode from '../turbo-mode/turbo-mode.jsx';

import styles from './controls.css';

const messages = defineMessages({
    goTitle: {
        id: 'gui.controls.go',
        defaultMessage: 'Go',
        description: 'Green flag button title'
    },
    stopTitle: {
        id: 'gui.controls.stop',
        defaultMessage: 'Stop',
        description: 'Stop button title'
    },
    mode: {
        id: 'gui.controls.mode',
        defaultMessage: 'Mode',
        description: 'Execution mode label'
    },
    storyboard: {
        id: 'gui.controls.storyboard',
        defaultMessage: 'Storyboard',
        description: 'Storyboard tab label'
    },
    plan: {
        id: 'gui.controls.plan',
        defaultMessage: 'Plan',
        description: 'Plan mode'
    },
    code: {
        id: 'gui.controls.code',
        defaultMessage: 'Code',
        description: 'Code tab label'
    }
});

const Controls = function (props) {
    const {
        active,
        className,
        intl,
        onGreenFlagClick,
        onStopAllClick,
        onModeToggle,
        turbo,
        ...componentProps
    } = props;
    return (
        <div
            className={classNames(styles.controlsContainer, className)}
            {...componentProps}
        >
            <GreenFlag
                active={active}
                title={intl.formatMessage(messages.goTitle)}
                onClick={onGreenFlagClick}
            />
            <StopAll
                active={active}
                title={intl.formatMessage(messages.stopTitle)}
                onClick={onStopAllClick}
            />
            {turbo ? (
                <TurboMode />
            ) : null}
            {
                <div className={styles.executionMode}>
                    <button
                        onClick={onModeToggle}
                        className={styles.toggleButton}
                    >
                        {`${intl.formatMessage(messages.mode)}: ${props.activeTabIndex === 1 ? intl.formatMessage(messages.storyboard) : (props.storyboardMode ? intl.formatMessage(messages.plan) : intl.formatMessage(messages.code))}`}
                    </button>
                </div>
            }
        </div>
    );
};

Controls.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    activeTabIndex: PropTypes.number.isRequired,
    storyboardMode: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
    onGreenFlagClick: PropTypes.func.isRequired,
    onStopAllClick: PropTypes.func.isRequired,
    onModeToggle: PropTypes.func.isRequired,
    turbo: PropTypes.bool
};

Controls.defaultProps = {
    active: false,
    turbo: false
};

export default injectIntl(Controls);
