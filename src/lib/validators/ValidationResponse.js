class ValidationResponse {

	 static success(message = "") {
		return new ValidationResponse(true, message);
	}

	 static error(message) {
		return new ValidationResponse(false, message);
	}


	constructor(success, message) {
		this.success = success;
		this.message = message;
	}
}
export default ValidationResponse;
