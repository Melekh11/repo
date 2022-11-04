function checkDate(date) {
    if (!date) {
        return {isError: true, errorText: "пустое поле"};
    }

    const datePlan = new Date(date);
    const dateNow = new Date(Date.now());
    const dayNow = dateNow.getUTCFullYear() * 365 + dateNow.getMonth() * 30 + dateNow.getDate();
    const dayPlan = datePlan.getUTCFullYear() * 365 + datePlan.getMonth() * 30 + datePlan.getDate();

    if (dayPlan < dayNow) {
        return {isError: true, errorText: "вы уже пропустили своё мероприятие!"};
    } else if (dayPlan > dayNow + 31) {
        return {isError: true, errorText: "максимальная отсрочка мероприятия - месяц"};
    } return {isError: false, errorText: ""};
}

export {checkDate}
