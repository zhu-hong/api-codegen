import { _http } from '@/api/_http'
import type {
	CollectionDataResultEmployeeDto,
	CollectionDataResultLabelTemplateTypeDto,
	CollectionDataResultProcessSegmentDto,
	CollectionDataResultString,
	CollectionDataResultWorkCenterDto,
	CollectionDataResultWorkStationDto,
	DataResultBarCodeDto,
	DataResultBoolean,
	DataResultDateTime,
	DataResultEmployeeDto,
	DataResultEmployeePermissionDto,
	DataResultProductLotModelDto,
	DataResultString,
	DataResultUploadFileDto,
	DataResultWorkStationDto,
	LoginRequest,
	Result,
	UpdatePasswordRequest,
} from './_schemas.gen'
import type {
	ApiCommonBarcodeCreatePostParams,
	ApiCommonBarcodeValidateGetParams,
	ApiCommonDocCodesGetParams,
	ApiCommonDocNamesGetParams,
	ApiCommonEmployeeGetParams,
	ApiCommonLocationGetParams,
	ApiCommonLotmodelGetParams,
	ApiCommonNeedPrintGetParams,
	ApiCommonProcessCodesGetParams,
	ApiCommonProcessesGetParams,
	ApiCommonProcessNamesGetParams,
	ApiCommonProductCodesGetParams,
	ApiCommonProductNamesGetParams,
	ApiCommonProductVersionGetParams,
	ApiCommonUploadPostBody,
	ApiCommonUploadPostParams,
	ApiCommonUrlGetParams,
	ApiCommonWorkcenterGetParams,
	ApiCommonWorkstationsGetParams,
} from './common.schema'

/**
 * @summary 根据条码获取员工信息
 */
export const apiCommonEmployeeGet = (
	params?: ApiCommonEmployeeGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<DataResultEmployeeDto>(
		{ url: `/api/common/employee`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 所有员工信息
 */
export const apiCommonEmployeeAllGet = (
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultEmployeeDto>(
		{ url: `/api/common/employee/all`, method: 'GET' },
		options,
	)
}

/**
 * @summary 登录
 */
export const apiCommonLoginPost = (
	loginRequest: LoginRequest,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<DataResultEmployeePermissionDto>(
		{
			url: `/api/common/login`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			data: loginRequest,
		},
		options,
	)
}

/**
 * @summary 修改密码
 */
export const apiCommonUpdatePasswordPost = (
	updatePasswordRequest: UpdatePasswordRequest,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<Result>(
		{
			url: `/api/common/update/password`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			data: updatePasswordRequest,
		},
		options,
	)
}

/**
 * @summary 获取终端应用类型
 */
export const apiCommonOpstypeGet = (
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultString>(
		{ url: `/api/common/opstype`, method: 'GET' },
		options,
	)
}

/**
 * @summary 上传文件
 */
export const apiCommonUploadPost = (
	apiCommonUploadPostBody: ApiCommonUploadPostBody,
	params: ApiCommonUploadPostParams,
	options?: SecondParameter<typeof _http>,
) => {
	const formData = new FormData()
	formData.append(`File`, apiCommonUploadPostBody.File)

	return _http<DataResultUploadFileDto>(
		{
			url: `/api/common/upload`,
			method: 'POST',
			headers: { 'Content-Type': 'multipart/form-data' },
			data: formData,
			params,
		},
		options,
	)
}

/**
 * @summary 根据文件Key获取文件URL
 */
export const apiCommonUrlGet = (
	params?: ApiCommonUrlGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<DataResultString>(
		{ url: `/api/common/url`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 获取产品批号模型
 */
export const apiCommonLotmodelGet = (
	params?: ApiCommonLotmodelGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<DataResultProductLotModelDto>(
		{ url: `/api/common/lotmodel`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 获取产品已发布版本
 */
export const apiCommonProductVersionGet = (
	params?: ApiCommonProductVersionGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultString>(
		{ url: `/api/common/product/version`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 获取工艺信息
 */
export const apiCommonProcessesGet = (
	params?: ApiCommonProcessesGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultProcessSegmentDto>(
		{ url: `/api/common/processes`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 获取打印服务地址
 */
export const apiCommonPrintserverGet = (
	options?: SecondParameter<typeof _http>,
) => {
	return _http<DataResultString>(
		{ url: `/api/common/printserver`, method: 'GET' },
		options,
	)
}

/**
 * @summary 获取自定义标签类型
 */
export const apiCommonLabelTemplateTypeGet = (
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultLabelTemplateTypeDto>(
		{ url: `/api/common/label-template-type`, method: 'GET' },
		options,
	)
}

/**
 * @summary 获取操作是否需要打码
 */
export const apiCommonNeedPrintGet = (
	params?: ApiCommonNeedPrintGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<DataResultBoolean>(
		{ url: `/api/common/need-print`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 生产空的条码
 */
export const apiCommonBarcodeCreatePost = (
	params?: ApiCommonBarcodeCreatePostParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<DataResultBarCodeDto>(
		{ url: `/api/common/barcode/create`, method: 'POST', params },
		options,
	)
}

/**
 * @summary 验证空条码有效性
 */
export const apiCommonBarcodeValidateGet = (
	params?: ApiCommonBarcodeValidateGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<Result>(
		{ url: `/api/common/barcode/validate`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 根据工位/库位条码获取信息
 */
export const apiCommonLocationGet = (
	params: ApiCommonLocationGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<DataResultWorkStationDto>(
		{ url: `/api/common/location`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 根据工作中心获取该中心下的所有工位
 */
export const apiCommonWorkstationsGet = (
	params: ApiCommonWorkstationsGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultWorkStationDto>(
		{ url: `/api/common/workstations`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 获取所有产品编码
 */
export const apiCommonProductCodesGet = (
	params?: ApiCommonProductCodesGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultString>(
		{ url: `/api/common/product/codes`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 获取所有产品名称
 */
export const apiCommonProductNamesGet = (
	params?: ApiCommonProductNamesGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultString>(
		{ url: `/api/common/product/names`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 获取所有制程编号
 */
export const apiCommonProcessCodesGet = (
	params?: ApiCommonProcessCodesGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultString>(
		{ url: `/api/common/process/codes`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 获取所有制程名称
 */
export const apiCommonProcessNamesGet = (
	params?: ApiCommonProcessNamesGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultString>(
		{ url: `/api/common/process/names`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 获取所有文档编号
 */
export const apiCommonDocCodesGet = (
	params?: ApiCommonDocCodesGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultString>(
		{ url: `/api/common/doc/codes`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 获取所有文档名称
 */
export const apiCommonDocNamesGet = (
	params?: ApiCommonDocNamesGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultString>(
		{ url: `/api/common/doc/names`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 获取时间
 */
export const apiCommonSysTimeGet = (
	options?: SecondParameter<typeof _http>,
) => {
	return _http<DataResultDateTime>(
		{ url: `/api/common/sys/time`, method: 'GET' },
		options,
	)
}

/**
 * @summary 获取生产单位信息
 */
export const apiCommonWorkcenterGet = (
	params?: ApiCommonWorkcenterGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultWorkCenterDto>(
		{ url: `/api/common/workcenter`, method: 'GET', params },
		options,
	)
}
