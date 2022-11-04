function checkPassword(value) {
    if (value.length > 25) {
        return {isError: true, errorText: "слишком длинный пароль пароль"};
    } else if (value.length < 6) {
        return {isError: true, errorText: "слишком короткий пароль пароль"}
    }
    return {isError: false, errorText: ""};
}

export {checkPassword}
