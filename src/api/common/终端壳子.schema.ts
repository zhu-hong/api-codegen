export type SvcaddressGetParams = {
	/**
	 * 终端类型
	 */
	client?: string
}

export type RegisterPostParams = {
	/**
	 * 终端类型
	 */
	client?: string
	/**
	 * 终端唯一标识
	 */
	deviceId?: string
}

export type ConfigGetParams = {
	/**
	 * 终端类型
	 */
	client?: string
	/**
	 * 终端操作系统
	 */
	os?: string
	/**
	 * 终端编码
	 */
	deviceCode?: string
}
