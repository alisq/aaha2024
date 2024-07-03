import { useContext, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import collaboratorData from '../../collaborators.json'
import { GlobalContext } from '../../contexts/contexts'
import { COLLECTIVE } from '../../data/translations'
import useLang from '../../hooks/useLang'
import Filter from '../common/filter'
import CollectiveMember from './collectiveMember'
import Committee from './committee'
import { CLS } from '../../constants/styleConstants'
import TableLabelHead from '../common/tableLabelHead'
import parserServices from '../../services/parserServices'
import TeamMember from './teamMember'


//  TODO
const ORGANIZING_COMMITTEE = 'collective__organizing-committee'
const COLLABORATORS = 'collective__collaborators'
const TEAM_MEMBERS = 'collective__team-members'

const Collective = () => {
  const location = useLocation()
  const { translations } = useLang(COLLECTIVE)
  const { demands, members } = useContext(GlobalContext) ?? {}

  const [teamMemberFilters, setTeamMemberFilters] = useState({
    role: '', team: '', organization: ''
  })

  const sectionRefs = {
    [ORGANIZING_COMMITTEE]: useRef(null),
    [COLLABORATORS]: useRef(null),
    [TEAM_MEMBERS]: useRef(null)
  }


  // TODO: currently no way of setting hash
  useLayoutEffect(() => {
    const matchedRef = sectionRefs[location.hash.slice(1)]
    if (!matchedRef?.current) return
    window.scrollBy({
      top: matchedRef.current.getBoundingClientRect().top - 60,
      left: 0,
      behavior: 'smooth'
    })
  }, [location.hash])

  const getTeamMember = (memberData, i) => {
    const member = parserServices.parseMember(memberData, demands)
    const { role, team, organization } = teamMemberFilters

    if (
      (!role || role.toLocaleLowerCase() === member.role.toLocaleLowerCase()) &&
      (!team || team.toLocaleLowerCase() === member.team?.toLocaleLowerCase()) &&
      (!organization || member.orgs.find(org => org.name.toLocaleLowerCase()
        === organization.toLocaleLowerCase()))
    )
      return <TeamMember memberData={memberData} key={i} />
  }

  const handleFilterTeam = newFilter =>
    setTeamMemberFilters({ ...teamMemberFilters, ...newFilter })

  return (
    members &&
    <>
      <br /><br />
      <h3
        ref={sectionRefs[ORGANIZING_COMMITTEE]}
        className={CLS.TEXT_CENTER}>
        {translations.header}
      </h3>
      <table className={CLS.MEMBERS}>
        <tbody>
          {members.committees.map((data, i) =>
            <Committee key={i} data={data} />)}
        </tbody>
      </table>
      <br /><br />
      <h3
        ref={sectionRefs[COLLABORATORS]}
        className={CLS.TEXT_CENTER}>
        {translations.collaborator}
      </h3>
      <table className={CLS.MEMBERS}>
        <TableLabelHead labels={['name', 'role', 'bio']} />
        <tbody>
          {collaboratorData.map((member, i) => <CollectiveMember member={member} key={i} />)}
        </tbody>
      </table>
      <br /><br />
      <h3
        ref={sectionRefs[TEAM_MEMBERS]}
        className={CLS.TEXT_CENTER}>
        {translations.members}
      </h3>
      <div className={CLS.TEXT_CENTER}>
        <Filter
          name='team-members-role'
          placeholder={translations.memberRole}
          list={translations.memberList}
          handleFilter={({ target }) => handleFilterTeam({ role: target.value })} />
        <Filter
          name='team-members-team'
          placeholder={translations.team}
          list={demands?.map(({ title }) => title)}
          handleFilter={({ target }) => handleFilterTeam({ team: target.value })} />
      </div>
      <table className={CLS.MEMBERS}>
        <TableLabelHead labels={['name', 'org', 'team', 'role']} />
        <tbody>{members.teamMembers.map(getTeamMember)}</tbody>
      </table>
    </>
  )
}

export default Collective