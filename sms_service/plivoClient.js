const plivo = require("plivo");
const plivoClient = new plivo.Client(
  `${process.env.AUTH_ID}`,
  `${process.env.AUTH_TOKEN}`
);

module.exports.sendMessage = async (req, res) => {
  try {
    const { src, dst, text } = req.body;
    const response = await plivoClient.messages.create(src, dst, text);
    res.send({ response: response });
  } catch (error) {
    res.send({ response: new Error(error).message });
  }
};

module.exports.recieveSMS = (req, res) => {
  // Sender's phone number
  const from_number = req.body.From || req.query.From;
  // Receiver's phone number - Plivo number
  const to_number = req.body.To || req.query.To;
  // The text which was received
  const text = req.body.Text || req.query.Text;
  //Message UUID
  const uuid = req.body.MessageUUID || req.query.MessageUUID;
  //Prints the message
  const Status = req.body.Status || req.query.Status;
  console.log('Message received - From: ' + from_number + ', To: ' + to_number + ', Status: ' + Status + ', MessageUUID: ' + uuid);

  console.log('Delivery status reported');
};

module.exports.replySMS = (req, res) => {
  // Sender's phone number
  const from_number = req.param("From");
  // Receiver's phone number - Plivo number
  const to_number = req.param("To");
  // The text which was received
  const text = req.param("status");

  console.log(
    "From : " + from_number + " To : " + to_number + " Text : " + text
  );

  const response = plivo.Response();

  const params = {
    src: to_number, // Sender's phone number
    dst: from_number // Receiver's phone Number
  };

  response.addMessage("Thank you for your message", params);
  response.set({
    "Content-Type": "application/json"
  });
  response.end(response.toJSON());
};

module.exports.sendMessageWithCallback = async (req, res) => {
  try {
    const { src, dst, text, url } = req.body;
    const response = await plivoClient.messages.create(src, dst, text, url);
    res.send({ response: response });
  } catch (error) {
    res.send({ response: new Error(error).message });
  }
}
