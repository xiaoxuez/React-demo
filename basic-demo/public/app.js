import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "*": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "boxSizing": "border-box"
    },
    "main-header h3": {
        "textAlign": "center",
        "marginTop": 10,
        "marginRight": 0,
        "marginBottom": 10,
        "marginLeft": 0
    },
    "all-side ul": {
        "listStyle": "none",
        "marginTop": "0,",
        "marginRight": 10,
        "marginBottom": "0,",
        "marginLeft": 10
    },
    "all-side": {
        "float": "left",
        "borderRightWidth": 0.6,
        "borderRightColor": "#f2f2f2",
        "borderRightStyle": "solid"
    },
    "event-body": {
        "marginTop": 10,
        "marginRight": 0,
        "marginBottom": 10,
        "marginLeft": 0
    },
    "event-content": {
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 90,
        "borderTopWidth": 0.6,
        "borderTopColor": "#f2f2f2",
        "borderTopStyle": "solid"
    },
    "clearfloat": {
        "zoom": 1
    },
    "clearfloat::after": {
        "display": "block",
        "clear": "both",
        "content": "",
        "visibility": "hidden",
        "height": 0
    },
    "draggable-one": {
        "width": 30,
        "height": 30,
        "marginTop": 10,
        "marginRight": 10,
        "marginBottom": 10,
        "marginLeft": 10,
        "borderRadius": 8,
        "backgroundColor": "#FFBBFF"
    },
    "drag-acceptable": {
        "width": "100%",
        "height": 400,
        "paddingTop": 0,
        "paddingRight": 10,
        "paddingBottom": 0,
        "paddingLeft": 10,
        "backgroundColor": "#F8F8FF"
    }
});