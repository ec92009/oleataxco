const DESTINATIONS = [
  "ec92009@gmail.com",
  "kellycohen11@gmail.com",
];

export default {
  async email(message) {
    await Promise.all(
      DESTINATIONS.map((destination) => message.forward(destination)),
    );
  },
};
