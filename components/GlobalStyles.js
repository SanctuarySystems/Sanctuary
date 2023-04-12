import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: "#fef1e6",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
