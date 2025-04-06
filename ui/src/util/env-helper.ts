const BASE_URL = import.meta.env.VITE_APP_BASE_URL!
const ENVIRONMENT = import.meta.env.VITE_APP_ENVIRONMENT!

const isDevelopment = ENVIRONMENT == 'development'
const isProduction = ENVIRONMENT == 'production'

export { BASE_URL, isDevelopment, isProduction }