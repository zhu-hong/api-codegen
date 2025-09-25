import { _http } from '@/api/_http'
import type {
	CollectionDataResultDocumentDto,
	DataResultDocumentDto,
} from './_schemas.gen'
import type {
	ApiMdByprocessGetParams,
	ApiMdByproductGetParams,
	ApiMdDefaultGetParams,
	ApiMdFindGetParams,
} from './文档.schema'

/**
 * @summary 根据产品获取文档
 */
export const apiMdByproductGet = (
	params?: ApiMdByproductGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultDocumentDto>(
		{ url: `/api/md/byproduct`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 根据工序获取文档
 */
export const apiMdByprocessGet = (
	params?: ApiMdByprocessGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultDocumentDto>(
		{ url: `/api/md/byprocess`, method: 'GET', params },
		options,
	)
}

/**
 * @summary 获取默认文档
 */
export const apiMdDefaultGet = (
	params?: ApiMdDefaultGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<DataResultDocumentDto>(
		{ url: `/api/md/default`, method: 'GET', params },
		options,
	)
}

/**
 * 所有过滤条件都可以为空，如果为空则不对该字段进行过滤
 * @summary 查找文档
 */
export const apiMdFindGet = (
	params?: ApiMdFindGetParams,
	options?: SecondParameter<typeof _http>,
) => {
	return _http<CollectionDataResultDocumentDto>(
		{ url: `/api/md/find`, method: 'GET', params },
		options,
	)
}
