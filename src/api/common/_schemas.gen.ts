/**
 * 附件类型<br />&nbsp; Inspection = 0<br />&nbsp; Defect = 1<br />
 */
export type AttatchmentType =
	(typeof AttatchmentType)[keyof typeof AttatchmentType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AttatchmentType = {
	Inspection: 'Inspection',
	Defect: 'Defect',
} as const

/**
 * 条码
 */
export interface BarCodeDto {
	/** 唯一ID */
	id?: string
	/**
	 * 编号
	 * @nullable
	 */
	code?: string | null
	/**
	 * 关联时间
	 * @nullable
	 */
	associatedTime?: string | null
	/**
	 * 物料、人员、设备、单据、位置、容器
	 * @nullable
	 */
	type?: string | null
	/**
	 * 关联对象ID
	 * @nullable
	 */
	targetId?: string | null
	/**
	 * 关联对象编码
	 * @nullable
	 */
	targetCode?: string | null
	/** 状态 */
	isAssociated?: boolean
	/**
	 * 创建时间
	 * @nullable
	 */
	createTime?: string | null
	/**
	 * 更新时间
	 * @nullable
	 */
	updateTime?: string | null
}

export interface CollectionDataResultDocumentDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	total?: number
	/** @nullable */
	data?: DocumentDto[] | null
}

export interface CollectionDataResultEmployeeDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	total?: number
	/** @nullable */
	data?: EmployeeDto[] | null
}

export interface CollectionDataResultLabelTemplateTypeDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	total?: number
	/** @nullable */
	data?: LabelTemplateTypeDto[] | null
}

export interface CollectionDataResultOPSDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	total?: number
	/** @nullable */
	data?: OPSDto[] | null
}

export interface CollectionDataResultProcessSegmentDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	total?: number
	/** @nullable */
	data?: ProcessSegmentDto[] | null
}

export interface CollectionDataResultString {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	total?: number
	/** @nullable */
	data?: string[] | null
}

export interface CollectionDataResultWorkCenterDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	total?: number
	/** @nullable */
	data?: WorkCenterDto[] | null
}

export interface CollectionDataResultWorkShopDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	total?: number
	/** @nullable */
	data?: WorkShopDto[] | null
}

export interface CollectionDataResultWorkStationDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	total?: number
	/** @nullable */
	data?: WorkStationDto[] | null
}

/**
 * 携带对象数据的返回格式
 */
export interface DataResultBarCodeDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	data?: BarCodeDto
}

/**
 * 携带对象数据的返回格式
 */
export interface DataResultBoolean {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	data?: boolean
}

/**
 * 携带对象数据的返回格式
 */
export interface DataResultDateTime {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	data?: string
}

/**
 * 携带对象数据的返回格式
 */
export interface DataResultDocumentDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	data?: DocumentDto
}

/**
 * 携带对象数据的返回格式
 */
export interface DataResultEmployeeDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	data?: EmployeeDto
}

/**
 * 携带对象数据的返回格式
 */
export interface DataResultEmployeePermissionDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	data?: EmployeePermissionDto
}

/**
 * 携带对象数据的返回格式
 */
export interface DataResultProductLotModelDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	data?: ProductLotModelDto
}

/**
 * 携带对象数据的返回格式
 */
export interface DataResultString {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	/** @nullable */
	data?: string | null
}

/**
 * 携带对象数据的返回格式
 */
export interface DataResultTerminalConfigDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	data?: TerminalConfigDto
}

/**
 * 携带对象数据的返回格式
 */
export interface DataResultUploadFileDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	data?: UploadFileDto
}

/**
 * 携带对象数据的返回格式
 */
export interface DataResultWorkStationDto {
	code?: ResultCode
	/** @nullable */
	message?: string | null
	data?: WorkStationDto
}

/**
 * 文档信息
 */
export interface DocumentDto {
	/**
	 * 文档编号
	 * @nullable
	 */
	code?: string | null
	/**
	 * 文档名称
	 * @nullable
	 */
	name?: string | null
	/**
	 * 文档版本号
	 * @nullable
	 */
	version?: string | null
	/**
	 * 文档类型
	 * @nullable
	 */
	type?: string | null
	/**
	 * 文档类别编号
	 * @nullable
	 */
	catagoryCode?: string | null
	/**
	 * 文档类别名称，
	 * @nullable
	 */
	catagoryName?: string | null
	/**
	 * 产品编码
	 * @nullable
	 */
	productCode?: string | null
	/**
	 * 产品规格
	 * @nullable
	 */
	productSpec?: string | null
	/**
	 * 产品名称
	 * @nullable
	 */
	productName?: string | null
	/**
	 * 产品版本
	 * @nullable
	 */
	productVersion?: string | null
	/**
	 * 工艺制程编码
	 * @nullable
	 */
	processCode?: string | null
	/**
	 * 工艺制程名称
	 * @nullable
	 */
	processName?: string | null
	/**
	 * 文档Key
	 * @nullable
	 */
	fileKey?: string | null
	/**
	 * 文件名称
	 * @nullable
	 */
	fileName?: string | null
	/**
	 * 文件访问URL
	 * @nullable
	 */
	fileUrl?: string | null
	/**
	 * 上传时间
	 * @nullable
	 */
	uploadTime?: string | null
}

/**
 * 职工信息
 */
export interface EmployeeDto {
	/** Id */
	id?: string
	/**
	 * 工号(员工编号)
	 * @nullable
	 */
	code?: string | null
	/**
	 * 姓名
	 * @nullable
	 */
	name?: string | null
	/**
	 * 头像
	 * @nullable
	 */
	portrait?: string | null
	/** 性别 */
	sex?: boolean
	/**
	 * 英文名称
	 * @nullable
	 */
	englishName?: string | null
}

/**
 * 职工信息（带终端权限）
 */
export interface EmployeePermissionDto {
	/** Id */
	id?: string
	/**
	 * 工号(员工编号)
	 * @nullable
	 */
	code?: string | null
	/**
	 * 姓名
	 * @nullable
	 */
	name?: string | null
	/**
	 * 头像
	 * @nullable
	 */
	portrait?: string | null
	/** 性别 */
	sex?: boolean
	/**
	 * 英文名称
	 * @nullable
	 */
	englishName?: string | null
	/**
	 * 终端权限,只返回终端下有权限的功能项
	 * @nullable
	 */
	permissions?: TerminalPermissionDto[] | null
}

/**
 * 自定义标签样式类型
 */
export interface LabelTemplateTypeDto {
	/** Id */
	id?: string
	/**
	 * 名称
	 * @nullable
	 */
	name?: string | null
}

/**
 * 登录请求数据
 */
export interface LoginRequest {
	/**
	 * 用户名
	 * @minLength 2
	 * @maxLength 100
	 */
	userNme: string
	/**
	 * 密码
	 * @minLength 2
	 * @maxLength 100
	 */
	password: string
}

/**
 * OPS信息
 */
export interface OPSDto {
	/**
	 * Id
	 * @nullable
	 */
	id?: string | null
	/**
	 * 编码
	 * @nullable
	 */
	code?: string | null
	/**
	 * 名称
	 * @nullable
	 */
	name?: string | null
}

/**
 * 工艺信息
 */
export interface ProcessSegmentDto {
	/** Id */
	id?: string
	/**
	 * 编号
	 * @nullable
	 */
	code?: string | null
	/**
	 * 名称
	 * @nullable
	 */
	name?: string | null
	/**
	 * 序列号
	 * @nullable
	 */
	sno?: string | null
	/**
	 * 产品Id
	 * @nullable
	 */
	productId?: string | null
	/**
	 * 产品版本
	 * @nullable
	 */
	version?: string | null
	/**
	 * 加工车间名称
	 * @nullable
	 */
	workShopName?: string | null
	/**
	 * 工作中心
	 * @nullable
	 */
	workCenterTypeName?: string | null
}

export interface ProductLotModelDto {
	/** 是否是自定义批模型 */
	isCustom?: boolean
}

/**
 * 只有成功失败的返回数据格式
 */
export interface Result {
	code?: ResultCode
	/** @nullable */
	message?: string | null
}

