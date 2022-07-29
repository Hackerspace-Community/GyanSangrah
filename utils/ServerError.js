/**
 * @description - Custom error built to handle server errors.
 */
class ServerError extends Error {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ServerError;