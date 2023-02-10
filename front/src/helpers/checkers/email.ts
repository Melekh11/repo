function checkEmail (value: string): string {
  if (/\w+@\w+\.\w+/.exec(value) === null) {
    return "Почта должна быть вида ***@***.***"
  // @ts-expect-error
  } else if ((/\w+@\w+\.\w+/.exec(value) != null) && /\w+@\w+\.\w+/.exec(value)[0] !== value) {
    return "Почта должна быть вида ***@***.***"
  } else {
    return ""
  }
}

export { checkEmail }
