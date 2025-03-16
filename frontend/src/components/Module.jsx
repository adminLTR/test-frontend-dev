import {
    ListGroup,
    Badge,
    Accordion,
  } from "react-bootstrap";

export default function Module({modulo, claseActual, setClaseActual, index}) {
    return (
        <Accordion className="mb-4" defaultActiveKey="0">
            <Accordion.Item className="bg-dark border-0" eventKey={index+""}>
                <Accordion.Header className="bg-warning">
                    {modulo.titulo}
                </Accordion.Header>
                <Accordion.Body>
                    <p className="small text-white">{modulo.descripcion}</p>
                    <ListGroup>
                        {modulo.clases.map((clase, claseIdx) => (
                            <ListGroup.Item
                            key={claseIdx}
                            action
                            active={claseActual.titulo === clase.titulo}
                            onClick={() => {
                                setClaseActual(clase);
                                handleClose();
                            }}
                            className="d-flex justify-content-between align-items-center bg-dark text-white border-0"
                            >
                            <p className={`d-flex align-items-center gap-2 ${claseActual.titulo === clase.titulo ? 'text-primary' : 'text-secondary'}`}>	
                                {clase.completado ? <span className={"material-symbols-outlined " + (claseActual.titulo === clase.titulo ? 'text-primary' : 'text-success')}>
                                    check_circle
                                </span> : <span className={`material-symbols-outlined `}>
                                    expand_circle_right
                                </span>}

                                <span className={`${clase.completado && claseActual.titulo !== clase.titulo && 'text-white'}`}>
                                    {clase.titulo} ({clase.duracion})
                                </span>
                            </p>
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}