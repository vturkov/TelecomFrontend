import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import callService from "../services/callService";
import userService from "../services/userService";

const Call = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [addedAmount, setAddedAmount] = useState(0);
  const [currentUser2, setCurrentUser2] = useState(null);
  const [currentIndex2, setCurrentIndex2] = useState(-1);
  const [code, setCode] = useState(-1);

  useEffect(() => {
    retrieveUsers();
  }, []);

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

  const callCreate = (id, id2) => {
    console.log(id);
    console.log(id2);
    callService
      .createCall(id, id2)
      .then((response) => {
        setCode(response.data.code);
        console.log(response.data.code);
      })
      .catch((e) => {
        setCode(0);
        console.log(code);
      });
  };

  const callStop = () => {
    console.log(code);
    callService
      .stopCall(code)
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
    setCurrentUser2(null);
    setCurrentIndex2(-1);
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const setActiveUser2 = (user2, index2) => {
    setCurrentUser2(user2);
    setCurrentIndex2(index2);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Кто звонит</h4>

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

        <br />
        <h4>Кому звонит</h4>
        <ul className="list-group">
          {users &&
            users.map((user2, index2) => (
              <li
                className={
                  "list-group-item " +
                  (index2 === currentIndex2 ? "active" : "")
                }
                onClick={() => setActiveUser2(user2, index2)}
                key={index2}
              >
                {user2.FIO}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentUser2 && currentUser ? (
          <div>
            <Button onClick={() => callCreate(currentUser.id, currentUser2.id)}>
              Создать звонок
            </Button>

            {code>0 ? (
              <div>
                <Button onClick={() => callStop()}>Остановить звонок</Button>
              </div>
            ) : null}

            {!code && currentUser2 && currentUser ? (
              <div>
                Кажется, кто-то из абонентов отключен. Включите абоненты перед
                звонком
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <br />
            <p>Нажмите на абонентов, чтобы выбрать их для создания звонка...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Call;
