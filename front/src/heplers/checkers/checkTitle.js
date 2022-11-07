function checkTitle(value) {
    console.log(value);
    if (value.length > 30) {
        return {isError: true, errorText: "слишком длинное название"};
    } else if (!value){
        return {isError: true, errorText: "пустое поле"}
    }
    return {isError: false, errorText: ""};
}

export {checkTitle}
