import { useReducer, createContext, useState } from "react";
import { useTranslateLauguage } from "../Function/Translate.js";

// reducer
const firebaseReducer = (state, action) => {
  // console.log("state::", state)
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// state
const initialState = {
  user: null,
};

// create context
const AuthContext = createContext();

// context provider
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState);
  const [role, setRole] = useState(
    JSON.parse(window.localStorage.getItem("role"))
  );

  // ================== Check role and Permissions ========================
  // this function call when we need to disable the component
  const noneUserAccesse = (roles) => {
    const getRole = roles.filter((rol) => rol === role);
    // if length > 0  can't access
    // if length === 0  can access
    return !(getRole.length > 0);
  };

  // ==================== change language =============================
  const [language, setLanguage] = useState("kh");
  const changeLanguage = (lang) => setLanguage(lang);
  const { t } = useTranslateLauguage(language);
  // ========================= Alert Message ===========================
  const [open, setOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [messageAlert, setMessageAlert] = useState("");

  const setAlert = (open, alert, message) => {
    setOpen(open);
    setAlertStatus(alert);
    setMessageAlert(message);
  };

  const alert = () => ({
    open: open,
    status: alertStatus,
    message: messageAlert,
  });

  //============================ return ==========================
  const value = {
    t,
    alert,
    state,
    language,
    dispatch,
    setAlert,
    changeLanguage,
    noneUserAccesse,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export
export { AuthContext, AuthProvider };
