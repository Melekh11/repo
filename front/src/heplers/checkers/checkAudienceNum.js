function checkAudienceNum(value){
    if (value === ""){
        return {isError: true, errorText: "пустое поле"}
    }
    value = parseInt(value);
    if (value < 0){
        console.log(value);
        return {isError: true, errorText: "должны быть больше нуля"}
    } else if (value === 0){
        return {isError: true, errorText: ":'("}
    } return {isError: false, errorText: ""}
}

export {checkAudienceNum}
