import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AuthProvider } from "react-admin";

type LoginType = {
  username: string
  password: string
}
type CheckErrorType = {
  status: number
}

export const authProvider: AuthProvider = {
  // send username and password to the auth server and get back credentials
  login: async ({ password, username }: LoginType) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, username, password);
    return Promise.resolve();
  },
  // when the dataProvider returns an error, check if this is an authentication error
  checkError: ({ status }: CheckErrorType) => {
    console.log('checkError')
    if (status === 401 || status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // when the user navigates, make sure that their credentials are still valid
  checkAuth: async () => {
    const getUser = async (): Promise<string | undefined> => {
      return await new Promise((res, rej) => {
        getAuth().onIdTokenChanged(async (user) => res(!user ? undefined : user.uid));
      });
    };
    let user = await getUser();
    return user ? Promise.resolve() : Promise.reject();
  },
  // remove local credentials and notify the auth server that the user logged out
  logout: () => {
    const auth = getAuth();
    signOut(auth);
    return Promise.resolve();
  },
  // get the user's profile
  getIdentity: () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    return currentUser ? Promise.resolve({ ...currentUser, id: currentUser.uid }) : Promise.reject();
  },
  getPermissions: () => Promise.resolve()
};