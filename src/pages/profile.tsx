import * as React from 'react'
import Layout from '../components/Layout'
import {privateProps, requireAuth} from "../utils/auth";
import {useEffect, useRef, useState} from "react";
import {get} from "../utils/request";
import {API_URL} from "../utils/api";
import {AxiosError} from "axios";


interface UserInfo {
  username: string
  avatarURL: string
  createdAt: number
  email: string
  mfa: boolean
}

// @ts-ignore
function ProfilePage() {

  const userInfo = useRef<UserInfo>({
    email: "loading...",
    mfa: false,
    username: "loading...",
    avatarURL: '',
    createdAt: 0
  });

  const [, forceUpdate] = useState({});
  const loadedData = useRef(false);
  useEffect(() => {
    get(API_URL + "/v1/users/me").then((value) => {
      userInfo.current = value.data.data;
      loadedData.current = true;
      forceUpdate({});
    }).catch((Error: AxiosError) => {
      console.log(Error);
    });
  }, [userInfo]);

  if (!loadedData) {
    return <React.Fragment/>;
  }
  return (<Layout title="Profile | Diluv">
      <div className="container">
        {/*<Container className="pt-3">*/}
        {/*  <Row>*/}
        {/*    <Col md={3}>*/}
        {/*      {userInfo.current["avatarURL"] &&*/}
        {/*      <Image src={userInfo.current["avatarURL"]} roundedCircle width="100%"/>}*/}
        {/*    </Col>*/}
        {/*    <Col md={9}>*/}
        {/*      <div className={"pt-4"}>*/}
        {/*        <h3>{userInfo.current["username"]}</h3>*/}
        {/*        <h3>{userInfo.current["email"]}</h3>*/}
        {/*        <h3>Member since: {new Date(userInfo.current["createdAt"]).toLocaleString()}</h3>*/}
        {/*      </div>*/}
        {/*    </Col>*/}
        {/*  </Row>*/}
        {/*</Container>*/}
      </div>
    </Layout>
  );
}

ProfilePage.getInitialProps = privateProps;


export default ProfilePage
