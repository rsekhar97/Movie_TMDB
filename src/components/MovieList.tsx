// src/components/MovieList.tsx
import React from 'react';
import { View, Text, FlatList, ListRenderItem,StyleSheet,Image,TouchableOpacity } from 'react-native';
import { Movie } from '../types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';

type Props = {
  movies: Movie[];
};

const MovieList: React.FC<Props> = ({ movies }) => {

    const navigation = useNavigation();

    const handleCardPress = (movie: Movie) => {
        navigation.navigate('MovieDetails', { movie });
      };

  const renderItem: ListRenderItem<Movie> = ({ item }) => (
 
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
    <View >
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} style={styles.image} />

     
      {/* <View style={styles.overlay}>
      <MenuProvider>
        <Menu>
          <MenuTrigger>
            <MaterialCommunityIcons 
            name="dots-vertical" 
            color="#FFF" 
            size={30} 
            style={{ padding: 5,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 50,}}/>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => console.log('')} text="Add to Watchlist" />
            <MenuOption onSelect={() => console.log('')} text="Rate" />
          </MenuOptions>
        </Menu>

        </MenuProvider>
      </View> */}

        <View style={styles.detailsContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.release_date}</Text>
            
                
                {/* <View style={styles.ratingContainer}>
                <View style={styles.ratingCircle}>
                    <Text style={styles.ratingText}>{item.vote_average * 10 }</Text>
                </View>
                </View> */}


      </View>
     
    </View>

    </TouchableOpacity>
  );

  return (
    <FlatList
      data={movies}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.flatListContainer}
      
    />
  );
};

export default MovieList;

const styles = StyleSheet.create({
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
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      date: {
        flex:1,
        fontSize: 10,
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
