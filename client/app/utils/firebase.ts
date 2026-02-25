import { type FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app'
import { type Auth, getAuth } from 'firebase/auth'

export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

let _app: FirebaseApp | null = null
let _auth: Auth | null = null

export function initFirebase(config: FirebaseConfig): FirebaseApp {
  if (_app) return _app

  _app = getApps().length ? getApp() : initializeApp(config)
  _auth = getAuth(_app)

  return _app
}

export function getFirebaseApp(): FirebaseApp {
  if (!_app) throw new Error('Firebase not initialized. Call initFirebase() first.')
  return _app
}

export function getFirebaseAuth(): Auth {
  if (!_auth) throw new Error('Firebase not initialized. Call initFirebase() first.')
  return _auth
}
