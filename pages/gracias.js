import Head from "next/head";
import DefaultLayout from "@/layouts/default_layout";

export default function Gracias(){
    return <>
        <Head>
            <title>¡Gracias!</title>
        </Head>
        <DefaultLayout>
            <h1 className="text-danger">¡Gracias!</h1>
            <p className="h3">Gracias por llenar el formulario de contacto</p>
        </DefaultLayout>
    </>
}