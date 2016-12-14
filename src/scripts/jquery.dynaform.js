(function ($) {
  var generateNameField = function() {
      return ['<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">',
                '<input class="mdl-textfield__input" type="text" id="dyna-name-input" pattern="[A-Z,a-z, ]*">',
                '<label class="mdl-textfield__label" for="dyna-name-input">Nome...</label>',
                '<span class="mdl-textfield__error">Este campo é obrigatório <br> Use somente letras</span>',
              '</div>'].join('\n');
       
    };

    var generateEmailField = function() {
      return ['<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">',
                '<input class="mdl-textfield__input" type="text" id="dyna-email-input" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$">',
                '<label class="mdl-textfield__label" for="dyna-email-input">E-mail...</label>',
                '<span class="mdl-textfield__error">Este campo é obrigatório <br> Digite seu e-mail corretamente Ex. nome@email.com</span>',
              '</div>'].join('\n');
    };

    var generateStateField = function(estados) {
      var optionsEstado = ["<option value='0'>Estado</option>"];

      estados.forEach(function(estado){
        optionsEstado.push("<option value='"+estado+"'>"+estado+"</option>");
      });

      var select = [
      '<div class="mdl-selectfield mdl-js-selectfield">',
        '<select id="gender" class="mdl-selectfield__select">',
          optionsEstado,
        '</select>',
        '<label class="mdl-selectfield__label" for="gender">User gender</label>',
        '<span class="mdl-selectfield__error">Select a value</span>',
      '</div>'].join('\n');

      return select;
    };

    var generateLevelField = function(niveis) {
      if (niveis.length > 0 && niveis !== undefined) {

        var optionsNiveis = ["<option value='0'>Selecione um Nível</option>"];

        niveis.forEach(function (nivel, index) {
          optionsNiveis.push("<option value='"+index+"'>"+nivel+"</option>");
        });

        var select = [
        '<div class="mdl-selectfield mdl-js-selectfield">',
          '<select id="gender" class="mdl-selectfield__select">',
            optionsNiveis,
          '</select>',
          '<label class="mdl-selectfield__label" for="gender">User gender</label>',
          '<span class="mdl-selectfield__error">Select a value</span>',
        '</div>'].join('\n');

        return select;
      }
      return;
    };

  $.fn.dynaform = function (options) {

    var opts = $.extend({}, $.fn.dynaform.defaults, options);

  
    var template =  ['<form action="">',
                        generateNameField(),
                        '<br>',
                        generateEmailField(),
                        opts.fields.estado !== undefined ? generateStateField(opts.fields.estado) : '',
                        opts.fields.nivel !== undefined ? generateLevelField(opts.fields.nivel) : '',
                        '<br>',
                        '<div class="btn-container"><buttom id="dyna-submit-btn" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" type="submit" >Enviar</buttom></div>',
                      '</form>' ].join('\n');

    this.append(template);
    

    $('#dyna-submit-btn').on('click', function(){
      
    });

    return this;
  };

  $.fn.dynaform.defaults = {
    'token' :'62bb61431348e22850828a5829c4373faafe29c1',
    'secret':'51a266c2844ccd5cac83d88de88d82d05358aa51',
    'fields': {
      'estado':['PR','SC','SP','RS'], 
      'nivel':['Iniciante','Intermediário','Avançado','Ninja']
    }
  };

}(jQuery));