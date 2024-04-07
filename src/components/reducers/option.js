export const optionReducer = (state = "Pensioner", action) => {
  switch (action.type) {
    case "Admin":
      return "admin";
    case "Dentist":
      return "dentist";
    case "Doctor":
      return "doctor";
    default:
      return state;
  }
};
export const sidebar = (state = 1, action) => {
  switch (action.type) {
    case "SIDEBAR":
      return action.num;
    default:
      return state;
  }
};
export const resetReducer = (state = false, action) => {
  switch (action.type) {
    case "RESET":
      return !state;
    default:
      return state;
  }
};
