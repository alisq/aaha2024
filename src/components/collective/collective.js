import { useContext, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { CLS } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/contexts'
import { COLLECTIVE } from '../../data/translations'
import useLang from '../../hooks/useLang'
import parserServices from '../../services/parserServices'
import CollectiveMember from './collectiveMemberRow'
import CollectiveTable from './collectiveTable'
import CommitteeRowMember from './committeeMemberRow'
import TeamMemberRow from './teamMemberRow'


const ORGANIZING_COMMITTEE = 'collective-organizing-committee'
const COLLABORATORS = 'collective-collaborators'
const TEAM_MEMBERS = 'collective-team-members'
const STUDENT_ACTIVISTS = 'collective-student-activist'

const ROLE_FILTER = 'team-members-role'
const TEAM_FILTER = 'team-members-team'

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
      name: ROLE_FILTER,
      placeholder: translations.memberRole,
      list: translations.memberList
    },
    {
      name: TEAM_FILTER,
      placeholder: translations.team,
      list: demands?.map(({ title }) => title)
    }
  ]
  const getTeamMembers = filters => members.teamMembers
    .filter(member => {
      member = parserServices.parseMember(member, demands)
      const role = filters[ROLE_FILTER]
      const team = filters[TEAM_FILTER]
      return (!role || role.toLocaleLowerCase() === member.role.toLocaleLowerCase()) &&
        (!team || team.toLocaleLowerCase() === member.team?.toLocaleLowerCase())
    })
    .map((member, i) => <TeamMemberRow memberData={member} key={i} />)

  return (
    members &&
    <>
      <CollectiveTable
        ref={sectionRefs[ORGANIZING_COMMITTEE]}
        className={CLS.COMMITTEE_TABLE}
        header={translations.header}
        rows={members.committees.map((data, i) =>
          <CommitteeRowMember key={i} data={data} />)} />
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