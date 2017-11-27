/**
 * Music Composition Exercises Editor library
 */

var H5PEditor = H5PEditor || {};

H5PEditor.widgets.MusicCompositionExercises = H5PEditor.MusicCompositionExercises = (function($) {
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
  }

  /**
   * Builds the DOM objects and appends to the $wrapper
   * Also deals with setup of listeners and event handlers
   * @param  {object} $wrapper DOM node of container element
   * @return {void}
   */
  MusicCompositionExercises.prototype.appendTo = function($wrapper) {
    var self = this;

    self.$container = $('<div>', {
      'class': 'field field-name-' + self.field.name + ' h5p-grid-music-composition-exercises group'
    });
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
