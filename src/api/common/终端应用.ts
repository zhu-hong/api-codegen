import { _http } from '@/api/_http'
import type {
	CollectionDataResultOPSDto,
	CollectionDataResultWorkCenterDto,
	CollectionDataResultWorkShopDto,
	CollectionDataResultWorkStationDto,
	Result,
} from './_schemas.gen'
import type {
	ApiOpsListGetParams,
	ApiOpsVerifyGetParams,
	ApiOpsWorkCenterGetParams,
	ApiOpsWorkshopsGetParams,
} from './终端应用.schema'

/**
 * @summary 获取区域列表
 */
export const apiOpsWorkshopsGet = (
	params?: ApiOpsWorkshopsGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultWorkShopDto>(
		{ url: `/api/ops/workshops`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 获取工作中心列表
 */
export const apiOpsWorkCenterGet = (
	params?: ApiOpsWorkCenterGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultWorkCenterDto>(
		{ url: `/api/ops/work-center`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 获取区域下一体机列表
 */
export const apiOpsListGet = (
	params: ApiOpsListGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultOPSDto>(
		{ url: `/api/ops/list`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 获取一体机关联的工作中心列表
 */
export const apiOpsOpsIdWorkcenterGet = (
	opsId: string,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultWorkCenterDto>(
		{ url: `/api/ops/${opsId}/workcenter`, method: 'GET' },
		options,
	)
}

/**
 * @summary 获取一体机关联的工位
 */
export const apiOpsOpsIdWorkstationGet = (
	opsId: string,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultWorkStationDto>(
		{ url: `/api/ops/${opsId}/workstation`, method: 'GET' },
		options,
	)
}

/**
 * @summary 验证终端口令
 */
export const apiOpsVerifyGet = (
	params: ApiOpsVerifyGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<Result>(
		{ url: `/api/ops/verify`, method: 'GET', params },
		options,
	)
}
