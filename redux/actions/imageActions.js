import {FETCH_IMAGES,CHOOSE_BLUR_VIEW_POINT,SELECT_IMAGE,ADD_IMAGE} from '../actions/types';
import firestore from '@react-native-firebase/firestore';

export const fetchImages = () => dispatch => {     
    firestore()
      .collection('Images')
      .onSnapshot(querySnapshot => {
        let images = [];
        querySnapshot.forEach(doc => {
            console.log(doc.data().data);
           images.push(doc.data().data);
        });
        dispatch({type: FETCH_IMAGES,payload: images,showLoading: false});
      });
}

export const selectImage = (image) => dispatch => {
    dispatch({type: SELECT_IMAGE,selectedImage: image});
}

export const chooseBlurViewPoint = (x,y) => dispatch => {
    dispatch({type: CHOOSE_BLUR_VIEW_POINT,point: {x: x,y: y}});
}

export const addImage = (image) => dispatch => {
    firestore()
    .collection('Images')
    .add({
      data: image,
    })
    .then(() => {
        dispatch({type: ADD_IMAGE});
    }).catch((error) => {
        console.log(error);
    });
}