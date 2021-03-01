import { FETCH_IMAGES, CHOOSE_BLUR_VIEW_POINT, SELECT_IMAGE } from '../actions/types';

Array.prototype.sortBy = function(p) {
    return this.slice(0).sort(function(a,b) {
      return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
  }

const initialState = {
    images: [],
    selectedImage: null,
    blurViewPoints: [],
    blurView: null,
    showLoading: false,
};

function isBlueViewSelected(blurViewPoints){
    console.log(blurViewPoints.length >= 4);
    return blurViewPoints.length >= 4
}

function extractBlurViewPoints(blurViewPoints){
    let blurView = [];
    const points = blurViewPoints.slice(Math.max(blurViewPoints.length - 4, 0))
    blurViewPoints.sortBy( function(){ return this.y } );  
    blurView.push(points[0].x < points[1].x ? {x: points[0].x , y: points[0].y} : {x: points[1].x , y: points[1].y});
    blurView.push(points[0].x > points[1].x ? {x: points[0].x , y: points[0].y} : {x: points[1].x , y: points[1].y});
    blurView.push(points[2].x < points[3].x ? {x: points[2].x , y: points[2].y} : {x: points[3].x , y: points[3].y});
    blurView.push(points[2].x > points[3].x ? {x: points[2].x , y: points[2].y} : {x: points[3].x , y: points[3].y});
    let height = parseInt(Math.abs(blurView[3].y - blurView[1].y),10)
    let width = parseInt(Math.abs(blurView[2].x - blurView[1].x),10)
    console.log({startPoint: blurView[0],height: height,width: width});
    return {startPoint: blurView[0],height: height,width: width}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_IMAGES:
            return {
                ...state,
                items: action.payload,
                showLoading: action.showLoading
            };
        case CHOOSE_BLUR_VIEW_POINT:
            state.blurViewPoints.push({x: action.point.x,y: action.point.y})
            return {
                ...state,
                blurViewPoints: state.blurViewPoints,
                blurView: isBlueViewSelected(state.blurViewPoints) ? extractBlurViewPoints(state.blurViewPoints) : null
            };
        default:
            blurViewPoints = []
            blurView = null
            return state
    }
}

