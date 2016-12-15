import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "ul": {
        "listStyle": "none",
        "marginTop": 10,
        "marginRight": "auto",
        "marginBottom": 10,
        "marginLeft": "auto"
    },
    "ul li": {
        "paddingTop": 0,
        "paddingRight": 10,
        "paddingBottom": 0,
        "paddingLeft": 10,
        "float": "left",
        "boxSizing": "border-box"
    },
    "ul li a:link": {
        "textDecoration": "none",
        "color": "#3399FF",
        "paddingTop": 2,
        "paddingRight": 10,
        "paddingBottom": 2,
        "paddingLeft": 10
    },
    "ul li a:hover": {
        "textDecoration": "underline",
        "backgroundColor": "transparent"
    },
    "main-nav a:active": {
        "backgroundColor": "#F2F2F2",
        "color": "#3399FF"
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
    "main-nav": {
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 400
    }
});