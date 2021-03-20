import * as actionTypes from './actionTypes';

export const setNavTab = (tabIndex) => {
    return {
        type: actionTypes.SET_NAV_TAB,
        tabIndex
    };
}