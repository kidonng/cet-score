import got from 'got'
import { NowRequest, NowResponse } from '@now/node'

export default async (
  { query, headers: { cookie } }: NowRequest,
  { json }: NowResponse
) => {
  const {
    province: provinceCode,
    id: IDNumber,
    name: Name,
    captcha: verificationCode
  } = query

  const {
    body: { Message }
  } = await got.post('http://cet-bm.neea.cn/Home/ToQueryTestTicket', {
    headers: { cookie },
    form: {
      provinceCode,
      IDTypeCode: 1,
      IDNumber,
      Name,
      verificationCode
    },
    responseType: 'json'
  })

  json(Message.startsWith('[') ? JSON.parse(Message) : Message)
}
