/**
 * Music Composition Exercises Editor library
 */

var H5PEditor = H5PEditor || {};

H5PEditor.widgets.musicCompositionExercises = H5PEditor.MusicCompositionExercises = (function($, JoubelUI) {
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

  MusicCompositionExercises.prototype.getType = function() {
    return H5PEditor.findField(this.field.musicCompositionExercises.typeField, this.parent).$select.val();
  };

  MusicCompositionExercises.prototype.generatePreview = function() {
    if ( this.$exercisePreviewContainer.is(':hidden') ) {
      this.$exercisePreviewContainer.show();
    }

    // Close AudioContext of a previous exercise, might thorow an exception if too many are being open
    if ( this.exercise && typeof this.exercise === 'object' ) {
      this.exercise.close();
    }

    // Passing that to the functions is a must, current global variables will not cut it
    switch(this.getType()) {
      case '1.1':
        this.exercise = recognizeDuration();
        break;
      case '1.2':
        this.exercise = nameDuration();
        break;
      case '1.3':
        this.exercise = findMissingDuration();
        break;
      case '1.4':
        this.exercise = drawBarlines();
        break;
      case '1.5':
        this.exercise = findTime();
        break;
      case '2.5':
        this.exercise = describeNote("treble");
        break;
      case '2.6':
        this.exercise = describeNote("bass");
        break;
      case '2.7':
        this.exercise = noteFromNoteName("treble");
        break;
      case '2.8':
        this.exercise = noteFromSyllable("treble");
        break;
      case '2.9':
        this.exercise = noteFromNotation("treble");
        break;
      case '2.10':
        this.exercise = noteFromKeyboard("treble");
        break;
      case '2.11':
        this.exercise = noteFromNoteName("bass");
        break;
      case '2.12':
        this.exercise = noteFromSyllable("bass");
        break;
      case '2.13':
        this.exercise = noteFromNotation("bass");
        break;
      case '2.14':
        this.exercise = noteFromKeyboard("bass");
        break;
      case '2.15':
        this.exercise = enharmonism("name");
        break;
      case '2.16':
        this.exercise = enharmonism("syllable");
        break;
      case '2.17':
        this.exercise = changeClef("bass");
        break;
      case '2.18':
        this.exercise = changeClef("treble");
        break;
      case '2.19':
        this.exercise = octaveFromNotation("treble");
        break;
      case '2.20':
        this.exercise = octaveFromNotation("bass");
        break;
      case '3.1':
        this.exercise = buildInterval("treble", "up");
        break;
      case '3.2':
        this.exercise = buildInterval("treble", "down");
        break;
      case '3.3':
        this.exercise = buildInterval("bass", "up");
        break;
      case '3.4':
        this.exercise = buildInterval("bass", "down");
        break;
      case '3.5':
        this.exercise = buildChord("treble", "up");
        break;
      case '3.6':
        this.exercise = buildChord("treble", "down");
        break;
      case '3.7':
        this.exercise = buildChord("bass", "up");
        break;
      case '3.8':
        this.exercise = buildChord("bass", "down");
        break;
      case '7.1':
        this.exercise = recognizeKeySignature();
        break;
      case '7.2':
        this.exercise = buildScale();
        break;
      case '7.3':
        this.exercise = nameKey("major");
        break;
      case '7.4':
        this.exercise = nameKey("minor");
        break;
      default:
        alert(H5PEditor.t('H5PEditor.MusicCompositionExercises', 'invalidExerciseType', {}));
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

    // TODO This has to move somewhere
    $('<h2>', {
      'class': 'exerciseTitle'
    }).appendTo(self.$exercisePreviewContainer);
    $('<p>', {
      'class': 'description'
    }).appendTo(self.$exercisePreviewContainer);
    JoubelUI.createButton({
      'class': 'h5pf-music-compositon-exercises-play',
      'html': 'Mängi',
      'on': {
        'click': function() {
          self.exercise.play();
        }
      },
      'appendTo': self.$exercisePreviewContainer
    });
    $('<div>', {
      'class': 'mainCanvas'
    }).appendTo(self.$exercisePreviewContainer);
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-renew',
      'html': 'Uuenda',
      'on': {
        'click': function() {
          self.exercise.renew();
        }
      },
      'appendTo': self.$exercisePreviewContainer
    });
    $('<span>', {
      'class': 'question'
    }).appendTo(self.$exercisePreviewContainer);
    $('<span>', {
      'class': 'responseDiv'
    }).appendTo(self.$exercisePreviewContainer);
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-reply',
      'html': 'Vasta',
      'on': {
        'click': function() {
          self.exercise.checkResponse();
        }
      },
      'appendTo': self.$exercisePreviewContainer
    });
    $('<p>', {
      'class': 'feedback'
    }).appendTo(self.$exercisePreviewContainer);
    $('<span>', {
      'text': 'Katseid: '
    }).append($('<label>', {
      'class': 'attempts',
      'text': '0'
    })).appendTo(self.$exercisePreviewContainer);
    $('<span>', {
      'text': '. Neist õigeid vastuseid: '
    }).append($('<label>', {
      'class': 'score',
      'text': '0'
    })).appendTo(self.$exercisePreviewContainer);
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-reset',
      'html': 'Nulli',
      'on': {
        'click': function() {
          self.exercise.attempts = 0;
          self.exercise.score = 0;
          attempts.innerHTML = '0'; // XXX Attempts element is not defined or global
          score.innerHTML = '0'; // XXX Score element is not defined or global
        }
      },
      'appendTo': self.$exercisePreviewContainer
    });
    var resultsElement = $('<div>', {
      'html': 'Kui tunned, et oled valmis <b>testi sooritama</b>, vajuta: ',
      'class': 'resuts'
    }).appendTo(self.$exercisePreviewContainer);
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-show-test showTestButton',
      'html': 'Test',
      'on': {
        'click': function() {
          testDiv.style.visibility = 'visible'; // XXX This one needs and element selector
        }
      },
      'appendTo': resultsElement
    });
    $('<div>', {
      'class': 'testDiv',
      'style': 'visibility:hidden;'
    }).appendTo(self.$exercisePreviewContainer);

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
})(H5P.jQuery, H5P.JoubelUI);
