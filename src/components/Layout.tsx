import React, {useEffect, useRef, useState} from 'react'
import Head from 'next/head'
import '../scss/index.scss';
import diluv from '../../public/static/diluv.svg';
import {Nav, Navbar} from 'react-bootstrap';
import {destroyCookie, parseCookies} from 'nookies';
import Dropdown from "react-bootstrap/Dropdown";
import {getTheme, toggleTheme} from '../utils/theme';

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
                                                  children,
                                                  title = 'Diluv',
                                                }) => {

  const [, forceUpdate] = useState({});
  const [theme, setTheme] = useState<'light' | 'dark'>("light");
  const updated = useRef(false);
  useEffect(() => {
    setTheme(getTheme());
    forceUpdate({});

    updated.current = true;
  }, [theme]);

  if (!updated.current) {
    return <div></div>;
  }
  document.body.className = "theme-" + theme;
  return (<React.Fragment>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>
    <header>
      <Navbar collapseOnSelect bg={theme} variant={theme} expand={"md"}>
        <Navbar.Brand href="/">Diluv</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
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
            {
              // Currently disabled as the page doesn't exist
              false && (
                <Nav.Item>
                  <Nav.Link href="https://ideas.diluv.com">Feedback</Nav.Link>
                </Nav.Item>
              )
            }
          </Nav>

          <Nav className="ml-auto">
            {
              !parseCookies()["accessToken"] &&
              <Dropdown alignRight className={"nav-item"}>
                <Dropdown.Toggle id="account_dropdown" as={'p'} className={"nav-link mb-0"} style={{cursor: "pointer"}}>
                  Account
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/register">Sign Up</Dropdown.Item>
                  <Dropdown.Item href="/login">Sign In</Dropdown.Item>
                  <Dropdown.Divider/>
                  <Dropdown.Item onClick={() => {
                    setTheme(toggleTheme());
                  }}>{"Theme: " + theme}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            }

            {parseCookies()["accessToken"] &&
            <Dropdown alignRight className={"nav-item"}>
              <Dropdown.Toggle id="username_dropdown" as={'p'} className={"nav-link mb-0"} style={{cursor: "pointer"}}>
                {parseCookies()["username"]}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                <Dropdown.Item>Analytics</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={() => {
                  setTheme(toggleTheme());
                }}>{"Theme: " + theme}</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={() => {
                  destroyCookie(null, "accessToken");
                  destroyCookie(null, "refreshToken");
                  destroyCookie(null, "username");

                  forceUpdate({});
                }}>Sign Out</Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
    <div className={"content theme-" + theme}>
      {children}
    </div>
    <footer className={"pt-4 py-md-5 pt-md-5 border-top footer"}>
      <div className={"container"}>
        <div className="row">
          <div className="col-12 col-md">
            <img className="mb-2" src={diluv} alt="" width="24" height="24"/>
            <small className="d-block mb-3 text-muted">© 2019</small>
          </div>
          <div className="col-6 col-md">
            <h5>Product</h5>
            <ul className="list-unstyled text-small">
              <li><a href="/news">News</a></li>
              {
                false && (
                  <li><a href="https://ideas.diluv.com">Feedback</a></li>
                )
              }
              {
                false && (
                  <li><a href="https://blog.diluv.com">Blog</a></li>
                )
              }
              {
                false && (
                  <li><a href="https://developer.diluv.com">Developers</a></li>
                )
              }
              <li><a href="https://github.com/Diluv">Github</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>About</h5>
            <ul className="list-unstyled text-small">
              <li><a href="/about">About</a></li>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/terms">Terms</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Contact</h5>
            <ul className="list-unstyled text-small">
              <li><a href="https://twitter.com/DiluvSupport">Twitter</a></li>
              <li><a href="https://www.reddit.com/r/diluv/">Reddit</a></li>
              {
                false && (
                  <li><a href="#">Discord</a></li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </React.Fragment>);
}

export default Layout
