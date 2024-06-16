import { useWindowSize } from '@uidotdev/usehooks'
import { LANGS, PAVILION_BREAKPOINT } from '../../constants/constants'
import { ReactComponent as PavilionBigEn } from '../../svg/pavilionBigRaster_en.svg'
import { ReactComponent as PavilionBigFr } from '../../svg/pavilionBigRaster_fr.svg'
import useLang from '../../hooks/useLang'

const Pavilion = () => {
  const { width } = useWindowSize()
  const { lang } = useLang()
  const Svg = lang === LANGS[0] ? PavilionBigEn : PavilionBigFr

  return width < PAVILION_BREAKPOINT ?
    <img src='/img/pavilion.png' alt='' /> :
    <Svg className='multiply' />
}

export default Pavilion


