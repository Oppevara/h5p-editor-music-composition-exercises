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

    var containerNode = this.$container.get(0);
    var canvasClassName = 'mainCanvas';

    switch(this.getType()) {
      case '1.1':
        this.exercise = recognizeDuration(containerNode, canvasClassName);
        break;
      case '1.2':
        this.exercise = nameDuration(containerNode, canvasClassName);
        break;
      case '1.3':
        this.exercise = findMissingDuration(containerNode, canvasClassName);
        break;
      case '1.4':
        this.exercise = drawBarlines(containerNode, canvasClassName);
        break;
      case '1.5':
        this.exercise = findTime(containerNode, canvasClassName);
        break;
      case '2.5':
        this.exercise = describeNote("treble", containerNode, canvasClassName);
        break;
      case '2.6':
        this.exercise = describeNote("bass", containerNode, canvasClassName);
        break;
      case '2.7':
        this.exercise = noteFromNoteName("treble", containerNode, canvasClassName);
        break;
      case '2.8':
        this.exercise = noteFromSyllable("treble", containerNode, canvasClassName);
        break;
      case '2.9':
        this.exercise = noteFromNotation("treble", containerNode, canvasClassName);
        break;
      case '2.10':
        this.exercise = noteFromKeyboard("treble", containerNode, canvasClassName);
        break;
      case '2.11':
        this.exercise = noteFromNoteName("bass", containerNode, canvasClassName);
        break;
      case '2.12':
        this.exercise = noteFromSyllable("bass", containerNode, canvasClassName);
        break;
      case '2.13':
        this.exercise = noteFromNotation("bass", containerNode, canvasClassName);
        break;
      case '2.14':
        this.exercise = noteFromKeyboard("bass", containerNode, canvasClassName);
        break;
      case '2.15':
        this.exercise = enharmonism("name", containerNode, canvasClassName);
        break;
      case '2.16':
        this.exercise = enharmonism("syllable", containerNode, canvasClassName);
        break;
      case '2.17':
        this.exercise = changeClef("bass", containerNode, canvasClassName);
        break;
      case '2.18':
        this.exercise = changeClef("treble", containerNode, canvasClassName);
        break;
      case '2.19':
        this.exercise = octaveFromNotation("treble", containerNode, canvasClassName);
        break;
      case '2.20':
        this.exercise = octaveFromNotation("bass", containerNode, canvasClassName);
        break;
      case '3.1':
        this.exercise = buildInterval("treble", "up", containerNode, canvasClassName);
        break;
      case '3.2':
        this.exercise = buildInterval("treble", "down", containerNode, canvasClassName);
        break;
      case '3.3':
        this.exercise = buildInterval("bass", "up", containerNode, canvasClassName);
        break;
      case '3.4':
        this.exercise = buildInterval("bass", "down", containerNode, canvasClassName);
        break;
      case '3.5':
        this.exercise = buildChord("treble", "up", containerNode, canvasClassName);
        break;
      case '3.6':
        this.exercise = buildChord("treble", "down", containerNode, canvasClassName);
        break;
      case '3.7':
        this.exercise = buildChord("bass", "up", containerNode, canvasClassName);
        break;
      case '3.8':
        this.exercise = buildChord("bass", "down", containerNode, canvasClassName);
        break;
      case '7.1':
        this.exercise = recognizeKeySignature(containerNode, canvasClassName);
        break;
      case '7.2':
        this.exercise = buildScale("major", containerNode, canvasClassName);
        break;
      case '7.3':
        this.exercise = nameKey("major", containerNode, canvasClassName);
        break;
      case '7.4':
        this.exercise = nameKey("minor", containerNode, canvasClassName);
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

    self.$typeField = H5PEditor.findField('type', self.parent).$select;
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

    // TODO This has to move somewhere
    $('<h2>', {
      'class': 'exerciseTitle'
    }).appendTo(self.$exercisePreviewContainer);
    $('<p>', {
      'class': 'description'
    }).appendTo(self.$exercisePreviewContainer);
    $('<br>').appendTo(self.$exercisePreviewContainer);
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
    $('<br>').appendTo(self.$exercisePreviewContainer);
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-renew',
      'html': 'Uuenda',
      'on': {
        'click': function() {
          self.$feedback.html('');
          self.exercise.renew();
        }
      },
      'appendTo': self.$exercisePreviewContainer
    });
    $('<br>').appendTo(self.$exercisePreviewContainer);
    $('<br>').appendTo(self.$exercisePreviewContainer);
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
    self.$feedback = $('<p>', {
      'class': 'feedback'
    }).appendTo(self.$exercisePreviewContainer);
    self.$attempts = $('<label>', {
      'class': 'attempts',
      'text': '0'
    });
    $('<span>', {
      'text': 'Katseid: '
    }).append(self.$attempts).appendTo(self.$exercisePreviewContainer);
    self.$score = $('<label>', {
      'class': 'score',
      'text': '0'
    });
    $('<span>', {
      'text': '. Neist õigeid vastuseid: '
    }).append(self.$score).appendTo(self.$exercisePreviewContainer);
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-reset',
      'html': 'Nulli',
      'on': {
        'click': function() {
          self.exercise.attempts = 0;
          self.exercise.score = 0;
          self.$attempts.text('0');
          self.$score.text('0');
        }
      },
      'appendTo': self.$exercisePreviewContainer
    });
    $('<br>').appendTo(self.$exercisePreviewContainer);
    $('<br>').appendTo(self.$exercisePreviewContainer);
    var resultsElement = $('<div>', {
      'html': 'Kui tunned, et oled valmis <b>testi sooritama</b>, vajuta: ',
      'class': 'resuts'
    }).appendTo(self.$exercisePreviewContainer);
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-show-test showTestButton',
      'html': 'Test',
      'on': {
        'click': function() {
          self.$testDiv.css('visibility', 'visible');
        }
      },
      'appendTo': resultsElement
    });
    $('<br>').appendTo(self.$exercisePreviewContainer);
    self.$testDiv = $('<div>', {
      'class': 'testDiv',
      'style': 'visibility:hidden;',
      'text': 'Kas soovite tulemuse salvestada pdf faili (nt esitamiseks õpetajale)? '
    }).appendTo(self.$exercisePreviewContainer);

    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-make-pdf-button makePdfButton',
      'html': 'Jah',
      'on': {
        'click': function() {
          self.$pdfDiv.css('visibility', 'visible');
          self.exercise.saveToPdf = true;
        }
      },
      'appendTo': self.$testDiv
    });
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-hide-pdf-button hidePdfButton',
      'html': 'Ei',
      'on': {
        'click': function() {
          self.$pdfDiv.css('visibility', 'hidden');
          self.exercise.saveToPdf = false;
        }
      },
      'appendTo': self.$testDiv
    });
    self.$pdfDiv = $('<div>', {
      'class': 'h5p-music-compositon-exercises-pdf-div pdfDiv',
      'style': 'visibility:hidden;',
      'text': 'Nimi: '
    }).append($('<input>', {
      'type': 'text',
      'class': 'name',
      'size': '20'
    })).appendTo(self.$testDiv);
    self.$testDiv.append('Küsimus nr <b><label class="questionNumber">0</label></b>. Aega on: <b><label  class="timer">0</label></b> sekundit.<br> Aega kulunud kokku: <b><label class="totalTestTime">0</label></b> sekundit.<br>');
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-start-test startTest',
      'html': 'Alusta',
      'on': {
        'click': function() {
          self.exercise.startTest();
        }
      },
      'appendTo': self.$testDiv
    });
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-stop-test stopTest',
      'html': 'Peata',
      'on': {
        'click': function() {
          self.exercise.stopTest();
        }
      },
      'appendTo': self.$testDiv
    });
    $('<br>').appendTo(self.$testDiv);
    $('<p>').append($('<small>', {
      'text': 'Teile esitatakse 5 küsimust, mis tuleb ettemääratud aja jooksul vastata. Kui jõuate varem valmis, vajutage lihtsalt "Vasta". Uus küsimus kuvatakse peale eelmise vastamist või aja täitumisel.'
    })).appendTo(self.$testDiv);

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
