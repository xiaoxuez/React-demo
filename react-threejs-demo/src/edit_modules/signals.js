var Signal = require('signals');

var HandlerSignal = {
  selectModel: new Signal(),
  changePosition: new Signal(),
  changePositionEnd: new Signal(),
  enableAllTouchable: new Signal(),
  deleteModel: new Signal(),
}

export default HandlerSignal;
