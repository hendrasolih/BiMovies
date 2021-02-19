import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const numColumns = 3;
const numColumnsFalse = 1;

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [listGenre, setListGenre] = useState([]);
  const [active, setActive] = useState(1);
  const [codeGenre, setCodeGenre] = useState(28);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searcOff, setSearcOff] = useState(true);
  useEffect(() => {
    // code to run on component mount
    getGenre();
  }, []);
  useEffect(() => {
    getMoviesGenre();
  }, [codeGenre]);
  useEffect(() => {
    getMoviesGenreMore();
  }, [page]);
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
  const getMoviesGenre = async () => {
    await axios
      .get(
        `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${codeGenre}&page=1`,
      )
      .then((res) => {
        const data = res.data.results.map((el) => {
          return {
            title: el.title,
            poster: el.poster_path,
            release_date: el.release_date,
            id: el.id,
            desc: el.overview,
            rating: el.vote_average,
          };
        });
        // console.log('new');
        setMovies(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getMoviesGenreMore = async () => {
    await axios
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
            desc: el.overview,
            rating: el.vote_average,
          };
        });
        // console.log('load more');
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
          setSearcOff(true);
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
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const now = new Date(item.release_date);
    const date =
      months[now.getMonth()] +
      ' ' +
      now.getDate() +
      ',' +
      ' ' +
      now.getFullYear();
    const image = {uri: `${urlImage}${item.poster}`};
    // if (item.empty) {
    //   return <View style={[itemMovies, itemInvisible]} />;
    // }
    return searcOff ? (
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
    ) : (
      <TouchableOpacity
        style={{
          width: windowWidth * 0.9,
          height: windowHeight * 0.2,
          marginHorizontal: windowWidth * 0.05,
          backgroundColor: 'rgba(255,255,255, 0.1)',
          marginBottom: 20,
          flexDirection: 'row',
          borderRadius: 10,
        }}>
        <Image
          source={image}
          style={{
            height: '100%',
            width: '30%',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
        <View style={{height: '100%', width: '70%', padding: '5%'}}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '700'}}>
            {item.title}
          </Text>
          <Text style={{color: '#fff', fontSize: 14}}>{date}</Text>
          <Text style={{color: '#fff', fontSize: 13}}>
            {item.desc.split(' ').slice(0, 20).join(' ')}...
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const search = async () => {
    await axios
      .get(
        `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`,
      )
      .then((res) => {
        const data = res.data.results.map((el) => {
          return {
            title: el.title,
            poster: el.poster_path,
            release_date: el.release_date,
            id: el.id,
            desc: el.overview,
            rating: el.vote_average,
          };
        });
        setMovies(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // const onFocus = () => {
  //   // do something
  //   setSearcOff(!searcOff);
  //   console.log('render');
  // };

  // console.log(codeGenre, page);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{color: '#fff', fontSize: 24, fontWeight: '700'}}>
          Find your Favorite Movies
        </Text>
        <Text style={{color: '#fff', fontSize: 24, fontWeight: '700'}}>
          or Genre... {searcOff ? '' : 'active'}
        </Text>
      </View>

      <TextInput
        onSubmitEditing={() => {
          search();
          setKeyword('');
        }}
        style={styles.textInput}
        onChangeText={(text) => setKeyword(text)}
        value={keyword}
        pointerEvents="none"
        onTouchStart={() => {
          setSearcOff(false);
        }}
      />

      <View>
        <FlatList
          horizontal
          data={listGenre}
          renderItem={genre}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {searcOff ? (
        <View style={styles.itemContainer}>
          <FlatList
            key={'_'}
            data={movies}
            renderItem={moviesGenre}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
            onEndReached={handleLoadMore}
          />
        </View>
      ) : (
        <View>
          <FlatList
            key={'#'}
            data={movies}
            renderItem={moviesGenre}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumnsFalse}
            onEndReached={handleLoadMore}
          />
        </View>
      )}
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
