import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Input } from '@rneui/themed';
import axios from "axios";
import { UsernameContext } from "../../App.js";

const SpacesForm = ({ navigation }) => {
  const username = useContext(UsernameContext);
  const [spaceName, setSpaceName] = useState('');
  const [description, setDescription] = useState('');
  const [guidelines, setGuidelines] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!spaceName || !description || !guidelines) {
      // eslint-disable-next-line no-alert
      alert('Please input missing fields');
    } else {
      const obj = {};
      obj.space_name = spaceName;
      obj.created_by = username;
      obj.description = description;
      const allGuidelines = guidelines.split(', ');
      obj.guidelines = allGuidelines;

      axios.post(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces`, obj)
        .then((response) => {
          // console.log(response);
          navigation.navigate('Space', {
            space_name: spaceName,
            isAdmin: true,
            username,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Create New Space
        {"\n"}
      </Text>
      <Input style={styles.labels}
        placeholder="Space Name..."
        onChangeText={setSpaceName}
      />
      <Input style={styles.labels}
        placeholder="Description..."
        onChangeText={setDescription}
      />
      <Input style={styles.labels}
        placeholder="Guidelines..."
        onChangeText={setGuidelines}
      />
      <Button
        buttonStyle={{
          backgroundColor: 'rgba(111, 202, 186, 1)',
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: 350,
          marginVertical: 10,
        }}
        title="Submit"
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF1E6',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    paddingTop: 20,
    paddingBottom: 0,
    fontSize: 35,
  },
  labels: {
    padding: 10,
    fontSize: 30,
  },
});

export default SpacesForm;