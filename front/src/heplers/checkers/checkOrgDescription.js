function checkOrgDescription(value) {
    if (value.length < 30) {
        return {isError: true, errorText: "слишком маленькое описание"};
    } else if (value.length > 200) {
        return {isError: true, errorText: "слишком длинное описание"};
    } return {isError: false, errorText: ""};
}

export {checkOrgDescription}
