;(function (global, _) {
  if (!global.ko || !_) return false

  ko.components.register('BsSelect', {
    viewModel: function (params) {
      var _this = this
      this.params = ko.utils.extend(
        {
          options: [],
          value: '',
          disabled: false,
          isSuccess: false,
          isError: false,
          hasFocus: false,
          supportMessage: '',
          $change: function () {},
          $focus: function () {},
          $blur: function () {}
        },
        params
      )
      this.localIsFocus = ko.observable(params.hasFocus)

      this.setFocus = function () {
        //this.localRef.focus()
        this.localIsFocus(true)
      }
      this.onChange = function (vm, e) {
        if (typeof this.params.$change === 'function') {
          this.params.$change(vm, e)
        }
      }
      this.onFocus = function (vm, e) {
        this.setFocus()
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
    template: [
      '<div class="bs-select" data-bind="',
      "  attr:{class: ['bs-select', params.disabled ? 'is-select-disabled' : ''].join(' ')},",
      '  css:{',
      "    'is-focus': localIsFocus,",
      "    'is-error': params.isError,",
      "    'is-disabled': params.disabled,",
      '  }',
      '"',
      '>',
      '  <div',
      '    data-bind="component:{',
      "    name: 'BsInputField',",
      '    params:{',
      '      value: params.value,',
      '      readonly: true,',
      "      inputRightSlot: '<span class=b-ic-select></span>',",
      '      supportMessage: params.supportMessage,',
      '      isError: params.isError',
      '    }',
      '  }"',
      '  ></div>',
      '  <select data-bind="',
      '    value: params.value, ',
      '    options: params.options,',
      '    visible: params.options, ',
      '    enable: !params.disabled,',
      '    event:{',
      '      change: onChange,',
      '      focus: onFocus,',
      '      blur: onBlur,',
      '    }',
      '    "',
      '  >',
      '  </select>',
      '</div>'
    ].join('')
  })
})(window, window._)
