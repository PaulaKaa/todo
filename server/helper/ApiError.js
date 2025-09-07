//Class will extend basic Error class and implement constructor which accepts error message and (HTTP) status code.

class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
export { ApiError }