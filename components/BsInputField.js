;(function (global, _) {
  if (!global.ko || !_) return false

  ko.components.register('BsInputField', {
    viewModel: function (params) {
      var _this = this
      this.params = ko.utils.extend(
        {
          id: '',
          name: '',
          value: '',
          placeholder: '',
          icon: '',
          type: 'text',
          inputFilter: '',
          useClear: true,
          hasFocus: false,
          readonly: false,
          disabled: false,
          supportMessage: '',
          isFocus: false,
          isError: false,
          isSuccess: false,
          required: false,
          inputRightSlot: '',
          className: '',
          $input: function () {},
          $focus: function () {},
          $blur: function () {},
          $keyup: function () {}
        },
        params
      )
      this.uniqueId = _.uniqueId('_uuid_')
      this.localValue = ko.isObservable(this.params.value) ? this.params.value : ko.observable(this.params.value)
      this.localId = ko.observable(this.params.id || this.uniqueId)
      this.localName = ko.observable(this.params.name || this.uniqueId)
      this.localIsFocus = ko.observable(params.hasFocus)
      this.setValue = function (v) {
        var _v = v
        switch (this.params.inputFilter) {
          case 'ko':
            _v = v.replace(new RegExp(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g), '')
            break
          case 'en':
            _v = v.replace(new RegExp(/[^a-zA-Z]/g), '')
            break
          case 'number':
            // _v = v.replace(new RegExp(/[^0-9.-]/g), '')
            _v = v.replace(new RegExp(/[^0-9.-]/g), ' ')
            break
          case 'ko_special':
            _v = v.replace(new RegExp(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣~`'"*+!@#$%^&()_={}[\]:;,.<>\\/?|-]/g), '')
            break
          case 'en_special':
            _v = v.replace(new RegExp(/[^a-zA-Z~`'"*+!@#$%^&()_={}[\]:;,.<>\\/?|-]/g), '')
            break
          case 'price_comma':
            _v = StringUtil.setPriceComma(v.replace(/[^0-9]/g, ''))
            _v = _v === '0' ? '' : _v
            break
        }
        return _v
      }
      this.onClearClick = function () {
        this.localValue('')
        this.setFocus()
      }
      this.setFocus = function () {
        //this.localRef.focus()
        this.localIsFocus(true)
      }
      this.onInput = function (vm, e) {
        var _v = e.target.value
        console.log(e)
        e.isDefaultPrevented(false)
        if (e.originalEvent.data === 'ㅇ') {
        }

        this.localValue(this.setValue(_v))
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
      setTimeout(function () {
        _this.localValue(_this.setValue(_this.localValue()))
        //_this.localRef = componentInfo.element.querySelector('#' + _this.localId())
      }, 0)
    },
    template: [
      '<div class="bs-ipt-wrap" data-bind="',
      "attr: {class: 'bs-ipt-wrap' + ' ' +params.className},",
      'css: {',
      "  'is-focus': localIsFocus,",
      "  'is-error': params.isError,",
      "  'is-readonly': params.readonly,",
      "  'is-disabled': params.disabled,",
      "  'is-required': params.required,",
      '}',
      '">',
      '  <div class="b-inpu-area">',
      '    <input ',
      '      class="b-ipt-text" ',
      '      data-bind="',
      '      hasFocus: localIsFocus,',
      '      attr:{',
      '        type: params.type,',
      '        id: localId,',
      '        name: localName,',
      '        placeholder: params.placeholder,',
      '        readonly: params.readonly',
      '      },',
      '      value: localValue,',
      "      valueUpdate : 'input',",
      '      enable: !params.disabled,',
      '      event:{',
      '        input: onInput,',
      '        focus: onFocus,',
      '        blur: onBlur,',
      '        keyup: onKeyup,',
      '      }',
      '      "',
      '    />',
      '    <div class="b-inpt-rt">',
      '      <button class="b-clear-bt" data-bind="visible: params.useClear && params.value && !params.readonly && !params.disabled, event:{',
      '      click: onClearClick',
      '      }" >',
      '        <span class="blind">값 초기화</span>',
      '      </button>',
      '      <span data-bind="visible: params.inputRightSlot, html: params.inputRightSlot"></span>',
      '    </div>',
      '  </div>',
      '  <div class="b-ipt-meesage" data-bind="visible: params.supportMessage && (params.isError || params.isSuccess)">',
      '    <p class="ms-msg" data-bind="text: params.supportMessage"></p>',
      '  </div>',
      '</div>'
    ].join('')
  })
})(window, window._)
