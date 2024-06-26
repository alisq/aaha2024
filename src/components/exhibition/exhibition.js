import ExhibitionCarousel from './exhibitionCarousel'
import SponsorLogos from './sponsorLogos'
import Pavilion from './pavilion'
import useLang from '../../hooks/useLang'
import { EXHIBITION } from '../../data/translations'
import { LANGS } from '../../constants/commonConstants'
import CenterColumn from '../common/centerColumn'
import LeftColumn from '../common/leftColumn'
import { CLS, CLSES } from '../../constants/styleConstants'
import Anchor from '../common/anchor'

// TODO
const carouselImages = [
  {
    uri: '/img/b4f/mutual-aid-housing.jpg',
    en: { caption: '', alt: 'Mutual Aid Housing' },
    fr: { caption: '', alt: 'Habitat solidaire' }
  },
  {
    uri: '/img/b4f/ambient-ecosystems-commons.jpg',
    en: { caption: '', alt: 'Ambient Ecosystems Commons' },
    fr: { caption: '', alt: 'Écosystèmes ambiants communs' }
  },
  {
    uri: '/img/b4f/land-back.jpg',
    en: { caption: '', alt: 'Land Back' },
    fr: { caption: '', alt: 'La restitution des terres ancestrales' }
  },
  {
    uri: '/img/b4f/land-housing.jpg',
    en: { caption: '', alt: 'On the Land Housing' },
    fr: { caption: '', alt: 'Des logements sur le territoire' }
  },
  {
    uri: '/img/b4f/home-building-lodges.jpg',
    en: { caption: '', alt: 'First Nations Home Building Lodges' },
    fr: { caption: '', alt: 'Pavillons pour la construction d’habitations au sein des Premières Nations' }
  },
  {
    uri: '/img/b4f/reparative-architecture.jpg',
    en: { caption: '', alt: 'Reparative Architecture' },
    fr: { caption: '', alt: 'Une architecture réparatrice' }
  },
  {
    uri: '/img/b4f/gentrification-tax.jpg',
    en: { caption: '', alt: 'A Gentrification Tax' },
    fr: { caption: '', alt: 'Une taxe sur l’embourgeoisement' }
  },
  {
    uri: '/img/b4f/surplus-properties-housing.jpg',
    en: { caption: '', alt: 'Surplus Properties for Housing' },
    fr: { caption: '', alt: 'Des propriétés excédentaires pour le logement' }
  },
  {
    uri: '/img/b4f/intentional-communities-unhoused-people.jpg',
    en: { caption: '', alt: 'Intentional Communities for Unhoused People' },
    fr: { caption: '', alt: 'Des communautés intentionnelles pour les personnes sans logement' }
  },
  {
    uri: '/img/b4f/collective-ownership.jpg',
    en: { caption: '', alt: 'Collective Ownership' },
    fr: { caption: '', alt: 'La propriété collective' },
  }
]

// TODO Columns
const Exhibition = () => {
  const { lang, translations } = useLang(EXHIBITION)
  const isEn = lang === LANGS[0]
  return (
    <div className={CLS.CONTAINER}>
      <div className={CLS.ROW}>
        <LeftColumn noSticky><br /></LeftColumn>
        <CenterColumn>
          <br />
          <h3 className={CLS.TEXT_CENTER}>{translations.notForSale}</h3>
        </CenterColumn>
        <Pavilion className={CLS.IMG} />
        <LeftColumn noSticky><br /></LeftColumn>
        <CenterColumn>
          <p className={CLSES.CENTER_CAPTION}>
            Pavilion layout for Not For Sale exhibition in Venice, Italy.
          </p>
          <h3 className={CLS.TEXT_CENTER}>{translations.banners}</h3>
          <p>
            {
              isEn ?
                <>The banners hanging from the mezzanine in the pavilion house the demands collected by AAHA. Created by <Anchor to='./collective#collective__collaborators'>Grey Piitaapan Muldoon</Anchor>, the banners avail what is close and on hand–blankets, bedsheets, curtains, jackets–to carry words and take space. Grey has been making these “banners for fugitives” since 2014, when they were illegally evicted, along with their collected family, to make way for sale: The banners wear against the alienation.</> :
                <>Les banderoles suspendues à la mezzanine du pavillon s’approprient l’espace pour transmettre les demandes des équipes associées à AAHA. Ces banderoles ont été créées par <Anchor to='./collective#collective__collaborators'>Grey Piitaapan Muldoon</Anchor>, qui a misé sur les matériaux qui lui étaient disponibles (couvertures, draps, rideaux, manteaux). L’artiste crée ce genre de « banderoles pour fugitifs » depuis 2014, année de son éviction illégale, et de celle de ses proches, à des fins de vente. L’usure de ces banderoles participe à la lutte contre l’aliénation.</>
            }
          </p>
          <ExhibitionCarousel data={carouselImages} />
          <p className={CLS.CAPTION}>
            {
              isEn ?
                <>
                  Caitlan Secondcost, Hannah Genosko, Pamela Stone Steph Rybcyn and Emily Davidson
                  were Other Hands, aiding as studio assistants, who brought their presence and
                  critical minds into the work.<br /><br />Robert Wright, Chris Webb, Wren Tian,
                  Sally Wolchyn-Raab, Vie, Robin, Henny, Lux, Gabrielle, Catriona, Aislinn,
                  Heather, Melissa, Leesa, Brody, Kate G., Tayla, Rob and Simon are also sewn in:
                  They responded to various requests for help in preparing these banners and
                  their Other Energies are also acknowledged.
                </> :
                <>
                  Caitlan Secondcost, Hannah Genosko, Pamela Stone, Steph Rybcyn et Emily Davidson
                  J étaient D’autres Mains, aidant en tant qu’assistants de studio, qui ont
                  apporté leur présence et leur esprit critique dans le travail.<br /><br />
                  Robert Wright, Chris Webb, Wren Tian, Sally Wolchyn-Raab, Vie, Robin, Henny,
                  Lux, Gabrielle, Catriona, Aislinn, Heather, Melissa, Leesa, Brody, Kate G.,Tayla,
                  Rob, et Simon sont également cousus dans: ils ont répondu à diverses demandes
                  d’aide dans la préparation de ces bannières et leurs autres énergies sont
                  également reconnues.
                </>
            }
          </p>
          <SponsorLogos />
          <h4>{translations.gratitude}</h4>
          <div className={CLS.BLOCK_CONTAINER}>
            <span>Ron Kellett</span>
            <span>Tamara Ross</span>
            <span>Tracy Satterfield</span>
            <span>Emma Fennell</span>
            <span>Maya Przybylski</span>
            <span>Julie Dring</span>
            <span>Marie McGregor Pitawanakwat</span>
            <span>Chinook Song Catchers</span>
            <span>Robyn Adams</span>
          </div>
          <br />
        </CenterColumn>
      </div>
    </div>

  )
}

export default Exhibition