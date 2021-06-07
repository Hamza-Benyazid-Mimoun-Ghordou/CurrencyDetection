import React, { useState } from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';


const PredBut = (props) => {
    return (
        <Pressable onPress={props.press} style = {styles.buttonBody}>
            <Text style = {styles.buttonText}>
                Predict
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonBody: {
        alignItems: "center",
        position: 'relative',
        bottom:10,
        backgroundColor : '#00ffff',
        marginVertical: 20,
        marginHorizontal:100,
        borderRadius : 30,
        opacity:0.5

    },
    buttonText: {
        padding:20,
        fontSize:20,
        fontWeight : "bold",
    }
});

export default PredBut