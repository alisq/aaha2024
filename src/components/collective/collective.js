import { useContext, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import collaboratorData from '../../collaborators.json'
import committeeData from '../../committee.json'
import { GlobalContext } from '../../contexts/contexts'
import contributorData from '../../contributors.json'
import { COLLECTIVE } from '../../data/translations'
import useLang from '../../hooks/useLang'
import TableHeader from '../common/tableHead'
import Filter from '../common/filter'
import CollectiveMember from './collectiveMember'
import CollectiveCommittee from './collectiveCommittee'


const Collective = () => {
  const location = useLocation()
  const { lang, translations } = useLang(COLLECTIVE)
  const demands = useContext(GlobalContext)?.demands[lang]

  const [teamMemberFilters, setTeamMemberFilters] = useState({
    role: '', team: '', organization: ''
  })

  const sectionRefs = {
    'organizing-committee': useRef(null),
    'collaborators': useRef(null),
    'team-members': useRef(null)
  }

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

  const handleFilterTeam = newFilter =>
    setTeamMemberFilters({ ...teamMemberFilters, ...newFilter })

  return (
    <>
      <br /><br />
      <h3
        ref={sectionRefs['organizing-committee']}
        className='textCenter'>
        {translations.header}
      </h3>
      <table className='members'>
        <tbody>
          {committeeData.map((member, i) =>
            <CollectiveCommittee
              key={i}
              member={member} />)}
        </tbody>
      </table>
      <br /><br />
      <h3
        ref={sectionRefs['collaborators']}
        className='textCenter'>
        {translations.collaborator}
      </h3>
      <table className='members'>
        <thead>
          <tr>
            <td className='sidebearing'></td>
            <TableHeader name={translations.memberName} />
            <TableHeader name={translations.memberRole} />
            <TableHeader name={translations.memberBio} />
            <td className='sidebearing'></td>
          </tr>
        </thead>
        <tbody>
          {collaboratorData.map((member, i) => <CollectiveMember member={member} key={i} />)}
        </tbody>
      </table>
      <br /><br />
      <h3
        ref={sectionRefs['team-members']}
        className='textCenter'>
        {translations.members}
      </h3>
      <div className='text-center'>
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
      <table className='members'>
        <thead>
          <tr>
            <td className='sidebearing'></td>
            <TableHeader name={translations.memberName} />
            <TableHeader name={translations.memberOrg} />
            <TableHeader name={translations.team} />
            <TableHeader name={translations.memberRole} />
            <td className='sidebearing'></td>
          </tr>
        </thead>
        <tbody>{contributorData.map(getTeamMember)}</tbody>
      </table>
    </>
  )
}

export default Collective