function checkDescription (value: string) {
  if (value.length < 30) {
    return "слишком маленькое описание";
  } else if (value.length > 200) {
    return "слишком длинное описание";
  }
}

export { checkDescription }
