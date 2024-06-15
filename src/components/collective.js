import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import collaboratorData from '../collaborators.json'
import committeeData from '../committee.json'
import contributorData from '../contributors.json'
import demandData from '../demands.json'
import useIsEn from '../hooks/useIsEn'
import useLang from '../hooks/useLang'
import Filter from './filter'
import Member from './member'
import MemberCommittee from './memberCommittee'


const Collective = () => {
  const location = useLocation()
  const lang = useLang()
  const isEn = useIsEn()
  const [teamMemberFilters, setTeamMemberFilters] = useState({ role: '', team: '', organization: '' })

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
      return <Member
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
        {isEn ? 'ORGANIZING COMMITTEE' : 'COMITÉ ORGANISATEUR'}
      </h3>
      <table className='members'>
        <tbody>
          {committeeData.map((member, i) =>
            <MemberCommittee
              key={i}
              member={member} />)}
        </tbody>
      </table>
      <br /><br />
      <h3
        ref={sectionRefs['collaborators']}
        className='textCenter'>
        {isEn ? 'CAMPAIGN COLLABORATORS' : 'COLLABORATEURS DE LA CAMPAGNE'}
      </h3>
      <table className='members'>
        <thead>
          <tr>
            <td className='sidebearing'></td>
            <td><label className='red'>{isEn ? 'NAME' : 'NOM'}</label></td>
            <td><label className='red'>{isEn ? 'ROLE' : 'RÔLE'}</label></td>
            <td><label className='red'>{isEn ? 'BIOGRAPHY' : 'BIOGRAPHIE'}</label></td>
            <td className='sidebearing'></td>
          </tr>
        </thead>
        <tbody>
          {collaboratorData.map((member, i) => <Member
            member={member}
            key={i} />)}
        </tbody>
      </table>
      <br /><br />
      <h3
        ref={sectionRefs['team-members']}
        className='textCenter'>
        {isEn ? 'TEAM MEMBERS' : 'MEMBRES DE L’ÉQUIPE'}
      </h3>
      <div className='text-center'>
        <Filter
          name='team-members-role'
          placeholder={isEn ? 'ROLE' : 'RÔLE'}
          list={isEn ?
            ['ACTIVIST', 'ADVOCATE', 'ARCHITECT'] :
            ['ACTIVISTE', 'DÉFENSEUR', 'ARCHITECTE']}
          handleFilter={({ target }) => handleFilterTeam({ role: target.value })} />
        <Filter
          name='team-members-team'
          placeholder={isEn ? 'TEAM' : 'EQUIPE'}
          list={isEn ?
            demandData.map(demand => demand.en.title) :
            demandData.map(demand => demand.fr.title)}
          handleFilter={({ target }) => handleFilterTeam({ team: target.value })} />
      </div>
      <table className='members'>
        <thead>
          <tr>
            <td className='sidebearing'></td>
            <td><label className='red'>{isEn ? 'NAME' : 'NOM'}</label></td>
            <td><label className='red'>{isEn ? 'ORGANIZATION' : 'ORGANISME'}</label></td>
            <td><label className='red'>{isEn ? 'TEAM' : 'EQUIPE'}</label></td>
            <td><label className='red'>{isEn ? 'ROLE' : 'RÔLE'}</label></td>
            <td className='sidebearing'></td>
          </tr>
        </thead>
        <tbody>{contributorData.map(getTeamMember)}</tbody>
      </table>
    </>
  )
}

export default Collective