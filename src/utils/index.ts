/**
 * @description promise version of setTimeout
 * @param dur setTimeout second params
 * @returns a Promise instance
 */
export const tmoCreator = (dur: number) : Promise<null> =>   {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null)
    }, dur)
  })
}

/**
 * @description make a throttled function
 * @param func event handler
 * @param wait time rate for the execution of event handler
 * @returns a throttled event handler
 */
export const throttle = function(func: Function, wait: number) {
  let timeout: any
  let storedEv: Event | null

  return function handler(ev: Event) {
    storedEv  = ev

    if(!timeout) {
      func(storedEv)
      storedEv = null

      timeout = setTimeout(() => {
        timeout = null
        if(storedEv) {
          handler(ev)
        }
      }, wait)
    }
  }
}