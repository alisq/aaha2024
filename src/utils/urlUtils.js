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

export const updateUrl = (location, newUrlParts) =>
  partsToUrl({ ...getUrlParts(location), ...newUrlParts })


export const linkIsExternal = to => typeof to === 'string' && to.match(/^(https|www)/)
