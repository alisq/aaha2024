import _ from 'lodash'
import { API_ENDPOINT, API_LANGS } from '../constants/apiConstants'
import httpServices from './httpServices'

const uniqDemand = demands => _.uniqBy(demands, 'nid')

const data = (async () => {
  const { data } = (await httpServices.get(`${API_ENDPOINT}/JSON/demands`))
  const demands = _.partition(data, { langcode: API_LANGS.en })
  return {
    demands: {
      en: uniqDemand(demands[0]),
      fr: uniqDemand(demands[1])
    }
  }
})()

const apiServices = {
  data
}

export default apiServices