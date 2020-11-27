const routes = require("express").Router();
const plivoClient = require("../sms_service/plivoClient");

routes.post("/send-message", plivoClient.sendMessage);
routes.post("/recieve-sms", plivoClient.recieveSMS);
routes.post("/reply-sms", plivoClient.replySMS);
routes.post("/send-sms-with-callback", plivoClient.sendMessageWithCallback);

module.exports = routes;