import { useWindowSize } from '@uidotdev/usehooks'
import { CLS, CLSES, PAVILION_BREAKPOINT } from '../../constants/styleConstants'
import { LANGS } from '../../constants/commonConstants'
import { ReactComponent as PavilionBigEn } from '../../svg/pavilionBigRaster_en.svg'
import { ReactComponent as PavilionBigFr } from '../../svg/pavilionBigRaster_fr.svg'
import useLang from '../../hooks/useLang'

const Pavilion = () => {
  const { width } = useWindowSize()
  const { lang } = useLang()
  const Svg = lang === LANGS[0] ? PavilionBigEn : PavilionBigFr

  return (
    <>
      {width < PAVILION_BREAKPOINT ?
        <img src='/img/pavilion.png' alt='' /> :
        <Svg className={CLS.MULTIPLY} />}
      <p className={CLSES.CENTER_CAPTION}>
        {/* ALI-TODO: translate this */}
        Pavilion layout for Not For Sale exhibition in Venice, Italy.
      </p>
    </>
  )
}

export default Pavilion


