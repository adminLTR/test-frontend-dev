import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getModulos } from "../js/api";
import Module from "../components/Module";
import { comments } from "../js/data";
import Comment from "../components/Comment";
import InputComment from "../components/InputComment";
import "../css/animations.css"
import {
    Container,
    Row,
    Col,
    Button,
    Offcanvas,
    Card,
  } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

export async function loader() {
    const token = localStorage.getItem("token");
    try {
      const modulos = await getModulos(token);      
      return modulos.data;    
    } catch (error) {
      window.location.href = '/login'
      return null      
    }
}

export default function CursoPage() {
  const modulos = useLoaderData();
  const [claseActual, setClaseActual] = useState(null);
  const [moduloActual, setModuloActual] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (modulos) {
      setClaseActual(modulos[0].clases[0]);
      setModuloActual(modulos[0])
    }
  }, [modulos])

  const getEmbedUrl = (url) => {
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    return url;
  };

  return (
    (claseActual && <Container fluid className="h-100 bg-white page-container">
      <Row>
        {/* Video Principal */}
        <Col xs={12} lg={8} xl={9} className="mb-4 p-0">
          {claseActual ? (
            <Card className="border-0 bg-white">
              <Card.Body>
                <div className="mb-3 d-flex align-items-center gap-3">
                  <i className="fa-solid fa-graduation-cap fs-1 text-primary"></i>
                  <div>
                    <Card.Title className="text-primary fw-bold fs-4 card-title">
                      {moduloActual.titulo}
                    </Card.Title>
                    <Card.Text className="text-black">Clase: {claseActual.titulo}</Card.Text>
                  </div>
                </div>
                <div className="ratio ratio-16x9 mb-3 video-container">
                  {/* <video src={claseActual.video} controls className="rounded" /> */}
                  <iframe 
                    className="rounded" 
                    src={getEmbedUrl(claseActual.video)} 
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                  ></iframe>
                </div>
                <p>{claseActual.descripcion}</p>
              </Card.Body>
            </Card>
          ) : (
            <p className="text-white">Cargando clase...</p>
          )}
        </Col>

        {/* Botón para móviles */}
        <Col xs={12} className="d-lg-none mb-3 text-center">
          <Button variant="primary" onClick={handleShow} className="btn-show-modules">
            Ver Módulos y Clases
          </Button>
        </Col>

        {/* Lista de módulos y clases */}
        <Col lg={4} xl={3} className="d-none d-lg-block p-0">
          <Card className="h-100 border-0 bg-white rounded-0">
            <Card.Header className="text-primary bg-white fs-3 mb-4 fw-bold card-header">
              Contenido
            </Card.Header>
            <Card.Body className="scroll-modules">
              {modulos.map((modulo, i) => (
                <div className="module-item" key={i}>
                  <Module 
                    modulo={modulo} 
                    claseActual={claseActual} 
                    setClaseActual={setClaseActual}
                    setModuloActual={setModuloActual}
                    index={i}
                  />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sección de comentarios */}
      <Row className="p-2">
        <div className="comment-sect">
          <p className="fs-4 fw-bold">Comentar</p>
          <InputComment />
        </div>
        <div className="comments-sect">
          {comments.map((comment, i) => (
            <div className="comment-item" key={i}>
              <Comment comment={comment} />
            </div>
          ))}
        </div>
      </Row>

      {/* Offcanvas móvil */}
      <Offcanvas show={show} onHide={handleClose} placement="end" className="h-100 border-0 bg-white offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-primary text-center fs-3 mb-4 fw-bold">
            Contenido
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {modulos.map((modulo, i) => (
            <div className="module-item" key={i}>
              <Module 
                modulo={modulo} 
                claseActual={claseActual} 
                setClaseActual={setClaseActual}
                setModuloActual={setModuloActual}
                index={i}
              />
            </div>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </Container>)    
  );
}