;(function (global, _) {
  if (!global.ko || !_) return false

  ko.components.register('BsInputPassword', {
    viewModel: function (params) {
      var _this = this
      this.params = ko.utils.extend(
        {
          id: '',
          name: '',
          value: '',
          placeholder: '',
          icon: '',
          useClear: true,
          hasFocus: false,
          readonly: false,
          disabled: false,
          supportMessage: '',
          isFocus: false,
          isError: false,
          isSuccess: false,
          required: false,
          className: '',
          $input: function () {},
          $focus: function () {},
          $blur: function () {},
          $keyup: function () {}
        },
        params
      )
      this.localValue = ko.isObservable(this.params.value) ? this.params.value : ko.observable(this.params.value)

      this.onClearClick = function () {
        this.localValue('')
        this.setFocus()
      }
      this.setFocus = function () {
        this.localIsFocus(true)
      }
      this.onInput = function (vm, e) {
        if (typeof this.params.$input === 'function') {
          this.params.$input(vm, e)
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
      this.onKeyup = function (vm, e) {
        if (typeof this.params.$keyup === 'function') {
          this.params.$keyup(vm, e)
        }
      }
    },
    template: [
      '<div',
      'data-bind="component:{',
      "name: 'BsInputField',",
      'params:{',
      "type: 'password',",
      'id: params.id,',
      'name: params.name,',
      'value: params.value,',
      'placeholder: params.placeholder,',
      'icon: params.icon,',
      'useClear: params.useClear,',
      'hasFocus: params.hasFocus,',
      'readonly: params.readonly,',
      'disabled: params.disabled,',
      'supportMessage: params.supportMessage,',
      'isFocus: params.isFocus,',
      'isError: params.isError,',
      'isSuccess: params.isSuccess,',
      'required: params.required,',
      '}',
      '}"',
      '></div>'
    ].join('')
  })
})(window, window._)
