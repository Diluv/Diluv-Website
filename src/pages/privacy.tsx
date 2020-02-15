import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import {NextPage} from 'next';

const PrivacyPage: NextPage = () => (
  <Layout title="Privacy | Diluv">
    <h1>Privacy</h1>
    <p>This is the Privacy page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default PrivacyPage
