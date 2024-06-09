import React,{useState} from 'react';
import {  StatusBar, FlatList, View, Text, Alert, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { movie_detailes, movie_reviews } from '../services/api';
import AntDesign from 'react-native-vector-icons/AntDesign';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserAvatar from "@muhzi/react-native-user-avatar";
import { Movie,Review,Movie_Details, } from '../types';

type RootStackParamList = { 
  MovieDetails: { movie: Movie };
};

type MovieDetailsScreenRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>;

type MovieDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetails'>;

type Props = {
  route: MovieDetailsScreenRouteProp;
  navigation: MovieDetailsScreenNavigationProp;
};

const MovieDetails: React.FC<Props> = ({ navigation,route }) => {
  const { movie } = route.params;

  const [movieReviews, setMovieReviews] = useState<Review[]>([]);

  const [movieDetails, setmovieDetailes] = useState<Movie_Details[]>([]);

  React.useEffect(() => {
    const focusHander = navigation.addListener('focus', () => {
        fetchData();
    });
    return focusHander;
    }, [navigation]);



    const fetchData = async () => {



        try {
            const moviedetailes = await movie_detailes(movie.id);

            console.log('moviedetailes',moviedetailes)
            setmovieDetailes(moviedetailes);
          
        } catch (error) {
          console.error(error);
          Alert.alert('Token failed', 'An error occurred during login. Please try again later.');
        }



        try {
            const movieReviews = await movie_reviews(movie.id);
            setMovieReviews(movieReviews.results);
          
        } catch (error) {
          console.error(error);
          Alert.alert('Token failed', 'An error occurred during login. Please try again later.');
        }
    };


    const renderItem  = ({ item }: { item: Review }) => (
 
    
        <View style={styles.card}>

            <View style={{flex:1,flexDirection:'row'}}>

            <UserAvatar
                userName="John Samuel"
                size={35}
                src="https://images.pexels.com/photos/4403924/pexels-photo-4403924.jpeg"
                active
            />


            </View>

       
           <Text style={{ flex:1, fontSize: 11, fontWeight: 'bold', padding:10, marginBottom: 4,}} >{item.author}</Text>
           <Text style={{ fontSize: 14, color: '#666', marginBottom: 4,marginLeft:10,marginRight:10}} >{item.author_details.name}</Text>
           <Text style={{ fontSize: 14, color: '#666', marginBottom: 4,marginLeft:10,marginRight:10}}>{item.content}</Text>
         
        </View>
    
      );


  return (
    <View style={styles.container}>
        {/* <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` }} style={styles.image} />
        <Text>Title: {movie.title}</Text>
        <Text>Release Date: {movie.release_date}</Text>
        Add more movie details here */}


<       FlatList
            ListHeaderComponent={
              <View >

              

                <View style={[styles.card,{padding: 10}]}>

                <View >
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}` }} style={styles.image} />
                       
                        <Text style={styles.title}>{movieDetails.title}</Text>
                        <Text style={{ fontSize: 16, fontStyle: 'italic', marginBottom: 8,}}>{movieDetails.tagline}</Text>
                        <Text style={{ fontSize: 16, marginBottom: 8,}}>{movieDetails.overview}</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 4,}}>Release Date: {movieDetails.release_date}</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 4,}}>Rating: {movieDetails.vote_average} ({movieDetails.vote_count} votes)</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 4,}}>Runtime: {movieDetails.runtime} minutes</Text>
              
                    </View>

                    
                    <View style={{flex:1,flexDirection:'row', margin: 8, borderRadius: 8, padding: 10,justifyContent:'space-between'}} >

                    <AntDesign name="bars" color="#000" size={25} style={{marginRight: 10, marginTop: 4}} />

                    <AntDesign name="heart" color="#000" size={25} style={{marginRight: 10, marginTop: 4}} />

                    <FontAwesome name="bookmark" color="#000" size={25} style={{marginRight: 10, marginTop: 4}}/>

                </View>

                </View>
                
                

              </View>
            }
           
            data={movieReviews}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />

    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginBottom: 80,
       
    },

    statusBarStyle: {
        marginTop: StatusBar.currentHeight,
    },
    card: {
        flex: 1,
        margin: 8,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 5,
      },
      overlay: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
      },
      image: {
        width: '100%',
        height: 200,
      },
      detailsContainer: {
        padding: 10,
        alignItems: 'flex-start',
      },
      title: {
        flex:1,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      date: {
        flex:1,
        fontSize: 15,
        color: '#666',
        marginBottom: 4,
      },
      ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      ratingCircle: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: '#2ecc71',
        justifyContent: 'center',
        alignItems: 'center',
      },
      ratingText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize:10
      },
      moreIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      flatListContainer: {
        paddingBottom: 16,
      },
      
  });