/**
 * 错误码<br />&nbsp; Ok = 0<br />&nbsp; Unkown = 1<br />&nbsp; NotImplement = 2<br />&nbsp; Error = 3<br />&nbsp; ParamenterInvalid = 400<br />&nbsp; Forbidden = 403<br />&nbsp; ObjectNotExit = 404<br />&nbsp; SCADAServerNotCofnigurated = 600<br />&nbsp; UserNotExit = 700<br />&nbsp; UserPasswordNotMatch = 701<br />&nbsp; UserHasNotEmplyeeData = 702<br />&nbsp; EmplyeeNotExist = 703<br />&nbsp; ErpPostFail = 999<br />&nbsp; OPSSettingEmpty = 1000<br />&nbsp; OPSSettingInvalid = 1001<br />&nbsp; WorkCenterNotExist = 1002<br />&nbsp; BarCodeNotExist = 1003<br />&nbsp; BarCodeIsEmpty = 1004<br />&nbsp; BarCodeTypeNotMatch = 1005<br />&nbsp; EmployeeNotExist = 1006<br />&nbsp; EmployeeHasTurnover = 1007<br />&nbsp; EmployeeAlreadySignIn = 1008<br />&nbsp; WorkStationNotExist = 1009<br />&nbsp; OPSNotExist = 1010<br />&nbsp; WorkCenterNotScheduled = 1011<br />&nbsp; CodingRuleNotExist = 1012<br />&nbsp; CodingRuleItemNotExist = 1013<br />&nbsp; CodingFlowCodeUseup = 1014<br />&nbsp; ProductionTaskNotFound = 1015<br />&nbsp; WorkCenterProductionNotFound = 1016<br />&nbsp; ProductNotConfigFAI = 1017<br />&nbsp; ProductNotConfigPPI = 1018<br />&nbsp; ProductNotConfigFPI = 1019<br />&nbsp; ProductionTaskNotStarted = 1020<br />&nbsp; WorkStationProductionFAIHasPassed = 1021<br />&nbsp; WorkStationProductionFAIInProcessing = 1022<br />&nbsp; WorkStationProductionFAIHasCreated = 1023<br />&nbsp; ProductSublotNotFound = 1024<br />&nbsp; ProductSublotInWarehouse = 1025<br />&nbsp; ProductSublotInSpot = 1026<br />&nbsp; WorkStationNotMatchProductionTask = 1027<br />&nbsp; EquipmentNotMatchProcessSegment = 1028<br />&nbsp; ProductSubLotNotInPublishStatus = 1029<br />&nbsp; ProductSubLotNotInSameProductionOrder = 1030<br />&nbsp; ProductSubLotNotPurchaseProductionOutSource = 1031<br />&nbsp; ProductSubLotNotInSameProductionOrder2 = 1032<br />&nbsp; ProductSublotNotInWorkCenter = 1100<br />&nbsp; InspectionTaskNotExist = 1101<br />&nbsp; ProductSublotCanNotFeeding = 1102<br />&nbsp; NoEmpolyeeSignedIn = 1118<br />&nbsp; NoEmployeeSignedIn = 1119<br />&nbsp; ProductionTaskNotExist = 1200<br />&nbsp; ProductionTaskNotMatching = 1201<br />&nbsp; ProductionPlanPaused = 1202<br />&nbsp; FeedingMaterialInvalid = 1203<br />&nbsp; PrapareFormHasCosumed = 1204<br />&nbsp; PrapareWorkOrderNotMatch = 1205<br />&nbsp; TerminalTypeInvalid = 2000<br />&nbsp; TerminalOSInvalid = 2001<br />&nbsp; ProductionTaskAlreadyRunning = 3002<br />&nbsp; ProductionTaskNotTop = 3003<br />&nbsp; ProductionTaskNotReview = 3004<br />&nbsp; OtherProductionTaskAlreadyRunning = 3005<br />&nbsp; WorkCenterNotSignedIn = 3006<br />&nbsp; WorkCenterHasNoWorkStations = 3007<br />&nbsp; ProductionTaskAmountHasCompleted = 3008<br />&nbsp; ProductionTaskNotRunning = 3009<br />&nbsp; ProductionTaskNotWithdraw = 3010<br />&nbsp; ProductSublotNotExist = 3011<br />&nbsp; EquipmentNotAssociateWorkStation = 3012<br />&nbsp; MROLedgerNotExist = 3013<br />&nbsp; MROHasInstalled = 3014<br />&nbsp; MROLedgerFaulted = 3015<br />&nbsp; MROLedgerHasScrap = 3016<br />&nbsp; MROLedgerHasSealed = 3017<br />&nbsp; MRONotInstalled = 3018<br />&nbsp; MROIsInUse = 3019<br />&nbsp; MROMismatching = 3020<br />&nbsp; ParamsMismatching = 3021<br />&nbsp; WithdrawAmountCanNotGreaterThenSubLotAmount = 3022<br />&nbsp; CanNotWithdraw = 3023<br />&nbsp; ProductionPlanProcessSegmentNotExist = 3024<br />&nbsp; MROLedgerMaitaining = 3025<br />&nbsp; MROLedgerInStorage = 3026<br />&nbsp; MaterialNotMatch = 3027<br />&nbsp; EquipNotSetup = 3028<br />&nbsp; FAIInInspecting = 3029<br />&nbsp; FAINotCreate = 3030<br />&nbsp; AMOrderNotFound = 3031<br />&nbsp; AMOrderItemNotFound = 3032<br />&nbsp; WorkStationProductionAlreadyRunning = 3033<br />&nbsp; AMOrderHasNotExecuted = 3034<br />&nbsp; EquipmentSetupNotExecuted = 3035<br />&nbsp; FAIOrderNotExecuted = 3036<br />&nbsp; FeedingNotExecuted = 3037<br />&nbsp; ProductNotFound = 3038<br />&nbsp; ProductLotModelNotFound = 3039<br />&nbsp; CustomLotNotProvided = 3040<br />&nbsp; ProductLotNotFound = 3041<br />&nbsp; ProductLotModelConfigError = 3042<br />&nbsp; ProcessConfigError = 3043<br />&nbsp; PersonNotMatch = 3044<br />&nbsp; FAIAlreadyCreated = 3045<br />&nbsp; NotNeedFAI = 3046<br />&nbsp; MROTypeNotMatch = 3100<br />&nbsp; MROChildCanNotUninstall = 3101<br />&nbsp; NoEquipmentConfigurate = 3200<br />&nbsp; ChildMROCanNotInstallSeparately = 3201<br />&nbsp; WorkStationProductionNotExist = 3202<br />&nbsp; WorkStationProductionNotStart = 3203<br />&nbsp; BarCodeInvalid = 4000<br />&nbsp; NotConfigBarCodeCodingRule = 5000<br />&nbsp; WorkCenterNotStorage = 5001<br />&nbsp; SupplierNotExist = 5002<br />&nbsp; ProductNotExist = 5003<br />&nbsp; ReceiptOnlyInLineBuffer = 5004<br />&nbsp; WorkCenterNotLineBuffer = 5005<br />&nbsp; WorkCenterNotSimpleInventory = 5006<br />&nbsp; MaterialPreparationNotExist = 5007<br />&nbsp; MaterialPreparationHasClosed = 5008<br />&nbsp; NoNeedPreparation = 5009<br />&nbsp; SomeSublotCanNotPrepare = 5010<br />&nbsp; MaterialPraparationOverage = 5011<br />&nbsp; InspectionTaskNotFound = 6000<br />&nbsp; ProductSubLotScraped = 6001<br />&nbsp; WorkCenterIsNotFloorStorage = 6002<br />&nbsp; WorkCenterIsNotVerticalStorage = 6003<br />&nbsp; ReceiptNotExist = 6004<br />&nbsp; ReceiptAlreadyReviewed = 6005<br />&nbsp; ProductSubLotHasDefect = 6006<br />&nbsp; ProductSubLotHasFeeding = 6007<br />&nbsp; FixtureReceiptFormNotFound = 7000<br />&nbsp; FixtureLedgerNotExist = 7001<br />&nbsp; FixtureReceiptCountNotMatch = 7002<br />&nbsp; FixtureReceiptClassNotMatch = 7003<br />&nbsp; SomeFixtureNeedNotRestore = 7004<br />&nbsp; SomeFixtureInMaintaining = 7005<br />&nbsp; SomeFixtureInRepairing = 7006<br />&nbsp; SomeFixtureScrapped = 7007<br />&nbsp; SomeFixtureInUsing = 7008<br />&nbsp; SomeFixtureNotInStorage = 7009<br />&nbsp; SomeFixtureSealed = 7010<br />&nbsp; FixtureReceiptFormHasClosed = 7011<br />&nbsp; PurchaseOrderNotExist = 8000<br />&nbsp; SupplierNotMatchPurchaseOrder = 8001<br />&nbsp; ProductNotMatchPurchaseOrder = 8002<br />&nbsp; SublotNotMatchPurchaseOrder = 8003<br />&nbsp; SublotAmountMoreThenPurchaseAmount = 8004<br />&nbsp; SupplierCodeResovleError = 8005<br />&nbsp; IQCNotCOnfig = 8006<br />&nbsp; GetLatestProductVersionError = 8007<br />&nbsp; ProductSublotCanNotInbound = 8008<br />&nbsp; WorkCenterNotConfigCatagory = 8009<br />&nbsp; SomeSubLotAlreadyReceived = 8010<br />&nbsp; ReceiptNotReviewed = 8011<br />&nbsp; ReceiptNotReviewPassed = 8012<br />&nbsp; SublotNotInSimpleLocation = 8013<br />&nbsp; SublotNotBelongToOnePurchaseOrder = 8014<br />&nbsp; SubLotAlreadyReceived = 8015<br />&nbsp; SomeSubLotNotReviewedReturn = 8016<br />&nbsp; SomeProductSublotNotExist = 8017<br />&nbsp; ProductSublotNotInStorage = 8018<br />&nbsp; ProductSublotNotInBufferLine = 8019<br />&nbsp; ProductSublotNotInMaterialForm = 8020<br />&nbsp; ProductSublotNotInSimpleStorage = 8021<br />&nbsp; ProductSublotNotInProductionTaskBOM = 8022<br />&nbsp; ProductSublotInspectionNotPassed = 8023<br />&nbsp; WorkStationNotProduction = 8024<br />&nbsp; WorkStationNotBuffline = 8025<br />&nbsp; SomeProductSubLotNotInBOM = 8026<br />&nbsp; ProductSubLotAlreadyInSimpleStorage = 8027<br />&nbsp; ProductSubLotNotInFlatStorage = 8028<br />&nbsp; ProductSubLotNotInSameStorage = 8029<br />&nbsp; EmpolyeeNotSignedIn = 9000<br />&nbsp; AndonRecordAlreadyExisted = 10000<br />&nbsp; AndonDefinitionNotExist = 10001<br />&nbsp; AndonRecordNotExist = 10002<br />&nbsp; AndonResponserNotMatch = 10003<br />&nbsp; AndonAlreadyReponsed = 10004<br />&nbsp; AndonAlreadyResolved = 10005<br />&nbsp; AndonNotResponsed = 10006<br />&nbsp; AndonResolving = 10007<br />&nbsp; EquipmentNotExist = 10008<br />&nbsp; AndonNotResolved = 10009<br />&nbsp; BarCodeAlreadyBound = 11009<br />&nbsp; MaintainOrderHasCompleted = 12000<br />&nbsp; MaintainOrderNotReviewed = 12001<br />&nbsp; MROIsRepairing = 12002<br />&nbsp; FixtureIsRepairing = 12003<br />&nbsp; FixtureIsUsinging = 12004<br />&nbsp; MROHasScraped = 12005<br />&nbsp; FixtureHasScraped = 12006<br />&nbsp; MRONeedNotMaintain = 12007<br />&nbsp; MRONeedNotRepair = 12008<br />&nbsp; MROClassNotFound = 12009<br />&nbsp; MROClassAlreadyInWorkCenter = 12010<br />&nbsp; FixtureIsMaintaining = 12011<br />&nbsp; MROIsMaintaining = 12012<br />&nbsp; OtherMaintainIsProcessing = 12013<br />&nbsp; FixtureNotNeedCalibrate = 12014<br />&nbsp; MITIsCalibrating = 12015<br />&nbsp; MITHasScraped = 12016<br />&nbsp; MITIsReparing = 12017<br />&nbsp; MITIsSealed = 12018<br />&nbsp; MROIsSealed = 12019<br />&nbsp; MITWaitForValidate = 12020<br />&nbsp; MITWaitForReview = 12021<br />&nbsp; MRONeedNotCalibrate = 12022<br />&nbsp; MITNeedNotMaintain = 12023<br />&nbsp; FixtureIsSealed = 12024<br />&nbsp; FixtureWaitForValidate = 12025<br />&nbsp; FixtureHasFault = 12026<br />&nbsp; CanlibrationOrderNotFound = 12027<br />&nbsp; MRONotNeedCanlibrate = 12028<br />&nbsp; MITNotNeedCanlibrate = 12029<br />&nbsp; OtherCanlibrationIsProcessing = 12030<br />&nbsp; PMOrderNotReview = 13000<br />&nbsp; OperatorNotFound = 13001<br />&nbsp; SubLotWaitforProcessNotFound = 14000<br />&nbsp; ParallelOutsourceProcessNotSupport = 14001<br />&nbsp; SubLotNotWIP = 14002<br />&nbsp; OutsourceProductionTaskNotFound = 14003<br />&nbsp; SubLotIsLocked = 14004<br />&nbsp; EmptyBarCodeNotExist = 14005<br />&nbsp; LogisticsActivityNotExist = 14006<br />&nbsp; SubLotIsApproved = 14007<br />&nbsp; SubLotIsUnderInspection = 14008<br />&nbsp; SubLotHasPublished = 14009<br />&nbsp; SubLotIsBlocked = 14010<br />&nbsp; SubLotLocationNotMatch = 14011<br />&nbsp; LogisticsTransportionTargetNotMatch = 14012<br />&nbsp; ProductProcessSegmentNotExist = 14013<br />&nbsp; BarCodeWithSameCodeAlreadyExist = 14014<br />&nbsp; HasNoAvailibleSubLot = 14015<br />&nbsp; TrayCodeNotAssociatedAnySubLot = 14016<br />&nbsp; BarCodeIsNotTrayOrSubLot = 14017<br />&nbsp; MROIsInInspectoin = 14018<br />&nbsp; MROIsInBlocking = 14019<br />&nbsp; MROLocationNotMatch = 14020<br />&nbsp; EmptyBarCodeInvalid = 14021<br />&nbsp; BarCodeAlreadyExistWithSameCode = 14022<br />&nbsp; InspectionTaskWithPurchaseReceiptNotFound = 14023<br />&nbsp; PurchseReceiptNeedNotReview = 14024<br />&nbsp; TargetLocationNotExist = 14025<br />&nbsp; ProductionNotProcessTask = 14026<br />&nbsp; ProductionHasNoSubTasks = 14027<br />&nbsp; ThisProcessNotAllowedFedding = 14028<br />&nbsp; ThisProcessNotAllowedOutput = 14029<br />&nbsp; ShippingDocumentNotFound = 14030<br />&nbsp; MaterialNotInShippingDocument = 14031<br />&nbsp; NotNeedVerifyCustomerCertification = 14032<br />&nbsp; CustomerCertificationProductNotMatch = 14033<br />&nbsp; ShippingDocumentCompleted = 14034<br />&nbsp; NeitherCeriticationNorBasketNo = 14035<br />&nbsp; PrintLabelTemplateNotConfigrated = 14036<br />&nbsp; PlanBomNotExist = 14037<br />&nbsp; SinglePartNotExist = 15001<br />&nbsp; StatusIsNotNormal = 15002<br />&nbsp; ProductionStatusIsNotNormal = 15003<br />&nbsp; ThisProcessSegmentIsProcessed = 15004<br />&nbsp; VerifyProcessSegmentNotProcess = 15005<br />&nbsp; FeedingAreaSublotNotExist = 15006<br />&nbsp; SublotScannedAmountExceedsLimit = 15007<br />&nbsp; SinglePartScanInvalid = 15008<br />&nbsp; NotAllowedScan = 15009<br />&nbsp; InvalidStatus = 15010<br />&nbsp; LaserMarkingNotConfigured = 15011<br />&nbsp; LaserMarkingPlainCodeNotConfigured = 15012<br />&nbsp; LaserMarkingPlainCodeAgainstTheRules = 15013<br />&nbsp; BarcodeQuantityDiscrepancy = 15014<br />&nbsp; NeedTaskCodeOrWorkcenterId = 15015<br />&nbsp; ScanOnlySupportsSingleTaskMode = 15016<br />&nbsp; StartTaskFirst = 15017<br />&nbsp; NotSinglePieceManagement = 15018<br />&nbsp; SublotMarkedAmountExceedsLimit = 15019<br />&nbsp; NeedQRCodeOrPlainCode = 15020<br />&nbsp; SinglePartAlreadyExist = 15021<br />&nbsp; ProductionPlanNotExist = 15022<br />&nbsp; ProductionOrderNotExist = 15023<br />&nbsp; QRCodeHasScan = 15024<br />&nbsp; InspectOnlySupportsSingleTaskMode = 15025<br />&nbsp; NotAllowedInspect = 15026<br />&nbsp; PneumaticGaugeNotConfiguration = 15027<br />&nbsp; PneumaticGaugeConfigurationDoNotMatch = 15028<br />&nbsp; SinglePartNotGood = 15029<br />&nbsp; SinglePartIsInspecting = 15030<br />&nbsp; ProductionPlanNotLeftLabelAmount = 15031<br />&nbsp; ProductionPlanNotAllowLabel = 15032<br />&nbsp; ProductionPlanBomNotAllowLabel = 15033<br />&nbsp; ProductionPlanMoreThanLeftLabelAmount = 15034<br />&nbsp; ChildProductionPlanCanotMark = 15035<br />&nbsp; ProductionTaskMaterialNotExist = 16000<br />&nbsp; ProductionPlanSubLotMix = 16001<br />&nbsp; ReceiptPrepCardNotExist = 16002<br />&nbsp; WithdrawAmountCanNotLessThenZero = 16003<br />&nbsp; TrayNotHasSublot = 16004<br />&nbsp; ProductSubLotWithoutTask = 16005<br />&nbsp; MobileOPSNotSupported = 16006<br />&nbsp; ProductSubLotHasOutput = 16007<br />&nbsp; WorkCenterWithoutType = 16008<br />&nbsp; ProductSubLotNotInPublishOrWip = 16009<br />&nbsp; MaterialMarkNeedLot = 16010<br />&nbsp; InspectionSampleNeedLevel = 16011<br />&nbsp; ProductSubLotNotInInspectionStatus = 16012<br />&nbsp; ProductSubLotNotDefect = 16013<br />&nbsp; ProductSubLotMustSame = 16014<br />&nbsp; ReworkRequestNotFound = 16015<br />&nbsp; ReworkRequestHasReview = 16016<br />&nbsp; SubLotCanotFlowCardManagement = 16017<br />&nbsp; SubLotMustProduction = 16018<br />&nbsp; SubLotCanotPublishStatus = 16019<br />&nbsp; SubLotCanotAwaitingPackaging = 16020<br />&nbsp; SubLotCanotReworkRequest = 16021<br />&nbsp; SubLotMustWipStatus = 16022<br />&nbsp; SubLotCanotDefectRegister = 16023<br />&nbsp; SubLotMustSame = 16024<br />&nbsp; MaterialPreparationNotFound = 16025<br />&nbsp; MaterialPreparationSublotHasLock = 16026<br />&nbsp; MaterialPreparationNotMatch = 16027<br />&nbsp; ProductSubLotNotPurchase = 16028<br />&nbsp; ProductSubLotNotERP = 16029<br />&nbsp; ProductSubLotNotErpID = 16030<br />&nbsp; RequestAmountMoreThanRequired = 16031<br />&nbsp; MaterialPreparationNoVirtual = 16032<br />&nbsp; MaterialPreparationSigned = 16033<br />&nbsp; MaterialRequisitionNotExist = 16034<br />&nbsp; MaterialRequisitionMaterialNotExist = 16035<br />&nbsp; MaterialPreparationHasSigned = 16036<br />&nbsp; ProductSubLotWorkOrderNotMatch = 16037<br />&nbsp; PreparationWipNotFlowCardManagement = 16038<br />&nbsp; PackagingAmountMoreThanBOM = 16039<br />&nbsp; OutsourcingReceiveNotExist = 16040<br />&nbsp; OutsourcingReceiveNotExistItem = 16041<br />&nbsp; SubLotAmountAllLocked = 16042<br />&nbsp; SubLotProductionPlanSame = 16043<br />&nbsp; SubLotOutsourceDelivery = 16044<br />&nbsp; UserHasNotPermission = 16045<br />&nbsp; BoxLabelNotConfigurated = 16046<br />&nbsp; ProductSubLotIsTask = 16047<br />&nbsp; TaskMultiple = 16048<br />&nbsp; PackageLabelNotConfigurated = 16049<br />&nbsp; PackagingNoOutput = 16050<br />&nbsp; QcTaskNoSample = 16051<br />&nbsp; ProductionSubLotCanotDelivery = 16052<br />&nbsp; MonthNotSame = 16053<br />&nbsp; MonthNotSame = 16053<br />&nbsp; QualifiedAmountNotMatchSinglePieceAmount = 17007<br />&nbsp; ProductionTaskNotProcessCard = 17008<br />&nbsp; UnqualifiedAmountNotMatchSinglePieceAmount = 17009<br />&nbsp; SinglePeiceAndScanMustOutputAll = 17010<br />&nbsp; CanNotOutput = 17011<br />&nbsp; OutputAmountNotMatchPeiceAmount = 17012<br />&nbsp; ProductSubLotAlreadyFeeded = 17013<br />&nbsp; ProcessCardModeWithTaskGroupNotSupported = 17014<br />&nbsp; ProcessCardModeWithParallelNotSupported = 17015<br />&nbsp; ProcessSegmentConfigurationError = 17016<br />&nbsp; MaterialLotDifferent = 17017<br />&nbsp; MaterialFeedingAmountEnough = 17018<br />&nbsp; SubLotToDoNotExist = 17019<br />&nbsp; SubLotToDoAmountNotEnough = 17020<br />&nbsp; SubLotToDoAmountNotEnough2 = 17021<br />&nbsp; SinglePeiceMustProvideFlowCode = 17022<br />&nbsp; SinglePeiceNotEqualWithdrawalAmount = 17023<br />&nbsp; CanNotUseCompletenessWithdrawal = 17024<br />&nbsp; SignlePeiceCanNotUseCompletenessWithdrawal = 17025<br />&nbsp; NeedAdjustMachine = 17026<br />&nbsp; ProductionSubLotStatusNotMatch = 17027<br />&nbsp; FeedingAmountCanNotGreaterThenSubLotAmount = 17028<br />&nbsp; ReportAmountCanNotGreaterThenScannedAmount = 17029<br />&nbsp; SubLotIsInPrepareForm = 17030<br />&nbsp; CanNotChangeWorkCenter = 17031<br />&nbsp; WorkCenterNotMatchProductionTask = 17032<br />&nbsp; MasterCardNumerAreDifferent = 17033<br />&nbsp; ProcessRouteGuidAreDifferent = 17034<br />&nbsp; ProductSubLotNonFlowCardManagement = 17035<br />&nbsp; ExecutedProcessSegmentsAreDifferent = 17036<br />&nbsp; SinglePieceAndForceBatchCanNotConsume = 17037<br />&nbsp; CustomerBarCodeAlreadyExists = 17038<br />&nbsp; ProductSubLotAssociatedCustomerCode = 17039<br />&nbsp; ProductionPlanNotMatched = 17040<br />&nbsp; MOTNotSupportPackageProcessSegment = 17041<br />&nbsp; ProductSubLotTypeIsNotPrdBatch = 17042<br />&nbsp; ProductSubLotStatusIsNotQualified = 17043<br />&nbsp; ProductSubLotNonSinglePieceMgr = 17044<br />&nbsp; SinglePartConsumed = 17045<br />&nbsp; SinglePartPacked = 17046<br />&nbsp; SinglePartGreaterThanSubLotQuantity = 17047<br />&nbsp; OutputAmountCanNotGreaterThenReportAmount = 17048<br />&nbsp; ProductSubLotStatusIsNotFree = 17049<br />&nbsp; ProductSubLotPropertyMismatch = 17050<br />&nbsp; ProductSubLotUnboundPallets = 17051<br />&nbsp; ProductSubLotAssociatedBarCode = 17052<br />&nbsp; ProductSubLotBoxQuantityNotSatisfied = 17053<br />&nbsp; ProductSubLotMergeQuantityExceedsStandardBasket = 17055<br />&nbsp; SubLotMaterialInspectionCannotBeSplit = 17056<br />&nbsp; OutputAmoutCanNotGTProcessCardAmount = 17057<br />&nbsp; SubLotNotInMaterialList = 17058<br />&nbsp; MaterialNotMatchProductionPlan = 17059<br />&nbsp; WorkCenterNotExistOrHasNoWorkStation = 17060<br />&nbsp; ProcessCardNotSupportPartialWithdrawal = 17061<br />&nbsp; MaterialLotNotMatch = 17062<br />&nbsp; LotNotMatch = 17063<br />&nbsp; OutsourceLotNotMatch = 17064<br />&nbsp; ReportAmoutOver = 17065<br />&nbsp; HasNotSubLotToDo = 17066<br />&nbsp; UnqulifiedNeedSinglePieceCode = 17067<br />&nbsp; SinglePeiceMaterialCanNotPartialFeeding = 17068<br />&nbsp; SinglePeiceAmountNotMatchSubLotAmount = 17069<br />&nbsp; FeedingAmountNotEnough = 17070<br />&nbsp; TodoAmountNotMatchWithdrawalAmount = 17071<br />&nbsp; ProductionTaskAlreadyAssignedWorkCenter = 17072<br />&nbsp; ProductionTaskNotAssignedWorkCenter = 17073<br />&nbsp; OutputQuanlityNotEnough = 17074<br />&nbsp; ProductSubLotExtraPacked = 17075<br />&nbsp; HasReportCount = 17076<br />&nbsp; ProcessCardHasStopped = 17077<br />&nbsp; ProcessCardIsInspecting = 17078<br />&nbsp; CanNotFindMatchProductionTask = 17079<br />&nbsp; ThisWorkCenterHasReported = 17080<br />&nbsp; SinglePartCanNotPartialWithdrawal = 17081<br />&nbsp; SubLotUnqualified = 17082<br />&nbsp; SubLotIsInInspection = 17083<br />&nbsp; FlowCardSplitNotEqualsSerialNum = 17084<br />&nbsp; CanNotFoundReportWorkStation = 17085<br />&nbsp; BoxCodeMergePalletsCompleted = 17086<br />&nbsp; CanNotUseWithdrawalAll = 17087<br />&nbsp; CanNotSupportOutsourceTask = 17088<br />&nbsp; CanNotFoundParentPlan = 17089<br />&nbsp; SinglePartProductNotMatch = 17090<br />&nbsp; SinglePartHasSacn = 17091<br />&nbsp; ProductionSubLotInspect = 17092<br />&nbsp; SinglePartDefectived = 17093<br />&nbsp; ProductionPlanProcessSegmentIsGroup = 17094<br />&nbsp; OutsourceDeliveryAmountMoreThanTask = 17095<br />&nbsp; MaterialNotMatchProductionOrder = 17096<br />&nbsp; WorkCenterNotMatchProductionPlan = 17097<br />&nbsp; ProductionPlanProcessSegmentIsOutsource = 17098<br />&nbsp; OPSNotHasUser = 17099<br />&nbsp; ProductionPlanProcessSegmentAmount = 17100<br />&nbsp; PlanProcessSegmentMoreThanAmount = 17101<br />&nbsp; BomNoLeftQty = 17102<br />&nbsp; ProductSubLotHasTray = 17103<br />&nbsp; SubLotNotAllPreProcessSegments = 17104<br />&nbsp; NextProcessSegmentIsParallel = 17105<br />&nbsp; OrderBomNoLeftQty = 17106<br />&nbsp; SinglePartMustDefect = 17107<br />&nbsp; MaterialNoInspect = 17108<br />&nbsp; ProductNotInBom = 17109<br />&nbsp; ProductOrderBomClosed = 17110<br />&nbsp; ProductOrderBomComplete = 17111<br />&nbsp; ProductSublotNeedTransferIn = 17112<br />&nbsp; ProductSublotNotErp = 17113<br />&nbsp; QRCodeNotRework = 17114<br />&nbsp; ReportAmountCanNotGreaterThenMarkedAmount = 17115<br />&nbsp; SublotScannedAmountExceedsReportLimit = 150071<br />&nbsp; ReceiptPrepCardHasExist = 160021<br />&nbsp; SubLotMustSamePlan = 160241<br />&nbsp; SubLotMustSameLot = 160242<br />&nbsp; SubLotMustSameMaterialLot = 160243<br />&nbsp; SubLotMustSameOutsourceLot = 160244<br />&nbsp; SubLotMustSameProcess = 160245<br />&nbsp; SubLotMustSameLocation = 160246<br />&nbsp; CurProductSubLotNonSinglePiece = 170489<br />&nbsp; BarCodeIsNotAssociation = 170490<br />
 */
