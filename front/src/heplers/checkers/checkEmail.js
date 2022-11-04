function checkEmail(value){
    if (/\w+@\w+\.\w+/.exec(value) === null){
        return {isError: true, errorText: "почта должна быть вида ***@***.***"}
    } else if (/\w+@\w+\.\w+/.exec(value) && /\w+@\w+\.\w+/.exec(value)[0] !== value){
        return {isError: true, errorText: "почта должна быть вида ***@***.***"}
    } else {
        return {isError: false, errorText: ""}
    }
}

export {checkEmail}
