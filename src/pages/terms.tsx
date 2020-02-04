import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import {NextPage} from 'next';

const TermsPage: NextPage = () => (
  <Layout title="News | Diluv">
    <h1>News</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default TermsPage
