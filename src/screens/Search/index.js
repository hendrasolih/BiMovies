import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Search = () => {
  const [value, onChangeText] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{color: '#fff', fontSize: 24, fontWeight: '700'}}>
          Find your Favorite Movies
        </Text>
        <Text style={{color: '#fff', fontSize: 24, fontWeight: '700'}}>
          or Genre...
        </Text>
      </View>

      <TextInput
        style={styles.textInput}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />

      <FlatList
        horizontal
        data={listGenre}
        renderItem={genre}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
  },
  title: {
    marginHorizontal: windowWidth * 0.04,
    marginVertical: windowHeight * 0.01,
  },
  textInput: {
    height: windowHeight * 0.08,
    borderRadius: (windowHeight * 0.08) / 2,
    color: '#fff',
    paddingHorizontal: '10%',
    backgroundColor: 'rgba(255,255,255, 0.1)',
    marginHorizontal: windowWidth * 0.04,
  },
});
