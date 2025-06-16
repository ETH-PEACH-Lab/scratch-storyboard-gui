import projectData from './project-data';

/* eslint-disable import/no-unresolved */
import backdrop from '!raw-loader!./cd21514d0531fdffb22204e0ec5ed84a.svg?';
import boardwalk from '!raw-loader!./de0e54cd11551566f044e7e6bc588b2c.png?';
import bowl from '!raw-loader!./d147f16e3e2583719c073ac5b55fe3ca.svg?';
import redapple from '!raw-loader!./3826a4091a33e4d26f87a2fac7cf796b.svg?';
import goldenapple from '!raw-loader!./577a057445419d23249460ad66718951.svg?';
import youwin from '!raw-loader!./0bc49167d951e5a8b23de48ed7113c92.svg?';
/* eslint-enable import/no-unresolved */

const storyboardProject = translator => {
    let _TextEncoder;
    if (typeof TextEncoder === 'undefined') {
        _TextEncoder = require('fastestsmallesttextencoderdecoder').TextEncoder;
    } else {
        _TextEncoder = TextEncoder;
    }
    const encoder = new _TextEncoder();

    const projectJson = projectData(translator);
    return [{
        id: 0,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(projectJson)
    }, {
        id: 'cd21514d0531fdffb22204e0ec5ed84a',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(backdrop)
    }, {
        id: 'de0e54cd11551566f044e7e6bc588b2c',
        assetType: 'ImageBitmap',
        dataFormat: 'PNG',
        data: encoder.encode(boardwalk)
    }, {
        id: 'd147f16e3e2583719c073ac5b55fe3ca',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(bowl)
    }, {
        id: '3826a4091a33e4d26f87a2fac7cf796b',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(redapple)
    }, {
        id: '577a057445419d23249460ad66718951',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(goldenapple)
    }, {
        id: '0bc49167d951e5a8b23de48ed7113c92',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(youwin)
    }];
};

export default storyboardProject;
