function checkName(value) {
    if (value.length > 20) {
        return {isError: true, errorText: "слишком длинный логин"}
    } else if (/[^[\wа-яА-ЯеЕ]/.test(value)){
        return {isError: true, errorText: "недопустимые спец символы"}
    } else if (value === "") {
        return {isError: true, errorText: "пустое поле"}
    } else if (!/^[A-ZА-Я][a-zа-яё]+/.exec(value)){
        return {isError: true, errorText: "только первая буква заглавная"}
    } else if (/^[A-ZА-Я][a-zа-яё]+/.exec(value)[0] !== value) {
        return {isError: true, errorText: "только первая буква заглавная"}
    } else {
        return {isError: false, errorText: ""}
    }
}

export {checkName}
