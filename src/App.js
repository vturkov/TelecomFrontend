import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Balance from "./components/Balance.js";
import User from "./components/User.js";
import Call from "./components/Call.js";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Telecom
          </Link>
          <Link to={"/"} className="navbar-brand">
            Балансы
          </Link>
          <Link to={"/user"} className="navbar-brand">
            Пользователи
          </Link>
          <Link to={"/call"} className="navbar-brand">
            Звонки
          </Link>
          <div className="navbar-nav mr-auto"></div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Balance />} />
            <Route path="/user" element={<User />} />
            <Route path="/call" element={<Call />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
