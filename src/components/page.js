import { useMemo } from 'react'
import parserServices from '../services/parserServices'
import Section from './common/section'


// TODO trims
const Page = ({ id, subpage, data }) => {
  const { title, body } = useMemo(() => parserServices.parsePage(data), [id])
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