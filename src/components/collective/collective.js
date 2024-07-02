import { useContext, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import collaboratorData from '../../collaborators.json'
import { GlobalContext } from '../../contexts/contexts'
import teamMemberData from '../../contributors.json'
import { COLLECTIVE } from '../../data/translations'
import useLang from '../../hooks/useLang'
import Filter from '../common/filter'
import CollectiveMember from './collectiveMember'
import Committee from './committee'
import { CLS } from '../../constants/styleConstants'
import TableLabelHead from '../common/tableLabelHead'
import parserServices from '../../services/parserServices'
import TeamMember from './teamMember'


const Collective = () => {
  const location = useLocation()
  const { lang, translations } = useLang(COLLECTIVE)
  const { demands, members } = useContext(GlobalContext) ?? {}

  const [teamMemberFilters, setTeamMemberFilters] = useState({
    role: '', team: '', organization: ''
  })

  const sectionRefs = {
    'organizing-committee': useRef(null),
    'collaborators': useRef(null),
    'team-members': useRef(null)
  }

  console.log(members)
  // TODO: currently no way of setting hash
  useLayoutEffect(() => {
    const matchedRef = sectionRefs[location.hash.slice(1)]
    if (!matchedRef?.current) return
    window.scrollBy({
      top: matchedRef.current.getBoundingClientRect().top - 64,
      left: 0,
      behavior: 'smooth'
    })
  }, [location.hash])

  const getTeamMember = (member, i) => {
    const { role, team, organization } = teamMemberFilters
    const memberData = member[lang]

    if (
      (!role || role.toLocaleLowerCase() === memberData.role.toLocaleLowerCase()) &&
      (!team || team.toLocaleLowerCase() === memberData.team.toLocaleLowerCase()) &&
      (!organization || memberData.organization.find(org => org.toLocaleLowerCase()
        === organization.toLocaleLowerCase()))
    )
      return <CollectiveMember
        member={member}
        key={i} />
  }

  const getTeamMember2 = (memberData, i) => {
    const member = parserServices.parseMember(memberData, demands)
    const { role, team, orgName } = member

    return <TeamMember member={member} key={i} />
    // if (
    //   (!role || role.toLocaleLowerCase() === memberData.role.toLocaleLowerCase()) &&
    //   (!team || team.toLocaleLowerCase() === memberData.team.toLocaleLowerCase()) &&
    //   (!organization || memberData.organization.find(org => org.toLocaleLowerCase()
    //     === organization.toLocaleLowerCase()))
    // )
    //   return <CollectiveMember
    //     member={member}
    //     key={i} />
  }

  const handleFilterTeam = newFilter =>
    setTeamMemberFilters({ ...teamMemberFilters, ...newFilter })

  // TODO Link to pages.json
  return (
    members &&
    <>
      <br /><br />
      <h3
        ref={sectionRefs['organizing-committee']}
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
        ref={sectionRefs['collaborators']}
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
        ref={sectionRefs['team-members']}
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
        <tbody>{teamMemberData.map(getTeamMember)}</tbody>
      </table>
      {/* <table className={CLS.MEMBERS}>
        <TableLabelHead labels={['name', 'org', 'team', 'role']} />
        <tbody>{members.teamMembers.map(getTeamMember2)}</tbody>
      </table> */}
    </>
  )
}

export default Collective