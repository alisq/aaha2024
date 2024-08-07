import { CLS, CLSES } from '../../constants/styleConstants'
import { EXHIBITION } from '../../data/translations'
import useLang from '../../hooks/useLang'
import CenterColumn from '../common/centerColumn'
import LeftColumn from '../common/leftColumn'
import ExhibitionCarousel from './exhibitionCarousel'
import Pavilion from './pavilion'
import SponsorLogos from './sponsorLogos'


const Exhibition = () => {
  const { translations } = useLang(EXHIBITION)

  return (
    <div className={CLS.CONTAINER}>
      <div className={CLS.ROW}>
        <LeftColumn noSticky />
        <CenterColumn>
          <h3 className={CLSES.SMALL_HEADER}>{translations.notForSale}</h3>
        </CenterColumn>
        <Pavilion className={CLS.IMG} />
        <LeftColumn noSticky />
        <CenterColumn>
          <h3 className={CLSES.SMALL_HEADER}>{translations.bannerHeader}</h3>
          <p>{translations.bannersDesc}</p>
          <ExhibitionCarousel />
          <p className={CLS.CAPTION}>{translations.caption}</p>
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