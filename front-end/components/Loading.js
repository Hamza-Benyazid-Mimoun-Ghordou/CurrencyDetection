import React from 'react';
import {View ,ActivityIndicator, Text,StyleSheet } from 'react-native';

const Loading =()=>{
    return (
        <View style={styles.loadingView}>
            <ActivityIndicator size='large' color='black' style={styles.activityIndicator}/>
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingText : {
        color : 'black',
        alignItems : 'flex-start',
        backgroundColor : 'white',
        fontSize : 16,
    },
    activityIndicator : {
        alignItems : 'flex-start',
        backgroundColor : 'white',
        marginRight : 20
    },
    loadingView : {
        flex : 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor : 'white',
        margin: 'auto',
        paddingHorizontal : 70,
        paddingVertical : 30,
        position: 'absolute',
        top: 260,
        right : 50,
        borderRadius : 20,
    }
});

export default Loading;