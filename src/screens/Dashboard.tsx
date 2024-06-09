import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Alert,Pressable  } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { trending } from '../services/api';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import MovieList from '../components/MovieList';
import { Movie } from '../types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};


const Dashboard: React.FC<Props> = ({navigation}) => {


    const [movies, setMovies] = useState<Movie[]>([]);


    const _goBack = () => {
       
    }

    React.useEffect(() => {
    const focusHander = navigation.addListener('focus', () => {
        fetchData();
    });
    return focusHander;
    }, [navigation]);



    const fetchData = async () => {
        try {
          const data = await trending('day');   
          
          setMovies(data.results);
          
          
        } catch (error) {
          console.error(error);
          Alert.alert('Token failed', 'An error occurred during login. Please try again later.');
        }
    };

    const profile = ()=>{
        navigation.navigate('Profile');
    }

    

    return (

        <SafeAreaProvider>

            <Appbar.Header style={{backgroundColor:"#42A5F5"}}>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center'}}>
                    <Pressable onPress={_goBack}> 
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <FontAwesome 
                            name="angle-left"
                            color='#fff'
                            size={55}
                            style={{marginLeft:15,marginBottom:5}}
                        />  
                        <Text style={{fontSize:20, justifyContent:'center',textAlign:'center',color:'#fff',fontWeight: 'bold',marginLeft:15}}> Dashboard</Text> 
                    </View >
                    </Pressable>

                    <Pressable onPress={()=>profile()}>
                        <View style={{justifyContent:'center',alignItems:'center',marginRight:15}}>
                        
                            <FontAwesome 
                                name="user"
                                color='#fff'
                                size={30}   
                               
                            />  
                        
                        </View>
                    </Pressable>

                </View> 
            </Appbar.Header>

       
        <View style={styles.container}>

            <MovieList movies={movies} />
        </View>

        </SafeAreaProvider>
    )

};
 export default Dashboard;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    movieTitle: { fontSize: 18, marginVertical: 8 },


    
   
});