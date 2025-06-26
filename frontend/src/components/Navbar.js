import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ cart, user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">BookShop</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Carrello ({cart.reduce((acc, item) => acc + item.quantity, 0)})</Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-success">Ciao, {user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-3" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
