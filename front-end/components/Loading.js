import React from 'react';
import {View , Text,StyleSheet } from 'react-native';

const Loading =()=>{
    return (
        <View style={styles.loading}>
            <Text>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({        
    loading: {
        justifyContent: 'center',
        alignItems: "center",
        position: 'relative',
        backgroundColor : 'white',
        marginVertical: 20,
        marginHorizontal:'40.5%',
        height: 100,
        width: 200,
        borderRadius : 35,
        opacity:0.7,
        borderWidth: 4,
        borderColor: '#999'
  }});

export default Loading;