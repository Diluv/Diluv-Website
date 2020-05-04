import { useAuth } from "oidc-react";
import React, { useContext } from "react";
import DropDown, { DropDownAction, DropDownLink, DropDownSpacer } from "../Dropdown";
import { Theme } from "../../utils/context";

function getName(userData:any){
  return userData.profile.name;
}
const NavDropAuth = () => {
  const auth = useAuth();
  const theme = useContext(Theme);
  return (
    <DropDown name={auth.userData ? getName(auth.userData) : "Account"} className="text-teal-200 hover:text-white transition-colors duration-200 ease-in pr-3 triangle-after-expand">
      {auth.userData ? <>
        <DropDownAction action={() => {
          auth.signOut();
        }
        }><p>Logout</p></DropDownAction>
        <DropDownSpacer/>
        <DropDownAction action={() => {
          theme.toggleTheme();
        }}
        >
          Change Theme
        </DropDownAction>
      </> : <>
        <DropDownLink href="/register">
          <p>Sign Up</p>
        </DropDownLink>
        <DropDownAction action={() => {
          auth.signIn();
        }
        }><p>Sign In</p></DropDownAction>
        <DropDownSpacer/>
        <DropDownAction action={() => {
          theme.toggleTheme();
        }}
        >
          Change Theme
        </DropDownAction>
      </>}
    </DropDown>
  );
};

export default NavDropAuth;