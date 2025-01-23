import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

const AXIOS_INSTANCE = axios.create({
	baseURL: '',
	timeout: 60000,
})

AXIOS_INSTANCE.interceptors.request.use((config) => {
	return config
})

AXIOS_INSTANCE.interceptors.response.use(
	(response) => {
		return response
	},
	(response) => {
		if (!(response instanceof AxiosError)) {
			console.log('未知错误')
			throw response
		}

		const { status, message } = response

		if (status && (status < 400 || status >= 600)) return response

		// 处理 400/500 类错误

		if (status === 401) {
			console.log('登录失效')
			throw response
		}

		console.log(message ?? '网络错误')
		throw response
	},
)

export const _http = async <T>(
	config: AxiosRequestConfig,
	_config?: AxiosRequestConfig,
): Promise<{
	data: T
	httpStatus: AxiosResponse['status']
	axiosResponse: Omit<AxiosResponse, 'data' | 'status'>
}> => {
	const $config = {
		...config,
		..._config,
	}

	const response = await AXIOS_INSTANCE($config)

	const { data, status: httpStatus, ...axiosResponse } = response

	// 处理业务code错误
	const code = data?.code

	// 正常响应或者是文件流之类
	if (code === 0 || code === undefined || code === null) {
		return {
			data,
			httpStatus,
			axiosResponse,
		}
	}

	console.log(data?.msg || '服务错误')
	throw data ?? response
}
