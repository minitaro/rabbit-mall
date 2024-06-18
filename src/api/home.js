import request from "@/utils/request";

/**
 * @description: 获取所有分类（顶级，二级，对应的商品推荐数据）
 * @author TMC
 * @date 2023-05-13 01:56:25
 */
export const findAllCategoryAPI = () => request('/home/category/head', 'get')



/**
 * @description: 获取广告区轮播图
 * @author TMC
 * @date 2023-05-13 17:31:55
 */
export const findBannerAPI = () => request('/home/banner', 'get')



/**
 * @description: 获取新鲜好物
 * @author TMC
 * @date 2023-05-13 19:00:51
 */
export const findNewAPI = () => request('/home/new', 'get')



/**
 * @description: 获取人气推荐
 * @author TMC
 * @date 2023-05-13 20:41:05
 */
export const findHotAPI = () => request('/home/hot', 'get')




/**
 * @description: 获取热门品牌
 * @author TMC
 * @date 2023-05-13 11:30:39
 */
export const findBrandAPI = () => request('/home/brand', 'get')



/**
 * @description: 获取商品板块
 * @author TMC
 * @date 2023-05-13 21:34:43
 */
export const findGoodsAPI = () => request('/home/goods', 'get')



/**
 * @description: 获取最新专题
 * @author TMC
 * @date 2023-05-13 21:58:18
 */
export const findSpecialAPI = () => request('/home/special', 'get')