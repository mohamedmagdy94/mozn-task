import React, { Component } from 'react'
import { SafeAreaView,View, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import { fetchImages,selectImage } from '../redux/actions/imageActions';
import ImageListItem from '../components/ImageListItem';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


export class HomeScreen extends Component {

  componentDidMount() {
    console.log("Home Appearing");
    this.props.fetchImages();
  }

  pickImageFromCamera = () =>
  launchCamera(
    {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.1,
    },
    (response) => {
      this.onImageSelected(response.base64)
    },
  )

pickImageFromGallery = () =>
  launchImageLibrary(
    {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.1,
    },
    (response) => {
      this.onImageSelected(response.base64)
    },
  )

  onImageSelected = (image) => {
    this.props.selectImage(image);
    this.props.navigation.navigate('SelectImage',{image: image});
  }

  createUploadImageAlert = () =>
    Alert.alert(
      "Upload Image",
      "Choose Image Source",
      [
        {
          text: "Camera",
          onPress: () => this.pickImageFromCamera(),
        },
        { text: "Gallery", onPress: () => this.pickImageFromGallery()}
      ],
    );

    render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.props.images}
          renderItem={({ item }) => <ImageListItem image={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button title="Upload" onPress={this.createUploadImageAlert} />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '80%',
    height: '88%',
    margin: 24
  },
});

const mapStateToProps = state => ({
  images: state.images.items,
});

export default connect(mapStateToProps, { fetchImages , selectImage})(HomeScreen);
