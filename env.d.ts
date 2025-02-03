declare namespace NodeJS {
  interface ProcessEnv {
    TZ: string
    NODE_ENV: string
    PORT: string
    DATABASE_URL: string
    JWT_PUBLIC_KEY: string
  }
}
