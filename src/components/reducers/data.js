export const tokenReducer = (state = "0", action) => {
    switch (action.type) {
      case "tokenSet":
        return action.num;
      default:
        return state;
    }
  };

  export const authStateReducer = (state = false, action) => {
    switch (action.type) {
      case "authStateSet":
        return action.num;
      default:
        return state;
    }
  };
  export const idSet = (state = "", action) => {
    switch (action.type) {
      case "SetId":
        return action.num;
      default:
        return state;
    }
  };
  export const DataUser = (state = [], action) => {
    switch (action.type) {
      case "dataSet":
        return action.num;
      default:
        return state;
    }
  };
  export const caseId = (state = "", action) => {
    switch (action.type) {
      case "setCaseId":
        return action.num;
      default:
        return state;
    }
  };