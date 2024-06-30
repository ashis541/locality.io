class apiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400; // getting greater than 400 the error will send through api_error_handler
  }
}

export { apiResponse };
