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
  CopyrightText
} from "./../components/Styles";

import Logo from "./../assets/logo.png";

// formik
import { Formik, Form } from "formik";
import { TextInput } from "./../components/FormLib";
import * as Yup from "yup";

//icons
import { FiMail, FiLock } from "react-icons/fi";

// Loader
import Loader from "react-loader-spinner";

// firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// auth & redux
import { connect } from "react-redux";
import { loginUser } from "../auth/actions/userActions";
import { useHistory } from "react-router-dom";

const Login = ({ loginUser }) => {
  const history = useHistory();
    return (
    <div>
      <StyledFormArea>
        <StyledTitle color={colors.theme} size={30}>
          Member Login
        </StyledTitle>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Password is too short")
              .max(30, "Password is too long")
              .required("Required")
          })}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            console.log(values);
            signInWithEmailAndPassword(getAuth(), values.email, values.password)
              .then((userCredential) => {
                const user = userCredential.user;
                loginUser(user, history);
              })
              .catch((error) => {
                console.log(error);
                setFieldError("email", " ");
                setFieldError("password", " ");
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput
                name="email"
                type="text"
                label="Email Address"
                placeholder="example@example.com"
                icon={<FiMail />}
              />

              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="********"
                icon={<FiLock />}
              />
              <ButtonGroup>
                {!isSubmitting && (
                  <StyledFormButton type="submit">Login</StyledFormButton>
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
          New here? <TextLink to="/signup">Signup</TextLink>
        </ExtraText>
        <ExtraText>
           <TextLink to="/">go back</TextLink>
        </ExtraText>
      </StyledFormArea>
      <CopyrightText>
      Mini Project Group 18
      </CopyrightText>
    </div>
  );
};

export default connect(null, { loginUser })(Login);
