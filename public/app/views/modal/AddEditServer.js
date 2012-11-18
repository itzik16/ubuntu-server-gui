// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['jquery', 'underscore', 'App', 'backbone_modelbinder', 'models/Server', 'collections/ServerList', 'views/BaseForm', 'text!views/modal/templates/add-edit-server.html', 'bootstrap_modal', 'bootstrap_transition'], function($, _, App, BackboneModelBinder, Server, ServerList, BaseForm, addEditServerTpl) {
  /**
   * @class AddEditServerModal
   * Add server modal dialog.
   * @extends BackboneMarionette.ItemView
  */

  var AddServerModal;
  return AddServerModal = (function(_super) {

    __extends(AddServerModal, _super);

    /**
     * @constructor
     * Creates a new AddServerModal instance.
     * @param {Object} [options] config options for BackboneMarionette.ItemView.
    */


    function AddServerModal(options) {
      var _ref, _ref1;
      if (options == null) {
        options = {};
      }
      this.App = App;
      this.model = (_ref = options.model) != null ? _ref : new Server();
      this.modelBinder = new BackboneModelBinder();
      this.tagName = 'div';
      this.id = 'modal_add_server';
      this.className = 'modal hide fade';
      this.template = _.template(addEditServerTpl);
      this.templateHelpers = {
        titleOperation: (_ref1 = options.operationLabel) != null ? _ref1 : 'Add'
      };
      this.events = {
        'click #add_server_btn': 'onSubmit',
        'keyup input': 'onInputKeyup'
      };
      AddServerModal.__super__.constructor.apply(this, arguments);
      return;
    }

    AddServerModal.prototype.hideModal = function() {
      this.modelBinder.unbind();
      $('#modal_add_server').modal('hide');
      this.clearForm();
      this.enableForm();
    };

    AddServerModal.prototype.onSubmit = function(eventObj) {
      eventObj.stopPropagation();
      eventObj.preventDefault();
      eventObj.returnValue = false;
      this.hideError();
      this.disableForm();
      this.model.save();
      this.App.vent.trigger('server:new-server-added', {
        server: this.model
      });
      this.hideModal();
    };

    AddServerModal.prototype.onInputKeyup = function(eventObj) {
      eventObj.stopPropagation();
      eventObj.preventDefault();
      eventObj.returnValue = false;
      if (eventObj.keyCode === 13) {
        this.onSubmit(eventObj);
      }
      return false;
    };

    AddServerModal.prototype.onAddServerError = function() {
      this.showError(this.model.get('errorMsg'));
    };

    AddServerModal.prototype.onShow = function() {
      var _this = this;
      $('#modal_add_server').modal({
        show: true
      }).on('hidden', function() {
        _this.clearForm();
        _this.close();
      }).on('shown', function() {
        _this.modelBinder.bind(_this.model, _this.el);
        $('input[type=text]:first').focus();
      });
    };

    AddServerModal.prototype.showError = function(msg) {
      this.enableForm();
      $('#error_alert').text(msg).show();
    };

    return AddServerModal;

  })(BaseForm);
});