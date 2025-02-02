import { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProfilePopOver() {
  const [visible, setVisible] = useState(false);

  const changeVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Button onClick={changeVisibility} className="btn btn-primary" type="button" aria-controls="offcanvasExample" id="profileButton">
        Profile
      </Button>

      <Offcanvas show={visible} onHide={changeVisibility} placement="end" id="offcanvasExample">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>User Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <span className="profileImageSpan">
            {localStorage.getItem('images')?<img src={(JSON.parse(localStorage.getItem('images'))).url} className="rounded-circle img-fluid" alt="Profile Image" />:""}
          </span>
          <p>Name: {localStorage.getItem('username')}</p>
          <p>Email: {localStorage.getItem('gmail')}</p>
          <p>Bio: {localStorage.getItem('Bio')}</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
