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
    console.error(error);
  }
};

module.exports.recieveSMS = (req, res) => {
  // Sender's phone number
  const from_number = req.param("From");
  // Receiver's phone number - Plivo number
  const to_number = req.param("To");
  // The text which was received
  const text = req.param("Text");

  console.log(
    "From : " + from_number + " To : " + to_number + " Text : " + text
  );
};

module.exports.replySMS = (req, res) => {
  // Sender's phone number
  const from_number = req.param("From");
  // Receiver's phone number - Plivo number
  const to_number = req.param("To");
  // The text which was received
  const text = req.param("Text");

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
