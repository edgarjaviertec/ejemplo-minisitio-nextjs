import Head from 'next/head'
import  DefaultLayout from '@/layouts/default_layout'
export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <DefaultLayout>
        <h1 className="text-danger">Hola mundo</h1>
      </DefaultLayout>
    </>
  )
}