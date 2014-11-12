function validateExists(value, name) {
	if(!value) {
		throw new Error(name + " must exist")
	}
}