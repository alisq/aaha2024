
import parse, { domToReact } from 'html-react-parser'
import { titleCase } from 'title-case'
import { API_ENDPOINT } from '../constants/constants'
import Action from '../components/parsedAction'
import { Link } from 'react-router-dom'
import { validateString } from '../utils/commonUtils'

const replaceLink = src => `${API_ENDPOINT}/${src}`
const linkIsExternal = to => typeof to === 'string' && to.match(/^(https|www)/)

const parseAnchor = ({ attribs, children }) => {
  const { href } = attribs
  const isExternal = linkIsExternal(href)
  return (
    <Link
      to={isExternal ? replaceLink(href) : href}
      target={validateString(isExternal, '_blank')}>
      {domToReact(children)}
    </Link>
  )

}

const basicParse = html => parse(html, {
  replace: domNode => {
    const { tagName } = domNode
    if (tagName === 'a') return parseAnchor(domNode)
  }
})


const parseDemand = demandData => {
  if (!demandData) return {}
  const {
    body,
    title,
    field_region,
    field_long_summary,
    field_activist,
    field_architect,
    field_advocate,
    field_image_gallery,
    field_banner,
    field_banner_1,
    field_actions,
  } = demandData
  return {
    body: basicParse(body),
    title: titleCase(title),
    region: basicParse(field_region),
    longSummary: field_long_summary,
    activist: basicParse(field_activist),
    architect: basicParse(field_architect),
    advocate: basicParse(field_advocate),
    // gallerySrc: replaceLink(field_image_gallery),
    bannerSrc: replaceLink(field_banner),
    bannerCaption: field_banner_1,
    actions: basicParse(field_actions, domNode => {
      const { tagName, children } = domNode
      if (tagName === 'p')
        return <Action>{domToReact(children)}</Action>
      if (tagName === 'a') return parseAnchor(domNode)
    })
  }
}

const parserServices = {
  parseDemand
}

export default parserServices