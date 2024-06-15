
import { useEffect, useState } from 'react'
import Flickity from 'react-flickity-component'
import parse from 'html-react-parser'
import useLang from '../hooks/useLang'
import CarouselImg from './carouselImg'


const CarouselDemand = ({ carouselImages }) => {
  const [zoomedImgIndex, setZoomImgIndex] = useState(null)
  const lang = useLang()

  useEffect(() => {
    const { style } = document.body
    style.overflowY = zoomedImgIndex !== null ? 'hidden' : 'initial'
    return () => style.overflowY = 'initial'
  }, [zoomedImgIndex])

  const zoomedImg = carouselImages[zoomedImgIndex]
  return (
    <>
      {typeof zoomedImgIndex === 'number' &&
        <div className='slide-fullscreen' onClick={() => setZoomImgIndex(null)} >
          <div className='close' onClick={() => setZoomImgIndex(null)}>&times;</div>
          <CarouselImg image={zoomedImg} />
          <div className='caption'>
            {parse(zoomedImg[lang].caption)}
          </div>
        </div>}
      <Flickity
        flickityRef={ref => ref.on('staticClick', (_, __, ___, i) => setZoomImgIndex(i))}
        className='carousel'
        options={{
          initialIndex: 0,
          draggable: true,
          wrapAround: true,
          pageDots: false
        }}
        reloadOnUpdate={true}>
        {carouselImages.map((image, i) =>
          <div className='slide' key={i} >
            <div className='demand-slide'>
              <CarouselImg image={image} />
            </div>
            {image[lang].caption !== '' &&
              <div className='caption text-center'>
                {image[lang].caption.replace(/(<([^>]+)>)/gi, '')}
              </div>}
          </div>
        )}
      </Flickity>
    </>
  )
}

export default CarouselDemand