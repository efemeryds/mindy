import React from 'react';
import { connect } from '../data/connect';
import { Redirect } from 'react-router';
import LoginOrHome from './LoginOrHome';

interface StateProps {
  hasSeenTutorial: boolean;
}

const HomeOrTutorial: React.FC<StateProps> = ({ hasSeenTutorial }) => {
  return hasSeenTutorial ? <LoginOrHome/> : <Redirect to="/tutorial" />
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenTutorial: state.user.hasSeenTutorial,
  }),
  component: HomeOrTutorial
});