import { useState } from 'react';
import './App.css';

const loadingHTML = (
  <div
    style={{
      position: 'fixed',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
    }}
  >
    <div
      style={{
        width: '50px',
        height: '50px',
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        border: '3px solid #fb5b53',
        borderTop: '3px solid transparent',
        borderRadius: '50%',
        animation: 'spin .5s linear 0s infinite',
      }}
    ></div>
  </div>
);

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);

  async function getUsers() {
    setUsers([]);
    setLoading(true);
    const data = (await (await fetch('https://reqres.in/api/users?page=1')).json()).data;
    setExpanded(false);
    setLoading(false);
    setUsers(data);
  }

  return (
    <div className="App">
      <div className={`nav${expanded ? ' nav_expanded' : ''}`}>
        <div>
          <div>Let's Grow More Internship</div>
          <div className="no-warp">Task 2</div>
          <button onClick={() => getUsers()}>Get Users</button>
        </div>
      </div>
      <div className="all_users">
        {users.map(user => {
          return (
            <div key={user.id}>
              <div className="avator">
                <img alt={user.first_name} src={user.avatar}></img>
              </div>
              <div className="user_details">
                <div className="user_name">{user.first_name + ' ' + user.last_name}</div>
                <div className="user_email">{user.email}</div>
              </div>
            </div>
          );
        })}
      </div>
      {loading === true && loadingHTML}
    </div>
  );
}

export default App;
