;(function (global, _) {
  if (!global.ko || !_) return false

  ko.components.register('BsButton', {
    viewModel: function (params) {
      var _this = this
      this.params = ko.utils.extend(
        {
          href: '',
          slotPannelLeft: null,
          slotPannelRight: null,
          size: function () {
            return COMPONENTS_CONFIG.BUTTON.SIZE.MEDIUM
          },
          type: function () {
            return COMPONENTS_CONFIG.BUTTON.TYPE.DEFAULT
          },
          cssBackground: function () {
            return COMPONENTS_CONFIG.CSS.BACKGROUND_COLOR['Gray/11']
          },
          cssColor: function () {
            return COMPONENTS_CONFIG.CSS.COLOR['Gray/03']
          },
          cssBorderColor: function () {
            return COMPONENTS_CONFIG.CSS.BORDER_COLOR['Gray/11']
          },
          disabled: false,
          block: false,
          slot: '',
          className: '',
          $click: function () {},
          $focus: function () {}
        },
        params
      )
      // this.localRef = componentInfo.element.querySelector('.bs-button')
      this.localSize = this.params.size(COMPONENTS_CONFIG.BUTTON.SIZE)
      this.localType = this.params.type(COMPONENTS_CONFIG.BUTTON.TYPE)
      this.localCssBackground = this.params.cssBackground(COMPONENTS_CONFIG.CSS.BACKGROUND_COLOR)
      this.localCssColor = this.params.cssColor(COMPONENTS_CONFIG.CSS.COLOR)
      this.localCssBorderColor = this.params.cssBorderColor(COMPONENTS_CONFIG.CSS.BORDER_COLOR)

      this.setFocus = function () {
        // this.localRef.focus()
      }
      this.onClick = function (vm, e) {
        if (typeof this.params.$click === 'function') {
          this.params.$click(vm, e)
        }
      }
      this.onFocus = function (vm, e) {
        this.setFocus()
        if (typeof this.params.$focus === 'function') {
          this.params.$focus(vm, e)
        }
      }
    },
    template: [
      '<button ',
      '  class="bs-button"',
      '  data-bind="',
      '  attr: {class: [',
      "    'bs-button',",
      '    localSize,',
      '    localType,',
      '    localCssBackground,',
      '    localCssColor,',
      '    localCssBorderColor,',
      "    params.block ? 'block' : '',",
      '    params.className,',
      "  ].join(' ')},",
      '  enable: !params.disabled,',
      '  event:{',
      '    click: onClick,',
      '    focus: onFocus',
      '  }',
      '  "',
      '>',
      '  <div class="b-cont">',
      '    <span class="b-lt" data-bind="visible: params.slotPannelLeft, text: params.slotPannelLeft"></span>',
      '    <span class="b-tx" data-bind="visible: params.slot, text: params.slot"></span>',
      '    <span class="b-rt" data-bind="visible: params.slotPannelRight, text: params.slotPannelRight"></span>',
      '  </div>',
      '</button>'
    ].join(' ')
  })
})(window, window._)
