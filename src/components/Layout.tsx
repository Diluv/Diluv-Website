import React from 'react'
import Head from 'next/head'
import '../scss/index.scss';
import diluv from '../../public/static/diluv.svg';
import {Dropdown, Nav, Navbar, NavItem} from 'react-bootstrap';
import NavLink from 'react-bootstrap/NavLink'

type Props = {
  title?: string
}
const Layout: React.FunctionComponent<Props> = ({
                                                  children,
                                                  title = 'Diluv',
                                                }) => (
  <React.Fragment>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>
    <header>
      <Navbar>
        <Nav activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/games">Games</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/news">News</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="https://ideas.diluv.com">Feedback</Nav.Link>
          </Nav.Item>
        </Nav>

        <Nav className="ml-auto">
          {/*TODO Add if/else*/}
          <Nav.Item>
            <Nav.Link href="/signin">Sign in </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/register">Sign Up</Nav.Link>
          </Nav.Item>

          <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink} id={'dropdown-nav'}>Username</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} href="/profile">My Profile</Dropdown.Item>
              <Dropdown.Item as={NavLink}>Analytics</Dropdown.Item>
              <Dropdown.Item as={NavLink}>Settings</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item as={NavLink}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>
    </header>
    {children}
    <footer className="pt-4 my-md-5 pt-md-5 border-top container">
      <div className="row">
        <div className="col-12 col-md">
          <img className="mb-2" src={diluv} alt="" width="24" height="24"/>
          <small className="d-block mb-3 text-muted">© 2019</small>
        </div>
        <div className="col-6 col-md">
          <h5>Product</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="/news">News</a></li>
            <li><a className="text-muted" href="https://ideas.diluv.com">Feedback</a></li>
            <li><a className="text-muted" href="https://blog.diluv.com">Blog</a></li>
            <li><a className="text-muted" href="https://developer.diluv.com">Developers</a></li>
            <li><a className="text-muted" href="https://github.com/Diluv">Github</a></li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>About</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="/about">About</a></li>
            <li><a className="text-muted" href="/privacy">Privacy</a></li>
            <li><a className="text-muted" href="/terms">Terms</a></li>
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
  </React.Fragment>
);

export default Layout
