import admin from 'firebase-admin'

import dotenv from 'dotenv'

dotenv.config()

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
}, 'verifyToken')

export const verifyToken = (token: string) => {
  return new Promise(function (resolve, reject) {
    admin
     .auth()
      .verifyIdToken(token)
      .then(decodedToken => {
        resolve(decodedToken)
      })
      .catch(error => {
        reject(error)
      })
  })
}