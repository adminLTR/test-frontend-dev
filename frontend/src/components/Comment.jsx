import { Card, Image, Row, Col, Button, Badge } from "react-bootstrap";
import { HandThumbsUp, ChatDots } from "react-bootstrap-icons";

export default function Comment({comment}) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row className="align-items-start">
          {/* Avatar */}
          <Col xs="auto">
            <Image 
              src={comment.avatar} 
              roundedCircle 
              width={50} 
              height={50} 
              alt={`${comment.username}'s avatar`} 
              className="border"
            />
          </Col>

          {/* Contenido */}
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <strong>{comment.username}</strong>
              <small className="text-muted">{comment.timeAgo}</small>
            </div>

            <Card.Text className="mt-2">
              {comment.commentText}
            </Card.Text>

            <div className="d-flex gap-3 mt-3">
              <Button variant="outline-primary" size="sm" className="d-flex align-items-center gap-1">
                <HandThumbsUp size={16} />
                <span>Me gusta</span>
                <Badge bg="primary">{comment.likes}</Badge>
              </Button>

              <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
                <ChatDots size={16} />
                <span>Respuestas</span>
                <Badge bg="secondary">{comment.replies}</Badge>
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