export type ResultCode = (typeof ResultCode)[keyof typeof ResultCode]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ResultCode = {
	Ok: 'Ok',
	Unkown: 'Unkown',
	NotImplement: 'NotImplement',
	Error: 'Error',
	ParamenterInvalid: 'ParamenterInvalid',
	Forbidden: 'Forbidden',
	ObjectNotExit: 'ObjectNotExit',
	SCADAServerNotCofnigurated: 'SCADAServerNotCofnigurated',
	UserNotExit: 'UserNotExit',
	UserPasswordNotMatch: 'UserPasswordNotMatch',
	UserHasNotEmplyeeData: 'UserHasNotEmplyeeData',
	EmplyeeNotExist: 'EmplyeeNotExist',
	ErpPostFail: 'ErpPostFail',
	OPSSettingEmpty: 'OPSSettingEmpty',
	OPSSettingInvalid: 'OPSSettingInvalid',
	WorkCenterNotExist: 'WorkCenterNotExist',
	BarCodeNotExist: 'BarCodeNotExist',
	BarCodeIsEmpty: 'BarCodeIsEmpty',
	BarCodeTypeNotMatch: 'BarCodeTypeNotMatch',
	EmployeeNotExist: 'EmployeeNotExist',
	EmployeeHasTurnover: 'EmployeeHasTurnover',
	EmployeeAlreadySignIn: 'EmployeeAlreadySignIn',
	WorkStationNotExist: 'WorkStationNotExist',
	OPSNotExist: 'OPSNotExist',
	WorkCenterNotScheduled: 'WorkCenterNotScheduled',
	CodingRuleNotExist: 'CodingRuleNotExist',
	CodingRuleItemNotExist: 'CodingRuleItemNotExist',
	CodingFlowCodeUseup: 'CodingFlowCodeUseup',
	ProductionTaskNotFound: 'ProductionTaskNotFound',
	WorkCenterProductionNotFound: 'WorkCenterProductionNotFound',
	ProductNotConfigFAI: 'ProductNotConfigFAI',
	ProductNotConfigPPI: 'ProductNotConfigPPI',
	ProductNotConfigFPI: 'ProductNotConfigFPI',
	ProductionTaskNotStarted: 'ProductionTaskNotStarted',
	WorkStationProductionFAIHasPassed: 'WorkStationProductionFAIHasPassed',
	WorkStationProductionFAIInProcessing: 'WorkStationProductionFAIInProcessing',
	WorkStationProductionFAIHasCreated: 'WorkStationProductionFAIHasCreated',
	ProductSublotNotFound: 'ProductSublotNotFound',
	ProductSublotInWarehouse: 'ProductSublotInWarehouse',
	ProductSublotInSpot: 'ProductSublotInSpot',
	WorkStationNotMatchProductionTask: 'WorkStationNotMatchProductionTask',
	EquipmentNotMatchProcessSegment: 'EquipmentNotMatchProcessSegment',
	ProductSubLotNotInPublishStatus: 'ProductSubLotNotInPublishStatus',
	ProductSubLotNotInSameProductionOrder:
		'ProductSubLotNotInSameProductionOrder',
	ProductSubLotNotPurchaseProductionOutSource:
		'ProductSubLotNotPurchaseProductionOutSource',
	ProductSubLotNotInSameProductionOrder2:
		'ProductSubLotNotInSameProductionOrder2',
	ProductSublotNotInWorkCenter: 'ProductSublotNotInWorkCenter',
	InspectionTaskNotExist: 'InspectionTaskNotExist',
	ProductSublotCanNotFeeding: 'ProductSublotCanNotFeeding',
	NoEmpolyeeSignedIn: 'NoEmpolyeeSignedIn',
	NoEmployeeSignedIn: 'NoEmployeeSignedIn',
	ProductionTaskNotExist: 'ProductionTaskNotExist',
	ProductionTaskNotMatching: 'ProductionTaskNotMatching',
	ProductionPlanPaused: 'ProductionPlanPaused',
	FeedingMaterialInvalid: 'FeedingMaterialInvalid',
	PrapareFormHasCosumed: 'PrapareFormHasCosumed',
	PrapareWorkOrderNotMatch: 'PrapareWorkOrderNotMatch',
	TerminalTypeInvalid: 'TerminalTypeInvalid',
	TerminalOSInvalid: 'TerminalOSInvalid',
	ProductionTaskAlreadyRunning: 'ProductionTaskAlreadyRunning',
	ProductionTaskNotTop: 'ProductionTaskNotTop',
	ProductionTaskNotReview: 'ProductionTaskNotReview',
	OtherProductionTaskAlreadyRunning: 'OtherProductionTaskAlreadyRunning',
	WorkCenterNotSignedIn: 'WorkCenterNotSignedIn',
	WorkCenterHasNoWorkStations: 'WorkCenterHasNoWorkStations',
	ProductionTaskAmountHasCompleted: 'ProductionTaskAmountHasCompleted',
	ProductionTaskNotRunning: 'ProductionTaskNotRunning',
	ProductionTaskNotWithdraw: 'ProductionTaskNotWithdraw',
	ProductSublotNotExist: 'ProductSublotNotExist',
	EquipmentNotAssociateWorkStation: 'EquipmentNotAssociateWorkStation',
	MROLedgerNotExist: 'MROLedgerNotExist',
	MROHasInstalled: 'MROHasInstalled',
	MROLedgerFaulted: 'MROLedgerFaulted',
	MROLedgerHasScrap: 'MROLedgerHasScrap',
	MROLedgerHasSealed: 'MROLedgerHasSealed',
	MRONotInstalled: 'MRONotInstalled',
	MROIsInUse: 'MROIsInUse',
	MROMismatching: 'MROMismatching',
	ParamsMismatching: 'ParamsMismatching',
	WithdrawAmountCanNotGreaterThenSubLotAmount:
		'WithdrawAmountCanNotGreaterThenSubLotAmount',
	CanNotWithdraw: 'CanNotWithdraw',
	ProductionPlanProcessSegmentNotExist: 'ProductionPlanProcessSegmentNotExist',
	MROLedgerMaitaining: 'MROLedgerMaitaining',
	MROLedgerInStorage: 'MROLedgerInStorage',
	MaterialNotMatch: 'MaterialNotMatch',
	EquipNotSetup: 'EquipNotSetup',
	FAIInInspecting: 'FAIInInspecting',
	FAINotCreate: 'FAINotCreate',
	AMOrderNotFound: 'AMOrderNotFound',
	AMOrderItemNotFound: 'AMOrderItemNotFound',
	WorkStationProductionAlreadyRunning: 'WorkStationProductionAlreadyRunning',
	AMOrderHasNotExecuted: 'AMOrderHasNotExecuted',
	EquipmentSetupNotExecuted: 'EquipmentSetupNotExecuted',
	FAIOrderNotExecuted: 'FAIOrderNotExecuted',
	FeedingNotExecuted: 'FeedingNotExecuted',
	ProductNotFound: 'ProductNotFound',
	ProductLotModelNotFound: 'ProductLotModelNotFound',
	CustomLotNotProvided: 'CustomLotNotProvided',
	ProductLotNotFound: 'ProductLotNotFound',
	ProductLotModelConfigError: 'ProductLotModelConfigError',
	ProcessConfigError: 'ProcessConfigError',
	PersonNotMatch: 'PersonNotMatch',
	FAIAlreadyCreated: 'FAIAlreadyCreated',
	NotNeedFAI: 'NotNeedFAI',
	MROTypeNotMatch: 'MROTypeNotMatch',
	MROChildCanNotUninstall: 'MROChildCanNotUninstall',
	NoEquipmentConfigurate: 'NoEquipmentConfigurate',
	ChildMROCanNotInstallSeparately: 'ChildMROCanNotInstallSeparately',
	WorkStationProductionNotExist: 'WorkStationProductionNotExist',
	WorkStationProductionNotStart: 'WorkStationProductionNotStart',
	BarCodeInvalid: 'BarCodeInvalid',
	NotConfigBarCodeCodingRule: 'NotConfigBarCodeCodingRule',
	WorkCenterNotStorage: 'WorkCenterNotStorage',
	SupplierNotExist: 'SupplierNotExist',
	ProductNotExist: 'ProductNotExist',
	ReceiptOnlyInLineBuffer: 'ReceiptOnlyInLineBuffer',
	WorkCenterNotLineBuffer: 'WorkCenterNotLineBuffer',
	WorkCenterNotSimpleInventory: 'WorkCenterNotSimpleInventory',
	MaterialPreparationNotExist: 'MaterialPreparationNotExist',
	MaterialPreparationHasClosed: 'MaterialPreparationHasClosed',
	NoNeedPreparation: 'NoNeedPreparation',
	SomeSublotCanNotPrepare: 'SomeSublotCanNotPrepare',
	MaterialPraparationOverage: 'MaterialPraparationOverage',
	InspectionTaskNotFound: 'InspectionTaskNotFound',
	ProductSubLotScraped: 'ProductSubLotScraped',
	WorkCenterIsNotFloorStorage: 'WorkCenterIsNotFloorStorage',
	WorkCenterIsNotVerticalStorage: 'WorkCenterIsNotVerticalStorage',
	ReceiptNotExist: 'ReceiptNotExist',
	ReceiptAlreadyReviewed: 'ReceiptAlreadyReviewed',
	ProductSubLotHasDefect: 'ProductSubLotHasDefect',
	ProductSubLotHasFeeding: 'ProductSubLotHasFeeding',
	FixtureReceiptFormNotFound: 'FixtureReceiptFormNotFound',
	FixtureLedgerNotExist: 'FixtureLedgerNotExist',
	FixtureReceiptCountNotMatch: 'FixtureReceiptCountNotMatch',
	FixtureReceiptClassNotMatch: 'FixtureReceiptClassNotMatch',
	SomeFixtureNeedNotRestore: 'SomeFixtureNeedNotRestore',
	SomeFixtureInMaintaining: 'SomeFixtureInMaintaining',
	SomeFixtureInRepairing: 'SomeFixtureInRepairing',
	SomeFixtureScrapped: 'SomeFixtureScrapped',
	SomeFixtureInUsing: 'SomeFixtureInUsing',
	SomeFixtureNotInStorage: 'SomeFixtureNotInStorage',
	SomeFixtureSealed: 'SomeFixtureSealed',
	FixtureReceiptFormHasClosed: 'FixtureReceiptFormHasClosed',
	PurchaseOrderNotExist: 'PurchaseOrderNotExist',
	SupplierNotMatchPurchaseOrder: 'SupplierNotMatchPurchaseOrder',
	ProductNotMatchPurchaseOrder: 'ProductNotMatchPurchaseOrder',
	SublotNotMatchPurchaseOrder: 'SublotNotMatchPurchaseOrder',
	SublotAmountMoreThenPurchaseAmount: 'SublotAmountMoreThenPurchaseAmount',
	SupplierCodeResovleError: 'SupplierCodeResovleError',
	IQCNotCOnfig: 'IQCNotCOnfig',
	GetLatestProductVersionError: 'GetLatestProductVersionError',
	ProductSublotCanNotInbound: 'ProductSublotCanNotInbound',
	WorkCenterNotConfigCatagory: 'WorkCenterNotConfigCatagory',
	SomeSubLotAlreadyReceived: 'SomeSubLotAlreadyReceived',
	ReceiptNotReviewed: 'ReceiptNotReviewed',
	ReceiptNotReviewPassed: 'ReceiptNotReviewPassed',
	SublotNotInSimpleLocation: 'SublotNotInSimpleLocation',
	SublotNotBelongToOnePurchaseOrder: 'SublotNotBelongToOnePurchaseOrder',
	SubLotAlreadyReceived: 'SubLotAlreadyReceived',
	SomeSubLotNotReviewedReturn: 'SomeSubLotNotReviewedReturn',
	SomeProductSublotNotExist: 'SomeProductSublotNotExist',
	ProductSublotNotInStorage: 'ProductSublotNotInStorage',
	ProductSublotNotInBufferLine: 'ProductSublotNotInBufferLine',
	ProductSublotNotInMaterialForm: 'ProductSublotNotInMaterialForm',
	ProductSublotNotInSimpleStorage: 'ProductSublotNotInSimpleStorage',
	ProductSublotNotInProductionTaskBOM: 'ProductSublotNotInProductionTaskBOM',
	ProductSublotInspectionNotPassed: 'ProductSublotInspectionNotPassed',
	WorkStationNotProduction: 'WorkStationNotProduction',
	WorkStationNotBuffline: 'WorkStationNotBuffline',
	SomeProductSubLotNotInBOM: 'SomeProductSubLotNotInBOM',
	ProductSubLotAlreadyInSimpleStorage: 'ProductSubLotAlreadyInSimpleStorage',
	ProductSubLotNotInFlatStorage: 'ProductSubLotNotInFlatStorage',
	ProductSubLotNotInSameStorage: 'ProductSubLotNotInSameStorage',
	EmpolyeeNotSignedIn: 'EmpolyeeNotSignedIn',
	AndonRecordAlreadyExisted: 'AndonRecordAlreadyExisted',
	AndonDefinitionNotExist: 'AndonDefinitionNotExist',
	AndonRecordNotExist: 'AndonRecordNotExist',
	AndonResponserNotMatch: 'AndonResponserNotMatch',
	AndonAlreadyReponsed: 'AndonAlreadyReponsed',
	AndonAlreadyResolved: 'AndonAlreadyResolved',
	AndonNotResponsed: 'AndonNotResponsed',
	AndonResolving: 'AndonResolving',
	EquipmentNotExist: 'EquipmentNotExist',
	AndonNotResolved: 'AndonNotResolved',
	BarCodeAlreadyBound: 'BarCodeAlreadyBound',
	MaintainOrderHasCompleted: 'MaintainOrderHasCompleted',
	MaintainOrderNotReviewed: 'MaintainOrderNotReviewed',
	MROIsRepairing: 'MROIsRepairing',
	FixtureIsRepairing: 'FixtureIsRepairing',
	FixtureIsUsinging: 'FixtureIsUsinging',
	MROHasScraped: 'MROHasScraped',
	FixtureHasScraped: 'FixtureHasScraped',
	MRONeedNotMaintain: 'MRONeedNotMaintain',
	MRONeedNotRepair: 'MRONeedNotRepair',
	MROClassNotFound: 'MROClassNotFound',
	MROClassAlreadyInWorkCenter: 'MROClassAlreadyInWorkCenter',
	FixtureIsMaintaining: 'FixtureIsMaintaining',
	MROIsMaintaining: 'MROIsMaintaining',
	OtherMaintainIsProcessing: 'OtherMaintainIsProcessing',
	FixtureNotNeedCalibrate: 'FixtureNotNeedCalibrate',
	MITIsCalibrating: 'MITIsCalibrating',
	MITHasScraped: 'MITHasScraped',
	MITIsReparing: 'MITIsReparing',
	MITIsSealed: 'MITIsSealed',
	MROIsSealed: 'MROIsSealed',
	MITWaitForValidate: 'MITWaitForValidate',
	MITWaitForReview: 'MITWaitForReview',
	MRONeedNotCalibrate: 'MRONeedNotCalibrate',
	MITNeedNotMaintain: 'MITNeedNotMaintain',
	FixtureIsSealed: 'FixtureIsSealed',
	FixtureWaitForValidate: 'FixtureWaitForValidate',
	FixtureHasFault: 'FixtureHasFault',
	CanlibrationOrderNotFound: 'CanlibrationOrderNotFound',
	MRONotNeedCanlibrate: 'MRONotNeedCanlibrate',
	MITNotNeedCanlibrate: 'MITNotNeedCanlibrate',
	OtherCanlibrationIsProcessing: 'OtherCanlibrationIsProcessing',
	PMOrderNotReview: 'PMOrderNotReview',
	OperatorNotFound: 'OperatorNotFound',
	SubLotWaitforProcessNotFound: 'SubLotWaitforProcessNotFound',
	ParallelOutsourceProcessNotSupport: 'ParallelOutsourceProcessNotSupport',
	SubLotNotWIP: 'SubLotNotWIP',
	OutsourceProductionTaskNotFound: 'OutsourceProductionTaskNotFound',
	SubLotIsLocked: 'SubLotIsLocked',
	EmptyBarCodeNotExist: 'EmptyBarCodeNotExist',
	LogisticsActivityNotExist: 'LogisticsActivityNotExist',
	SubLotIsApproved: 'SubLotIsApproved',
	SubLotIsUnderInspection: 'SubLotIsUnderInspection',
	SubLotHasPublished: 'SubLotHasPublished',
	SubLotIsBlocked: 'SubLotIsBlocked',
	SubLotLocationNotMatch: 'SubLotLocationNotMatch',
	LogisticsTransportionTargetNotMatch: 'LogisticsTransportionTargetNotMatch',
	ProductProcessSegmentNotExist: 'ProductProcessSegmentNotExist',
	BarCodeWithSameCodeAlreadyExist: 'BarCodeWithSameCodeAlreadyExist',
	HasNoAvailibleSubLot: 'HasNoAvailibleSubLot',
	TrayCodeNotAssociatedAnySubLot: 'TrayCodeNotAssociatedAnySubLot',
	BarCodeIsNotTrayOrSubLot: 'BarCodeIsNotTrayOrSubLot',
	MROIsInInspectoin: 'MROIsInInspectoin',
	MROIsInBlocking: 'MROIsInBlocking',
	MROLocationNotMatch: 'MROLocationNotMatch',
	EmptyBarCodeInvalid: 'EmptyBarCodeInvalid',
	BarCodeAlreadyExistWithSameCode: 'BarCodeAlreadyExistWithSameCode',
	InspectionTaskWithPurchaseReceiptNotFound:
		'InspectionTaskWithPurchaseReceiptNotFound',
	PurchseReceiptNeedNotReview: 'PurchseReceiptNeedNotReview',
	TargetLocationNotExist: 'TargetLocationNotExist',
	ProductionNotProcessTask: 'ProductionNotProcessTask',
	ProductionHasNoSubTasks: 'ProductionHasNoSubTasks',
	ThisProcessNotAllowedFedding: 'ThisProcessNotAllowedFedding',
	ThisProcessNotAllowedOutput: 'ThisProcessNotAllowedOutput',
	ShippingDocumentNotFound: 'ShippingDocumentNotFound',
	MaterialNotInShippingDocument: 'MaterialNotInShippingDocument',
	NotNeedVerifyCustomerCertification: 'NotNeedVerifyCustomerCertification',
	CustomerCertificationProductNotMatch: 'CustomerCertificationProductNotMatch',
	ShippingDocumentCompleted: 'ShippingDocumentCompleted',
	NeitherCeriticationNorBasketNo: 'NeitherCeriticationNorBasketNo',
	PrintLabelTemplateNotConfigrated: 'PrintLabelTemplateNotConfigrated',
	PlanBomNotExist: 'PlanBomNotExist',
	SinglePartNotExist: 'SinglePartNotExist',
	StatusIsNotNormal: 'StatusIsNotNormal',
	ProductionStatusIsNotNormal: 'ProductionStatusIsNotNormal',
	ThisProcessSegmentIsProcessed: 'ThisProcessSegmentIsProcessed',
	VerifyProcessSegmentNotProcess: 'VerifyProcessSegmentNotProcess',
	FeedingAreaSublotNotExist: 'FeedingAreaSublotNotExist',
	SublotScannedAmountExceedsLimit: 'SublotScannedAmountExceedsLimit',
	SinglePartScanInvalid: 'SinglePartScanInvalid',
	NotAllowedScan: 'NotAllowedScan',
	InvalidStatus: 'InvalidStatus',
	LaserMarkingNotConfigured: 'LaserMarkingNotConfigured',
	LaserMarkingPlainCodeNotConfigured: 'LaserMarkingPlainCodeNotConfigured',
	LaserMarkingPlainCodeAgainstTheRules: 'LaserMarkingPlainCodeAgainstTheRules',
	BarcodeQuantityDiscrepancy: 'BarcodeQuantityDiscrepancy',
	NeedTaskCodeOrWorkcenterId: 'NeedTaskCodeOrWorkcenterId',
	ScanOnlySupportsSingleTaskMode: 'ScanOnlySupportsSingleTaskMode',
	StartTaskFirst: 'StartTaskFirst',
	NotSinglePieceManagement: 'NotSinglePieceManagement',
	SublotMarkedAmountExceedsLimit: 'SublotMarkedAmountExceedsLimit',
	NeedQRCodeOrPlainCode: 'NeedQRCodeOrPlainCode',
	SinglePartAlreadyExist: 'SinglePartAlreadyExist',
	ProductionPlanNotExist: 'ProductionPlanNotExist',
	ProductionOrderNotExist: 'ProductionOrderNotExist',
	QRCodeHasScan: 'QRCodeHasScan',
	InspectOnlySupportsSingleTaskMode: 'InspectOnlySupportsSingleTaskMode',
	NotAllowedInspect: 'NotAllowedInspect',
	PneumaticGaugeNotConfiguration: 'PneumaticGaugeNotConfiguration',
	PneumaticGaugeConfigurationDoNotMatch:
		'PneumaticGaugeConfigurationDoNotMatch',
	SinglePartNotGood: 'SinglePartNotGood',
	SinglePartIsInspecting: 'SinglePartIsInspecting',
	ProductionPlanNotLeftLabelAmount: 'ProductionPlanNotLeftLabelAmount',
	ProductionPlanNotAllowLabel: 'ProductionPlanNotAllowLabel',
	ProductionPlanBomNotAllowLabel: 'ProductionPlanBomNotAllowLabel',
	ProductionPlanMoreThanLeftLabelAmount:
		'ProductionPlanMoreThanLeftLabelAmount',
	ChildProductionPlanCanotMark: 'ChildProductionPlanCanotMark',
	ProductionTaskMaterialNotExist: 'ProductionTaskMaterialNotExist',
	ProductionPlanSubLotMix: 'ProductionPlanSubLotMix',
	ReceiptPrepCardNotExist: 'ReceiptPrepCardNotExist',
	WithdrawAmountCanNotLessThenZero: 'WithdrawAmountCanNotLessThenZero',
	TrayNotHasSublot: 'TrayNotHasSublot',
	ProductSubLotWithoutTask: 'ProductSubLotWithoutTask',
	MobileOPSNotSupported: 'MobileOPSNotSupported',
	ProductSubLotHasOutput: 'ProductSubLotHasOutput',
	WorkCenterWithoutType: 'WorkCenterWithoutType',
	ProductSubLotNotInPublishOrWip: 'ProductSubLotNotInPublishOrWip',
	MaterialMarkNeedLot: 'MaterialMarkNeedLot',
	InspectionSampleNeedLevel: 'InspectionSampleNeedLevel',
	ProductSubLotNotInInspectionStatus: 'ProductSubLotNotInInspectionStatus',
	ProductSubLotNotDefect: 'ProductSubLotNotDefect',
	ProductSubLotMustSame: 'ProductSubLotMustSame',
	ReworkRequestNotFound: 'ReworkRequestNotFound',
	ReworkRequestHasReview: 'ReworkRequestHasReview',
	SubLotCanotFlowCardManagement: 'SubLotCanotFlowCardManagement',
	SubLotMustProduction: 'SubLotMustProduction',
	SubLotCanotPublishStatus: 'SubLotCanotPublishStatus',
	SubLotCanotAwaitingPackaging: 'SubLotCanotAwaitingPackaging',
	SubLotCanotReworkRequest: 'SubLotCanotReworkRequest',
	SubLotMustWipStatus: 'SubLotMustWipStatus',
	SubLotCanotDefectRegister: 'SubLotCanotDefectRegister',
	SubLotMustSame: 'SubLotMustSame',
	MaterialPreparationNotFound: 'MaterialPreparationNotFound',
	MaterialPreparationSublotHasLock: 'MaterialPreparationSublotHasLock',
	MaterialPreparationNotMatch: 'MaterialPreparationNotMatch',
	ProductSubLotNotPurchase: 'ProductSubLotNotPurchase',
	ProductSubLotNotERP: 'ProductSubLotNotERP',
	ProductSubLotNotErpID: 'ProductSubLotNotErpID',
	RequestAmountMoreThanRequired: 'RequestAmountMoreThanRequired',
	MaterialPreparationNoVirtual: 'MaterialPreparationNoVirtual',
	MaterialPreparationSigned: 'MaterialPreparationSigned',
	MaterialRequisitionNotExist: 'MaterialRequisitionNotExist',
	MaterialRequisitionMaterialNotExist: 'MaterialRequisitionMaterialNotExist',
	MaterialPreparationHasSigned: 'MaterialPreparationHasSigned',
	ProductSubLotWorkOrderNotMatch: 'ProductSubLotWorkOrderNotMatch',
	PreparationWipNotFlowCardManagement: 'PreparationWipNotFlowCardManagement',
	PackagingAmountMoreThanBOM: 'PackagingAmountMoreThanBOM',
	OutsourcingReceiveNotExist: 'OutsourcingReceiveNotExist',
	OutsourcingReceiveNotExistItem: 'OutsourcingReceiveNotExistItem',
	SubLotAmountAllLocked: 'SubLotAmountAllLocked',
	SubLotProductionPlanSame: 'SubLotProductionPlanSame',
	SubLotOutsourceDelivery: 'SubLotOutsourceDelivery',
	UserHasNotPermission: 'UserHasNotPermission',
	BoxLabelNotConfigurated: 'BoxLabelNotConfigurated',
	ProductSubLotIsTask: 'ProductSubLotIsTask',
	TaskMultiple: 'TaskMultiple',
	PackageLabelNotConfigurated: 'PackageLabelNotConfigurated',
	PackagingNoOutput: 'PackagingNoOutput',
	QcTaskNoSample: 'QcTaskNoSample',
	ProductionSubLotCanotDelivery: 'ProductionSubLotCanotDelivery',
	MonthNotSame: 'MonthNotSame',
	QualifiedAmountNotMatchSinglePieceAmount:
		'QualifiedAmountNotMatchSinglePieceAmount',
	ProductionTaskNotProcessCard: 'ProductionTaskNotProcessCard',
	UnqualifiedAmountNotMatchSinglePieceAmount:
		'UnqualifiedAmountNotMatchSinglePieceAmount',
	SinglePeiceAndScanMustOutputAll: 'SinglePeiceAndScanMustOutputAll',
	CanNotOutput: 'CanNotOutput',
	OutputAmountNotMatchPeiceAmount: 'OutputAmountNotMatchPeiceAmount',
	ProductSubLotAlreadyFeeded: 'ProductSubLotAlreadyFeeded',
	ProcessCardModeWithTaskGroupNotSupported:
		'ProcessCardModeWithTaskGroupNotSupported',
	ProcessCardModeWithParallelNotSupported:
		'ProcessCardModeWithParallelNotSupported',
	ProcessSegmentConfigurationError: 'ProcessSegmentConfigurationError',
	MaterialLotDifferent: 'MaterialLotDifferent',
	MaterialFeedingAmountEnough: 'MaterialFeedingAmountEnough',
	SubLotToDoNotExist: 'SubLotToDoNotExist',
	SubLotToDoAmountNotEnough: 'SubLotToDoAmountNotEnough',
	SubLotToDoAmountNotEnough2: 'SubLotToDoAmountNotEnough2',
	SinglePeiceMustProvideFlowCode: 'SinglePeiceMustProvideFlowCode',
	SinglePeiceNotEqualWithdrawalAmount: 'SinglePeiceNotEqualWithdrawalAmount',
	CanNotUseCompletenessWithdrawal: 'CanNotUseCompletenessWithdrawal',
	SignlePeiceCanNotUseCompletenessWithdrawal:
		'SignlePeiceCanNotUseCompletenessWithdrawal',
	NeedAdjustMachine: 'NeedAdjustMachine',
	ProductionSubLotStatusNotMatch: 'ProductionSubLotStatusNotMatch',
	FeedingAmountCanNotGreaterThenSubLotAmount:
		'FeedingAmountCanNotGreaterThenSubLotAmount',
	ReportAmountCanNotGreaterThenScannedAmount:
		'ReportAmountCanNotGreaterThenScannedAmount',
	SubLotIsInPrepareForm: 'SubLotIsInPrepareForm',
	CanNotChangeWorkCenter: 'CanNotChangeWorkCenter',
	WorkCenterNotMatchProductionTask: 'WorkCenterNotMatchProductionTask',
	MasterCardNumerAreDifferent: 'MasterCardNumerAreDifferent',
	ProcessRouteGuidAreDifferent: 'ProcessRouteGuidAreDifferent',
	ProductSubLotNonFlowCardManagement: 'ProductSubLotNonFlowCardManagement',
	ExecutedProcessSegmentsAreDifferent: 'ExecutedProcessSegmentsAreDifferent',
	SinglePieceAndForceBatchCanNotConsume:
		'SinglePieceAndForceBatchCanNotConsume',
	CustomerBarCodeAlreadyExists: 'CustomerBarCodeAlreadyExists',
	ProductSubLotAssociatedCustomerCode: 'ProductSubLotAssociatedCustomerCode',
	ProductionPlanNotMatched: 'ProductionPlanNotMatched',
	MOTNotSupportPackageProcessSegment: 'MOTNotSupportPackageProcessSegment',
	ProductSubLotTypeIsNotPrdBatch: 'ProductSubLotTypeIsNotPrdBatch',
	ProductSubLotStatusIsNotQualified: 'ProductSubLotStatusIsNotQualified',
	ProductSubLotNonSinglePieceMgr: 'ProductSubLotNonSinglePieceMgr',
	SinglePartConsumed: 'SinglePartConsumed',
	SinglePartPacked: 'SinglePartPacked',
	SinglePartGreaterThanSubLotQuantity: 'SinglePartGreaterThanSubLotQuantity',
	OutputAmountCanNotGreaterThenReportAmount:
		'OutputAmountCanNotGreaterThenReportAmount',
	ProductSubLotStatusIsNotFree: 'ProductSubLotStatusIsNotFree',
	ProductSubLotPropertyMismatch: 'ProductSubLotPropertyMismatch',
	ProductSubLotUnboundPallets: 'ProductSubLotUnboundPallets',
	ProductSubLotAssociatedBarCode: 'ProductSubLotAssociatedBarCode',
	ProductSubLotBoxQuantityNotSatisfied: 'ProductSubLotBoxQuantityNotSatisfied',
	ProductSubLotMergeQuantityExceedsStandardBasket:
		'ProductSubLotMergeQuantityExceedsStandardBasket',
	SubLotMaterialInspectionCannotBeSplit:
		'SubLotMaterialInspectionCannotBeSplit',
	OutputAmoutCanNotGTProcessCardAmount: 'OutputAmoutCanNotGTProcessCardAmount',
	SubLotNotInMaterialList: 'SubLotNotInMaterialList',
	MaterialNotMatchProductionPlan: 'MaterialNotMatchProductionPlan',
	WorkCenterNotExistOrHasNoWorkStation: 'WorkCenterNotExistOrHasNoWorkStation',
	ProcessCardNotSupportPartialWithdrawal:
		'ProcessCardNotSupportPartialWithdrawal',
	MaterialLotNotMatch: 'MaterialLotNotMatch',
	LotNotMatch: 'LotNotMatch',
	OutsourceLotNotMatch: 'OutsourceLotNotMatch',
	ReportAmoutOver: 'ReportAmoutOver',
	HasNotSubLotToDo: 'HasNotSubLotToDo',
	UnqulifiedNeedSinglePieceCode: 'UnqulifiedNeedSinglePieceCode',
	SinglePeiceMaterialCanNotPartialFeeding:
		'SinglePeiceMaterialCanNotPartialFeeding',
	SinglePeiceAmountNotMatchSubLotAmount:
		'SinglePeiceAmountNotMatchSubLotAmount',
	FeedingAmountNotEnough: 'FeedingAmountNotEnough',
	TodoAmountNotMatchWithdrawalAmount: 'TodoAmountNotMatchWithdrawalAmount',
	ProductionTaskAlreadyAssignedWorkCenter:
		'ProductionTaskAlreadyAssignedWorkCenter',
	ProductionTaskNotAssignedWorkCenter: 'ProductionTaskNotAssignedWorkCenter',
	OutputQuanlityNotEnough: 'OutputQuanlityNotEnough',
	ProductSubLotExtraPacked: 'ProductSubLotExtraPacked',
	HasReportCount: 'HasReportCount',
	ProcessCardHasStopped: 'ProcessCardHasStopped',
	ProcessCardIsInspecting: 'ProcessCardIsInspecting',
	CanNotFindMatchProductionTask: 'CanNotFindMatchProductionTask',
	ThisWorkCenterHasReported: 'ThisWorkCenterHasReported',
	SinglePartCanNotPartialWithdrawal: 'SinglePartCanNotPartialWithdrawal',
	SubLotUnqualified: 'SubLotUnqualified',
	SubLotIsInInspection: 'SubLotIsInInspection',
	FlowCardSplitNotEqualsSerialNum: 'FlowCardSplitNotEqualsSerialNum',
	CanNotFoundReportWorkStation: 'CanNotFoundReportWorkStation',
	BoxCodeMergePalletsCompleted: 'BoxCodeMergePalletsCompleted',
	CanNotUseWithdrawalAll: 'CanNotUseWithdrawalAll',
	CanNotSupportOutsourceTask: 'CanNotSupportOutsourceTask',
	CanNotFoundParentPlan: 'CanNotFoundParentPlan',
	SinglePartProductNotMatch: 'SinglePartProductNotMatch',
	SinglePartHasSacn: 'SinglePartHasSacn',
	ProductionSubLotInspect: 'ProductionSubLotInspect',
	SinglePartDefectived: 'SinglePartDefectived',
	ProductionPlanProcessSegmentIsGroup: 'ProductionPlanProcessSegmentIsGroup',
	OutsourceDeliveryAmountMoreThanTask: 'OutsourceDeliveryAmountMoreThanTask',
	MaterialNotMatchProductionOrder: 'MaterialNotMatchProductionOrder',
	WorkCenterNotMatchProductionPlan: 'WorkCenterNotMatchProductionPlan',
	ProductionPlanProcessSegmentIsOutsource:
		'ProductionPlanProcessSegmentIsOutsource',
	OPSNotHasUser: 'OPSNotHasUser',
	ProductionPlanProcessSegmentAmount: 'ProductionPlanProcessSegmentAmount',
	PlanProcessSegmentMoreThanAmount: 'PlanProcessSegmentMoreThanAmount',
	BomNoLeftQty: 'BomNoLeftQty',
	ProductSubLotHasTray: 'ProductSubLotHasTray',
	SubLotNotAllPreProcessSegments: 'SubLotNotAllPreProcessSegments',
	NextProcessSegmentIsParallel: 'NextProcessSegmentIsParallel',
	OrderBomNoLeftQty: 'OrderBomNoLeftQty',
	SinglePartMustDefect: 'SinglePartMustDefect',
	MaterialNoInspect: 'MaterialNoInspect',
	ProductNotInBom: 'ProductNotInBom',
	ProductOrderBomClosed: 'ProductOrderBomClosed',
	ProductOrderBomComplete: 'ProductOrderBomComplete',
	ProductSublotNeedTransferIn: 'ProductSublotNeedTransferIn',
	ProductSublotNotErp: 'ProductSublotNotErp',
	QRCodeNotRework: 'QRCodeNotRework',
	ReportAmountCanNotGreaterThenMarkedAmount:
		'ReportAmountCanNotGreaterThenMarkedAmount',
	SublotScannedAmountExceedsReportLimit:
		'SublotScannedAmountExceedsReportLimit',
	ReceiptPrepCardHasExist: 'ReceiptPrepCardHasExist',
	SubLotMustSamePlan: 'SubLotMustSamePlan',
	SubLotMustSameLot: 'SubLotMustSameLot',
	SubLotMustSameMaterialLot: 'SubLotMustSameMaterialLot',
	SubLotMustSameOutsourceLot: 'SubLotMustSameOutsourceLot',
	SubLotMustSameProcess: 'SubLotMustSameProcess',
	SubLotMustSameLocation: 'SubLotMustSameLocation',
	CurProductSubLotNonSinglePiece: 'CurProductSubLotNonSinglePiece',
	BarCodeIsNotAssociation: 'BarCodeIsNotAssociation',
} as const

