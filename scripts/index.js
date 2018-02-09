/**
 * Music Composition Exercises Editor library
 */

var H5PEditor = H5PEditor || {};

H5PEditor.widgets.musicCompositionExercises = H5PEditor.MusicCompositionExercises = (function($) {
  /**
   * Constructor function
   * @param       {object}   parent   Parent representation
   * @param       {object}   field    Field structure representation
   * @param       {mixed}    params   Array of stored data or undefined
   * @param       {function} setValue Value storage callback
   * @constructor
   */
  function MusicCompositionExercises(parent, field, params, setValue) {
    this.parent = parent;
    this.field = field;
    this.params = params;
    this.setValue = setValue;
    this.exercise = null;
  }

  MusicCompositionExercises.prototype.getTypeField = function() {
    return H5PEditor.findField(this.field.musicCompositionExercises.typeField, this.parent).$select;
  };

  MusicCompositionExercises.prototype.getType = function() {
    return this.getTypeField().val();
  };

  MusicCompositionExercises.prototype.generatePreview = function() {
    if ( this.$exercisePreviewContainer.is(':hidden') ) {
      this.$exercisePreviewContainer.show();
    }

    // Close AudioContext of a previous exercise, might thorow an exception if too many are being open
    if ( this.exercise && typeof this.exercise === 'object' ) {
      this.exercise.close();
    }

    try {
      this.exercise = H5P.MusicCompositionExercisesLibrary.createExerciseInstance(this.getType(), this.$container.get(0), 'mainCanvas');
    }
    catch(err) {
      if ( err === 'invalidExerciseType' ) {
        alert(H5PEditor.t('H5PEditor.MusicCompositionExercises', 'invalidExerciseType', {}));
      }
    }
  };

  /**
   * Builds the DOM objects and appends to the $wrapper
   * Also deals with setup of listeners and event handlers
   * @param  {object} $wrapper DOM node of container element
   * @return {void}
   */
  MusicCompositionExercises.prototype.appendTo = function($wrapper) {
    var self = this;

    self.$typeField = self.getTypeField();
    self.$typeField.on('change', function() {
      if ( !self.$exercisePreviewContainer.is(':hidden') ) {
        self.generatePreview();
      }
    });

    self.$container = $('<div>', {
      'class': 'field field-name-' + self.field.name + ' h5p-music-composition-exercises group'
    });

    self.$generatePreviewButton = $('<div>', {
      'class': 'h5peditor-button h5peditor-button-textual generate-preview',
      'role': 'button',
      'tabindex': '0',
      'aria-disabled': 'false',
      'text': H5PEditor.t('H5PEditor.MusicCompositionExercises', 'generateExercisePreview', {})
    }).on('click', function() {
      self.generatePreview();
    }).appendTo(self.$container);

    self.$exercisePreviewContainer = $('<div>', {
      class: 'h5p-music-composition-exercises-preview',
      style: 'display:none'
    });

    H5P.MusicCompositionExercisesLibrary.generateHtml(self, self.$exercisePreviewContainer);

    self.$exercisePreviewContainer.appendTo(self.$container);

    self.$container.appendTo($wrapper);
  };

  /**
   * Runs before page is saved, makes sure the values are stored.
   * Sets value to undefined, if data is missing.
   * Does not really do any validation.
   * @return {boolean} Always returns true
   */
  MusicCompositionExercises.prototype.validate = function() {
    // TODO Make sure that this function does really save something
    this.setValue(this.field, undefined);
    return true;
  };

  /**
   * Handles element removal
   * @return {void}
   */
  MusicCompositionExercises.prototype.remove = function() {
    $wrapper.remove();
  };

  return MusicCompositionExercises;
})(H5P.jQuery);
