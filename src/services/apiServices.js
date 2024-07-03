import _ from 'lodash'
import { API_ENDPOINT, API_LANGS, MEMBERS_SECTIONS, MEMBER_FIELDS } from '../constants/apiConstants'
import httpServices from './httpServices'
import { joinPaths } from '../utils/urlUtils'

const uniqDemand = demands => _.uniqBy(demands, 'nid')

const JSON_ENDPOINT = joinPaths(API_ENDPOINT, 'JSON')

const data = (async () => {
  const { data: demandData } = (await httpServices.get(joinPaths(JSON_ENDPOINT, 'demands')))
  const demands = _.partition(demandData, { langcode: API_LANGS.en })

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

  return {
    en: {
      demands: uniqDemand(demands[0]),
      members: membersEn
    },
    fr: {
      demands: uniqDemand(demands[1]),
      members: membersFr
    }
  }
})()

const apiServices = {
  data
}

export default apiServices