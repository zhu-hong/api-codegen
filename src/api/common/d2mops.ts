import { _http } from '@/api/_http'

export const ssSessionGet = (options?: SecondParameter<typeof _http>) => {
	return _http<null>({ url: `/ss/session`, method: 'GET' }, options)
}
