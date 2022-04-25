export default {
  jwt: {
    secret: process.env.MD5_HASH as string,
    expiresIn: '1d'
  }
}
