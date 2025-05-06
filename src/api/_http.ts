import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

const AXIOS_INSTANCE = axios.create({
	timeout: 60000,
})

AXIOS_INSTANCE.interceptors.response.use(
	(response) => response,
	(res) => {
		const { response, status } = res

		if (response === undefined) {
			console.log('服务错误')
			throw res
		}

		if (status >= 400 && status < 600) {
			if (typeof response?.data === 'string') {
				console.log(response?.data)
			} else {
				console.log(`网络错误：（${status}），请重试`)
			}
			throw res
		}

		return res
	},
)

export const _http = async <T extends unknown>(
	config: AxiosRequestConfig,
	_config: AxiosRequestConfig = {},
): Promise<
	T & {
		_blob?: Blob
		httpStatus: AxiosResponse['status']
		axiosResponse: Omit<AxiosResponse, 'data' | 'status'>
	}
> => {
	const $config = {
		...config,
		..._config,
	}

	const {
		data,
		status: httpStatus,
		config: axiosConfig,
		headers,
		statusText,
		request,
	} = await AXIOS_INSTANCE($config)

	if (_config.responseType === 'blob') {
		// @ts-ignore
		return {
			_blob: data,
			httpStatus,
			axiosResponse: {
				config: axiosConfig,
				headers,
				statusText,
				request,
			},
		}
	}

	if (data.code !== undefined && data.code !== 0) {
		console.log(data.message ?? '接口错误')
		throw data
	}

	return {
		...data,
		httpStatus,
		axiosResponse: {
			config: axiosConfig,
			headers,
			statusText,
			request,
		},
	}
}
