import React, { useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import Layout from '../components/Layout';
import { get } from '../utils/request';
import { API_URL } from '../utils/api';

interface UserInfo {
  username: string
  avatarURL: string
  createdAt: number
  email: string
  mfa: boolean
}

function ProfilePage() {
  const userInfo = useRef<UserInfo>({
    email: 'loading...',
    mfa: false,
    username: 'loading...',
    avatarURL: 'https://i.blamejared.com/github%20(2).png',
    createdAt: 0,
  });

  const [, forceUpdate] = useState({});
  const loadedData = useRef(false);
  useEffect(() => {
    get(`${API_URL}/v1/users/me`).then((value) => {
      userInfo.current = value.data.data;
      loadedData.current = true;
      forceUpdate({});
    }).catch((Error: AxiosError) => {
      // eslint-disable-next-line no-console
      console.log(Error);
    });
  }, [userInfo]);

  if (!loadedData) {
    return <></>;
  }
  return (
    <Layout title="Profile | Diluv">
      <div className="container mx-auto">
        <div className="pt-3">
          <div className="flex">
            <div className="w-1/4">
              {userInfo.current.avatarURL
              && <img src={userInfo.current.avatarURL} className="expand-image" width="100%" alt={userInfo.current.username}/>}
            </div>
            <div className="w-3/4">
              <div className="pt-4">
                <h3>{userInfo.current.username}</h3>
                <h3>{userInfo.current.email}</h3>
                <h3>
                  Member since:
                  {new Date(userInfo.current.createdAt).toLocaleString()}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// ProfilePage.getInitialProps = privateProps;


export default ProfilePage;
