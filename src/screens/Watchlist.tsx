import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { watchlist } from '../services/api';
import { WatchListItem,User_Profile } from '../types';

type RootStackParamList = { 
    profiles: { profile: User_Profile };
};

type WatchlistScreenRouteProp = RouteProp<RootStackParamList, 'Watchlist'>;

type WatchlistScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Watchlist'>;

interface WatchlistProps {
  navigation: WatchlistScreenNavigationProp;
  route: WatchlistScreenRouteProp;
}

const Watchlist: React.FC<WatchlistProps> = ({ navigation, route }) => {


  const [watchlistData, setWatchlistData] = useState<WatchListItem[]>([]);

  const [profiles, setprofiles] = useState<User_Profile[]>([]);

  console.log("watchlists",profiles)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await watchlist();
        setWatchlistData(data);
      } catch (error) {
        console.error(error);
        Alert.alert('Failed to load watchlist', 'An error occurred while fetching the watchlist. Please try again later.');
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      
    </View>
  );
};

export default Watchlist;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
});
