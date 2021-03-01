import React, { Component } from 'react'
import { Button, View, Image , StyleSheet} from 'react-native';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'


export default class ImageListItem extends Component {


    render() {
        return (
            <View style={styles.continer}>
                <Image style={styles.image} resizeMode={"center"} source={{uri: "data:image/jpeg;base64,"+this.props.image}}/>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    continer:{
        flexDirection: 'column',
        alignItems: 'center'    
    },
    image: {
        margin: 24,
        width: '90%',
        height: 400,
        borderRadius: 24
    },
    
  });
