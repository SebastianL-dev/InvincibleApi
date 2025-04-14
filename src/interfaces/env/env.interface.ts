/**
 * Enviroment variables required by the application.
 *
 * @interface Enviroment
 */
export default interface Environment {
  MONGO_URI: string;
  PORT: string;
  REDIS_URL: string;
}

/**
 * Parsed environment variables required by the application.
 *
 * @interface EnvironmentParsed
 */
export interface EnvironmentParsed {
  mongo_uri: string;
  port: string;
  redis_url: string;
}
