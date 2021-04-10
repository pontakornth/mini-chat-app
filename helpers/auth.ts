import firebase from 'firebase'
import { auth } from './firebase'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loginWithEmail(
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> {
  // TODO: Make the authentication real
  return auth.signInWithEmailAndPassword(email, password)
}