export interface TerminalConfigDto {
	/** @nullable */
	api?: string | null
	/** @nullable */
	appCastUrl?: string | null
	/** @nullable */
	entries?: TerminalConfigEntry[] | null
}

/**
 * 终端入口配置信息
 */
export interface TerminalConfigEntry {
	/**
	 * 入口名字
	 * @nullable
	 */
	name?: string | null
	/**
	 * 入口URL
	 * @nullable
	 */
	url?: string | null
	/**
	 * 描述
	 * @nullable
	 */
	description?: string | null
}

/**
 * 终端操作权限
 */
export interface TerminalPermissionDto {
	/**
	 * 终端名称
	 * @nullable
	 */
	name?: string | null
	/**
	 * 有操作权限的功能
	 * @nullable
	 */
	functions?: string[] | null
}

/**
 * 修改密码
 */
export interface UpdatePasswordRequest {
	/** 用户名 */
	userId: string
	/**
	 * 旧密码
	 * @minLength 2
	 * @maxLength 100
	 */
	oldPassword: string
	/**
	 * 新密码
	 * @minLength 2
	 * @maxLength 100
	 */
	newPassword: string
}

/**
 * 上传文件信息
 */
export interface UploadFileDto {
	/**
	 * Key
	 * @nullable
	 */
	fileKey?: string | null
	/**
	 * 文件名
	 * @nullable
	 */
	fileName?: string | null
	/**
	 * 文件访问Url
	 * @nullable
	 */
	url?: string | null
}

