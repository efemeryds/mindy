import React from 'react';
import { connect } from '../data/connect';
import { Redirect } from 'react-router';

interface StateProps {
    isLoggedIn: boolean;
}

const LoginOrHome: React.FC<StateProps> = ({ isLoggedIn }) => {
  return isLoggedIn ? <Redirect to="/tabs/home" /> : <Redirect to="/login" />
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    isLoggedIn: state.user.isLoggedin
  }),
  component: LoginOrHome
});