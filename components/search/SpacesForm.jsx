import React, { useState } from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";
import axios from "axios";

const SpacesForm = () => {
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
      obj.created_by = 'testuser';
      obj.description = description;
      const allGuidelines = guidelines.split(', ');
      console.log(allGuidelines);
      obj.guidelines = allGuidelines;

      axios.post(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces`, obj)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Create New Space</Text>
      <TextInput
        placeholder="Space Name..."
        onChangeText={setSpaceName}
      />
      <TextInput
        placeholder="Description..."
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Guidelines..."
        onChangeText={setGuidelines}
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
      />
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

export default SpacesForm;