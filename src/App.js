import React from "react"
import "./App.css"
import Sidebar from "./Components/Sidebar/Sidebar"
import Chat from "./Components/Chat/Chat"
import Login from './Components/Login/Login'
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import {useStateValue} from "../src/StateProvider"

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
