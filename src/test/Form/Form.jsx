import { useState } from "react";
import "./App.css";

export default function UserForm() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !fullname.trim()) return;

    const newUser = {
      id: Date.now(),
      username,
      fullname,
    };

    setUsers([...users, newUser]);

    // Reset
    setUsername("");
    setFullname("");
  };

  const removeUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="wrapper">
      <h1 className="title">Login Form</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Full Name"
          className="input"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

        <button type="submit" className="addBtn">Add User</button>
      </form>

      <h2 className="subtitle">User Data</h2>

      <div className="tableWrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Full Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.fullname}</td>
                <td>
                  <button
                    className="removeBtn"
                    onClick={() => removeUser(user.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
