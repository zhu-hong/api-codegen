import { _http } from '@/api/_http'
import type { DataResultTerminalConfigDto } from './_schemas.gen'
import type {
	ConfigGetParams,
	RegisterPostParams,
	SvcaddressGetParams,
} from './终端壳子.schema'

/**
 * @summary 获取终端服务器地址
 */
export const svcaddressGet = (
	params?: SvcaddressGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<null>({ url: `/svcaddress`, method: 'GET', params }, options)
}

/**
 * @summary 注册终端
 */
export const registerPost = (
	params?: RegisterPostParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<null>({ url: `/register`, method: 'POST', params }, options)
}

/**
 * @summary 获取终端配置信息
 */
export const configGet = (
	params?: ConfigGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<DataResultTerminalConfigDto>(
		{ url: `/config`, method: 'GET', params },
		options,
	)
}

export const healthzGet = (options?: SecondParameter<typeof _http>) => {
	return _http<null>({ url: `/healthz`, method: 'GET' }, options)
}
