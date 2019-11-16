import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import {NextPage} from 'next';

const AboutPage: NextPage = () => (
  <Layout title="Games | Diluv">
    <h1>Games</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default AboutPage
