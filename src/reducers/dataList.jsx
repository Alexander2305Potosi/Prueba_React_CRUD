import { DELETE_DATA, ADD_DATA, EDIT_DATA } from "../actions/Actions";

const dataList = [];

const reducer = (state = dataList, action) => {
  switch (action.type) {
    case DELETE_DATA:
      return [...state].filter(item => item.key !== action.key);

    case ADD_DATA:
      return [
        ...state,
        {
          value: action.value,
          description: action.description,
          trm: action.trm,
          key: action.key
        }
      ];
    case EDIT_DATA: {
      const index = state.findIndex(item => item.key === action.key);

      const newState = [...state];
      newState[index] = {
        value: action.value,
        description: action.description,
        trm: action.trm,
        key: action.key
      };

      return newState;
    }

    default:
      return state;
  }
};

export default reducer;
