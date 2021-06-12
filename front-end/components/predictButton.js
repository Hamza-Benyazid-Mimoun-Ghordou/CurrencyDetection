import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';


const PredBut = (props) => {
    return (
        <TouchableOpacity 
            onPress={()=>props.press()}
            style = {styles.buttonBody}
        />
    )
}

const styles = StyleSheet.create({
    buttonBody: {
        justifyContent: 'center',
        alignItems: "center",
        position: 'relative',
        bottom:10,
        backgroundColor : 'white',
        marginVertical: 20,
        marginHorizontal:'40.5%',
        height: 70,
        width: 70,
        borderRadius : 35,
        opacity:0.7,
        borderWidth: 4,
        borderColor: '#999'
    },
});

export default PredBut