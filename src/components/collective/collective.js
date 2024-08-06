import { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import collaboratorData from '../../collaborators.json'
import { CLS } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/contexts'
import { COLLECTIVE } from '../../data/translations'
import useLang from '../../hooks/useLang'
import parserServices from '../../services/parserServices'
import CollectiveMember from './collectiveMember'
import CollectiveTable from './collectiveTable'
import CommitteeRow from './committeeRow'
import TeamMember from './teamMember'


//  TODO
const ORGANIZING_COMMITTEE = 'collective__organizing-committee'
const COLLABORATORS = 'collective__collaborators'
const TEAM_MEMBERS = 'collective__team-members'
const STUDENT_ACTIVISTS = 'collective__student-activist'

const Collective = () => {
  const location = useLocation()
  const { translations } = useLang(COLLECTIVE)
  const { demands, members } = useContext(GlobalContext) ?? {}

  const sectionRefs = {
    [ORGANIZING_COMMITTEE]: useRef(null),
    [COLLABORATORS]: useRef(null),
    [TEAM_MEMBERS]: useRef(null),
    [STUDENT_ACTIVISTS]: useRef(null)
  }

  useLayoutEffect(() => {
    const matchedRef = sectionRefs[location.hash.slice(1)]
    if (!matchedRef?.current) return
    window.scrollBy({
      top: matchedRef.current.getBoundingClientRect().top - 60,
      left: 0,
      behavior: 'smooth'
    })
  }, [location.hash])

  const teamFilters = [
    {
      name: 'team-members-role',
      placeholder: translations.memberRole,
      list: translations.memberList
    },
    {
      name: 'team-members-team',
      placeholder: translations.team,
      list: demands?.map(({ title }) => title)
    }
  ]
  const getTeamMembers = filters => members.teamMembers
    .filter(member => {
      member = parserServices.parseMember(member, demands)
      const role = filters['team-members-role']
      const team = filters['team-members-team']
      return (!role || role.toLocaleLowerCase() === member.role.toLocaleLowerCase()) &&
        (!team || team.toLocaleLowerCase() === member.team?.toLocaleLowerCase())
    })
    .map((member, i) => <TeamMember memberData={member} key={i} />)

  useEffect(() => console.log(members), [])
  return (
    members &&
    <>
      <CollectiveTable
        ref={sectionRefs[ORGANIZING_COMMITTEE]}
        className={CLS.COMMITTEE_TABLE}
        header={translations.header}
        rows={members.committees.map((data, i) =>
          <CommitteeRow key={i} data={data} />)} />
      <CollectiveTable
        ref={sectionRefs[COLLABORATORS]}
        className={CLS.COLLECTIVE_MEMBER_TABLE}
        header={translations.collaborator}
        labels={['name', 'role', 'bio']}
        rows={members.collaborators.map((data, i) =>
          <CollectiveMember data={data} key={i} />)} />
      <CollectiveTable
        ref={sectionRefs[TEAM_MEMBERS]}
        className={CLS.COLLECTIVE_MEMBER_TABLE}
        header={translations.members}
        labels={['name', 'org', 'team', 'role']}
        filters={teamFilters}
        rows={getTeamMembers} />
    </>
  )
}

export default Collective