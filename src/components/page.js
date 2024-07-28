import { useEffect, useMemo } from 'react'
import parserServices from '../services/parserServices'
import Section from './common/section'
import useLang from '../hooks/useLang'


// TODO trims
const Page = ({ id, subpage, data }) => {
  const { lang } = useLang()
  const { title, body } = useMemo(() => parserServices.parsePage(data), [id, lang])

  return (
    <Section
      id={id}
      title={title}
      center={<div>{body}</div>}>
      {subpage}
    </Section>
  )
}

export default Page