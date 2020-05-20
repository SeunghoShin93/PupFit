import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon, Button } from '@ui-kitten/components';

const HomeIcon = (props) => (
  <Icon {...props} name='home-outline'/>
);

const PulseIcon = (props) => (
  <Icon {...props} name='activity-outline'/>
);

const RenewIcon = (props) => (
  <Icon {...props} name='flip-2-outline'/>
);

const ShareIcon = (props) => (
  <Icon {...props} name="share-outline"/>
  )

const SettingIcon = (props) => (
  <Icon {...props} name="settings-2-outline"/>
)

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

export const BottomTab = () => {

  const topState = useBottomNavigationState();
  const bottomState = useBottomNavigationState();

  return (
    <React.Fragment>

      <BottomNavigation style={styles.bottomNavigation} {...topState}>
        <BottomNavigationTab title='홈' icon={HomeIcon}/>
        <BottomNavigationTab title='반려견상태' icon={PulseIcon}/>
        <BottomNavigationTab title='새로고침' icon={RenewIcon}/>
        <BottomNavigationTab title='공유' icon={ShareIcon}/>
        <BottomNavigationTab title='설정' icon={SettingIcon}/>
      </BottomNavigation>

    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
  },
});