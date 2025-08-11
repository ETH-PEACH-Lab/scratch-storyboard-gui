const SET_FULL_SCREEN = 'scratch-gui/mode/SET_FULL_SCREEN';
const SET_PLAYER = 'scratch-gui/mode/SET_PLAYER';
const SET_STORYBOARD_MODE = 'scratch-gui/mode/SET_STORYBOARD_MODE';

const initialState = {
    showBranding: false,
    isFullScreen: false,
    isPlayerOnly: false,
    hasEverEnteredEditor: true,
    storyboardMode: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_FULL_SCREEN:
        return Object.assign({}, state, {
            isFullScreen: action.isFullScreen
        });
    case SET_PLAYER:
        return Object.assign({}, state, {
            isPlayerOnly: action.isPlayerOnly,
            hasEverEnteredEditor: state.hasEverEnteredEditor || !action.isPlayerOnly
        });
    case SET_STORYBOARD_MODE:
        return {
            ...state,
            storyboardMode: action.enabled
        };    
    default:
        return state;
    }
};

const setFullScreen = function (isFullScreen) {
    return {
        type: SET_FULL_SCREEN,
        isFullScreen: isFullScreen
    };
};
const setPlayer = function (isPlayerOnly) {
    return {
        type: SET_PLAYER,
        isPlayerOnly: isPlayerOnly
    };
};

const setStoryboardMode = function (enabled) {
    return {
        type: SET_STORYBOARD_MODE,
        enabled
    };
};

export {
    reducer as default,
    initialState as modeInitialState,
    setFullScreen,
    setPlayer,
    setStoryboardMode
};
