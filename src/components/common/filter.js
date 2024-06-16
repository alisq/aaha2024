import { CLS } from '../../constants/styleConstants'

const Filter = ({ name, list, placeholder, handleFilter }) =>
  <select name={name} className={CLS.FILTER} onChange={handleFilter}>
    <option value=''>{placeholder}</option>
    {list?.map((item, i) =>
      <option key={i} value={item}>
        {item}
      </option>
    )}
  </select>


export default Filter