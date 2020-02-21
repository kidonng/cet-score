import got from 'got'
import { NowRequest, NowResponse } from '@now/node'

export default async ({ query }: NowRequest, { json }: NowResponse) => {
  const { exam, no, name } = query

  const result = {
    callback: cb => cb
  }

  const { body } = await got(
    `http://cachecloud.neea.cn/cet/query?data=${exam},${no},${name}`,
    {
      headers: {
        referer: 'http://cet.neea.edu.cn/cet/query_c.html'
      }
    }
  )
  json(eval(body))
}
