// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Disease from "./pages/Disease";
import Diseases from "./pages/Diseases";
import Soils from "./pages/Soils";
import Soil from "./pages/Soil";
import Diagnose from "./pages/Diagnose";
import Soilanalysis from "./pages/Soilanalysis";
import CropRecommend from "./pages/CropRecommend"

// styled components
import { StyledContainer } from "./components/Styles";

// Loader css
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// auth & redux
import AuthRoute from "./components/AuthRoute";
import BasicRoute from "./components/BasicRoute";
import { connect } from "react-redux";
import { Footer, Navbar } from "./components";

function App({ checked }) {
  return (
    <Router>
      {checked && (
        <>
          <Switch>
            <BasicRoute path="/signup">
              <StyledContainer>
                <Signup />
              </StyledContainer>
            </BasicRoute>
            <BasicRoute path="/login">
              <StyledContainer>
                <Login />
              </StyledContainer>
            </BasicRoute>
            <AuthRoute path="/home">
              <Navbar />
              <Home />
              <Footer />
            </AuthRoute>
            <AuthRoute path="/diseases">
              <Navbar />
              <Diseases />
              <Footer />
            </AuthRoute>
            <AuthRoute path="/disease/:id">
              <Navbar />
              <Disease />
              <Footer />
            </AuthRoute>
            <AuthRoute path="/diagnose">
              <Navbar />
              <Diagnose />
              <Footer />
            </AuthRoute>
            <AuthRoute path="/soilanalysis">
              <Navbar />
              <Soilanalysis />
              <Footer />
            </AuthRoute>
            <AuthRoute path="/CropRecommend/:id">
              <Navbar />
              <CropRecommend/>
              <Footer />
            </AuthRoute>
            <AuthRoute path="/Soils">
              <Navbar />
              <Soils />
              <Footer />
            </AuthRoute>
             <AuthRoute path="/Soil/:id">
              <Navbar/>
              <Soil />
              <Footer/>
            </AuthRoute> 
            <Route path="/">
              <StyledContainer>
                <Landing />
              </StyledContainer>
            </Route>
          </Switch>
        </>
      )}
    </Router>
  );
}

const mapStateToProps = ({ session }) => ({
  checked: session.checked,
});

export default connect(mapStateToProps)(App);