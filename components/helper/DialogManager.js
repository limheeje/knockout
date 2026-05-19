;(function (global, _) {
  if (!global.ko || !_) return false

  function DialogManager() {
    if (!ko.components.isRegistered('BsDialog')) return false
    console.log(ko.components)
    console.log(ko.components.dd.BsDialog)
    console.log(ko.components.getComponentNameForNode('BsDialog'))

    this.dialogArray = ko.observableArray([])

    this.getDialog = function (params) {
      this.dialogArray.push(params)
    }

    this.close = function () {
      this.dialogArray({})
    }
  }

  global.DialogManager = DialogManager
})(window, window._)
