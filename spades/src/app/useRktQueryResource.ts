// Simplified version of QueryActionCreatorResult
interface WrappedData<T extends unknown> {
  data: T
}

export const useRtkQueryResource = <T extends unknown>(api: unknown, endpointName: string): never | (() => T) => {
  // @ts-ignore
  const apiEndpointQuery = api.endpoints[endpointName]
  // @ts-ignore
  const useEndpointQuery = apiEndpointQuery?.useQuery
  
  const { data } = useEndpointQuery(null) as WrappedData<T>

  // @ts-ignore
  let promise = api
    // @ts-ignore
    .util
    .getRunningOperationPromise(endpointName, null) as PromiseLike<WrappedData<T>>|undefined

  // Promise is undefined when data is there cached locally already,
  // in this case let's have a promise resolved with the locally cached data
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
  
  let status = 'pending'
  let response: T

  promise.then(
    (res: WrappedData<T>) => {
      status = 'success'
      response = res.data
    },
    (err) => {
      status = 'error'
      response = err
    },
  )

  return () => {
    switch (status) {
      case 'pending':
        throw promise
      case 'error':
        throw response
      default:
        return response
    }
  }
}
