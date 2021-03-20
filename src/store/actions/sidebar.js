import * as actionTypes from './actionTypes';

export const setActiveTab = (tabIndex) => {
    return {
        type: actionTypes.SET_ACTIVE_TAB,
        tabIndex
    };
}