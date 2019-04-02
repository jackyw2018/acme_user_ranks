import React from 'react';
import { connect } from 'react-redux';

const Home = ({ usersLength }) => {
  return <div>We have {usersLength} Heroes!</div>;
};

const mapStateToProps = ({ users }) => {
  return {
    usersLength: users.length,
  };
};

export default connect(mapStateToProps)(Home);
