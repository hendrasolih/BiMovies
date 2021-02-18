import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import {API_URL, API_KEY, urlImage} from '@env';
import Carousel from 'react-native-snap-carousel';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    // code to run on component mount
    getData();
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
          };
        });
        setTrending(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const _renderItem = ({item, index}) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{color: '#ff0000', fontSize: 18, fontWeight: 'bold'}}>
          Bi-Movies
        </Text>
      </View>
      <Carousel
        layout={'default'}
        ref={(ref) => (carousel = ref)}
        data={trending}
        sliderWidth={windowWidth}
        itemWidth={windowWidth * 0.6}
        renderItem={_renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
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
