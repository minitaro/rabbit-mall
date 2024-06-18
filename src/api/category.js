import request from '@/utils/request'

/**
 * @description: 获取顶级类目信息
 * @param {String} id - 顶级类目ID
 * @author TMC
 * @date 2023-05-14 18:08:02
 */
export const findTopCategoryAPI = (id) => request('/category', 'get', { id })



/**
 * @description: 获取二级类目的过滤条件
 * @param {String} id - 二级类目ID
 * @author TMC
 * @date 2023-05-15 09:46:53
 */
export const findSubCategoryFilterAPI = (id) => request('/category/sub/filter', 'get', { id })



/**
 * @description: 获取二级类目下的商品（带筛选条件）
 * @params { 
     id: "109294012",
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
     inventory: true,
     onlyDiscount: true,
     brandId: "1",
     attrs:[{groupName:'颜色',propertyName:'奶油黄'},{groupName:'尺码',propertyName:'男M（40-41）'}]
   }
 * @author TMC
 * @date 2023-05-15 10:01:05
 */
export const findSubCategoryGoodsAPI = (params) => request('/category/goods/temporary', 'post', params)