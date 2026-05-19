;(function (global, _) {
  if (!global.ko || !_) return false

  ko.components.register('BsRadio', {
    viewModel: function (params) {
      var _this = this
      this.params = ko.utils.extend(
        {
          id: '',
          name: '',
          slot: '',
          value: '',
          checked: false,
          hasFocus: false,
          disabled: false,
          designType: function () {
            return COMPONENTS_CONFIG.CHECKBOX.TYPE.ROUND
          },
          $change: function () {},
          $focus: function () {},
          $blur: function () {}
        },
        params
      )
      this.uniqueId = _.uniqueId('_uuid_')
      this.DESIGN_TYPE = ko.observable(COMPONENTS_CONFIG.CHECKBOX.TYPE)
      this.localId = ko.observable(this.params.id || this.uniqueId)
      this.localName = ko.observable(this.params.name || this.uniqueId)
      this.localIsFocus = ko.observable(params.hasFocus)
      this.localDesignType = this.params.designType(COMPONENTS_CONFIG.CHECKBOX.TYPE)

      this.onChange = function (vm, e) {
        if (typeof this.params.$change === 'function') {
          this.params.$change(vm, e)
        }
      }
      this.onFocus = function (vm, e) {
        this.localIsFocus(true)
        if (typeof this.params.$focus === 'function') {
          this.params.$focus(vm, e)
        }
      }
      this.onBlur = function (vm, e) {
        if (typeof this.params.$blur === 'function') {
          this.params.$blur(vm, e)
        }
        this.localIsFocus(false)
      }
    },
    template: `
    <span class="bs-radio" data-bind="
      css: {
      'is-disabled': params.disabled,
      'is-focus': localIsFocus,
      [DESIGN_TYPE().CHECKBOX] : localDesignType === DESIGN_TYPE().CHECKBOX,
      [DESIGN_TYPE().ROUND] : localDesignType === DESIGN_TYPE().ROUND,
      [DESIGN_TYPE().CHECK] : localDesignType === DESIGN_TYPE().CHECK,
      [DESIGN_TYPE().LABEL] : localDesignType === DESIGN_TYPE().LABEL,
      }
    ">
      <input type="radio" 
        class="b-inp" 
        data-bind="
          hasFocus: localIsFocus,
          event:{
            change: onChange,
            focus: onFocus,
            blur: onBlur
          },
          attr: {
            id: localId,
            value: params.value,
            name: localName
          },
          checked: params.checked,
          enable: !params.disabled
        "
      />
      <label class="b-lb" data-bind="
        attr: {
          for: localId
        }
      ">
        <span class="ico-check"></span>
        <span class="b-tx" data-bind="visible: params.slot,html: params.slot"></span>
      </label>
    </span>
    `
  })
})(window, window._)
