function checkPassword (value: string): string {
  if (value.length > 25) {
    return 'Cлишком длинный';
  } else if (value.length < 6) {
    return 'Cлишком короткий';
  }
  return '';
}

export { checkPassword }
