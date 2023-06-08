// styled components
import {
  StyledTextInput,
  StyledFormArea,
  StyledFormButton,
  StyledLabel,
  Avatar,
  StyledTitle,
  colors,
  ButtonGroup,
  ExtraText,
  TextLink,
  CopyrightText,
} from "./../components/Styles";

import Logo from "./../assets/logo.png";
import { useState } from "react";
// formik
import { Formik, Form } from "formik";
import { TextInput } from "./../components/FormLib";
import * as Yup from "yup";

//icons
import { FiMail, FiLock, FiUser, FiCalendar } from "react-icons/fi";

// Loader
import Loader from "react-loader-spinner";
//
import app from "../config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


// auth & redux
import { connect } from "react-redux";
// import { signupUser } from "../auth/actions/userActions";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);    
  const signupUser = async (values) => {
    console.log(values)
    // return    
    const { email, password } = values;
    try {
      
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password) 
      setCurrentUser(true);
      history.push("/home");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <StyledFormArea>
        <StyledTitle color={colors.theme} size={30}>
          Member Signup
        </StyledTitle>
        <Formik
          initialValues={{
            email: "",
            password: "",
            repeatPassword: "",
            name: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Password is too short")
              .max(30, "Password is too long")
              .required("Required"),
            name: Yup.string().required("Required"),
            repeatPassword: Yup.string()
              .required("Required")
              .oneOf([Yup.ref("password")], "Passwords must match"),
          })}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            signupUser(values, history, setFieldError, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput
                name="name"
                type="text"
                label="Full Name"
                placeholder="Olga Simpson"
                icon={<FiUser />}
              />
              <TextInput
                name="email"
                type="text"
                label="Email Address"
                placeholder="olga1@example.com"
                icon={<FiMail />}
              />
              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="********"
                icon={<FiLock />}
              />
              <TextInput
                name="repeatPassword"
                type="password"
                label="Repeat Password"
                placeholder="********"
                icon={<FiLock />}
              />
              <ButtonGroup>
                {!isSubmitting && (
                  <StyledFormButton type="submit" >Signup</StyledFormButton>
                )}

                {isSubmitting && (
                  <Loader
                    type="ThreeDots"
                    color={colors.theme}
                    height={49}
                    width={100}
                  />
                )}
              </ButtonGroup>
            </Form>
          )}
        </Formik>
        <ExtraText>
          Already have an account? <TextLink to="/login">Login</TextLink>
        </ExtraText>
        <ExtraText>
           <TextLink to="/">go back</TextLink>
        </ExtraText>
      </StyledFormArea>
      <CopyrightText>Mini Project Group 18</CopyrightText>
    </div>
  );
};

// export default connect(null, { signupUser })(Signup);
export default Signup;