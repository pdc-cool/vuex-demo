export default {
  data() {
    return {
      currentCompType: 1, // 普通组件|循环组件|循环组件内组件：1|2|3
      currentTriggerCompType: 1,
    };
  },
  computed: {
    // 响应组件展示选项，禁用已选组件
    showGraphTargetComponents() {
      return function (triggerId) {
        const triggerCompId = triggerId.split('_')[1],
          triggerCompName = triggerId.split('_')[0];
        this.currentTriggerCompType = this.getCurrentCompType(triggerCompId, triggerCompName);
        let graphTargetComponents = this.getTargetSource(this.components, triggerCompId, []);

        this.setOptionDisabled(this.currentCompType, graphTargetComponents);
        return graphTargetComponents;
      };
    },
  },
  methods: {
    setOptionDisabled(currentCompType, graphTargetComponents) {
      switch (currentCompType) {
        case 3:
          this.setCompInLoopDisabled(graphTargetComponents);
          break;
        default:
          this.setNormalCompDisabled(graphTargetComponents);
      }
    },
    setNormalCompDisabled(graphTargetComponents) {
      const rege = new RegExp('/(w+)-(d+)/');
      graphTargetComponents.forEach(node => {
        if (!node.parentId && !rege.test(node.id)) {
          this.$set(node, 'disabled', false);
        } else {
          this.$set(node, 'disabled', true);
        }
      });
    },
    setCompInLoopDisabled(graphTargetComponents) {
      const rege = new RegExp('/(w+)-(d+)/'),
        superId = graphTargetComponents._triggerComponent.info.parentId;

      graphTargetComponents.forEach(node => {
        if (!rege.test(node.id) && node.parentId === superId) {
          this.$set(node, 'disabled', false);
        } else {
          this.$set(node, 'disabled', true);
        }
      });
    },
    getCurrentCompType(id, name) {
      let res;
      const inLoopComps = this.isInLoopComps(id, this.components);

      if (name === 'Loop') {
        res = 2;
      } else {
        if (inLoopComps) {
          res = 3;
        } else {
          res = 1;
        }
      }
      return res;
    },
    isInLoopComps(subId, comps) {
      let res;

      for (let i = 0; i < comps.length; i++) {
        if (comps[i].name === 'Loop') {
          const isExisted =
            comps[i].children && comps[i].children.some(node => node.info.id === subId);
          if (isExisted) {
            res = true;
            break;
          }
        } else {
          res = false;
        }
      }

      return res;
    },
  },
};
