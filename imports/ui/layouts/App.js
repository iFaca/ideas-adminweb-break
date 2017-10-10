import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, hashHistory, browserHistory, IndexRoute, IndexRedirect } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Public from '../pages/Public';
import Authenticated from '../pages/Authenticated';
import AuthenticatedMain from '../pages/AuthenticatedMain';
import Index from '../pages/Index';
import Documents from '../pages/Documents';
import NewDocument from '../pages/NewDocument';
import EditDocument from '../containers/EditDocument';
import ViewDocument from '../containers/ViewDocument';
import Login from '../pages/Login';
import RecoverPassword from '../pages/RecoverPassword';
import ResetPassword from '../pages/ResetPassword';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';

// Layouts components pages
import Main from './Main'
import Dashboard from '../pages/Dashboard'

const App = appProps => (
  <Router>
    <div>
      {appProps.authenticated ? <Authenticated path="/" component={Main} {...appProps} /> : <Authenticated exact path="/" component={Main} {...appProps} /> }
      {appProps.authenticated ? <Public path="/login" component={Login} {...appProps} /> : <Route path="/login" component={Login} />}
    </div>
  </Router>
  // <Router>
  //   <div className="App">
  //     {/* <AppNavigation {...appProps} /> */}
  //     <Header />
  //     <Grid>
  //       <Switch>
  //         <Route exact name="index" path="/" component={Index} />
  //         <Authenticated exact path="/documents" component={Documents} {...appProps} />
  //         <Authenticated exact path="/documents/new" component={NewDocument} {...appProps} />
  //         <Authenticated exact path="/documents/:_id" component={ViewDocument} {...appProps} />
  //         <Authenticated exact path="/documents/:_id/edit" component={EditDocument} {...appProps} />
  //         <Public path="/signup" component={Signup} {...appProps} />
  //         <Public path="/login" component={Login} {...appProps} />
  //         <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
  //         <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
  //         <Route component={NotFound} />
  //       </Switch>
  //     </Grid>
  //   </div>
  // </Router>
);

App.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
};

const composer = (props, onData) => {
  const loggingIn = Meteor.loggingIn();
  onData(null, {
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId(),
  });
};

export default composeWithTracker(composer)(App);
