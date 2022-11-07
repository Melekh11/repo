function checkDeltaTime(value){
        if (value > 31) {
            return {isError: true, errorText: "заявка не может храниться больше месяца"};
        } else if (!value){
            return {isError: true, errorText: "пустое поле"}
        }
        return {isError: false, errorText: ""};
}

export {checkDeltaTime}
