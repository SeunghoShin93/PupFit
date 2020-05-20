import React from "react";
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";

interface TopBasicProps {
  prevScreenName: string;
  navigation?: any;
}

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const TopBasic = ({ prevScreenName, navigation }: TopBasicProps) => {
  const goBack = () => console.log(navigation.goBack())
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPressIn={goBack} />
  );

  return <TopNavigation accessoryLeft={BackAction} title={prevScreenName} />;
};

const TopNavigationStyling = () => (
  <TopNavigation
    title={(evaProps) => <Text {...evaProps}>Title</Text>}
    subtitle={(evaProps) => <Text {...evaProps}>Subtitle</Text>}
  />
);
