export const validateString = (validatorOrString, string) => {
  if (!string) return validatorOrString || ''
  return validatorOrString ? string : ''
}

export const quickArray = (length, callback = i => i) =>
  Array(length).fill(0).map((_, i) => callback(i))