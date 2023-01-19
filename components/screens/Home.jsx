import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button, Text, View, StyleSheet } from "react-native";
import ConfessionList from "../Confession/ConfessionList.js";
import { UsernameContext } from "../../App.js";

const Home = ({ navigation }) => {
  const { username } = useContext(UsernameContext);
  const [allConfessions, setAllConfessions] = useState([]);

  useEffect(() => {
    if (username) {
      console.log('I am userame at Home.jsx: ', username);
      axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${username}`)
        .then(async (data) => {
          const allSpaces = data.data.spaces_joined;
          const promises = [];
          for (let i = 0; i < allSpaces.length; i++) {
            promises.push(axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions/${allSpaces[i]}`));
          }
          Promise.allSettled(promises)
            .then((responses) => {
              setAllConfessions([...allConfessions, responses.flat()]);
            });
        });
    }
  }, [username]);

  return (
    <View style={styles.container}>
      {allConfessions.length !== 0 &&
        <ConfessionList allConfessions={allConfessions} nav={navigation} isRoom={false} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;