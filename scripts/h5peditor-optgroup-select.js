var H5PEditor = H5PEditor || {};

H5PEditor.widgets.mceOptgroupSelect = H5PEditor.MCEOptgroupSelect = (function (E) {
  /**
   * Initialize a new widget.
   *
   * @param {object} parent
   * @param {object} field
   * @param {object} params
   * @param {function} setValue
   * @returns {_L3.C}
   */
  function C(parent, field, params, setValue) {
    this.field = field;
    this.value = params;
    this.setValue = setValue;

    // Setup event dispatching on change
    this.changes = [];
    this.triggerListeners = function (value) {
      // Run callbacks
      for (var i = 0; i < this.changes.length; i++) {
        this.changes[i](value);
      }
    }
  }

  /**
   * Append widget to the DOM.
   *
   * @param {jQuery} $wrapper
   * @returns {undefined}
   */
  C.prototype.appendTo = function ($wrapper) {
    var that = this;

    this.$item = E.$(this.createHtml()).appendTo($wrapper);
    this.$select = this.$item.find('select');
    this.$errors = this.$item.children('.h5p-errors');

    this.$select.change(function () {
      var val = that.validate();
      if (val !== false) {
        that.value = val;
        that.setValue(that.field, val);
        that.triggerListeners(val);
      }
    });
  };

  /**
   * Generate HTML for the widget.
   *
   * @returns {String} HTML.
   */
  C.prototype.createHtml = function () {
    var options = '';

    if (this.field.optional === true || this.field.default === undefined) {
      options += E.createOption('-', '-');
    }

    options += C.createOptionsHtml(this.field.optgroups, this.field.options, this.value);

    return E.createFieldMarkup(this.field, '<select>' + options + '</select>');
  };

  /**
   * Generate HTML for select options.
   *
   * @param {Array} options
   * @param {string} selected value
   * @return {string}
   */
  C.createOptionsHtml = function (optgroups, options, selected) {
    var html = '';

    if ( optgroups ) {
      var groupedOptions = [];

      for (var i = 0; i < optgroups.length; i++) {
        html += '<optgroup label="' + optgroups[i].label + '">';
        for (var j = 0; j < options.length; j++) {
          if ( options[j].value.startsWith(optgroups[i].value) ) {
            html += E.createOption(options[j].value, options[j].label, options[j].value === selected);
            groupedOptions.push(options[j].value);
          }
        }
        html += "</optgroup>";
      }

      if ( options.length > groupedOptions.length ) {
        for (var i = 0; i < options.length; i++) {
          if ( groupedOptions.indexOf(options[i].value) === -1 ) {
            html += E.createOption(options[i].value, options[i].label, options[i].value === selected);
          }
        }
      }
    } else {
      for (var i = 0; i < options.length; i++) {
        html += E.createOption(options[i].value, options[i].label, options[i].value === selected);
      }
    }

    return html;
  };

  /**
   * Validate this field.
   *
   * @returns {Boolean}
   */
  C.prototype.validate = function () {
    var value = this.$select.val();
    if (value === '-') {
      value = undefined; // No value selected
    }

    if (this.field.optional !== true && value === undefined) {
      // Not optional and no value selected, print required error
      this.$errors.append(ns.createError(ns.t('core', 'requiredProperty', {':property': ns.t('core', 'textField')})));

      return false;
    }

    // All valid. Remove old errors
    var $errors = this.$errors.children();
    if ($errors.length) {
      $errors.remove();
    }

    return value;
  };

  /**
   * Remove widget from DOM.
   *
   * @returns {undefined}
   */
  C.prototype.remove = function () {
    this.$item.remove();
  };

  return C;
})(H5PEditor);
