import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './Nav';
import Home from './Home';
import Users from './Users';
import UserForm from './UserForm';
import { getUsers } from '../store';

class App extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    return (
      <Router>
        <div>
          <h1
            style={{
              textAlign: 'center',
              backgroundColor: 'red',
              color: 'white',
              width: '50%',
              margin: '1rem auto',
              boxShadow: '2px 2px 2px grey',
            }}
          >
            MARVEL Heroes With Ranks
          </h1>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route path="/users/create" component={UserForm} />
            <Route path="/users/topRanked" component={Users} />
            <Route path="/users/:userId" component={UserForm} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
});

export default connect(
  null,
  mapDispatchToProps
)(App);
