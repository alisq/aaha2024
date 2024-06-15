
import { useEffect, useState } from 'react'
import Flickity from 'react-flickity-component'
import parse from 'html-react-parser'


const CarouselDemand = ({ carouselData }) => {
  const [zoomedImgIndex, setZoomImgIndex] = useState(null)

  useEffect(() => {
    const { style } = document.body
    style.overflowY = zoomedImgIndex !== null ? 'hidden' : 'initial'
    return () => style.overflowY = 'initial'
  }, [zoomedImgIndex])

  const zoomedImg = carouselData[zoomedImgIndex]
  return (
    <>
      {typeof zoomedImgIndex === 'number' &&
        <div className='slide-fullscreen' onClick={() => setZoomImgIndex(null)} >
          <div className='close' onClick={() => setZoomImgIndex(null)}>&times;</div>
          <img src={zoomedImg.src} alt={zoomedImg.alt} />
          <div className='caption'>
            {parse(zoomedImg.caption)}
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
        {carouselData.map(({ src, alt, caption }, i) =>
          <div className='slide' key={i} >
            <div className='demand-slide'>
              <img src={src} alt={alt} />
            </div>
            {caption !== '' &&
              <div className='caption text-center'>
                {caption.replace(/(<([^>]+)>)/gi, '')}
              </div>}
          </div>
        )}
      </Flickity>
    </>
  )
}

export default CarouselDemand