function checkDeltaTime (value: number) {
  if (value > 31) {
    return "Заявка не может храниться больше месяца";
  } else if (!value) {
    return "пустое поле"
  }
}

export { checkDeltaTime }
