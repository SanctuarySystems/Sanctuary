import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import axios from 'axios';
import { useFonts } from 'expo-font';
import { colorTheme } from './colorTheme';

const SpacesListing = ({ space, currentUser, navigation }) => {
  const [spaceData, setSpaceData] = React.useState({});

  const [fontsLoaded] = useFonts({
    FuzzyBubblesRegular: require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
    FuzzyBubblesBold: require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
  });

  React.useEffect(() => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces?space_name=${space}&exact=true`)
      .then(({ data }) => {
        setSpaceData(data[0]);
      })
      .catch((err) => console.log('err from spaceslisting', err));
  }, []);

  if (!fontsLoaded || Object.keys(spaceData).length === 0) return;

  return (
    <View
      style={styles.listingView}
    >
      <View style={styles.listingContainer}>
        <View style={styles.spaceContainer}>
          <Text style={styles.spaceName}>
            {spaceData.space_name}
          </Text>
          <Text>
            {spaceData.members.length}
            members
          </Text>
        </View>
        <View>
          { spaceData.created_by === currentUser
            && (
              <Text style={styles.adminFlag}>
                admin
              </Text>
            )}
        </View>
      </View>

      <View>
        <Button
          color={`${colorTheme.blue}`}
          buttonStyle={styles.button}
          title="View Space"
          titleStyle={styles.buttonTitle}
          onPress={() => console.log('lead to space')
            || navigation.navigate('Space', {
              space_name: spaceData.space_name,
              isAdmin: spaceData.created_by === currentUser,
              username: currentUser,
            })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    backgroundColor: `${colorTheme.orange}`,
    padding: 18,
  },
  listingContainer: {
    flexDirection: 'row',
  },
  spaceContainer: {
    flexDirection: 'column',
  },
  spaceName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "FuzzyBubblesBold",
  },
  adminFlag: {
    left: 7,
    top: 2,
    color: `${colorTheme.beige}`,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
  },
  buttonTitle: {
    fontWeight: 'bold',
  },
});

export default SpacesListing;