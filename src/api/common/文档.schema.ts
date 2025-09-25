export type ApiMdByproductGetParams = {
	/**
	 * 产品Id
	 */
	productId?: string
	/**
	 * 产品版本
	 */
	productVersion?: string
	/**
	 * 文档类型，可选，如果为空则返回所有类型的文档，可选择为"加工"和"检验"
	 */
	type?: string
}

export type ApiMdByprocessGetParams = {
	/**
	 * 工艺Id
	 */
	processId?: string
	/**
	 * 文档类型，可选，如果为空则返回所有类型的文档，可选择为"加工"和"检验"
	 */
	type?: string
}

export type ApiMdDefaultGetParams = {
	productId?: string
	productVersion?: string
	/**
	 * 工艺Id
	 */
	processId?: string
	/**
	 * 文档类型，可选，如果为空则返回所有类型的文档，可选择为"加工"和"检验"
	 */
	type?: string
}

export type ApiMdFindGetParams = {
	/**
	 * 产品编码
	 */
	productCode?: string
	/**
	 * 产品名称
	 */
	productName?: string
	/**
	 * 产品规格
	 */
	productSpec?: string
	/**
	 * 制程编号
	 */
	processCode?: string
	/**
	 * 制程名称
	 */
	processName?: string
	/**
	 * 文档编号
	 */
	docCode?: string
	/**
	 * 文档名称
	 */
	docName?: string
	/**
	 * 文档类型，取值为：产品图纸、作业指导书、检验指导书、其他
	 */
	docType?: string
	/**
	 * 开始时间（上传时间时间段）
	 */
	startTime?: string
	/**
	 * 结束时间（上传时间时间段）
	 */
	endTime?: string
}
