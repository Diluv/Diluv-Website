import * as React from 'react'
import Layout from '../components/Layout'
import {Container, Image, Row, Col} from 'react-bootstrap';
import {ensureAuthed} from "../utils/auth";
import {useEffect, useRef, useState} from "react";
import {get} from "../utils/request";
import {API_URL} from "../utils/api";
import {parseCookies} from "nookies";
import {AxiosError} from "axios";


interface UserInfo {
  username: string,
  email: string
  mfa: boolean
}

// @ts-ignore
function ProfilePage() {

  ensureAuthed(null, "/login?rt=/profile");
  const userInfo = useRef<UserInfo>({email: "loading...", mfa: false, username: "loading..."});

  const [, forceUpdate] = useState({});

  useEffect(() => {
    let username = parseCookies()["username"];
    get(API_URL + "/v1/users/" + username).then((value) => {
      userInfo.current = value.data.data;
      forceUpdate({});
    }).catch((Error: AxiosError) => {
      console.log(Error);
    });
  }, [userInfo]);

  if (!userInfo.current) {
    return <div></div>;
  }
  return (<Layout title="Profile | Diluv" >
      <div className="container">
        <Container className="pt-3">
          <Row>
            <Col md={3}>
              <Image src="https://www.gravatar.com/avatar/00000000000000000000000000000000" roundedCircle width="100%"/>
            </Col>
            <Col md={9}>
              <div className={"pt-4"}>
                <h3>{userInfo.current["username"]}</h3>
                <h3>{userInfo.current["email"]}</h3>

              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}


export default ProfilePage
