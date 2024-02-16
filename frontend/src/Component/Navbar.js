import React from 'react'

export default function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-warning">
        <div className="container-fluid">
        <img className="log1" src="./images/pharma icon.png" alt="" width="60"/>
          <a className="navbar-brand" href="/">Pharmacist</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className='d-flex me-auto'>
            <div className="collapse navbar-collapse" id="navbarNav">
            
              <ul className="navbar-nav ">
                <li className="home active">
                  <a className="btn btn-outline-danger mx-1" color="black"aria-current="page" href="/">Home</a>
                </li>

                <li className="nav-item">
                  <a className="btn btn-outline-danger mx-1" href="/dashboard">Dashboard</a>
                </li>

                
                <li className="nav-item">
                  <a className="btn btn-outline-danger mx-1" href="/login">Login</a>
                </li>

              </ul>
              
      

              </div>
            </div>
          </div>
      </nav>
    </div>
      

  )
}
