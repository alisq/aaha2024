import Flickity from 'react-flickity-component'
import useLang from '../../hooks/useLang'

const ExhibitionCarousel = ({ data }) => {
  const { lang } = useLang()
  return (
    <Flickity
      className='carousel'
      options={{
        initialIndex: 2,
        draggable: true,
        wrapAround: true,
        pageDots: false
      }}
      reloadOnUpdate
      static>
      {data.map((image, i) =>
        <div key={i} className='slide'>
          <img src={image.uri} alt={image[lang].alt} />
          {image[lang].caption !== '' && <p className='caption text-center'>{image[lang].caption}</p>}
        </div>)}
    </Flickity>
  )
}

export default ExhibitionCarousel