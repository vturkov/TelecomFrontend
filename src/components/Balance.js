import React, { useState, useEffect } from "react";
import userService from "../services/userService";
import balanceService from "../services/balanceService";
import { Link } from "react-router-dom";

const Balance = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [addedAmount, setAddedAmount] = useState(0);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const handleInputChange = event => {
    setAddedAmount(event.target.value);
  };

  const retrieveUsers = () => {
    userService
      .getAll()
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const AddAmount = (id) => {
    console.log(id);
    balanceService
      .addAmount(id, addedAmount)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUsers();
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Список абонентов</h4>

        <ul className="list-group">
          {users &&
            users.map((user, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                {user.FIO}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <br />
            <h4>Абонент</h4>
            <div>
              <label>
                <strong>ФИО:</strong>
              </label>{" "}
              {currentUser.FIO}
            </div>
            <div>
              <label>
                <strong>Баланс:</strong>
              </label>{" "}
              {currentUser.balance}
            </div>
            <br />
            <div className="form-group">
            <input
              type="number"
              className="form-control"
              placeholder="100"
              value={addedAmount}
              onChange={handleInputChange}
	      style={{opacity: 100}}
            />
            </div>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => AddAmount(currentUser.id)}
            >
              Пополнить
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Нажмите на абонента, чтобы увидеть его баланс...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Balance;
