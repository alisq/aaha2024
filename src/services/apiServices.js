import _ from 'lodash'
import { API_ENDPOINT, API_LANGS } from '../constants/constants'
import httpServices from './httpServices'


const data = (async () => {
  const { data } = (await httpServices.get(`${API_ENDPOINT}/JSON/demands`))
  const demands = _.partition(data, { langcode: API_LANGS.en })
  return {
    demands: {
      en: demands[0],
      fr: demands[1]
    }
  }
})()

const apiServices = {
  data
}

export default apiServices