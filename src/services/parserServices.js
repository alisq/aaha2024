
import he from 'he'
import parse, { domToReact } from 'html-react-parser'
import { titleCase } from 'title-case'
import Anchor from '../components/common/anchor'
import Canada from '../components/common/canada'
import { ACTION_FIELDS, API_ENDPOINT, DEMAND_FIELDS, MEMBER_FIELDS } from '../constants/apiConstants'


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
  const text = html
    //.replaceAll(/\n/g, '')
    .match(/(?<=>).+?(?=<\/a>)/m)?.[0].trim()
  return {
    name: basicParse(name),
    link,
    text
  } // TODO
}

const parseAnchor = domNode => {
  const { attribs, children } = domNode
  const { href } = attribs
  return (
    <Anchor to={href}>
      {domToReact(children, getBasicConfig())}
    </Anchor>
  )
}

const parseMulti = (ul, shouldParse) => {
  const results = []
  let result
  const regExp = /<li>((.|\s)*?)<\/li>/mg
  while ((result = regExp.exec(ul)) !== null)
    results.push(result[1])
  if (shouldParse) return results.map(result => basicParse(result))
  return results
}

const getBasicConfig = isPage => ({
  replace: domNode => {
    const { tagName } = domNode
    domNode.children = trimChildren(domNode)

    if (domNode.tagName === 'canada') return <Canada />
    if (domNode.type === 'text')
      domNode.data = domNode.data
        .replaceAll(/!!!/g, '\u0778')

    if (tagName === 'a') return parseAnchor(domNode)
    if (isPage && tagName === 'h2')
      return (
        <h3 className='big-title'>
          {domToReact(domNode.children, getBasicConfig(isPage))}
        </h3>
      )
  }
})

const basicParse = (html, { isPage } = {}) => !html ? undefined :
  parse(he.decode(html).replaceAll(/c\\a\\n\\a\\d\\a/g, '<canada></canada>'), getBasicConfig(isPage))

const hasNoData = data => !data || !Object.keys(data).length
const parseDemand = demandData => {
  if (hasNoData(demandData)) return {}
  const { body, title } = demandData
  const gallerySrcs = parseMulti(demandData[DEMAND_FIELDS.IMAGE_GALLERY])
  const galleryAlts = parseMulti(demandData[DEMAND_FIELDS.IMAGE_GALLERY_1], true)
  const galleryCaptions = parseMulti(demandData[DEMAND_FIELDS.IMAGE_GALLERY_2], true)

  const gallery = gallerySrcs.map((src, i) => ({
    src: replaceLink(src),
    alt: galleryAlts[i],
    caption: galleryCaptions[i]
  }))


  return {
    id: demandData[DEMAND_FIELDS.ID],
    body: basicParse(body),
    title: titleCase(title ?? ''),
    region: basicParse(demandData[DEMAND_FIELDS.REGION]),
    longSummary: basicParse(demandData[DEMAND_FIELDS.LONG_SUMMARY]),
    activist: basicParse(demandData[DEMAND_FIELDS.ACTIVIST]),
    architect: basicParse(demandData[DEMAND_FIELDS.ARCHITECT]),
    advocate: basicParse(demandData[DEMAND_FIELDS.ADVOCATE]),
    gallery,
    bannerSrc: replaceLink(demandData[DEMAND_FIELDS.BANNER]),
    bannerCaption: basicParse(demandData[DEMAND_FIELDS.BANNER_CAPTION]),
  }
}

const parsePage = pageData => {
  if (hasNoData(pageData)) return {}
  // console.log(pageData)
  const { title } = pageData
  // const body = pageData.body.replaceAll(
  //   /iframe src=&quot;<a href=\\?".*?<\/a>;/gm,
  //   text => `iframe src='${getLink(text).link.replace(/&quot$/, '')}'`
  // )
  let body = pageData.body
    // .replaceAll(/&quot;/g, '\'')
    .replaceAll(
      /&quot;<a\s*?href=".+?">.+?<\/a>;/gm,
      text => {
        text = text.replaceAll(/"/g, '\'')
        const result = `'${getLink(text).text.replace(/&quot$/, '')}'`
        return result
      }
    )

  return {
    title: basicParse(title).toLocaleUpperCase(),
    body: basicParse(body, { isPage: true }),
  }
}

const parseActions = actionData =>
  actionData.map(action => ({
    button: basicParse(action.title).toLocaleUpperCase(),
    label: he.decode(action[ACTION_FIELDS.LABEL]),
    link: getLink(action[ACTION_FIELDS.LINK])?.link,
  }))


const parseMember = (memberData, allDemands) => {
  if (hasNoData(memberData)) return {}
  const { body, title } = memberData

  const orgs = parseMulti(memberData.field_affiliate_organization).map(getLink)

  return {
    name: basicParse(title),
    bio: basicParse(body),
    link: getLink(memberData[MEMBER_FIELDS.ORG])?.link,
    orgs,
    team: basicParse(allDemands?.[memberData[MEMBER_FIELDS.DEMAND]]?.title),
    teamId: basicParse(allDemands?.[memberData[MEMBER_FIELDS.DEMAND]]?.field_demand_id),
    role: basicParse(memberData.field_role)
  }
}


const parseEvents = eventData =>
  eventData.map(event => {
    return {
      title: basicParse(event.title),
      img: event.field_image && replaceLink(event.field_image),
      body: basicParse(event.body),
      link: basicParse(event.field_event_link),
      date: basicParse(event.field_event_date),
      locale: basicParse(event.field_locale),
      demands: parseMulti(event.field_demand).map(demand => getLink(demand)?.text)
    }
  })

const parsePress = pressData =>
  pressData.map(press => {
    return {
      title: basicParse(press.title),
      img: press.field_image && replaceLink(press.field_image),
      body: basicParse(press.body),
      link: basicParse(press.field_press_item_link),
      date: basicParse(press.field_date),
      outlet: basicParse(press.field_outlet),
      isHighlighted: press.field_highlighted === 'Highlighted'
    }
  })

const parserServices = {
  basicParse,
  parseDemand,
  parsePage,
  parseActions,
  parseMember,
  parseEvents,
  parsePress
}

export default parserServices