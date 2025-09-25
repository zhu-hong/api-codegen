import type { AttatchmentType } from './_schemas.gen'
export type ApiCommonEmployeeGetParams = {
	/**
	 * 员工条码
	 */
	code?: string
}

export type ApiCommonUploadPostBody = {
	/** 文件 */
	File: Blob
}

export type ApiCommonUploadPostParams = {
	/**
	 * 附件类型
	 */
	Type: AttatchmentType
	/**
	 * 关联对象Id
	 */
	ObjectId?: string
}

export type ApiCommonUrlGetParams = {
	/**
	 * 文件Key，上传文件时生成的唯一Key
	 */
	fileKey?: string
}

export type ApiCommonLotmodelGetParams = {
	/**
	 * 产品Id
	 */
	productId?: string
	/**
	 * 类型：1、自制（生产）；2、采购
	 */
	type?: number
}

export type ApiCommonProductVersionGetParams = {
	/**
	 * 产品Id
	 */
	productId?: string
}

export type ApiCommonProcessesGetParams = {
	/**
	 * 产品Id
	 */
	productId?: string
	/**
	 * 产品版本
	 */
	productVersion?: string
}

export type ApiCommonNeedPrintGetParams = {
	/**
 * 操作名称，一下为有效的操作名称：
            物料标记
            批次拆分
            批次合并
            采购收料
            委外收料
            委外制程收料
            生产报工
 */
	operation?: string
}

export type ApiCommonBarcodeCreatePostParams = {
	/**
	 * 条码编码，如果提供，则使用提供的编码作为空条码的编码
	 */
	code?: string
}

export type ApiCommonBarcodeValidateGetParams = {
	/**
	 * 空条码编码
	 */
	code?: string
}

export type ApiCommonLocationGetParams = {
	/**
	 * 工位/库位条码
	 */
	code: string
}

export type ApiCommonWorkstationsGetParams = {
	/**
	 * 工作中心Id
	 */
	workcenterId: string
}

export type ApiCommonProductCodesGetParams = {
	/**
	 * 关键字（可为空，如果为空则返回所有产品编码）
	 */
	keyword?: string
}

export type ApiCommonProductNamesGetParams = {
	/**
	 * 关键字（可为空，如果为空则返回所有产品名称）
	 */
	keyword?: string
}

export type ApiCommonProcessCodesGetParams = {
	/**
	 * 关键字（可为空，如果为空则返回所有制程编号）
	 */
	keyword?: string
}

export type ApiCommonProcessNamesGetParams = {
	/**
	 * 关键字（可为空，如果为空则返回所有制程名称）
	 */
	keyword?: string
}

export type ApiCommonDocCodesGetParams = {
	/**
	 * 关键字（可为空，如果为空则返回所有文档编号）
	 */
	keyword?: string
}

export type ApiCommonDocNamesGetParams = {
	/**
	 * 关键字（可为空，如果为空则返回所有文档名称）
	 */
	keyword?: string
}

export type ApiCommonWorkcenterGetParams = {
	workshopId?: string
}
