<script setup>
import { watchEffect } from 'vue'
import { usePowerSet } from '@/hooks/usePowerSet.js' 
const props = defineProps({
  goods: {
    type: Object,
    default: () => ({ specs: [], skus: [] })  // specs:规格信息列表  skus:所有的sku组合
  }
})
const emit = defineEmits(['skuSelect'])

// sku索引（属性值字符串：skuId集），示例：'蓝色★35码'：[100,101]
let skuIndex = {} 
// 属性值字符串分隔符
const spliter = '★' 
// 获取sku索引
const getSkuIndex = (skus) => { 
  const skuIndex = {}
  if (skus && skus.length > 0) {
    skus.forEach(sku => {
      if (sku.inventory) {                                  // 1. 过滤出有库存的sku
        const specs = sku.specs.map(spec => spec.valueName) // 2. 获取sku属性值数组
        const powerSet = usePowerSet(specs)                 // 3. 获取sku属性值数组的幂集
        powerSet.forEach(set => {                           // 4. 幂集映射为属性值字符串，设置为sku索引的key
          const key = set.join(spliter)
          if (!skuIndex[key]) {
            skuIndex[key] = []
          }
          skuIndex[key].push(sku.id) 
        })
      }
    })
  }
  return skuIndex
}
// 初始化属性值选择按钮的禁用状态
const initDisabledStatus = (specs, skuIndex) => {
  if (specs && specs.length > 0) {
    specs.forEach(spec => {
      spec.values.forEach(val => {
        val.disabled = !skuIndex[val.name] // 设置禁用状态：索引skuIndex没有对应key则禁用
      })
    })
  }
}
watchEffect(() => {
  skuIndex = getSkuIndex(props.goods.skus)
  initDisabledStatus(props.goods.specs, skuIndex)
})

// 点击属性值按钮选择某款sku
const skuSelect = (spec, val) => {
  if (val.disabled) return false
  // 1. 选中与取消选中逻辑
  if (val.selected) {
    val.selected = false
  } else {
    spec.values.forEach(val => val.selected = false)
    val.selected = true
  }
  // 2. 某项规格的属性值被选中后，需要更新其他规格的属性值按钮禁用状态
  updateDisabledStatus(props.goods.specs, skuIndex)  
  // 3. 如果已选中规格数量和传入规格总数相等，触发skuSelect事件将sku数据传递出去，否则传出空对象
  const selectedValues = getSelectedValues(props.goods.specs).filter(value => value)
  if (selectedValues.length === props.goods.specs.length) {
    const skuId = skuIndex[selectedValues.join(spliter)][0]
    const sku = props.goods.skus.find(sku => sku.id === skuId)
    emit('skuSelect', {
      skuId: sku.id,
      price: sku.price,
      oldPrice: sku.oldPrice,
      inventory: sku.inventory,
      specsText: sku.specs.reduce((p, n) => `${p} ${n.name}: ${n.valueName}`, '').trim()
    })
  } else {
    emit('skuSelect', {})
  }
}

// 更新属性值选择按钮的禁用状态
const updateDisabledStatus = (specs, skuIndex) => {
  specs.forEach((spec, i) => {
    const selectedValues = getSelectedValues(specs)
    spec.values.forEach(val => {
      if (val.selected) return
      selectedValues[i] = val.name
      const key = selectedValues.filter(value => value).join(spliter)
      val.disabled = !skuIndex[key]
    })
  })
}

// 获取选中的属性值集合
const getSelectedValues = (specs) => {
  const selectedValues = []
  specs.forEach(spec => {
    const selectedValue = spec.values.find(val => val.selected)
    selectedValues.push(selectedValue ? selectedValue.name : undefined)
  })
  return selectedValues
}
</script>



<template>
  <div class="goods-sku">
    <dl 
      v-for="spec in goods.specs" 
      :key="spec.id"
    >
      <dt>{{ spec.name }}</dt>
      <dd>
        <div 
          class="item" 
          v-for="val in spec.values" 
          :key="val.name"
        >
          <a 
            :class="{ selected: val.selected, disabled: val.disabled }" 
            @click="skuSelect(spec, val)" href="javascript:;"
          >
            <img 
              v-if="val.picture" 
              :src="val.picture" 
            />
            <span :class="{ selected: val.selected, disabled: val.disabled }" >
              {{ val.name }}
            </span>
          </a>
        </div>
      </dd>
    </dl>
  </div>
</template>



<style scoped lang="scss">
@mixin sku-state {
  border: 1px solid #e4e4e4;
  cursor: pointer;
  &.selected {
    border-color: $xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      .item {
        background-color: #f7f7f7;
        float: left;
        margin-right: 7px;
        margin-bottom: 7px;
        a {
          display: block;
          padding: 4px;
          @include sku-state;
          img {
            width: 40px;
            height: 40px;
            background: #ebebeb;
          }
          span {
            margin: 0 8px;
          }
        } 
        
      }      
    }
  }
}
</style>