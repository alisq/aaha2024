import _ from 'lodash'
import { addColons } from '../utils/commonUtils'
import Anchor from '../components/common/anchor'

const demands = ['DEMANDS', 'DEMANDES']
const manifesto = ['MANIFESTO', 'MANIFESTE']
const collective = ['COLLECTIVE', 'COLLECTIF']
const exhibition = ['EXHIBITIONS', 'EXHIBITIONS']
const events = ['EVENTS', 'ÉVÉNEMENTS']
const press = ['PRESS', 'PRESSE']

const name = ['Name', 'Nom']
const role = ['ROLE', 'RÔLE']
const org = ['Organizations', 'Organisme']
const bio = ['Biography', 'Biographie']
const members = ['TEAM MEMBERS', 'MEMBRES DE L’ÉQUIPE']
const team = ['TEAM', 'EQUIPE']

const title = ['TITLE', 'TITRE']
const eventTitle = ['EVENT', 'EVENMENT']
const date = ['DATE', 'DATE']
const dateTime = ['DATE & TIME', 'DATE ET HEURE']
const outlet = ['OUTLET', 'OUTLET']
const locale = ['LOCALE', 'LIEU']

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
  team,
  studentActivists: ['STUDENT ACTIVISTS', 'ACTIVISTES ÉTUDIANTS']
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
  bannerHeader: ['Banners for Fugitives', 'Banderoles pour fugitifs'],
  bannersDesc: [
    <>The banners hanging from the mezzanine in the pavilion house the demands collected by AAHA. Created by <Anchor to='./collective#collective-collaborators'>Grey Piitaapan Muldoon</Anchor>, the banners avail what is close and on hand–blankets, bedsheets, curtains, jackets–to carry words and take space. Grey has been making these “banners for fugitives” since 2014, when they were illegally evicted, along with their collected family, to make way for sale: The banners wear against the alienation.</>,
    <>Les banderoles suspendues à la mezzanine du pavillon s’approprient l’espace pour transmettre les demandes des équipes associées à AAHA. Ces banderoles ont été créées par <Anchor to='./collective#collective-collaborators'>Grey Piitaapan Muldoon</Anchor>, qui a misé sur les matériaux qui lui étaient disponibles (couvertures, draps, rideaux, manteaux). L’artiste crée ce genre de « banderoles pour fugitifs » depuis 2014, année de son éviction illégale, et de celle de ses proches, à des fins de vente. L’usure de ces banderoles participe à la lutte contre l’aliénation.</>
  ],
  gratitude: ['Gracious Support and Collaboration of', 'Le soutien gracieux et la collaboration de : '],
  commissioner: ['Commissioner', 'Organisateur'],
  primarySponsor: ['Primary Presenting Sponsor', 'Commanditaire présentateur principal'],
  coSponsor: ['Co-Presenting Sponsor', 'Commanditaire co-présentateur'],
  sponsors: ['Sponsors', 'Commanditaires'],
  layout: ['Pavilion layout for Not For Sale exhibition in Venice, Italy.', 'Pavilion layout for Not For Sale exhibition in Venice, Italy.'],
  caption: [
    <>
      <p>
        Caitlan Secondcost, Hannah Genosko, Pamela Stone Steph Rybcyn and Emily Davidson
        were Other Hands, aiding as studio assistants, who brought their presence and
        critical minds into the work.
      </p>
      <p>Robert Wright, Chris Webb, Wren Tian,
        Sally Wolchyn-Raab, Vie, Robin, Henny, Lux, Gabrielle, Catriona, Aislinn,
        Heather, Melissa, Leesa, Brody, Kate G., Tayla, Rob and Simon are also sewn in:
        They responded to various requests for help in preparing these banners and
        their Other Energies are also acknowledged.
      </p>
    </>,
    <>
      <p>
        Caitlan Secondcost, Hannah Genosko, Pamela Stone, Steph Rybcyn et Emily Davidson
        J étaient D’autres Mains, aidant en tant qu’assistants de studio, qui ont
        apporté leur présence et leur esprit critique dans le travail.
      </p>
      <p>
        Robert Wright, Chris Webb, Wren Tian, Sally Wolchyn-Raab, Vie, Robin, Henny,
        Lux, Gabrielle, Catriona, Aislinn, Heather, Melissa, Leesa, Brody, Kate G.,Tayla,
        Rob, et Simon sont également cousus dans: ils ont répondu à diverses demandes
        d’aide dans la préparation de ces bannières et leurs autres énergies sont
        également reconnues.
      </p>
    </>
  ],
  carouselAlts: [
    ['Mutual Aid Housing', 'Ambient Ecosystems Commons', 'Land Back', 'On the Land Housing', 'First Nations Home Building Lodges', 'Reparative Architecture', 'A Gentrification Tax', 'Surplus Properties for Housing', 'Intentional Communities for Unhoused People', 'Collective Ownership'],
    ['Habitat solidaire', 'Écosystèmes ambiants communs', 'La restitution des terres ancestrales', 'Des logements sur le territoire', 'Pavillons pour la construction d’habitations au sein des Premières Nations', 'Pavillons pour la construction d’habitations au sein des Premières Nations', 'Une taxe sur l’embourgeoisement', 'Des propriétés excédentaires pour le logement', 'Des communautés intentionnelles pour les personnes sans logement', 'La propriété collective']
  ]
}

export const EVENT = {
  header: events
}

export const PRESS = {
  header: press
}

export const TABLE = {
  name,
  title,
  eventTitle,
  role,
  bio,
  org,
  team,
  demands,
  date,
  dateTime,
  locale,
  outlet
}