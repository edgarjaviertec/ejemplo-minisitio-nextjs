import Head from "next/head";
import DefaultLayout from "@/layouts/default_layout";
import {useState, useEffect} from "react";
import * as Yup from "yup";

export default function Contacto() {

    const [datos, setDatos] = useState({
        nombre: "",
        email: "",
        telefono: ""
    });

    const [camposTocados, setCamposTocados] = useState([]);

    useEffect(() => {
        validar();
    }, [datos, camposTocados]);

    const [errores, setErrores] = useState({});

    const [enviando, setEnviando] = useState(false);

    async function enviarAZapier(datos) {
        const respuesta = await fetch('https://hooks.zapier.com/hooks/catch/11760187/3uge0r8/', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        return respuesta;
    };

    const mensajes = {
        requerido: "Este campo es obligatorio.",
        email: "Correo electrónico inválido.",
        minimo: "Este campo debe tener al menos 10 dígitos",
    };

    let validationSchema = Yup.object().shape({
        nombre: Yup.string().required(mensajes.requerido),
        email: Yup.string().required(mensajes.requerido).email(mensajes.email),
        telefono: Yup.string().trim().transform(valor => valor === '' ? undefined : valor).required(mensajes.requerido).min(10, mensajes.minimo)
    });

    function actualizarDatos(evento) {
        setDatos({
            ...datos,
            [evento.target.name]: evento.target.value
        });
    }

    function campoTocado(evento) {
        if (!camposTocados.includes(evento.target.name)) {
            setCamposTocados([
                ...camposTocados,
                evento.target.name
            ])
        }
    }

    function validar() {
        let errores = {};
        try {
            validationSchema.validateSync(datos, {abortEarly: false});
            setErrores({});
        } catch (erroresValidacion) {
            erroresValidacion.inner.map(error => {
                errores[error.path] = error.message;
            });
            const erroresCamposTocados = Object.keys(errores).filter((key) => {
                return camposTocados.includes(key);
            }).reduce((acumulador, key) => {
                if (!acumulador[key]) {
                    acumulador[key] = errores[key]
                }
                return acumulador
            }, {});
            setErrores(erroresCamposTocados);
            console.log("Errores de validación:");
            console.log(erroresValidacion);
        }
    }

    function manejarSubmit(evento) {
        evento.preventDefault();
        let errores = {};
        try {
            validationSchema.validateSync(datos, {abortEarly: false});
            setErrores({});
            setEnviando(true);
            enviarAZapier(datos).then((respuesta) => {
                console.log("Respuesta Zapier");
                console.log(respuesta);
                window.location.href = "https://preventa.elgranancira.com/gracias/";
                setEnviando(false);
            }).catch((error) => {
                console.log("Error Zapier:");
                console.log(error);
                setEnviando(false);
            });
        } catch (erroresValidacion) {
            erroresValidacion.inner.map(error => {
                errores[error.path] = error.message;
            });
            setErrores(errores);
            const camposTocados = Object.keys(errores);
            setCamposTocados(camposTocados);
            console.log("Errores de validación:");
            console.log(errores);
        }
    }

    function evitarLetras(evento) {
        if (evento.which < 48 || evento.which > 57) {
            evento.preventDefault();
        }
    }

    return <>
        <Head>
            <title>Contacto</title>
        </Head>
        <DefaultLayout>
            <h1 className="text-danger mb-3">Contacto</h1>
            <form onSubmit={manejarSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                        id="nombre"
                        name="nombre"
                        onKeyUp={campoTocado}
                        onBlur={campoTocado}
                        onChange={actualizarDatos}
                        value={datos.nombre}
                    />
                    {errores.nombre ? <div className="invalid-feedback">{errores.nombre}</div> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errores.email ? "is-invalid" : ""}`}
                        id="email"
                        name="email"
                        onKeyUp={campoTocado}
                        onBlur={campoTocado}
                        onChange={actualizarDatos}
                        value={datos.email}
                    />
                    {errores.email ? <div className="invalid-feedback">{errores.email}</div> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input type="text"
                           className={`form-control ${errores.telefono ? "is-invalid" : ""}`}
                           maxLength="10"
                           id="telefono"
                           name="telefono"
                           onKeyPress={evitarLetras}
                           onKeyUp={campoTocado}
                           onBlur={campoTocado}
                           onChange={actualizarDatos}
                    />
                    {errores.telefono ? <div className="invalid-feedback">{errores.telefono}</div> : null}
                </div>
                <div className="mb-3">
                    <button disabled={enviando} type="submit" className="btn btn-lg btn-success">Enviar</button>
                </div>
            </form>
        </DefaultLayout>
    </>
}