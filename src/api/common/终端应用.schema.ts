export type ApiOpsWorkshopsGetParams = {
	/**
	 * 当前页，如果为null则返回所有数据项
	 */
	page?: number
	/**
	 * 页大小，如果为null则返回所有数据项
	 */
	size?: number
}

export type ApiOpsWorkCenterGetParams = {
	/**
	 * 存储、加工、检验
	 */
	type?: string
	/**
	 * 当type等于存储时，可选项：线边库、普通库；当type等于检验时，可选项选项：实验室、检验工站
	 */
	catagory?: string
}

export type ApiOpsListGetParams = {
	/**
	 * 区域Id
	 */
	workShopId: string
	/**
	 * 一体机类型：可选值为生产工作站;质量工作站;维护工作站。如果该值为空则返回该区域下的所有一体机
	 */
	opsType?: string
}

export type ApiOpsVerifyGetParams = {
	/**
	 * 终端口令
	 */
	password: string
}
