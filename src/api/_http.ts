import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

const AXIOS_INSTANCE = axios.create({
	timeout: 60000,
})

AXIOS_INSTANCE.interceptors.response.use(
	(response) => response,
	(res) => {
		const { response, status } = res

		if (response === undefined) {
			throw res
		}

		if (status >= 400 && status < 600) {
			if (typeof response?.data === 'string' && response.data) {
				console.error(response?.data)
			} else {
				console.error(`网络错误：（${status}），请重试`)
			}
			throw res
		}

		return res
	},
)

export const _http = async <T>(
	config: AxiosRequestConfig,
	_config: AxiosRequestConfig & { tipWhenError?: boolean } = {},
): Promise<
	T & {
		httpStatus: AxiosResponse['status']
		axiosResponse: Omit<AxiosResponse, 'data' | 'status'>
	}
> => {
	const { tipWhenError, ...$config } = {
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

	if (data.code !== undefined && data.code !== 0) {
		if (tipWhenError !== false) {
			console.error(data.message ?? '接口错误')
		}
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
