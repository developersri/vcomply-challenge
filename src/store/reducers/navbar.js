import * as actionTypes from '../actions/actionTypes';

const initialState = {
    activeTab: 0
};

const setNavTab = (state, action) => {
    return {
        ...state,
        activeTab: action.tabIndex
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NAV_TAB: return setNavTab(state, action);
        default: return state;
    }
};

export default reducer;
