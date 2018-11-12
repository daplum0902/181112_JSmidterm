var xhr = new XMLHttpRequest();
xhr.open('get', 'https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery');

xhr.send();
xhr.onload = function(){
  
  var data = JSON.parse(xhr.responseText);
  var xarea = document.querySelector('#area');
  var xtype = document.querySelector('#InformDesc_');
  var button = document.querySelector('#button');
  var list = document.querySelector('#list');
  var s_type = document.querySelector('#s_type');
  var num = document.querySelector('#num');
  
  var str = "";
  var areas;
  var area = {};
  
  //area選單
  for(var i = 0; i < data.length; i++){
    var a = data[i]['ZipName_'];
    area[a] = 1;
  }
  areas = Object.keys(area);
  for(var i = 0; i < areas.length; i++){
    str += "<option>"+areas[i]+"</option>";
    
  }
  
  xarea.innerHTML = str ;
  
  var str2 = "";
  var types;
  var type = {};
  
  //type選單
  for(var i = 0; i < data.length; i++){
    var b = data[i]['InformDesc_'];
    type[b] = 1;
  }
  types = Object.keys(type);
  for(var i = 0; i < types.length; i++){
    str2 += "<option>"+types[i]+"</option>";
    
  }
  xtype.innerHTML = str2 ;
  
  button.addEventListener('click', function(e){
    var str3 = "''";
    var _area = xarea.value;
    var _type = xtype.value;
    //篩選
    for(var i = 0; i < data.length; i++){
      if( _area == data[i]['ZipName_'] && _type == data[i]['InformDesc_']){
        str3 += "<li><h4>地點 : " + data[i]['address_'] + "</h4><h5>報案狀況 : " + data[i]['BeforeDesc_'] +"</h5></li>";
        
      }
      list.innerHTML = str3;
    }
    s_type.innerHTML = _type ;
    
    //計算總數
    var str4 = "";
    var total = {};
    
     for(var i = 0; i < data.length; i++){
      if( _area == data[i]['ZipName_'] ){
        if(_type == data[i]['InformDesc_']){
          if(total['_type'] == undefined ){
          total['_type'] = 1;
        }else{
          total['_type'] += total['_type'];
        }
        num.innerHTML = total['_type'];
        }
        
      }
    }
    
  })
  
  
}