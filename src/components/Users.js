import React from 'react';
import { connect } from 'react-redux';
import { matchPath } from 'react-router-dom';

import { removeUser } from '../store';

const Users = props => {
  const { users, match, removeUser } = props;
  let displayUsers;
  if (!users.length) return null;

  //controlling to provide topRanked users or all users
  if (matchPath(match.url, { path: '/users', exact: true }))
    displayUsers = users;
  if (matchPath(match.url, { path: '/users/topRanked', exact: true }))
    displayUsers = users.reduce((topRankedUsers, user) => {
      // when none is in the acc
      if (!topRankedUsers.length) return [user];
      // user.rank is lower than the one
      if (user.rank < topRankedUsers[0].rank) return [user];
      // if the same
      else if (user.rank === topRankedUsers[0].rank) {
        topRankedUsers.push(user);
        return topRankedUsers;
      } else {
        return topRankedUsers;
      }
    }, []);

  if (!displayUsers) return null;

  displayUsers.sort((user1, user2) => user1.rank - user2.rank);

  return (
    <ul className="list-group">
      {displayUsers.map(({ id, name, bio, rank }) => (
        <li className="list-group-item" key={id}>
          {name}
          <br />
          {bio}
          <br />
          <span
            className="badge badge-success"
            style={{ marginBottom: '10px' }}
          >
            Ranked {rank}
          </span>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              className="btn btn-warning"
              onClick={() => {
                removeUser(id);
              }}
            >
              Delete
            </button>
            <a href={`#/users/${id}`}>Edit</a>
          </div>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

const mapDispatchToProps = dispatch => ({
  removeUser: userId => dispatch(removeUser(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
