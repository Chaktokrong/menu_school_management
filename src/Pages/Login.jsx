import { useState, useContext } from "react";
import {
  Typography,
  Stack,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { useFormik, Form, FormikProvider } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
//Srcs
import "./login.scss";
import { AuthContext } from "../Context/AuthContext";
import loginImage from "../Assets/logoSystem.png";
import { USER_LOGIN } from "../Schema/User";

export default function Login() {
  const navigate = useNavigate();
  const { setAlert, dispatch } = useContext(AuthContext);
  const [iconReload, setIconReload] = useState(false);

  // hide password hook
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [userLogin] = useMutation(USER_LOGIN, {
    onCompleted: ({ userLogin }) => {
      if (userLogin?.isSuccess === true) {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            token: userLogin?.token,
          },
        });

        // ========================= login success =========================
        setAlert(true, "success", userLogin?.message);
        window.localStorage.setItem("token", JSON.stringify(userLogin?.token));
        window.localStorage.setItem(
          "userLogin",
          JSON.stringify(userLogin?.user)
        );
        navigate("/dashboard");
        setIconReload(false);
      } else {
        setAlert(true, "error", userLogin?.message);
        setIconReload(false);
      }
    },
    onError: (err) => {
      setAlert(true, "error", err?.message);
      console.log("error::", err);
    },
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email!").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be 8 characters!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      // console.log("values::", values);
      setIconReload(true);
      userLogin({
        variables: {
          ...values,
        },
      });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Stack
      direction="column"
      justifyContent="center"
      className="login-container"
    >
      <Stack direction="row" justifyContent="center" sx={{ width: "100%" }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack direction="column" className="box-container" spacing={3}>
              <Stack direction="column" spacing={1}>
                {/* <Stack direction="row" justifyContent="center">
                  <img style={{ width: "150px" }} alt="logo" src={loginImage} />
                </Stack> */}
                <Typography
                  variant="body2"
                  align="center"
                  className="login-subtitle"
                >
                  Siem Reap Provincial Council
                </Typography>
              </Stack>

              <Stack
                direction="column"
                justifyContent="center"
                width="100%"
                className="box-login"
                spacing={2}
              >
                <Stack direction="column">
                  <Typography className="label-login">Email: </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    className="input-login"
                    placeholder="example@company.com"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <Stack>
                  <Typography className="label-login">Password: </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="password"
                    type={show ? "text" : "password"}
                    {...getFieldProps("password")}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start" onClick={handleClick}>
                          {show ? (
                            <VisibilityIcon className="viewpw-icon" />
                          ) : (
                            <VisibilityOffIcon className="viewpw-icon" />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                {/* <Link to="/forgotpassword">
                  <Typography className="forgot-pwd">
                    Forgot password?
                  </Typography>
                </Link> */}
              </Stack>
              <Stack direction="column">
                <Button
                  className="btn-sign-in"
                  type="submit"
                  endIcon={
                    iconReload ? (
                      <CircularProgress sx={{ color: "#fff" }} size="20px" />
                    ) : null
                  }
                >
                  Sign In
                </Button>
              </Stack>
              <Typography className="footer-copy-right">
                Copyright © 2025 Go Global IT. All rights reserved.
              </Typography>
            </Stack>
          </Form>
        </FormikProvider>
      </Stack>
    </Stack>
  );
}
