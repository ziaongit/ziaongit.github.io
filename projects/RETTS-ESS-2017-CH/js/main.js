(function($) {
  parseXML();
  generatePDF();
})(jQuery); 


function parseXML() {
  $.ajax({
      url: "RETTS-ESS-2017-CH/RETTS-ESS-2017-Chinese.xml",
      dataType: "xml",
      success: function(data) {
          parseXml(data);
      }
  });
}

function parseXml(xml) {
  console.log(xml);

  $(xml).find("essPackage").each(function() {
  $("#RETTS-ESS-2017-display").append(`
      <div class="card">
        <div class="card-header">
        <h5 class="card-title">RETTS ESS 2017 - 中文</h5>
        </div>
        <div class="card-block">
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Version:</b> ${$(this).find('version').text()}</li>
            <li class="list-group-item"><b>Type:</b> ${$(this).find('type').text()}</li>
            <li class="list-group-item"><b>Language Name:</b> ${$(this).find('languageName').text()}</li>
            <li class="list-group-item"><b>Creation Date:</b> ${$(this).find('creationDate').text()}</li>
            <li class="list-group-item"><b>Creation User Name:</b> ${$(this).find('creationUserName').text()}</li>
            <li class="list-group-item"><b>Published:</b> ${$(this).find('published').text()}</li>
            <li class="list-group-item"><b>Release Date:</b> ${$(this).find('releaseDate').text()}</li>
            <li class="list-group-item"><b>Release User Name:</b> ${$(this).find('releaseUserName').text()}</li>
            <li class="list-group-item"><b>Revision Date:</b> ${$(this).find('revisionDate').text()}</li>
          </ul>
        </div>
      </div>
      `);
  });

  $(xml).find("ess").each(function() {
    $("#RETTS-ESS-2017-display").append(`
    <div class="card mb-2">
    <div class="card-header">
      <h4>ESS: ${$(this).find('number').text()}</h4>
    </div>
    <div class="card-block">
      <ul>
        <li class="list-group-item">${$(this).find('essSymptom').find('description').text()} </li>
        <li class="list-group-item">${$(this).find('essSymptom').find('essRisklevel').text()}</li>
      </ul>
    </div>
    <div class="card-footer text-muted">上次保存的日期: ${$(this).find('lastSavedDate').text()}</div>
  </div>
    `);
  });

}


function generatePDF(){
  var doc = new jsPDF();
  var specialElementHandlers = {
      '#RETTS-ESS-2017': function (element, renderer) {
          return true;
      }
  };
  $('#generatePDF').click(function () {
      doc.fromHTML($('#RETTS-ESS-2017-display').html(), 15, 15, {
          'width': 250,
          'margin': 1,
          'pagesplit': true, //This will work for multiple pages
          'elementHandlers': specialElementHandlers
      }, function() {
          doc.save('RETTS-ESS-2017-Chinese.pdf');
      });
      
      
  });
}