import { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProfilePopOver() {
  const [visible, setVisible] = useState(true);

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
          <p>Name: John Doe</p>
          <p>Email: john.doe@example.com</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
