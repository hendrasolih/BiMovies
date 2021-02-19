import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {API_URL, API_KEY, urlImage} from '@env';
import {set} from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const numColumns = 3;

const Search = () => {
  const [value, onChangeText] = useState('');
  const [listGenre, setListGenre] = useState([]);
  const [active, setActive] = useState(1);
  const [codeGenre, setCodeGenre] = useState(28);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    // code to run on component mount
    getGenre();
    getMoviesGenre();
  }, [codeGenre, page]);
  // const formatData = (data, numColumns) => {
  //   const totalRows = Math.floor(data.length / numColumns);
  //   let totalLastRow = data.length - totalRows * numColumns;
  //   while (totalLastRow !== 0 && totalLastRow !== numColumns) {
  //     data.push({key: 'blank', empty: true});
  //     totalLastRow++;
  //   }
  //   return data;
  // };
  const getGenre = () => {
    axios
      .get(`${API_URL}/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => {
        const data = res.data.genres;
        setListGenre(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getMoviesGenre = () => {
    axios
      .get(
        `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${codeGenre}&page=${page}`,
      )
      .then((res) => {
        const data = res.data.results.map((el) => {
          return {
            title: el.title,
            poster: el.poster_path,
            release_date: el.release_date,
            id: el.id,
          };
        });
        console.log(data.length);
        setMovies(movies.concat(data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const genre = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          marginRight: 10,
          marginTop: 15,
          marginLeft: windowWidth * 0.04,
        }}
        onPress={() => {
          setActive(index + 1);
          setCodeGenre(item.id);
        }}>
        <Text style={{color: '#fff'}}>{item.name}</Text>
        {active == index + 1 && (
          <View
            style={{
              borderTopWidth: 3,
              borderTopColor: 'red',
              width: 20,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  const moviesGenre = ({item, index}) => {
    let {itemMovies, itemText, itemInvisible} = styles;
    const image = {uri: `${urlImage}${item.poster}`};
    // if (item.empty) {
    //   return <View style={[itemMovies, itemInvisible]} />;
    // }
    return (
      <TouchableOpacity
        style={{width: windowWidth * 0.3, height: windowHeight * 0.2}}>
        <ImageBackground
          source={image}
          style={itemMovies}
          imageStyle={{borderRadius: 10}}>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              width: '100%',
            }}>
            <Text style={itemText}>
              {item.title}({item.release_date.split('-').shift()})
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

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
      <View>
        <FlatList
          horizontal
          data={listGenre}
          renderItem={genre}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.itemContainer}>
        <FlatList
          data={movies}
          renderItem={moviesGenre}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          onEndReached={handleLoadMore}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    flex: 1,
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
  itemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  itemMovies: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    margin: 1,
  },
  itemText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
