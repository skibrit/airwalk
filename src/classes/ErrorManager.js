class ErrorManager {
  decodeError(error) {
    const defaultMsg = "Something went wrong on the server. Try again later";
    try {
      if (
        typeof error.getMessages === "function" &&
        error.getMessages() &&
        error.getMessages().getMessage()[0] &&
        error.getMessages().getMessage()[0].getText()
      ) {
        return error.getMessages().getMessage()[0].getText();
      } else if (error.status_description) {
        return error.status_description;
      } else if (error.message) {
        return error.message;
      } else if (error) {
        return error.toString();
      } else {
        return defaultMsg;
      }
    } catch (e) {
      console.log(e);
      return defaultMsg;
    }
  }
}
const Instance = new ErrorManager();
module.exports = Instance;
