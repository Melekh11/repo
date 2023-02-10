function checkAudienceNum (value: number) {
  if (value === 0) {
    return "маленькая аудитория";
  } else if (value < 0) {
    return "Должно быть больше нуля"
  }
}

export { checkAudienceNum }
