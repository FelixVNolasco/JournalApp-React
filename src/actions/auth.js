import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signInWithPopup, updateProfile, signOut} from "firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import Swal from 'sweetalert2'

import { types } from "../types/types";
import { finishLoading, startLoading } from "./loading";
import { noteLogout } from "./notes";

export const loginWithEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();   
    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch( (e) => { 
        Swal.fire('Error', e.message, "error");
        dispatch(finishLoading());
      })
  }
};

export const startGoogleLogin = () =>{
  return (dispatch) => {
      const auth = getAuth();
      signInWithPopup(auth, googleAuthProvider)
          .then(({user}) =>{
              dispatch(login(user.uid, user.displayName))
              console.log(user,user.uid, user.displayName);
          })
          .catch ( e => console.log(e));
  }
}

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};

export const logout = () => {
  return {
    type: types.logout     
  }    
}

export const registerWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name });
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((e) => {
        Swal.fire('Error', e.message, "error");
        dispatch(finishLoading());
      });
  };
};

export const LogoutAction = () => {
  return async(dispatch) => {
      const auth = getAuth();
      await signOut(auth);
      dispatch(logout());
      dispatch(noteLogout());
  }
}