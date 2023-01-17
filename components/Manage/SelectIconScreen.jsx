import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { VscCircleLargeOutline } from "react-icons/vsc";
import { MdCheckCircle } from "react-icons/md";

const SelectIconScreen = ({ onSubmit }) => {
  const [selected, setSelected] = useState(null);
  const images = [
    VscCircleLargeOutline,
    VscCircleLargeOutline,
    VscCircleLargeOutline,
    VscCircleLargeOutline,
    VscCircleLargeOutline,
    VscCircleLargeOutline,
    VscCircleLargeOutline,
    VscCircleLargeOutline,
    VscCircleLargeOutline,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {images.map((img, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageContainer}
            onPress={() => setSelected(index)}
          >
            <Image source={img} style={styles.image} />
            {selected === index && (
            <Image
              source={MdCheckCircle}
              style={styles.checkmark}
            />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.submitContainer}>
        <Button
          title="Submit"
          onPress={() => {
            if (selected !== null) {
              onSubmit(images[selected]);
            }
          }}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    height: '80%',
  },
  imageContainer: {
    width: '33%',
    height: '33%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  checkmark: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '20%',
    height: '20%',
    resizeMode: 'contain',
  },
  submitContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
});


export default SelectIconScreen;