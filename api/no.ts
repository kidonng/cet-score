import got from 'got'
import { NowRequest, NowResponse } from '@now/node'

const table = {
  北京: 11,
  天津: 12,
  河北: 13,
  山西: 14,
  内蒙: 15,
  吉林: 22,
  黑龙: 23,
  上海: 31,
  江苏: 32,
  安徽: 34,
  福建: 35,
  江西: 36,
  山东: 37,
  河南: 41,
  湖北: 42,
  湖南: 43,
  广东: 44,
  广西: 45,
  海南: 46,
  重庆: 50,
  四川: 51,
  贵州: 52,
  云南: 53,
  西藏: 54,
  甘肃: 62,
  青海: 63,
  宁夏: 64,
  新疆: 65,
  澳门: 82
}

export default async (
  { query, headers: { cookie } }: NowRequest,
  { send }: NowResponse
) => {
  const {
    province,
    id: IDNumber,
    name: Name,
    captcha: verificationCode
  } = query

  const {
    body: { Message }
  } = await got.post('http://cet-bm.neea.cn/Home/ToQueryTestTicket', {
    headers: { cookie },
    form: {
      provinceCode: table[province as string],
      IDTypeCode: 1,
      IDNumber,
      Name,
      verificationCode
    },
    responseType: 'json'
  })

  send(Message)
}
