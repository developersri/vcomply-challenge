import * as actionTypes from '../actions/actionTypes';

const initialState = {
    activeTab: 0
};

const setActiveTab = (state, action) => {
    return {
        ...state,
        activeTab: action.tabIndex
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ACTIVE_TAB: return setActiveTab(state, action);
        default: return state;
    }
};

export default reducer;
