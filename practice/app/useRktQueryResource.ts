export interface WrappedData<T extends unknown> {
  data: T
}

export const useRtkQueryResource = <V extends unknown>(api: unknown, endpointName: string) => {
  // @ts-ignore
  const apiEndpointQuery = api.endpoints[endpointName]
  // @ts-ignore
  const useEndpointQuery = apiEndpointQuery?.useQuery
  
  const { data } = useEndpointQuery(null) as WrappedData<V>

  // @ts-ignore
  let promise = api
    // @ts-ignore
    .util
    .getRunningOperationPromise(endpointName, null) as PromiseLike<WrappedData<V>>|undefined


  if (promise === undefined) {
    promise = new Promise(
      (resolve, reject)=> {
        if (data !== undefined) {
          resolve({ data })
        } else {
          reject("Cannot get RTK Query promise and there is no data loaded yet")
        }
      }
    )
  }
  
  const wrapPromise = <T extends unknown>(promise: PromiseLike<T>) => {
    let status = 'pending'
    let response: T
  
    const suspender = promise.then(
      (res: T) => {
        status = 'success'
        response = res
      },
      (err) => {
        status = 'error'
        response = err
      },
    )
  
    const read = () => {
      switch (status) {
        case 'pending':
          throw suspender
        case 'error':
          throw response
        default:
          return response
      }
    }
  
    return { read }
  }

  return wrapPromise<WrappedData<V>>(promise)
}
