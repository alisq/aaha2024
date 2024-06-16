import { validateString } from './commonUtils'

export const joinPaths = (...parts) => parts.filter(p => p).join('/')

export const getUrlParts = location => {
  const [, lang, category, content] = location.pathname.split('/')
  return { lang, category, content }
}

export const partsToUrl = ({ lang, category, content }) => joinPaths(
  `/${lang}`,
  validateString(
    category && content,
    joinPaths(category, content)
  )
)

export const updateUrl = (location, type, value) => {
  const urlParts = getUrlParts(location)
  if (type === 'lang') urlParts.lang = value
  if (type === 'content') urlParts.content = value
  return partsToUrl(urlParts)
}

export const linkIsExternal = to => typeof to === 'string' && to.match(/^(https|www)/)

