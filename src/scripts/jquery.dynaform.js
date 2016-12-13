(function ($) {
  var generateNameField = function() {
      return ['<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">',
                '<input class="mdl-textfield__input" type="text" id="sample1">',
                '<label class="mdl-textfield__label" for="sample1">Nome...</label>',
              '</div>'].join('\n');
       
    };

    var generateEmailField = function() {
      return ['<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">',
                '<input class="mdl-textfield__input" type="text" id="sample1">',
                '<label class="mdl-textfield__label" for="sample1">E-mail...</label>',
              '</div>'].join('\n');
    };

    var generateStateField = function(estados) {
      
      var options = "<option value='0'>Estado</option>";

      estados.forEach(function(estado){
        options += "<option value='"+estado+"'>"+estado+"</option>"
      });

      var select = [
      '<div class="mdl-selectfield mdl-js-selectfield">',
        '<select id="gender" class="mdl-selectfield__select">',
          options,
        '</select>',
        '<label class="mdl-selectfield__label" for="gender">User gender</label>',
        '<span class="mdl-selectfield__error">Select a value</span>',
      '</div>'].join('\n');

      return select;
    };

    var generateLevelField = function(niveis) {
      if (niveis.length > 0 && niveis !== undefined) {
        var options = "<option value='0'>Selecione um Nível</option>";

        niveis.forEach(function (nivel, index) {
          options += "<option value='" + index + "'>" + nivel + "</option>"
        });

        var select = [
        '<div class="mdl-selectfield mdl-js-selectfield">',
          '<select id="gender" class="mdl-selectfield__select">',
            options,
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
                        '<input type="submit" value="Submit">',
                      '</form>' ].join('\n');

    this.append(template);
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