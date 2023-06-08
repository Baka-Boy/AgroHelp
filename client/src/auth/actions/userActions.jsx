import axios from "axios";
import { sessionService } from "redux-react-session";

export const loginUser = (
  credentials,
  history,
  setFieldError,
  setSubmitting
) => {
  // Make checks and get some data

  return () => {
    //
      sessionService
            .saveSession('token')
            .then(() => {
              sessionService
                .saveUser({email:'shreyas'})
                .then(() => {
                  history.push("/home");
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
  };
};

export const signupUser = (
  credentials,
  history,
  setFieldError,
  setSubmitting
) => {
  return (dispatch) => {
    
  };
};

export const logoutUser = (history) => {
  return () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    history.push("/");
  };
};
