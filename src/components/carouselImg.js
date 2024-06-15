import useLang from '../hooks/useLang'

const CarouselImg = ({ image }) => {
  const lang = useLang()
  return <img
    src={`http://server-aaha.codepanel.in/${image.uri}`}
    alt={image[lang].alt} />
}

export default CarouselImg