function checkLogin(value){
    if (value.length > 15){
        return {isError: true, errorText: "слишком длинный логин"};
    } else if (value.length < 3) {
        return {isError: true, errorText: "слишком короткий логин"};
    } else if (/[^[\wа-яА-ЯёЁ]/.test(value)){
        return {isError: true, errorText: "недопустимые спец символы"};
    } else {
        return {isError: false, errorText: ""};
    }
}

export {checkLogin}
