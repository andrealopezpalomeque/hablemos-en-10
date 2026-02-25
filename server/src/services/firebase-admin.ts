import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { config } from '../config/environment.js'

const app = initializeApp({
  credential: cert({
    projectId: config.firebase.projectId,
    clientEmail: config.firebase.clientEmail,
    privateKey: config.firebase.privateKey,
  }),
})

export const adminAuth = getAuth(app)
export const adminDb = getFirestore(app)
