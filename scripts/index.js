/**
 * Music Composition Exercises Editor library
 */

 // It would be useful to load those as H5P dependencies, but those seem to want to attach themselves to global window object
 (function(){
   if (window.VEXTAB_LOADED === true) return;
   window.VEXTAB_LOADED = true;
   var script = document.createElement("script");
   // XXX This should be loaded from here: https://unpkg.com/vextab@2.0.13/releases/vextab-div.js
   script.src = "https://unpkg.com/vextab/releases/vextab-div.js";
   document.head.appendChild(script);
 })();
 (function(){
   if (window.WEB_AUDIO_FONT_PLAYER_LOADED === true) return;
   window.WEB_AUDIO_FONT_PLAYER_LOADED = true;
   var script = document.createElement("script");
   // XXX This should either become part of the library or come from CDN
   script.src = "https://surikov.github.io/webaudiofont/npm/dist/WebAudioFontPlayer.js";
   document.head.appendChild(script);
 })();
 (function(){
   if (window.WEB_AUDIO_SOND_LOADED === true) return;
   window.WEB_AUDIO_SOND_LOADED = true;
   var script = document.createElement("script");
   // XXX This should either become part of the library or come from CDN
   script.src = "https://surikov.github.io/webaudiofontdata/sound/0000_JCLive_sf2_file.js";
   document.head.appendChild(script);
 })();

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
  }

  MusicCompositionExercises.prototype.getType = function() {
    return H5PEditor.findField(this.field.musicCompositionExercises.typeField, this.parent).$select.val();
  };

  MusicCompositionExercises.prototype.generatePreview = function() {
    console.log('type >>>', this.getType());
    // TODO Need to create an exercise instance if one does not exist
    // Passing that to the functions is a must, current global variables will not cut it
    switch(this.getType()) {
      case '1.2.2':
        nameDuration();
        break;
      case '1.2.3':
        findMissingDuration();
        break;
      case '1.2.4':
        drawBarlines();
        break;
      case '1.3.5':
        describeNote();
        break;
      case '1.3.7':
        drawNote();
        break;
      case '1.8.1':
        recognizeKeySignature();
        break;
      default:
        alert('NO SUCH EXERCISE TYPE'); // XXX Requires translation
    }
    throw 'Not Implemented';
  };

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

    self.$generatePreviewButton = $('<div>', {
      'class': 'h5peditor-button h5peditor-button-textual',
      'role': 'button',
      'tabindex': '0',
      'aria-disabled': 'false',
      'text': H5PEditor.t('H5PEditor.MusicCompositionExercises', 'generatePreview', {})
    }).on('click', function() {
      self.generatePreview();
    }).appendTo(self.$container);

    self.$exercisePreviewContainer = $('<div>', {
      'class': 'h5p-music-composition-exercises'
    });

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
