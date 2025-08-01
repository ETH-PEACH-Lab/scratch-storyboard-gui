import {defineMessages} from 'react-intl';
import sharedMessages from '../shared-messages';

let messages = defineMessages({
    variable: {
        defaultMessage: 'my variable',
        description: 'Name for the default variable',
        id: 'gui.defaultProject.variable'
    }
});

messages = {...messages, ...sharedMessages};

// use the default message if a translation function is not passed
const defaultTranslator = msgObj => msgObj.defaultMessage;

/**
 * Generate a localized version of the default project
 * @param {function} translateFunction a function to use for translating the default names
 * @return {object} the project data json for the default project
 */
const projectDataBehavior = translateFunction => {
    const translator = translateFunction || defaultTranslator;
    return ({
        targets: [
            {
                isStage: true,
                name: 'Stage',
                variables: {},
                lists: {},
                broadcasts: {},
                blocks: {},
                comments: {},
                currentCostume: 1,
                costumes: [
                    {
                        name: 'Background',
                        dataFormat: 'svg',
                        assetId: 'cd21514d0531fdffb22204e0ec5ed84a',
                        md5ext: 'cd21514d0531fdffb22204e0ec5ed84a.svg',
                        rotationCenterX: 240,
                        rotationCenterY: 180
                    }
                ],
                sounds: [],
                volume: 100,
                layerOrder: 0,
                tempo: 60,
                videoTransparency: 50,
                videoState: 'on',
                textToSpeechLanguage: null
            },
            {
                isStage: false,
                name: 'Bowl',
                variables: {},
                lists: {},
                broadcasts: {},
                blocks: {},
                comments: {},
                currentCostume: 0,
                costumes: [
                    {
                        name: 'bowl',
                        bitmapResolution: 1,
                        dataFormat: 'svg',
                        assetId: 'd147f16e3e2583719c073ac5b55fe3ca',
                        md5ext: 'd147f16e3e2583719c073ac5b55fe3ca.svg',
                        rotationCenterX: 30,
                        rotationCenterY: 15
                    }
                ],
                sounds: [
                    // {
                    //     name: 'Chomp',
                    //     assetId: '0b1e3033140d094563248e61de4039e5',
                    //     dataFormat: 'wav',
                    //     format: '',
                    //     rate: 48000,
                    //     sampleCount: 12678,
                    //     md5ext: '0b1e3033140d094563248e61de4039e5.wav'
                    // }
                ],
                behaviors: [{
                    name: 'moving',
                    description: 'Moves left and right with the arrow keys.',
                    variables: ['x position'],
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
                },
                {
                    name: 'touching Red Apple',
                    description: 'When it touches the red apple, the score is increased by 1.',
                    variables: ['Score'],
                    costumes: [],
                    sounds: ['Chomp'],
                    relatedSprites: ['Red Apple'],
                    feedback: {
                        variables: {text: '', color: null},
                        description: {text: '', color: null},
                        costumes: {text: '', color: null},
                        sounds: {text: '', color: null},
                        relatedSprites: {text: '', color: null}
                    }
                },
                {
                    name: 'touching Golden Apple',
                    description: 'When it touches the golden apple, the score is increased by 2.',
                    variables: ['Score'],
                    costumes: [],
                    sounds: ['Chomp'],
                    relatedSprites: ['Golden Apple'],
                    feedback: {
                        variables: {text: '', color: null},
                        description: {text: '', color: null},
                        costumes: {text: '', color: null},
                        sounds: {text: '', color: null},
                        relatedSprites: {text: '', color: null}
                    }
                }],
                volume: 100,
                layerOrder: 4,
                visible: true,
                x: -200,
                y: 0,
                size: 100,
                direction: 90,
                draggable: false,
                rotationStyle: 'all around'
            },
            {
                isStage: false,
                name: 'Red Apple',
                variables: {},
                lists: {},
                broadcasts: {},
                blocks: {},
                comments: {},
                currentCostume: 0,
                costumes: [
                    {
                        name: 'apple',
                        bitmapResolution: 1,
                        dataFormat: 'svg',
                        assetId: '3826a4091a33e4d26f87a2fac7cf796b',
                        md5ext: '3826a4091a33e4d26f87a2fac7cf796b.svg',
                        rotationCenterX: 31,
                        rotationCenterY: 31
                    }
                ],
                sounds: [],
                behaviors: [
                    {
                        name: 'falling',
                        description: 'It falls from top to bottom.',
                        variables: ['y position'],
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
                    },
                    {
                        name: 'touching Bowl',
                        description: 'When it touches the bowl, it goes to a random position above the background.',
                        variables: ['y position'],
                        costumes: [],
                        sounds: [],
                        relatedSprites: ['Bowl'],
                        feedback: {
                            variables: {text: '', color: null},
                            description: {text: '', color: null},
                            costumes: {text: '', color: null},
                            sounds: {text: '', color: null},
                            relatedSprites: {text: '', color: null}
                        }
                    }
                    // ,
                    // {
                    //     name: 'touching Ground',
                    //     description: 'When it touches the ground, it goes to a random position above the background.',
                    //     variables: ['y position'],
                    //     costumes: [],
                    //     sounds: [],
                    //     relatedSprites: [],
                    //     feedback: {
                    //         variables: {text: '', color: null},
                    //         description: {text: '', color: null},
                    //         costumes: {text: '', color: null},
                    //         sounds: {text: '', color: null},
                    //         relatedSprites: {text: '', color: null}
                    //     }
                    // }
                ],
                volume: 100,
                layerOrder: 2,
                visible: true,
                x: -115,
                y: 0,
                size: 100,
                direction: 90,
                draggable: false,
                rotationStyle: 'all around'
            },
            {
                isStage: false,
                name: 'Golden Apple',
                variables: {},
                lists: {},
                broadcasts: {},
                blocks: {},
                comments: {},
                currentCostume: 0,
                costumes: [
                    {
                        name: 'apple',
                        bitmapResolution: 1,
                        dataFormat: 'svg',
                        assetId: '577a057445419d23249460ad66718951',
                        md5ext: '577a057445419d23249460ad66718951.svg',
                        rotationCenterX: 31,
                        rotationCenterY: 30.993214533924885
                    }
                ],
                sounds: [],
                behaviors: [
                    {
                        name: 'falling',
                        description: 'It falls from top to bottom.',
                        variables: ['y position'],
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
                    },
                    {
                        name: 'touching Bowl',
                        description: 'When it touches the golden apple, it goes to a random position above the background.',
                        variables: ['y position'],
                        costumes: [],
                        sounds: [],
                        relatedSprites: ['Bowl'],
                        feedback: {
                            variables: {text: '', color: null},
                            description: {text: '', color: null},
                            costumes: {text: '', color: null},
                            sounds: {text: '', color: null},
                            relatedSprites: {text: '', color: null}
                        }
                    }
                    // ,
                    // {
                    //     name: 'touching Ground',
                    //     description: 'When it touches the ground, it goes to a random position above the background.',
                    //     variables: ['y position'],
                    //     costumes: [],
                    //     sounds: [],
                    //     relatedSprites: [],
                    //     feedback: {
                    //         variables: {text: '', color: null},
                    //         description: {text: '', color: null},
                    //         costumes: {text: '', color: null},
                    //         sounds: {text: '', color: null},
                    //         relatedSprites: {text: '', color: null}
                    //     }
                    // }
                ],
                volume: 100,
                layerOrder: 1,
                visible: true,
                x: -30,
                y: 0,
                size: 100,
                direction: 90,
                draggable: false,
                rotationStyle: 'all around'
            },
            {
                isStage: false,
                name: 'You Win',
                variables: {},
                lists: {},
                broadcasts: {},
                blocks: {},
                comments: {},
                currentCostume: 0,
                costumes: [
                    {
                        name: 'YOU WIN!',
                        bitmapResolution: 1,
                        dataFormat: 'svg',
                        assetId: '0bc49167d951e5a8b23de48ed7113c92',
                        md5ext: '0bc49167d951e5a8b23de48ed7113c92.svg',
                        rotationCenterX: 99.63777644610988,
                        rotationCenterY: 31.910556608884065
                    }
                ],
                sounds: [],
                behaviors: [
                    {
                        name: 'winning',
                        description: 'Hide at the start of the game and when the score reaches 10, show "YOU WIN!".',
                        variables: ['Score'],
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
                    }
                ],
                volume: 100,
                layerOrder: 3,
                visible: true,
                x: 120,
                y: 0,
                size: 100,
                direction: 90,
                draggable: false,
                rotationStyle: 'all around'
            }
            // ,{
            //     isStage: false,
            //     name: 'You Win 2',
            //     variables: {},
            //     lists: {},
            //     broadcasts: {},
            //     blocks: {},
            //     comments: {},
            //     currentCostume: 0,
            //     costumes: [
            //         {
            //             name: 'YOU WIN!',
            //             bitmapResolution: 1,
            //             dataFormat: 'svg',
            //             assetId: '0bc49167d951e5a8b23de48ed7113c92',
            //             md5ext: '0bc49167d951e5a8b23de48ed7113c92.svg',
            //             rotationCenterX: 99.63777644610988,
            //             rotationCenterY: 31.910556608884065
            //         }
            //     ],
            //     sounds: [],
            //     behaviors: [],
            //     volume: 100,
            //     layerOrder: 3,
            //     visible: true,
            //     x: 120,
            //     y: 0,
            //     size: 100,
            //     direction: 90,
            //     draggable: false,
            //     rotationStyle: 'all around'
            // },
            // {
            //     isStage: false,
            //     name: 'You Win 3',
            //     variables: {},
            //     lists: {},
            //     broadcasts: {},
            //     blocks: {},
            //     comments: {},
            //     currentCostume: 0,
            //     costumes: [
            //         {
            //             name: 'YOU WIN!',
            //             bitmapResolution: 1,
            //             dataFormat: 'svg',
            //             assetId: '0bc49167d951e5a8b23de48ed7113c92',
            //             md5ext: '0bc49167d951e5a8b23de48ed7113c92.svg',
            //             rotationCenterX: 99.63777644610988,
            //             rotationCenterY: 31.910556608884065
            //         }
            //     ],
            //     sounds: [],
            //     behaviors: [],
            //     volume: 100,
            //     layerOrder: 3,
            //     visible: true,
            //     x: 120,
            //     y: 0,
            //     size: 100,
            //     direction: 90,
            //     draggable: false,
            //     rotationStyle: 'all around'
            // }
        ],
        monitors: [
            {
                id: '.Y)aBg@ubyoduhtAR^7*',
                mode: 'default',
                opcode: 'data_variable',
                params: {
                    VARIABLE: 'Score'
                },
                spriteName: null,
                value: 10,
                width: 0,
                height: 0,
                x: 5,
                y: 5,
                visible: true,
                sliderMin: 0,
                sliderMax: 100,
                isDiscrete: true
            }
        ],
        extensions: [],
        meta: {
            semver: '3.0.0',
            vm: '11.1.0',
            agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36' // eslint-disable-line max-len
        }
    });
};


export default projectDataBehavior;
