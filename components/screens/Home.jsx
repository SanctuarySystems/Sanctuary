import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button, Text, View, StyleSheet } from "react-native";
import ConfessionList from "../Confession/ConfessionList.js";
import { UsernameContext } from "../../App.js";

const Home = ({ navigation }) => {
  const { username } = useContext(UsernameContext);
  const [allConfessions, setAllConfessions] = useState([]);

  const getConfessions = () => {
    if (username) {
      axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${username}`)
        .then((data) => {
          const allSpaces = data.data.spaces_joined;
          // console.log('i am allSpace: ', allSpaces);
          if (allSpaces.length === 0) {
            // setAllConfessions(...allConfessions);
            console.log('i am called here!!!!');
          } else {
            const concatArray = [];
            return Promise.all(
              allSpaces.map(async (space) => {
                await axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions?space_name=${space}`)
                  .then((result) => {
                    concatArray.push(result.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }),
            )
              .then(() => {
                console.log('I am concatArray: ', concatArray.flat());
                setAllConfessions(concatArray.flat());
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getConfessions();
  }, []);

  return (
    <View style={styles.container}>
      {allConfessions &&
        <ConfessionList allConfessions={allConfessions} nav={navigation} isRoom={false} />
      }
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