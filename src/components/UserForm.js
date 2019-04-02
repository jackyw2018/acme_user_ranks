import React, { Component } from 'react';
import { matchPath } from 'react-router-dom';
import { connect } from 'react-redux';

import { postUser, putUser } from '../store';

class UserForm extends Component {
  state = {
    name: '',
    bio: '',
    rank: '',
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const user = { ...this.state };
    user.rank = Number(user.rank);

    const {
      match: { url },
      match,
    } = this.props;
    // EDIT form
    if (!matchPath(url, { path: '/users/create', exact: true })) {
      const { name, bio, rank } = this.state;
      const user = { name, bio, rank };
      this.props.putUser(user, match.params.userId);
    } else {
      // Create form
      this.props.postUser(user);
    }
    this.setState({ name: '', bio: '', rank: '' });
    this.props.history.push('/users');
  };

  componentDidMount() {
    const {
      match: { url },
      users,
      match,
    } = this.props;
    if (!matchPath(url, { path: '/users/create', exact: true })) {
      const user = users.find(user => {
        return user.id === Number(match.params.userId);
      });
      this.setState({ ...user });
    }
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          className="form-control"
          placeholder="name"
          name="name"
          onChange={this.onInputChange}
          value={this.state.name}
        />
        <input
          className="form-control"
          placeholder="bio"
          name="bio"
          onChange={this.onInputChange}
          value={this.state.bio}
        />
        <input
          className="form-control"
          placeholder="rank"
          name="rank"
          onChange={this.onInputChange}
          value={this.state.rank}
        />
        <div className="btn-group" style={{ marginTop: '10px' }}>
          <button className="btn btn-primary">Create</button>
          <a className="btn btn-info" href="#/users">
            Cancel
          </a>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users,
});

const mapDispatchToProps = dispatch => ({
  postUser: user => dispatch(postUser(user)),
  putUser: (user, userId) => dispatch(putUser(user, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
