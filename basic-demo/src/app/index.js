import React from 'react';
import {Router, Route, NotFound, browserHistory, IndexRoute} from 'react-router'
import App from './components/app';
import NotFoundHandler from './components/not_found';
import All from './components/all';
import Event from './components/event';
import Girls from './components/girls';
import Add from './components/add';
import Drag from './components/events/drag';
var appRouter = (
  <Router history={browserHistory}>
    <Route title="SurveyBuilder" path="/" component={App}>
      <IndexRoute component={All} />
      <Route path="event" component={Event}>
        <IndexRoute component={Drag} />
      </Route>
      <Route path="girls" component={Girls} />
      <Route path="add" component={Add} />
    </Route>
  </Router>
);
//  <NotFound title="Page Not Found" handler={NotFoundHandler}/>  ?加上就报错
// 写法和示例不一样，handler? component? title?
export default appRouter;
