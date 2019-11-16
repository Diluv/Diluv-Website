import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link';
import 'bootstrap/scss/bootstrap.scss';
import diluv from '../public/branding/diluv.svg';

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
                                                  children,
                                                  title = 'This is the default title',
                                                }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link href="/">
                <a className="nav-link">Home <span className="sr-only">(current)</span></a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/games" prefetch={false}>
                <a className="nav-link">Games</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/news" prefetch={false}>
                <a className="nav-link">News</a>
              </Link>
            </li>
            <li className="nav-item">
              {/* TODO Should this be in staging? */}
              <Link href="https://ideas.diluv.com">
                <a className="nav-link">Feedback</a>
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link href="/">
                <a className="nav-link">Sign in <span className="sr-only">(current)</span></a>
              </Link>
            </li>
            <li className="nav-item active">
              <Link href="/">
                <a className="nav-link">Sign Up <span className="sr-only">(current)</span></a>
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {'Username'}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">My Profile</a>
                <a className="dropdown-item" href="#">Analytics</a>
                <a className="dropdown-item" href="#">Settings</a>
                <div className="dropdown-divider"/>
                <a className="dropdown-item" href="#">Sign Out</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <div className="pt-md-5">
      {children}
    </div>
    <footer className="pt-4 my-md-5 pt-md-5 border-top container">
      <div className="row">
        <div className="col-12 col-md">
          <img className="mb-2" src={diluv} alt="" width="24" height="24"/>
          <small className="d-block mb-3 text-muted">© 2019</small>
        </div>
        <div className="col-6 col-md">
          <h5>Product</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="https://blog.diluv.com">News</a></li>
            <li><a className="text-muted" href="https://developer.diluv.com">Developers</a></li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>About</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="/about">About</a></li>
            <li><a className="text-muted" href="/privacy">Privacy</a></li>
            <li><a className="text-muted" href="/terms">Terms</a></li>
            <li><a className="text-muted" href="https://github.com/Diluv">Github</a></li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Contact</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="https://twitter.com/DiluvSupport">Twitter</a></li>
            <li><a className="text-muted" href="https://www.reddit.com/r/diluv/">Reddit</a></li>
            <li><a className="text-muted" href="#">Discord</a></li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
);

export default Layout
