import { CLS } from '../../constants/styleConstants'

const News = () => {
  return (
    <table>
      <tr><td><label className={CLS.LABEL}>press</label></td><td>04.17.23</td><td><h3>AAHA at it again!</h3></td><td>CBC Radio</td></tr>
      <tr><td><label className={CLS.LABEL}>press</label></td><td>04.17.23</td><td><h3>AAHA at it again!</h3></td><td>CBC Radio</td></tr>
      <tr><td><label className={CLS.LABEL}>news</label></td><td>04.17.23</td><td><h3>AAHA site launched</h3></td><td><label className='label--red'>read more</label></td></tr>
    </table>
  )
}


export default News