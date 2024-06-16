import Flickity from 'react-flickity-component'
import useLang from '../../hooks/useLang'
import { CLS, CLSES } from '../../constants/styleConstants'

const ExhibitionCarousel = ({ data }) => {
  const { lang } = useLang()
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
      {data.map((image, i) =>
        <div key={i} className={CLS.SLIDE}>
          <img src={image.uri} alt={image[lang].alt} />
          {image[lang].caption !== '' && <p className={CLSES.CENTER_CAPTION}>{image[lang].caption}</p>}
        </div>)}
    </Flickity>
  )
}

export default ExhibitionCarousel