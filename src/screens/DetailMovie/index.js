import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import {API_URL, API_KEY, urlImage} from '@env';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import YoutubePlayer from 'react-native-youtube-iframe';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DetailMovie = ({route}) => {
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  //   const togglePlaying = useCallback(() => {
  //     setPlaying((prev) => !prev);
  //   }, []);
  const [detail, setDetail] = useState({});
  const [linkVideo, setLinkVideo] = useState('');
  useEffect(() => {
    // code to run on component mount
    getDetail();
    getLinkDetail();
  }, []);
  const {id} = route.params;

  const getDetail = () => {
    axios
      .get(`${API_URL}/movie/${id}?api_key=${API_KEY}`)
      .then((res) => {
        setDetail({
          title: res.data.title,
          poster: res.data.poster_path,
          release_date: res.data.release_date,
          id: res.data.id,
          backdrop: res.data.backdrop_path,
          runtime: res.data.runtime,
          vote_average: res.data.vote_average,
          genre: res.data.genres,
          desc: res.data.overview,
        });
        // console.log(res.data);
        // console.log(res.data.title);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getLinkDetail = () => {
    axios
      .get(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}`)
      .then((res) => {
        //console.log(res.data.results[0].key);
        setLinkVideo(res.data.results[0].key);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const image = {uri: `${urlImage}${detail.backdrop}`};

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

  const now = new Date(detail.release_date);
  const date =
    months[now.getMonth()] +
    ' ' +
    now.getDate() +
    ',' +
    ' ' +
    now.getFullYear();

  console.log(detail);
  console.log(linkVideo);

  return (
    <View style={{backgroundColor: '#333333', flex: 1}}>
      <ScrollView>
        <Image
          source={image}
          style={{
            width: windowWidth,
            height: windowHeight * 0.4,
            resizeMode: 'cover',
          }}
        />
        {/* Title, runtime & rating */}
        <View style={{paddingHorizontal: windowWidth * 0.04}}>
          <Text style={{...styles.text, fontSize: 30, fontWeight: '600'}}>
            {detail && detail.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: windowHeight * 0.03,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 5,
              }}>
              <MaterialIcons name="schedule" color="#fff" size={14} />
              <Text style={styles.text}> {detail.runtime} </Text>
              <Text style={styles.text}>minutes</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name="star" color="#ffcc00" size={14} />
              <Text style={styles.text}> {detail.vote_average} </Text>
              <Text style={styles.text}>(TMDB)</Text>
            </View>
          </View>
          <View style={{borderBottomWidth: 1, borderColor: '#404040'}} />
        </View>
        {/* Title, runtime & rating */}
        {/* Release date & Genre */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: windowWidth * 0.04,
            marginBottom: windowHeight * 0.03,
            marginTop: windowHeight * 0.01,
          }}>
          <View>
            <Text style={{...styles.text, fontSize: 20, fontWeight: '600'}}>
              Release Date
            </Text>
            <Text style={{...styles.text, fontSize: 12}}>{date}</Text>
          </View>
          <View style={{marginLeft: windowWidth * 0.1}}>
            <Text style={{...styles.text, fontSize: 20, fontWeight: '600'}}>
              Genre
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {detail &&
                detail.genre &&
                detail.genre.map(({id, name}) => {
                  return (
                    <View style={styles.genre} key={id}>
                      <Text style={{...styles.text, fontSize: 12}}>{name}</Text>
                    </View>
                  );
                })}
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#404040',
            marginHorizontal: windowWidth * 0.04,
          }}
        />
        {/* Release date & Genre */}
        {/* Synopsis */}
        <View style={{paddingHorizontal: windowWidth * 0.04}}>
          <Text style={{...styles.text, fontSize: 20, fontWeight: '600'}}>
            Synopsis
          </Text>
          <Text style={{...styles.text, fontSize: 12}}>{detail.desc}</Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#404040',
              marginTop: windowHeight * 0.03,
            }}
          />
        </View>
        {/* Synopsis */}
        {/* Trailer */}
        <View>
          <YoutubePlayer
            height={300}
            play={playing}
            videoId={linkVideo !== '' && linkVideo}
            onChangeState={onStateChange}
          />
          {/* <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} /> */}
        </View>
        {/* Trailer */}
      </ScrollView>
    </View>
  );
};

export default DetailMovie;

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  genre: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 5,
    marginRight: 5,
  },
});
