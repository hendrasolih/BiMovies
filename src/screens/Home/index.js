import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {API_URL, API_KEY, urlImage} from '@env';
import Carousel from 'react-native-snap-carousel';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({navigation}) => {
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRate, setTopRate] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    // code to run on component mount
    getData();
    getDataTrending();
    getDataTopRate();
    getDataUpComing();
  }, []);

  const getData = () => {
    axios
      .get(`${API_URL}/movie/popular?api_key=${API_KEY}`)
      .then((res) => {
        const data = res.data.results.map((el) => {
          return {
            title: el.title,
            poster: el.poster_path,
            release_date: el.release_date,
            id: el.id,
          };
        });
        setPopular(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // TRENDING
  const getDataTrending = () => {
    axios
      .get(`${API_URL}/trending/movie/week?api_key=${API_KEY}`)
      .then((res) => {
        const data = res.data.results.map((el) => {
          return {
            title: el.title,
            poster: el.poster_path,
            release_date: el.release_date,
            id: el.id,
          };
        });
        setTrending(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // TOP RATE
  const getDataTopRate = () => {
    axios
      .get(`${API_URL}/movie/top_rated?api_key=${API_KEY}`)
      .then((res) => {
        const data = res.data.results.map((el) => {
          return {
            title: el.title,
            poster: el.poster_path,
            release_date: el.release_date,
            id: el.id,
          };
        });
        setTopRate(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // UP COMING
  const getDataUpComing = () => {
    axios
      .get(`${API_URL}/movie/upcoming?api_key=${API_KEY}`)
      .then((res) => {
        const data = res.data.results.map((el) => {
          return {
            title: el.title,
            poster: el.poster_path,
            release_date: el.release_date,
            id: el.id,
          };
        });
        setUpComing(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const _renderItem = ({item, index}) => {
    const image = {uri: `${urlImage}${item.poster}`};
    return (
      <TouchableOpacity
        style={{
          height: windowHeight * 0.37,
          marginLeft: windowWidth * 0.001,
          marginRight: windowWidth * 0.001,
        }}
        onPress={() => navigation.navigate('Detail', {id: item.id})}>
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
      </TouchableOpacity>
    );
  };

  const _renderItemFL = ({item, index}) => {
    const image = {uri: `${urlImage}${item.poster}`};
    return (
      <TouchableOpacity
        style={{
          height: windowHeight * 0.3,
          width: windowWidth * 0.5,
          marginRight: windowWidth * 0.03,
        }}
        onPress={() => navigation.navigate('Detail', {id: item.id})}>
        <ImageBackground
          source={image}
          style={{...styles.image}}
          imageStyle={{borderRadius: 10}}>
          <View style={styles.movieTitleCarousel}>
            <Text style={{fontSize: 14, color: '#fff', textAlign: 'center'}}>
              {item.title}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.title}>
          <Text style={{color: '#ff0000', fontSize: 18, fontWeight: 'bold'}}>
            Bi-Movies
          </Text>
        </View>
        <Carousel
          layout={'default'}
          ref={(ref) => (carousel = ref)}
          data={popular}
          sliderWidth={windowWidth}
          itemWidth={windowWidth * 0.6}
          renderItem={_renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
          loop={true}
        />
        <View style={{marginLeft: windowWidth * 0.02, marginTop: 7}}>
          <Text style={{color: 'grey'}}>TRENDING MOVIES</Text>
          <View
            style={{
              borderTopWidth: 3,
              borderTopColor: 'red',
              width: windowWidth * 0.2,
            }}
          />
          <FlatList
            horizontal
            data={trending}
            renderItem={_renderItemFL}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={{marginLeft: windowWidth * 0.02, marginTop: 7}}>
          <Text style={{color: 'grey'}}>TOP RATE MOVIES</Text>
          <View
            style={{
              borderTopWidth: 3,
              borderTopColor: 'red',
              width: windowWidth * 0.2,
            }}
          />
          <FlatList
            horizontal
            data={topRate}
            renderItem={_renderItemFL}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={{marginLeft: windowWidth * 0.02, marginTop: 7}}>
          <Text style={{color: 'grey'}}>UPCOMING MOVIES</Text>
          <View
            style={{
              borderTopWidth: 3,
              borderTopColor: 'red',
              width: windowWidth * 0.2,
            }}
          />
          <FlatList
            horizontal
            data={upComing}
            renderItem={_renderItemFL}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={{height: 20}} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  title: {
    height: windowHeight * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieTitleCarousel: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: '20%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
});
