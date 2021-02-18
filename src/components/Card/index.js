import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Card = () => {
  const image = {uri: `${urlImage}${item.poster}`};
  return (
    <View
      style={{
        height: windowHeight * 0.37,
        marginLeft: windowWidth * 0.001,
        marginRight: windowWidth * 0.001,
      }}>
      <ImageBackground
        source={image}
        style={styles.image}
        imageStyle={{borderRadius: 10}}>
        <View style={styles.movieTitleCarousel}>
          <Text style={{fontSize: 14, color: '#fff', textAlign: 'center'}}>
            {item.title}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
