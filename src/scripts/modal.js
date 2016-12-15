
$(function () {

  var options = {
    token: '62bb61431348e22850828a5829c4373faafe29c1',
    secret: '51a266c2844ccd5cac83d88de88d82d05358aa51',
    modal: true,
    fields: {
      estado: ['PR', 'SC', 'SP', 'RS'],
      nivel: ['Iniciante', 'Intermediário', 'Avançado', 'Ninja']
    }
  }


  $("#modal .modal__text").dynaform(options);

});