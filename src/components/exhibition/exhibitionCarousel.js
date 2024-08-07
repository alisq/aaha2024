import Flickity from 'react-flickity-component'
import useLang from '../../hooks/useLang'
import { CLS } from '../../constants/styleConstants'
import { EXHIBITION } from '../../data/translations'

const imgs = [
  'mutual-aid-housing',
  'ambient-ecosystems-commons',
  'land-back',
  'land-housing',
  'home-building-lodges',
  'reparative-architecture',
  'gentrification-tax',
  'surplus-properties-housing',
  'intentional-communities-unhoused-people',
  'collective-ownership'
]


const ExhibitionCarousel = () => {
  const { translations } = useLang(EXHIBITION)
  return (
    <Flickity
      className={CLS.CAROUSEL}
      options={{
        initialIndex: 2,
        draggable: true,
        wrapAround: true,
        pageDots: false
      }}
      reloadOnUpdate
      static>
      {imgs.map((src, i) =>
        <div key={i} className={CLS.SLIDE}>
          <img src={`/img/b4f/${src}.jpg`} alt={translations.carouselAlts[i]} />
        </div>)}
    </Flickity>
  )
}

export default ExhibitionCarousel