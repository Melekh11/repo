function checkName (value: string): string {
  if (!value) {
    return 'Обязатльное поле';
  } else if (value.length > 20) {
    return "Cлишком длинный"
  } else if (/[^[\wа-яА-ЯеЕ]/.test(value)) {
    return "Недопустимые спец символы"
  } else if (/^[A-ZА-Я][a-zа-яё]+/.exec(value) == null) {
    return "Только первая буква заглавная"
  // @ts-expect-error
  } else if (/^[A-ZА-Я][a-zа-яё]+/.exec(value)?.length && /^[A-ZА-Я][a-zа-яё]+/.exec(value)[0] !== value) {
    return "Только первая буква заглавная"
  } else {
    return "";
  }
}

export { checkName }
