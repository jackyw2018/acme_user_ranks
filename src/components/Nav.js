import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ users }) => {
  // if (!users.length) return null;
  const usersLength = users.length;
  const topRankedUser = users.reduce((topRankedUsers, user) => {
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
  return (
    <ul className="nav nav-tabs" style={{ marginBottom: '10px' }}>
      <li className="nav-item">
        <NavLink exact to="/" className="nav-link" activeClassName="active">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          exact
          to="/users"
          className="nav-link"
          activeClassName="active"
        >
          Heroes ({usersLength})
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/users/create"
          className="nav-link"
          activeClassName="active"
        >
          Create a Hero
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/users/topRanked"
          className="nav-link"
          activeClassName="active"
        >
          Top Ranked ({topRankedUser.map(user => user.name).join(', ')})
        </NavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Nav);
