
import parse, { domToReact } from 'html-react-parser'
import { titleCase } from 'title-case'
import Anchor from '../components/common/anchor'
import { ACTION_FIELDS, API_ENDPOINT, DEMAND_FIELDS, MEMBER_FIELDS } from '../constants/apiConstants'
import { linkIsExternal } from '../utils/urlUtils'
import he from 'he'


const replaceLink = src => `${API_ENDPOINT}/${src}`

const trimChildren = ({ children }) => {
  const isEmpty = children?.every(child =>
    (child.type === 'text' && !child.data.trim()) ||
    child.name === 'br'
  )

  return isEmpty ? [] : children
}

const getLink = html => {
  html = he.decode(html)
  const name = html.replaceAll(/\n/g, '').match(/.*(?=<a href=")/m)?.[0].trim()
  const link = html.match(/(?<=href=").*(?=")/)?.[0]
  return { name, link }
}

const parseAnchor = ({ attribs, children }) => {
  const { href } = attribs
  return (
    <Anchor to={linkIsExternal(href) ? replaceLink(href) : href}>
      {domToReact(children)}
    </Anchor>
  )
}

const parseMulti = ul => {
  const results = []
  let result
  const regExp = /<li>((.|\s)*?)<\/li>/mg
  while ((result = regExp.exec(ul)) !== null)
    results.push(result[1])
  return results
}

const basicParse = html => html ? parse(he.decode(html), {
  replace: domNode => {
    const { tagName } = domNode
    domNode.children = trimChildren(domNode)
    if (tagName === 'a') return parseAnchor(domNode)
  }
}) : undefined

const hasNoData = data => !data || !Object.keys(data).length
const parseDemand = demandData => {
  if (hasNoData(demandData)) return {}
  const { body, title } = demandData
  // const gallerySrcs = parseMulti(demandData[DEMAND_FIELDS.IMAGE_GALLERY])
  // const galleryAlts = parseMulti(demandData[DEMAND_FIELDS.IMAGE_GALLERY_2])
  // const galleryCaptions = parseMulti(demandData[DEMAND_FIELDS.IMAGE_GALLERY_3])

  const gallerySrcs = demandData[DEMAND_FIELDS.IMAGE_GALLERY].split('|')
  const galleryAlts = demandData[DEMAND_FIELDS.IMAGE_GALLERY_1].split('|')
  const galleryCaptions = demandData[DEMAND_FIELDS.IMAGE_GALLERY_2].split('|')


  const gallery = gallerySrcs.map((src, i) => ({
    src: replaceLink(src),
    alt: galleryAlts[i],
    caption: galleryCaptions[i]
  }))

  

  
  return {
    id: demandData[DEMAND_FIELDS.ID],
    body: basicParse(body),
    title: titleCase(title ?? ''),
    region: demandData[DEMAND_FIELDS.REGION],
    longSummary: demandData[DEMAND_FIELDS.LONG_SUMMARY],
    activist: basicParse(demandData[DEMAND_FIELDS.ACTIVIST]),
    architect: basicParse(demandData[DEMAND_FIELDS.ARCHITECT]),
    advocate: basicParse(demandData[DEMAND_FIELDS.ADVOCATE]),
    gallery,
    bannerSrc: replaceLink(demandData[DEMAND_FIELDS.BANNER]),
    bannerCaption: basicParse(demandData[DEMAND_FIELDS.BANNER_CAPTION]),
  }
}

const parseMember = (memberData, allDemands) => {
  if (hasNoData(memberData)) return {}
  const { body, title } = memberData
  
  const orgs = parseMulti(memberData.field_affiliate_organization).map(getLink)
  // console.log(orgs)
  return {
    name: title,
    bio: basicParse(body),
    link: getLink(memberData[MEMBER_FIELDS.ORG])?.link,
    orgs,
    team: allDemands?.[memberData[MEMBER_FIELDS.DEMAND]]?.title,
    teamId: allDemands?.[memberData[MEMBER_FIELDS.DEMAND]]?.field_demand_id,
    role: memberData.field_role
  }
}

const parseActions = actionData =>
  actionData.map(action => ({
    button: action.title.toLocaleUpperCase(),
    label: he.decode(action[ACTION_FIELDS.LABEL]),
    link: getLink(action[ACTION_FIELDS.LINK])?.link,
  }))


const parserServices = {
  parseDemand,
  parseMember,
  parseActions
}

export default parserServices