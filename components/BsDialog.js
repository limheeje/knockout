;(function (global, _) {
  if (!global.ko || !_) return false

  ko.components.register('BsDialog', {
    viewModel: function (params) {
      var _this = this
      this.params = ko.utils.extend(
        {
          isOpen: false,
          template: '',
          className: '',
          useBottomSheet: true,
          type: function () {
            return COMPONENTS_CONFIG.DIALOG.TYPE.CONTENT
          },
          useHeader: true,
          backdropClickClose: true,
          title: '',
          slotTopRight: null,
          slot: null,
          slotBottom: null,
          subTitle: false,
          $clickCancel: function () {},
          $clickConfirm: function () {}
        },
        params
      )
      this.localOpen = ko.observable(this.params.isOpen)
      this.DESIGN_TYPE = ko.observable(COMPONENTS_CONFIG.DIALOG.TYPE)
      this.localType = this.params.type(COMPONENTS_CONFIG.DIALOG.TYPE)
      this.isDesignTypeAlertOrConfirm = this.localType === this.DESIGN_TYPE().ALERT || this.localType === this.DESIGN_TYPE().CONFIRM

      this.onClickClose = function (vm, e) {
        if (this.params.$clickCancel && typeof this.params.$clickCancel === 'function') {
          this.params.$clickCancel(vm, e)
        } else {
          this.localOpen(false)
        }
      }
      this.onClickConfirm = function (vm, e) {
        if (typeof this.params.$clickConfirm === 'function') {
          this.params.$clickConfirm(vm, e)
        }
      }
      this.onClickBackdrop = function (vm, e) {
        if (this.params.backdropClickClose) {
          this.onClickClose(vm, e)
        }
      }
    },
    template: `
    <!-- ko if: localOpen -->
    <div class="bs-dialog" data-bind="
      css: {
        [DESIGN_TYPE().ALERT] : localType === DESIGN_TYPE().ALERT,
        [DESIGN_TYPE().CONFIRM] : localType === DESIGN_TYPE().CONFIRM,
        [DESIGN_TYPE().CHECK] : localType === DESIGN_TYPE().CHECK,
        [DESIGN_TYPE().CONTENT] : localType === DESIGN_TYPE().CONTENT,
        [DESIGN_TYPE().ONLY_IMAGE] : localType === DESIGN_TYPE().ONLY_IMAGE,
        [DESIGN_TYPE().ONLY_NOTIFICATION] : localType === DESIGN_TYPE().ONLY_NOTIFICATION,
      }
    ">
      <div class="b-dimm" data-bind="click: onClickBackdrop"></div>
      <div class="b-container">
        <div class="b-inner">
          <div class="bd-top" data-bind="visible: params.useHeader">
            <div class="t-lt">
              <div class="t-tx" data-bind="html: params.title"></div>
            </div>
            <div class="t-rt" data-bind="visible: params.slotTopRight, html: params.slotTopRight"></div>
          </div>
          <div class="bd-cont" data-bind="template: params.template"></div>
          <!-- ko if:!isDesignTypeAlertOrConfirm -->
          <div class="bd-bott" data-bind="html: params.slotBottom"></div>
          <!-- /ko -->
          <!-- ko if:isDesignTypeAlertOrConfirm -->
          <div class="bd-bott">
            <div style="display: flex; width: 100%;">
              <!-- ko if: localType === DESIGN_TYPE().ALERT -->
              <button style="flex: auto;" data-bind="click: onClickClose">확인</button>
              <!-- /ko -->
              <!-- ko if: localType === DESIGN_TYPE().CONFIRM -->
              <button style="flex: auto;" data-bind="click: onClickClose">취소</button>
              <button style="flex: auto;" data-bind="click: onClickConfirm">확인</button>
              <!-- /ko -->
            </div>
          </div>
          <!-- /ko -->
        </div>
      </div>
    </div>
    <!-- /ko -->
    `
  })
})(window, window._)
