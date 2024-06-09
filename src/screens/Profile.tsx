import React, { useState, useEffect } from 'react';
import { View, Alert, Text, StyleSheet, Pressable, SafeAreaView ,TouchableOpacity} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import UserAvatar from '@muhzi/react-native-user-avatar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { User_Profile } from '../types';
import { userProfile } from '../services/api';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type RootStackParamList = { 
    Profile: { userprofile: User_Profile };
};


type Props = {
    Profile: User_Profile[];
  };
  

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface ProfileProps {
    navigation: ProfileScreenNavigationProp;
    route: ProfileScreenRouteProp;
   
}

const Profile: React.FC<ProfileProps> = ({ navigation, Profile }) => {
    const [userProfileData, setUserProfileData] = useState<User_Profile[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const _goBack = () => {
        navigation.navigate('Dashboard',{Profile});
    }

    const fetchData = async () => {
        try {
            const user_profile = await userProfile();
            setUserProfileData(user_profile);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while fetching user profile data.');
        }
    };

    const logout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Logout',
                    onPress: () => {
                        // Perform logout action here
                        console.log('User logged out');
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const get_watchlist = () => {
        navigation.navigate('Watchlist');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>

           <View style={{flexDirection: 'row',justifyContent:'space-between',backgroundColor: '#42A5F5',}}>
            <View style={{flexDirection: 'row',alignItems: 'center',}}>
               <Pressable onPress={_goBack}>
                    <FontAwesome 
                        name="angle-left"
                        color='#fff'
                        size={55}
                        style={{marginLeft:15,marginBottom:5}}
                    />  

                </Pressable>
            </View>

            <View >
              <AntDesign name="logout" color="#FFF" size={25} style={{marginRight: 20, marginTop: 10}} onPress={() => logout()} />
            </View>

          </View>
                {userProfileData && (
                    <View style={styles.profileInfoContainer}>
                        <UserAvatar
                            userName={userProfileData.username}
                            size={75}
                            backgroundColor="#FFFFFF"
                            activeCircleColor={'#28B463'}
                            textColor="#42A5F5"
                            active
                        />
                        <Text style={styles.text_stytle}>{userProfileData.username}</Text>
                    </View>
                )}
                {/* Other profile content */}

                <TouchableOpacity style={{marginRight:10,marginLeft:10,marginTop:5}} onPress={() => get_watchlist()}>
                    <View style={styles.card_view_two}>
                        <View style={{marginLeft:25}}>
                            <MaterialIcons name={'add-chart'} color="#05375a" size={25}/>   
                        </View>                     
                        <Text style={{fontSize:15,color:'black',marginLeft:25}}>{'Watchlist'}</Text>

                        {/* <AntDesign name={'caretright'} color="#05375a" size={25}/>     */}
                    </View>  
                </TouchableOpacity>

            </View>


            
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: { flex: 1 },
    contentContainer: { flex: 1},
    profileInfoContainer: {height: 170, backgroundColor: '#42A5F5',flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  },
    text_stytle: { fontSize: 13, fontWeight: 'bold', marginTop: 20, color: '#ffffffff' },
    card_view_two: {
       
        height:50,
        width:'100%',
        flexDirection:'row',
        borderRadius: 10,
        margin:10,
        backgroundColor: '#ffffffff',
        marginLeft:25,
        marginRight:25,
        alignSelf:'center',
        alignItems: 'center', //Centered vertically
        
    },
});
