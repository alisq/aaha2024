import _ from 'lodash'
import { ACTION_FIELDS, API_ENDPOINT, API_LANGS, MEMBERS_SECTIONS, MEMBER_FIELDS } from '../constants/apiConstants'
import httpServices from './httpServices'
import { joinPaths } from '../utils/urlUtils'
import { quickArray } from '../utils/commonUtils'

const uniqEntry = entries => _.uniqBy(entries, 'nid')
const langPartition = data => _.partition(data, { langcode: API_LANGS.en })

const JSON_ENDPOINT = joinPaths(API_ENDPOINT, 'JSON')

const data = (async () => {
  const { data: demandData } = (await httpServices.get(joinPaths(JSON_ENDPOINT, 'demands')))
  const [demandsEn, demandsFr] = langPartition(demandData)

  const { data: memberData } = (await httpServices.get(joinPaths(JSON_ENDPOINT, 'members')))
  const membersEn = {
    orgs: [],
    committees: [],
    collaborators: [],
    teamMembers: [],
    uncategorized: []
  }
  const membersFr = _.cloneDeep(membersEn)

  memberData.forEach(entry => {
    const collectiveSection = entry[MEMBER_FIELDS.COLLECTIVE_SECTION].toLocaleLowerCase()
    const membersCollection = entry.langcode === API_LANGS.en ? membersEn : membersFr

    if (collectiveSection === MEMBERS_SECTIONS.COMMITTEE)
      return membersCollection.committees.push(entry)
    if (collectiveSection === MEMBERS_SECTIONS.COLLABORATORS)
      return membersCollection.collaborators.push(entry)
    if (collectiveSection === MEMBERS_SECTIONS.TEAM_MEMBERS)
      return membersCollection.teamMembers.push(entry)
    membersCollection.uncategorized.push(entry)
  })

  const { data: actionData } = (await httpServices.get(joinPaths(JSON_ENDPOINT, 'actions'))) // TODO
  const actionsEn = quickArray(uniqEntry(demandsEn).length)
  const actionsFr = _.cloneDeep(actionsEn)

  const { data: pageData } = (await httpServices.get(joinPaths(JSON_ENDPOINT, 'pages')))
  const [pagesEn, pagesFr] = langPartition(pageData)

  const { data: eventData } = (await httpServices.get(joinPaths(JSON_ENDPOINT, 'events')))
  const [eventsEn, eventsFr] = langPartition(eventData)
  console.log(eventsEn, eventsFr)

  uniqEntry(demandsEn).forEach(({ nid }, i) => {
    const demandActions = actionData.filter(action => action[ACTION_FIELDS.DEMAND] === nid)
    const actions = langPartition(demandActions)
    actionsEn[i] = actions[0]
    actionsFr[i] = actions[1]
  })

  return {
    en: {
      demands: uniqEntry(demandsEn),
      members: membersEn,
      actions: actionsEn,
      pages: pagesEn,
      events: eventsEn
    },
    fr: {
      demands: uniqEntry(demandsFr),
      members: membersFr,
      actions: actionsFr,
      pages: pagesFr,
      events: eventsFr
    }
  }
})()

const apiServices = {
  data
}

export default apiServices