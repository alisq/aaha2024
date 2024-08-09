import _ from 'lodash'
import { ACTION_FIELDS, API_ENDPOINT, API_LANGS, API_SUB_ENDPOINTS, MEMBERS_SECTIONS, MEMBER_FIELDS, PAGE_FIELDS } from '../constants/apiConstants'
import httpServices from './httpServices'
import { joinPaths } from '../utils/urlUtils'
import { mapObject } from '../utils/commonUtils'

const JSON_ENDPOINT = joinPaths(API_ENDPOINT, 'JSON')

const uniqEntry = entries => _.uniqWith(entries, (a, b) =>
  a.nid === b.nid && a.langcode === b.langcode)
const langPartition = data => _.partition(data, { langcode: API_LANGS.EN })

const fetchEndpoint = async endpoint => {
  const data = uniqEntry(
    (await httpServices.get(joinPaths(JSON_ENDPOINT, endpoint)))?.data)
  return langPartition(data)
}

const data = (async () => {
  const results = {}
  results.demands = await fetchEndpoint(API_SUB_ENDPOINTS.DEMANDS)

  const allMembersData = await fetchEndpoint(API_SUB_ENDPOINTS.MEMBERS)
  results.members = allMembersData.map(membersData => {
    const members = {
      orgs: [],
      committees: [],
      collaborators: [],
      teamMembers: [],
      uncategorized: []
    }

    membersData.forEach(entry => {
      const collectiveSection = entry[MEMBER_FIELDS.COLLECTIVE_SECTION].toLocaleLowerCase()
      if (collectiveSection === MEMBERS_SECTIONS.COMMITTEE)
        return members.committees.push(entry)
      if (collectiveSection === MEMBERS_SECTIONS.COLLABORATORS)
        return members.collaborators.push(entry)
      if (collectiveSection === MEMBERS_SECTIONS.TEAM_MEMBERS)
        return members.teamMembers.push(entry)
      members.uncategorized.push(entry)
    })

    return members
  })

  const actionsData = await fetchEndpoint(API_SUB_ENDPOINTS.ACTIONS)
  results.actions = _.zip(
    ...results.demands[0].reduce((prev, { nid }) => {
      prev.push(
        actionsData.map(action =>
          action.filter(action => action[ACTION_FIELDS.DEMAND] === nid)))
      return prev
    }, []))

  const orderPages = pages => pages.sort((a, b) =>
    parseInt(a[PAGE_FIELDS.WEIGHT]) - parseInt(b[PAGE_FIELDS.WEIGHT]))
  results.pages = (await fetchEndpoint(API_SUB_ENDPOINTS.PAGES))
    .map(page => orderPages(page))
  results.events = await fetchEndpoint(API_SUB_ENDPOINTS.EVENTS)
  results.press = await fetchEndpoint(API_SUB_ENDPOINTS.PRESS)

  const partionedResults = {};
  ['en', 'fr'].forEach((lang, i) =>
    partionedResults[lang] = mapObject(results, (_, data) => data[i]))
  return partionedResults
})()

const apiServices = {
  data
}

export default apiServices