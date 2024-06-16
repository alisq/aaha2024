
import { useEffect, useState } from 'react'
import Flickity from 'react-flickity-component'
import parse from 'html-react-parser'
import { CLS, CLSES } from '../../constants/styleConstants'


const DemandCarousel = ({ data }) => {
  const [zoomedImgIndex, setZoomImgIndex] = useState(null)

  useEffect(() => {
    const { style } = document.body
    style.overflowY = zoomedImgIndex !== null ? 'hidden' : 'initial'
    return () => style.overflowY = 'initial'
  }, [zoomedImgIndex])

  const zoomedImg = data[zoomedImgIndex]
  return (
    <>
      {typeof zoomedImgIndex === 'number' &&
        <div className={CLS.SLIDE_FULLSCREEN} onClick={() => setZoomImgIndex(null)} >
          <div className={CLS.CLOSE} onClick={() => setZoomImgIndex(null)}>&times;</div>
          <img src={zoomedImg.src} alt={zoomedImg.alt} />
          <div className={CLS.CAPTION}>
            {parse(zoomedImg.caption)}
          </div>
        </div>}
      <Flickity
        flickityRef={ref => ref.on('staticClick', (_, __, ___, i) => setZoomImgIndex(i))}
        className={CLS.CAROUSEL}
        options={{
          initialIndex: 0,
          draggable: true,
          wrapAround: true,
          pageDots: false
        }}
        reloadOnUpdate={true}>
        {data.map(({ src, alt, caption }, i) =>
          <div className={CLS.SLIDE} key={i} >
            <div className={CLS.DEMAND_SLIDE}>
              <img src={src} alt={alt} />
            </div>
            {caption !== '' &&
              <div className={CLSES.CENTER_CAPTION}>
                {caption.replace(/(<([^>]+)>)/gi, '')}
              </div>}
          </div>
        )}
      </Flickity>
    </>
  )
}

export default DemandCarousel