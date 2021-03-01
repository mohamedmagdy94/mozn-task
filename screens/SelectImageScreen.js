import React, { Component } from 'react'
import { SafeAreaView, Image, StyleSheet, Button, Alert, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { chooseBlurViewPoint,addImage } from '../redux/actions/imageActions';
import { BlurView } from "@react-native-community/blur";
import ViewShot from "react-native-view-shot";


export class SelectImageScreen extends Component {

    componentDidMount() {
        this.createBlurWarningAlert()
    }

    onPress = (event) => {
        this.props.chooseBlurViewPoint(event.nativeEvent.locationX, event.nativeEvent.locationY);
    };

    createBlurWarningAlert = () =>
        Alert.alert(
            "Make it blur",
            "Please choose 4 points to make a blur portion",
            [
                {
                    text: "Ok",
                },
            ],
        );

    saveImage = () => {
        this.refs.viewShot.capture().then(image => {
            this.props.addImage(image);
            this.props.navigation.popToTop();
         });
    }
    render() {
        console.log(this.props.blurViewPoints);
        return (
            <SafeAreaView>
                <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.1,result: "base64" }}>
                    {this.props.blurView != null ? <BlurView style={{ height: this.props.blurView.height, width: this.props.blurView.width, position: 'absolute', zIndex: 99, top: this.props.blurView.startPoint.y, left: this.props.blurView.startPoint.x }}
                        blurType="light"
                        blurAmount={10}
                        reducedTransparencyFallbackColor="white" /> : null}
                    <TouchableWithoutFeedback onPress={this.onPress}>
                        <Image style={styles.image} resizeMode={"cover"} source={{ uri: `data:image/jpeg;base64,${this.props.navigation.getParam('image', null)}` }} />
                    </TouchableWithoutFeedback>
                </ViewShot>

                <Button title="Upload" color="blue" onPress={this.saveImage} />

            </SafeAreaView >
        )
    }
}

const mapStateToProps = state => ({
    blurView: state.images.blurView,
    blurViewPoints: state.images.blurViewPoints,
});

const styles = StyleSheet.create({
    image: {
        margin: 0,
        width: '100%',
        height: '93%'
    }
});

export default connect(mapStateToProps, { chooseBlurViewPoint,addImage })(SelectImageScreen);