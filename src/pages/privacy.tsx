import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

function PrivacyPage() {
  return (
    <Layout title="Privacy | Diluv">
      <h1>Privacy</h1>
      <p>This is the Privacy page</p>
      <p>
        <Link href="/">
          <button type="button">Go home</button>
        </Link>
      </p>
    </Layout>
  );
}

export default PrivacyPage;
