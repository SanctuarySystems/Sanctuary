import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StyleSheet, RefreshControl, ScrollView } from "react-native";
import { UsernameContext } from "../../App.js";
import ConfessionList from "../Confession/ConfessionList.js";

const Home = ({ navigation }) => {
  const { username } = useContext(UsernameContext);
  const [allConfessions, setAllConfessions] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getConfessions = () => {
    if (username) {
      console.log(username);
      axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${username}`)
        .then((data) => {
          const allSpaces = data.data.spaces_joined;
          // console.log('i am allSpace: ', allSpaces);
          if (allSpaces.length === 0) {
            // setAllConfessions(...allConfessions);
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
                // console.log('I am concatArray: ', concatArray.flat());
                setAllConfessions(concatArray.flat().sort((a, b) => {
                  return (a.createdAt < b.createdAt) ? 1 : ((a.createdAt > b.createdAt) ? -1 : 0);
                }));
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
  }, [refreshing]);

  return (
    <ScrollView contentContainerStyle={styles.container}
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {allConfessions &&
        <ConfessionList allConfessions={allConfessions} nav={navigation} isRoom={false} isHome={true} />
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    alignItems: 'center',
  },
  scrollView: {
    paddingBottom: 300,
    backgroundColor: 'rgba(254, 241 , 230, .8)',
  },
});

export default Home;