import _ from 'lodash'
import { addColons } from '../utils/commonUtils'

const demands = ['DEMANDS', 'DEMANDES']
const manifesto = ['MANIFESTO', 'MANIFESTE']
const collective = ['COLLECTIVE', 'COLLECTIF']
const exhibition = ['EXHIBITIONS', 'EXHIBITIONS']
const events = ['EVENTS', 'ÉVÉNEMENTS']

const name = ['Name', 'Nom']
const role = ['Role', 'Rôle']
const org = ['Organizations', 'Organisme']
const bio = ['Biography', 'Biographie']
const members = ['TEAM MEMBERS', 'MEMBRES DE L’ÉQUIPE']
const team = ['TEAM', 'EQUIPE']

// TODO
const title = ['TITLE', 'TITLE']
const date = ['DATE', 'DATE']
const outlet = ['OUTLET', 'OUTLET']

const activist = ['Activist', 'Activiste']
const advocate = ['Advocate', 'Défenseur']
const architect = ['Architect', 'Architecte']

export const MAIN = {
  bottomTitle: ['Join The Campaign', 'Rejoindre la campagne']
}

export const MENU = {
  demands,
  contact: ['CONTACT', 'CONTACTER']
}

export const DEMAND_BODY = {
  header: ['We Demand', 'Nous demandons'],
  region: ['Region:', 'Région :'],
  activist: addColons(activist),
  architect: addColons(architect),
  advocate: addColons(advocate),
  takeAction: ['Take Action:', 'Passons à l\'action :'],
  members,
  memberName: name,
  memberOrg: org,
  memberRole: role,
}

export const COLLECTIVE = {
  header: ['ORGANIZING COMMITTEE', 'COMITÉ ORGANISATEUR'],
  collaborator: ['CAMPAIGN COLLABORATORS', 'COLLABORATEURS DE LA CAMPAGNE'],
  memberName: name,
  memberRole: role,
  memberBio: bio,
  memberOrg: org,
  members,
  memberList: _.zip(activist, advocate, architect),
  team
}

export const FOOTER = {
  notForSale: ['Not for Sale!', 'Pas à vendre!'],
  description: [
    'We are Architects Against Housing Alienation and we believe the current housing system in c\\a\\n\\a\\d\\a must be abolished!',
    'Nous sommes Architects Against Housing Alienation (AAHA) et nous croyons que le système du logement actuel au c\\a\\n\\a\\d\\a doit être aboli!'
  ],
  pressKit: ['Download Press Kit', 'Télécharger le dossier de presse.'],
  demands,
  manifesto,
  collective,
  exhibition,
}

export const EXHIBITION = {
  notForSale: ['Not for Sale! Heartquarters', 'Pas à vendre / Quartier général'],
  banners: ['Banners for Fugitives', 'Banderoles pour fugitifs'],
  gratitude: ['Gracious Support and Collaboration of', 'Le soutien gracieux et la collaboration de : '],
  commissioner: ['Commissioner', 'Organisateur'],
  primarySponsor: ['Primary Presenting Sponsor', 'Commanditaire présentateur principal'],
  coSponsor: ['Co-Presenting Sponsor', 'Commanditaire co-présentateur'],
  sponsors: ['Sponsors', 'Commanditaires'],
}

export const EVENT = {
  header: events
}

export const TABLE = {
  name,
  title,
  role,
  bio,
  org,
  team,
  demands,
  date,
  outlet
}