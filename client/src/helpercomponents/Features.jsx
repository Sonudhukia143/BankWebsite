import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

export default function Features () {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Features of HandleHub</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        
        {/* Feature 1: User Registration & Authentication */}
        <Col>
          <Card className="shadow-lg rounded-3">
            <Card.Body>
              <Card.Title><i className="bi bi-person-lock"></i> User Registration & Authentication</Card.Title>
              <Card.Text>
                Secure registration and login with features like password recovery and two-factor authentication (2FA).
              </Card.Text>
              <Button variant="outline-primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Feature 2: Bank Account Management */}
        <Col>
          <Card className="shadow-lg rounded-3">
            <Card.Body>
              <Card.Title><i className="bi bi-bank"></i> Bank Account Management</Card.Title>
              <Card.Text>
                Add, edit, and delete bank accounts. View account details such as balance, account number, and bank name.
              </Card.Text>
              <Button variant="outline-primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Feature 3: Account Balance & Transaction History */}
        <Col>
          <Card className="shadow-lg rounded-3">
            <Card.Body>
              <Card.Title><i className="bi bi-wallet"></i> Account Balance & Transaction History</Card.Title>
              <Card.Text>
                Track your account balance and view a history of all transactions for better financial control.
              </Card.Text>
              <Button variant="outline-primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Feature 4: Security & Privacy */}
        <Col>
          <Card className="shadow-lg rounded-3">
            <Card.Body>
              <Card.Title><i className="bi bi-shield-lock"></i> Security & Privacy</Card.Title>
              <Card.Text>
                Enjoy advanced security features such as encryption and activity alerts for your peace of mind.
              </Card.Text>
              <Button variant="outline-primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Feature 5: Account Alerts & Notifications */}
        <Col>
          <Card className="shadow-lg rounded-3">
            <Card.Body>
              <Card.Title><i className="bi bi-bell"></i> Account Alerts & Notifications</Card.Title>
              <Card.Text>
                Get notified for important events such as balance changes, transaction activities, or login attempts.
              </Card.Text>
              <Button variant="outline-primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Feature 6: Multi-Language Support */}
        <Col>
          <Card className="shadow-lg rounded-3">
            <Card.Body>
              <Card.Title><i className="bi bi-globe"></i> Multi-Language Support</Card.Title>
              <Card.Text>
                The platform supports multiple languages to cater to users from different regions around the world.
              </Card.Text>
              <Button variant="outline-primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </div>
  );
};

