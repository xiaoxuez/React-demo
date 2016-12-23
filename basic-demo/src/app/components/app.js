import React from 'react';
import MainHeader from './main_header';
var SurveyStore = require("../flux/SurveyStore");
var Dispatcher = require("../flux/Dispatcher");
var SurveyConstants = require("../flux/SurveyConstants");

Dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case SurveyConstants.SAVE_SURVEY:
      SurveyStore.saveSurvey(payload.survey);
      break;

    case SurveyConstants.DELETE_SURVEY:
      SurveyStore.deleteSurvey(payload.id)
      break;

    case SurveyConstants.RECORD_SURVEY:
      SurveyStore.recordSurvey(payload.results);
      break;
  }
});

import Header from './scroll_header';
export default class extends React.Component {
  render() {
    return (
        <div className='app'>
          <Header/>
          <div style={{height: window.innerHeight, paddingTop: 60,}}>
            {this.props.children}
          </div>
        </div>
    );
    // return (
    //   <div className='app'>
    //     <Header />
    //     {this.gatherData()}
    //   </div>
    // )
  }

  gatherData() {
    let gathers = [];
    for (let i = 0; i < 100; i++) {
      gathers.push(<div className='lines'> lines {i} {i} {i}  lines</div>)
    }
    return gathers;
  }
}
