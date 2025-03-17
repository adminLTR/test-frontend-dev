import { useState } from "react";
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

export default function InputComment() {
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState('');

  const handleCancel = () => {
    setComment('');
    setExpanded(false);
  };

  return (
    <Card className="my-3 border-0">
      <Card.Body>
        <Row>
          <Col xs="auto">
            <img
              src="/avatar.png" 
              alt="User Avatar"
              className="rounded-circle"
              width="50"
              height="50"
            />
          </Col>
          <Col>
            <Form.Group>
              {expanded ? (
                <>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Escribe tu comentario..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    autoFocus
                  />
                  <div className="d-flex justify-content-end mt-2">
                    <Button variant="secondary" className="me-2" onClick={handleCancel}>
                      Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleCancel}>
                      Enviar
                    </Button>
                  </div>
                </>
              ) : (
                <Form.Control
                  type="text"
                  placeholder="Agrega un comentario..."
                  onFocus={() => setExpanded(true)}
                />
              )}
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
