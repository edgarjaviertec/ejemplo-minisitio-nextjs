import Head from 'next/head'
import Link from "next/link";
import DefaultLayout from '@/layouts/default_layout'

export default function Home() {
    return (
        <>
            <Head>
                <title>Página de inicio</title>
            </Head>
            <DefaultLayout>
                <h1 className="h3 mb-3 text-success">Validación de formularios en Next.js</h1>
                <p>Para poder ver como funciona la validación de formularios haz click en menú <Link href="/contacto" legacyBehavior><a >Contacto</a></Link></p>
            </DefaultLayout>
        </>
    )
}