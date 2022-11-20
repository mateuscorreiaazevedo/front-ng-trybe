import { addDays } from 'date-fns'
import Cookie from 'js-cookie'

class TokenUtil {
  private key = 'ng_cash_token'
  private cookie
  private date

  constructor() {
    this.cookie = Cookie
    this.date = new Date()
  }

  set(value: string) {
    return this.cookie.set(this.key, value, { expires: addDays(this.date, 7) })
  }
  get() {
    return this.cookie.get(this.key)
  }
  clear() {
    return this.cookie.remove(this.key)
  }
}

export const tokenUtil = new TokenUtil()
