import { useWindowSize } from '@uidotdev/usehooks'
import { PAVILION_BREAKPOINT } from '../constants/constants'
import useIsEn from '../hooks/useIsEn'
import { ReactComponent as PavilionBigEn } from '../svg/pavilionBigRaster_en.svg'
import { ReactComponent as PavilionBigFr } from '../svg/pavilionBigRaster_fr.svg'

const Pavilion = () => {
  const { width } = useWindowSize()
  const Svg = useIsEn() ? PavilionBigEn : PavilionBigFr

  return width < PAVILION_BREAKPOINT ?
    <img src='/img/pavilion.png' alt='' /> :
    <Svg className='multiply' />
}

export default Pavilion


