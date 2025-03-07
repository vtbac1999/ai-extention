export const HOST_NAME = process.env.HOST_NAME;
export const NODE_ENV = process.env.NODE_ENV;
export const APP_URL = `${NODE_ENV === "development" ? "http" : "https"}://${HOST_NAME}`;
