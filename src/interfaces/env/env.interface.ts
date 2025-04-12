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

export interface EnvironmentParsed {
  mongo_uri: string;
  port: string;
  redis_url: string;
}
