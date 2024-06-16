
import parse, { domToReact } from 'html-react-parser'
import { titleCase } from 'title-case'
import { API_ENDPOINT } from '../constants/apiConstants'
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

const parseMulti = ul => {
  const results = []
  let result
  const regExp = /<li>(.*?)<\/li>/g
  while ((result = regExp.exec(ul)) !== null)
    results.push(result[1])
  return results
}


const basicParse = html => html ? parse(html, {
  replace: domNode => {
    const { tagName } = domNode
    if (tagName === 'a') return parseAnchor(domNode)
  }
}) : undefined


const parseDemand = demandData => {
  if (!demandData) return {}
  const {
    field_demand_id,
    body,
    title,
    field_region,
    field_long_summary,
    field_activist,
    field_architect,
    field_advocate,
    field_image_gallery_1,
    field_image_gallery_2,
    field_image_gallery_3,
    field_banner,
    field_banner_1,
    field_actions,
  } = demandData
  const gallerySrcs = parseMulti(field_image_gallery_1)
  const galleryAlts = parseMulti(field_image_gallery_2)
  const galleryCaptions = parseMulti(field_image_gallery_3)

  const gallery = gallerySrcs.map((src, i) => ({
    src: replaceLink(src),
    alt: galleryAlts[i],
    caption: galleryCaptions[i]
  }))

  return {
    id: field_demand_id,
    body: basicParse(body),
    title: titleCase(title),
    region: basicParse(field_region),
    longSummary: field_long_summary,
    activist: basicParse(field_activist),
    architect: basicParse(field_architect),
    advocate: basicParse(field_advocate),
    gallery,
    bannerSrc: replaceLink(field_banner),
    bannerCaption: field_banner_1,
    actions: basicParse(field_actions, domNode => {
      const { tagName, children } = domNode
      if (tagName === 'p')
        return <li>{domToReact(children)}</li>
      if (tagName === 'a') return parseAnchor(domNode)
    })
  }
}

const parserServices = {
  parseDemand
}

export default parserServices