/**
 * 工作中心
 */
export interface WorkCenterDto {
	/** 唯一ID */
	id?: string
	/**
   * 类型
存储、加工、检验
   * @nullable
   */
	type?: string | null
	/**
	 * 类别
	 * @nullable
	 */
	catagory?: string | null
	/**
	 * 工作中心编码
	 * @nullable
	 */
	code?: string | null
	/**
	 * 工作中心名称
	 * @nullable
	 */
	name?: string | null
	/** 关联区域ID */
	workShopId?: string
	/**
	 * 关联区域
	 * @nullable
	 */
	workShopName?: string | null
}

/**
 * 区域信息
 */
export interface WorkShopDto {
	/** 区域Id */
	id?: string
	/**
	 * 区域编码
	 * @nullable
	 */
	code?: string | null
	/**
	 * 区域名称
	 * @nullable
	 */
	name?: string | null
}

export interface WorkStationDto {
	/** 工位ID */
	id?: string
	/**
	 * 工位编码
	 * @nullable
	 */
	code?: string | null
	/**
	 * 工位名称
	 * @nullable
	 */
	name?: string | null
	/**
	 * 工位所在工作中心ID
	 * @nullable
	 */
	workCenterId?: string | null
	/**
	 * 工位所在工作中心编码
	 * @nullable
	 */
	workCenterCode?: string | null
	/**
	 * 工位所在工作中心名称
	 * @nullable
	 */
	workCenterName?: string | null
	/**
	 * 工作中心类型：存储、加工、检验
	 * @nullable
	 */
	workCenterType?: string | null
	/**
   * 工作中心类别：
当工作中心性质等于存储时，选项：线边库、普通库
当工作中心性质等于检验时，选项：实验室、检验工站
   * @nullable
   */
	workCenterCatagory?: string | null
}
