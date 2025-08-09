import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useRoutes } from "react-router-dom";
//Import from project
import { AuthContext } from "./Context/AuthContext";
// import { GET_USER_LOGIN } from "./Schema/User";
import User from "./Pages/User";
import Login from "./Pages/Login";
import Layout from "./Layout/Layout";
import Setting from "./Pages/Setting";
import Page404 from "./Pages/Page404";
import Dashboard from "./Pages/Dashboard";

export default function Router({ prefersDarkMode, setPrefersDarkMode }) {
  const { state } = useContext(AuthContext);

  // ========================= get user login =======================
  // useQuery(GET_USER_LOGIN, {
  //   onCompleted: ({ getUserLogin }) => {
  //     if (getUserLogin?.user) {
  //       window.localStorage.setItem("userLogin", JSON.stringify(getUserLogin));
  //     }
  //   },
  //   fetchPolicy: "network-only",
  // });

  // ====================== check state user login ==========================
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("token"))
  );

  useEffect(() => {
    async function checkUser() {
      let userToke = await JSON.parse(window.localStorage.getItem("token"));

      if (userToke) {
        setToken(userToke);
        return;
      }

      if (state?.user?.token !== null && state?.user?.token !== undefined) {
        setToken(state?.user?.token);
        window.localStorage.setItem(
          "token",
          JSON.stringify(state?.user?.token)
        );
      } else {
        setToken(null);
      }
    }

    setTimeout(() => {
      checkUser();
    }, 2000);
  }, [state?.user]);

  const userLogin = JSON.parse(window.localStorage.getItem("userLogin"));
  // console.log("userLogin::", userLogin?.user?.role);

  // End check Route =============================
  const LoginPage = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "*", element: <Login /> },
  ]);

  const Content = useRoutes([
    {
      path: "/",
      element: (
        <Layout
          to="/academic-dasboard"
          prefersDarkMode={prefersDarkMode}
          setPrefersDarkMode={setPrefersDarkMode}
        />
      ),
      children: [
        { path: "/", element: <Navigate to="/academic-dasboard" /> },
        { path: "/academic-dasboard", element: <Dashboard /> },
        { path: "/academic-section-shift", element: <Dashboard /> },
        // { path: "/academic-dasboard", element: <Dashboard /> },
        // { path: "/setting", element: <Setting /> },
        // { path: "/setting/user", element: <User /> },
        { path: "*", element: <Page404 /> },
      ],
    },
  ]);

  // const ContentTeacher = useRoutes([
  //   {
  //     path: "/",
  //     element: (
  //       <Layout
  //         to="/dashboard"
  //         prefersDarkMode={prefersDarkMode}
  //         setPrefersDarkMode={setPrefersDarkMode}
  //       />
  //     ),
  //     children: [
  //       {
  //         path: "/",
  //         element: (
  //           <Navigate
  //             to={`/teacher/teacher-detail?teacherId=${userLogin?.user?._id}`}
  //           />
  //         ),
  //       },
  //       {
  //         path: "/dashboard",
  //         element: (
  //           <Navigate
  //             to={`/teacher/teacher-detail?teacherId=${userLogin?.user?._id}`}
  //           />
  //         ),
  //       },
  //       { path: "*", element: <Page404 /> },
  //     ],
  //   },
  // ]);

  // if (!token) return LoginPage;
  // else if (token && userLogin?.user?.role === "Teacher") return ContentTeacher;
  // else return Content;

  return Content
}
