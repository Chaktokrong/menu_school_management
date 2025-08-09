import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { QueryClient, QueryClientProvider } from "react-query";
// App Resources
import "./App.css";
import Router from "./routes";
import { AuthContext } from "./Context/AuthContext";
import AlertMessage from "./Components/AlertMessage/AlertMessage";

function App() {
  const { state } = useContext(AuthContext);
  const { user } = state;

  // ==================== Token Management ====================
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("token"))
  );

  //
  useEffect(() => {
    const storedToken = JSON.parse(window.localStorage.getItem("token"));

    if (storedToken) {
      setToken(storedToken);
    } else if (user?.token) {
      setToken(user.token);
      window.localStorage.setItem("token", JSON.stringify(user.token));
    } else {
      setToken("");
    }
  }, [user]);

  // ==================== MUI Theme Setup ====================
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          background: {
            default: "#EBEDEF",
          },
        },
        typography: {
          fontFamily: [
            "Century Gothic",
            "Siemreap",
            "PublicSans",
            "sans-serif",
          ].join(","),
        },
      }),
    []
  );

  // ==================== Apollo Client Setup ====================
  const httpLink = createHttpLink({
    uri: "http://192.168.5.38:6700/graphql",
    // uri: process.env.REACT_APP_END_POINT,
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token,
    },
  }));

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // ==================== React Query Setup ====================
  const queryClient = new QueryClient();

  // ==================== Render App ===========================
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider>
            <Router />
          </RouterProvider>
        </ThemeProvider>
        <AlertMessage />
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default App;
