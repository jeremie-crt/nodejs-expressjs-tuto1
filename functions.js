exports.success = function(result) {
    return {
        status: 'Success',
        result: result
    }
}

exports.error = function(message) {
    return {
        status: 'Error',
        message: message
    }
}
