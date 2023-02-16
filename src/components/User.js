import React, { useState, useEffect } from "react";
import callService from "../services/callService";
import userService from "../services/userService";
import MaterialReactTable from "material-react-table";
import { Toggle } from "../Toogle";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const logState = (id) => {
    console.log("Toggled:", id);
    userService.connect(id);
    retrieveUsers();
  };

  const disconect = (id) => {
    console.log("Disconect:", id);
    userService.disconect(id);
    retrieveUsers();
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

  return (
    <table className="table">
      <thead className="table-light">
        <tr>
          <th/>
          <th>ФИО</th>
          <th>Телефон</th>
          <th>Баланс</th>
          <th>Занятость</th>
          <th>Подключение</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <input className="checkbox" type="checkbox" id={`${user.id}`} />
              <label htmlFor={`${user.id}`} />
            </td>
            <td>{user.FIO}</td>
            <td>{user.phone}</td>
            <td>{user.balance}</td>
            <td>
              {(user.busy === false) ? <div className="dot"></div> : <div className="dot" style="background-color: green"></div>}
              
            </td>
            <td>{ <Toggle toggled={false} onClick={()=>((user.connected === false) ? logState(user.id) : disconect(user.id))} />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default User;
