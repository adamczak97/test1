
var express = require('express')
var cors = require('cors')
var app = express()
const Joi = require('joi');

const axios = require('axios');
const { default: expectCt } = require("helmet/dist/middlewares/expect-ct");
const BASE_URL = "http://localhost:3000";
axios.defaults.baseURL = BASE_URL;
const PATHS = {
  INFO: "/info",
  HELLO: "/hello",
  STORE: "/store",
  LOGIN: "/login",
  PROFILE: "/profile",
};
// 1
test ('/info - positive response test', async() => {
  const response = await axios.get(PATHS.INFO);
  expect(response.status).toEqual(200);
  expect(response.data).toEqual({'24346':1});
});


// 2
test("/hello - positive response test", async () => {
  const response = await axios.get(PATHS.HELLO + "/Lukasz");
  expect(response.status).toEqual(200);
  expect(response.data).toEqual("Hello Lukasz");
});

// 3
test("/hello - negative name", async () => {
  const response = await axios.get(PATHS.HELLO + "/Lukasz ");
  expect(response.status).toEqual(200);
  expect(response.data).toEqual("Hello Lukasz");
});

// 4
test("/hello - negative -> too long", async () => {
  const response = await axios.get(PATHS.HELLO + "/Luuuuuukasz");
  expect(response.status).toEqual(200);
  expect(response.data).toEqual("Hello Lukasz");
});
