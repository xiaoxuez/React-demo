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

export default class extends React.Component {
  render() {
    return (
        <div className='app'>
          <MainHeader/>
          <div className='main-content container'>
            {this.props.children}
          </div>
        </div>
    );
  }
}
