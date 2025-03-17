import {
    ListGroup,
    Accordion,
  } from "react-bootstrap";

export default function Module({modulo, claseActual, setClaseActual, setModuloActual, index}) {
    return (
        <Accordion className="mb-4 p-0" defaultActiveKey="0">
            <Accordion.Item className="bg-white border-0 p-0" eventKey={index+""}>
                <Accordion.Header className="bg-white">
                    {modulo.titulo}
                </Accordion.Header>
                <Accordion.Body className="border-bottom">
                    <p className="small text-black">{modulo.descripcion}</p>
                    <ListGroup>
                        {modulo.clases.map((clase, claseIdx) => (
                            <ListGroup.Item
                            key={claseIdx}
                            action
                            active={claseActual.titulo === clase.titulo}
                            onClick={() => {
                                setClaseActual(clase);
                                setModuloActual(modulo)
                                handleClose();
                            }}
                            className="d-flex justify-content-between align-items-center bg-white p-0 text-white border-0"
                            >
                            <div className={`d-flex align-items-center gap-3 mb-3 w-100 ${claseActual.titulo === clase.titulo ? 'text-primary' : 'text-secondary'}`}>	
                                <i className={"fa-solid fa-circle-play fs-5 " + (clase.completado ? 'text-black' : '')}></i>

                                <div className={`${clase.completado && claseActual.titulo !== clase.titulo && 'text-black'} w-100`}>
                                    <p className="p-0 m-0 d-flex align-items-center justify-content-between fw-bold">
                                        {clase.titulo}
                                        <i className={"fa-solid fa-circle-check " + (!clase.completado ? 'text-secondary' : 'text-success')}></i>
                                    </p>
                                    <p className="d-flex align-items-center gap-1 time-class p-0 m-0 fw-light">
                                        <i class="fa-solid fa-clock time-class fw-light"></i>
                                        {clase.duracion}
                                    </p>
                                </div>
                            </div>
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}