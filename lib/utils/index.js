// Error handler
export const handleError = (error) => {
	if (error instanceof Error) {
		// This is a native JavaScript error
		console.error(error.message)
		throw new Error(`Error: ${error.message}`)
	} else if (typeof error === 'string') {
		// This is a string error message
		console.error(error)
		throw new Error(`Error: ${error}`)
	} else {
		// This is an unknown type of error
		console.error(error)
		throw new Error(`Unknown error: ${JSON.stringify(error)}`)
	}
}

export const upperCaseWord = (name, isTotal = false) => {
	if (!name) return ''

	if (isTotal) {
		return (
			name.toUpperCase()
		)
	} else {
		return (
			name.charAt(0).toUpperCase() + name.slice(1)
		)
	}

}