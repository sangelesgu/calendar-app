import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { LoginScreen } from '../auth/LoginScreen';
import { RegisterScreen } from '../auth/RegisterScreen';
import { CalendarScreen } from '../calendar/CalendarScreen';

export const AppRouter = () => {
  return (
   
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/calendar" component={CalendarScreen} />

            <Redirect to="/"/>
          </Switch>
        </div>
      </Router>
  )
}
