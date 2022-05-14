import { findSite } from '../../globals/apis'
import { SiteListContextType } from './SiteListContext'

export const useSiteList = (context: SiteListContextType) => {
  console.log('context.query', context.query)
  findSite(context.query).then(res => {
    console.log('dddd', res)
    context.setList(res.list)
  })
}
