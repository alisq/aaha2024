export const validateString = (validatorOrString, string) => {
  if (!string) return validatorOrString || ''
  return validatorOrString ? string : ''
}

export const mapObject = (
  object,
  callback
) => {
  const newObject = {}
  Object.keys(object).forEach(key => {
    const value = object[key]
    newObject[key] = callback(key, value)
  })

  return newObject
}

export const addColons = ([en, fr]) => [`${en}:`, `${fr} :`]

export const quickArray = (length, callback = i => i) =>
  Array(length).fill(0).map((_, i) => callback(i))

export const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })