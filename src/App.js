import React from 'react';
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import Students from './students/Students'
import Schedule from './schedule/Schedule'
import Courses from './courses/Courses'
import CourseDashboard from './courses/CourseDashboard'
import StudentDashboard from './students/StudentDashboard'
import StudentCourse from './schedule/StudentCourse'
import Home from './Home';


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route exact path="/schedule" component={Schedule}/>
          <Route path="/schedule/:id" component={StudentCourse}/>
          <Route exact path="/courses" component={Courses}/>
          <Route path="/courses/:id" component={CourseDashboard}/>
          <Route exact path="/students" component={Students}/>
          <Route path="/students/:id" component={StudentDashboard}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
