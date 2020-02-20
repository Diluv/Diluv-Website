import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

function AboutPage() {
  return (
    <Layout title="About | Diluv">
      <h1>About</h1>
      <p>This is the about page</p>
      <p>
        <Link href="/">
          <button type="button">Go home</button>
        </Link>
      </p>
    </Layout>
  );
}

export default AboutPage;
