import { ActionType, IAction, IState } from './movieReducer.types';

function movieReducer(state: IState, action: IAction) {
  switch (action.type) {
    // case ActionType.NEXT:
    //   return { ...state, page: state.page + 1 };
    // case ActionType.PREV:
    //   return { ...state, page: state.page - 1 };
    // case ActionType.SET_PAGE:
    //   return { ...state, page: action.payload?.page || 1 };
    case ActionType.SET_MOVIES:
      return { ...state, ...action.payload };
    case ActionType.LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

export default movieReducer;
