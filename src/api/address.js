import request from '@/utils/request'

/**
 * @description: 添加收货地址
 * @param {Object} form - 地址表单
 * @param {String} object.receiver - 收货人姓名
 * @param {String} object.contact - 联系方式
 * @param {String} object.provinceCode - 	所在省份编码
 * @param {String} object.cityCode - 	所在城市编码
 * @param {String} object.countyCode - 所在区/县编码
 * @param {String} object.address - 详细地址
 * @param {String} object.postalCode - 邮政编码
 * @param {String} object.addressTags - 地址标签,以英文逗号分割
 * @param {Number} object.isDefault - 是否为默认，0为是，1为否
 * @author TMC
 * @date 2023-05-20 11:00:12
 */
export const addAddressAPI = (form) => request('/member/address', 'post', form)



/**
 * @description: 修改收货地址
 * @param {Object} form - 地址表单
 * @author TMC
 * @date 2023-05-20 11:05:58
 */
export const editAddressAPI = (form) => request(`/member/address/${form.id}`, 'put', form)



/**
 * @description: 删除收货地址
 * @param {String} id - 地址id
 * @author TMC
 * @date 2023-05-21 21:19:15
 */
export const deleteAddressAPI = (id) => request(`/member/address/${id}`, 'delete')
