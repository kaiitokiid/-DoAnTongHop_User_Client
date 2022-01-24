import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './NotFound.css'

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="body">
      <div className="notfound-container">
          <h1>Opps! Không tìm thấy trang này</h1>
          <span onClick={() => navigate(-2)}>
              <i className="fas fa-arrow-left"></i>&nbsp;Quay về trang trước
          </span>
      </div>
    </div>
  );
}

export default NotFound;