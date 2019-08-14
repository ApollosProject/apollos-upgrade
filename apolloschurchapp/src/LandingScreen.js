import React from 'react';
import PropTypes from 'prop-types';
import { styled, GradientOverlayImage } from '@apollosproject/ui-kit';

import ApollosLandingScreen from './ui/LandingScreen';

const FullScreenImage = styled({
  resizeMode: 'cover',
  position: 'absolute',
})(GradientOverlayImage);

const LandingScreen = ({ navigation }) => (
  <ApollosLandingScreen
    onPressPrimary={() => navigation.push('Auth')}
    textColor={'white'}
    BackgroundComponent={
      <FullScreenImage source={'https://picsum.photos/375/812/?random'} />
    }
    primaryNavText={"Let's go!"}
  />
);

LandingScreen.navigationOptions = {
  header: null,
};

LandingScreen.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default LandingScreen;