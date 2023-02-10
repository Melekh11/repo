function checkLogin (value: string): string {
  if (value.length > 15) {
    return "Слишком длинный";
  } else if (value.length < 3) {
    return "Cлишком короткий";
  } else if (/[^[\wа-яА-ЯёЁ]/.test(value)) {
    return 'Недопустимые спец символы';
  }
  return '';
}

export { checkLogin }
