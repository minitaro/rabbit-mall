<script>
import { h } from 'vue'

export default {
  name: 'AppBreadcrumb',
  props: {
    separator: {
      type: String,
      default: 'iconfont icon-angle-right'
    }
  },
  setup(props, { slots }) {
    return () => {
      const nodes = slots.default()
      const items = []
      nodes.forEach((node, i) => {
        if (node.type.__name === 'AppBreadcrumbItem' || node.type.displayName === 'Transition') {
          items.push(node)
          if (i < (nodes.length - 1)) {
            items.push(h('i', { class: props.separator }))
          }
        }
      })
      return h('div', { class: 'app-breadcrumb' }, items)
    }
  }
}
</script>

<style lang="scss">
.app-breadcrumb{
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: $xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
