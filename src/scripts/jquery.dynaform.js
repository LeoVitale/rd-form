(function ($) {
  var generateNameField = function () {
    return ['<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">',
      '<input class="mdl-textfield__input" type="text" id="dyna-name-input" name="name" pattern="[A-Z,a-z, ]*">',
      '<label class="mdl-textfield__label" for="dyna-name-input">Nome...</label>',
      '<span class="mdl-textfield__error">Este campo é obrigatório <br> Use somente letras</span>',
      '</div>'
    ].join('\n');

  };

  var generateEmailField = function () {
    return ['<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">',
      '<input class="mdl-textfield__input" type="text" id="dyna-email-input" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$">',
      '<label class="mdl-textfield__label" for="dyna-email-input">E-mail...</label>',
      '<span class="mdl-textfield__error">Este campo é obrigatório <br> Digite seu e-mail corretamente Ex. nome@email.com</span>',
      '</div>'
    ].join('\n');
  };

  var generateStateField = function (estados) {
    if (estados.length > 0 && estados !== undefined) {
      var optionsEstado = ["<option value=''>Estado</option>"];

      estados.forEach(function (estado) {
        optionsEstado.push("<option value='" + estado + "'>" + estado + "</option>");
      });

      var select = [
        '<div class="mdl-selectfield mdl-js-selectfield">',
        '<select id="estado" name="estado" class="mdl-selectfield__select">',
        optionsEstado,
        '</select>',
        '<label class="mdl-selectfield__label" for="estado"></label>',
        '<span class="mdl-selectfield__error">Select a value</span>',
        '</div>'
      ].join('\n');

      return select;
    }
    return;
  };

  var generateLevelField = function (niveis) {
    if (niveis.length > 0 && niveis !== undefined) {

      var optionsNiveis = ["<option value=''>Selecione um Nível</option>"];

      niveis.forEach(function (nivel, index) {
        optionsNiveis.push("<option value='" + index + "'>" + nivel + "</option>");
      });

      var select = [
        '<div class="mdl-selectfield mdl-js-selectfield">',
        '<select id="nivel" name="nivel" class="mdl-selectfield__select">',
        optionsNiveis,
        '</select>',
        '<label class="mdl-selectfield__label" for="nivel"></label>',
        '<span class="mdl-selectfield__error">Select a value</span>',
        '</div>'
      ].join('\n');

      return select;
    }
    return;
  };

  $.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

  $.fn.dynaform = function (options) {

    var opts = $.extend({}, $.fn.dynaform.defaults, options);

    var dialog = ['<dialog class="mdl-dialog">',
                    '<h4 class="mdl-dialog__title"></h4>',
                    '<div class="mdl-dialog__content">',
                      '<p id="dialog-message">',
                      '</p>',
                    '</div>',
                    '<div class="mdl-dialog__actions">',
                      '<button type="button" class="mdl-button close">Ok</button>',
                    '</div>',
                  '</dialog>'
                ].join('\n');

    var template = ['<form class="dyna-form" action="/" method="POST">',
      generateNameField(),
      '<br>',
      generateEmailField(),
      opts.fields.estado !== undefined ? generateStateField(opts.fields.estado) : '',
      opts.fields.nivel !== undefined ? generateLevelField(opts.fields.nivel) : '',
      '<br>',
      '<div class="btn-container"><buttom class="dyna-submit-btn mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" type="submit" >Enviar</buttom></div>',
      '</form>'
    ].join('\n');

    this.append(template);
    this.append(dialog);

    var setDialog = function () {
      var dialog = document.querySelector('dialog');
      if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }
      dialog.querySelector('.close').addEventListener('click', function () {
        dialog.close();
      });
    }();

    $('.dyna-submit-btn').on('click', function (e) {
      var dialog = document.querySelector('dialog');
      var request = $.ajax({
        method: "POST",
        url: opts.endpoint,
        data: JSON.stringify({
          'token': opts.token,
          'secret': opts.secret,
          'lead': $(".dyna-form").serializeObject()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "text"
      });
      request.done(function (msg) {
        console.log(msg);
        $('#dialog-message').text('');
        $('.mdl-dialog__title').text('Valew!!!!');
        $('#dialog-message').append('Formulário enviado com sucesso, espero que gostem!');
        dialog.showModal();
      });

      request.fail(function (jqXHR, textStatus) {
        console.log(jqXHR);
        $('#dialog-message').text('');
        $('.mdl-dialog__title').text('Erro na Validação');
        $.parseJSON(jqXHR.responseText).forEach(function (error, index) {
          var erro = 'Erro ' + index + ': ' + error.msg
          $('#dialog-message').append(erro);
          $('#dialog-message').append('<br>');
        });
        dialog.showModal();
      });

    });

    return this;
  };

  $.fn.dynaform.defaults = {

  };

}(jQuery));