export default interface HttpError extends Error {
  status: number;
}
