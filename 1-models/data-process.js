var isAndroid = kendo.support.mobileOS.android;


//var apiSite = (useLocalAPIs)?'http://localhost:5000':'https://charder.herokuapp.com/';
var apiSite = (useLocalAPIs)?'http://localhost:5000':'https://forge-fitness-api.herokuapp.com/';

var storeInfoSource = new kendo.data.DataSource({
  transport: {
    read: async function (data) { await 取得店面目前資料(storeInfoSource); }
  },
  sort: {
    field: "目前人數",
    dir: "desc"
  },
  requestStart: function () {
    kendo.ui.progress($("#loading"), true);
  },
  requestEnd: function () {
    kendo.ui.progress($("#loading"), false);
  },

  schema: {
    total: function () {
      console.log("storeInfoSource scheme total");
      //取得經緯度();    
      return 77;
    }
  },
  serverPaging: true,
  pageSize: 40,
  //group: { field: "section" }
})

async function 取得店面目前資料(data) {
  console.log("取得店面目前資料");
  
  if (!refresh) {  
    var dataTemp=[];
    data.success(dataTemp);
  } else {
    paramToSend = "?API=40" + "&StoreId=" + $("#查詢健身房").val(); 
    var res = await callAPI(paramToSend, '讀取健身房目前資料');
    //console.log(res);    
    var 店面目前資料=JSON.parse(res);
    console.log(店面目前資料);    
    
    var dataTemp=[];
    //for (var i=0; i<店面目前資料.length; i++ ) {
      var 空氣品質 = 店面目前資料.PM25_eCO2_VTOC;
      console.log(空氣品質);
      var 卡片 = {
        "目前人數": 店面目前資料.男性人數 + 店面目前資料.女性人數 + 店面目前資料.不透露性別人數,              
        "男性人數": 店面目前資料.男性人數, 
        "女性人數": 店面目前資料.女性人數, 
        "不透露性別人數": 店面目前資料.不透露性別人數,         
        "溫度":    店面目前資料.溫度,          
        "濕度":    店面目前資料.濕度, 
        "空氣品質指數": "良好", // 換算
        "PM2_5":  空氣品質[0],
        "eCO2":   空氣品質[1],
        "VTOC":   空氣品質[2],    
        "其他資訊": "上次消毒時間: 2020-04-13 16:30",
        "url": "2-views/量測報告.html?PicUrl=",
        "section": "A"             
      };

      dataTemp.push(卡片);    
    //}
    
    data.success(dataTemp);    
  }
  
//  if (dataTemp.length==0) {
//    $("#量測記錄title").text("尚無量測記錄");
//  }else {
//    $("#量測記錄title").text("量測記錄");
//  }  
  //return;
}

//async function 取得量測記錄(data) {
//  console.log("取得量測記錄");
//  
//  if (!refresh) {  
//    var dataTemp=[];
//    data.success(dataTemp);
//  } else {
//    paramToSend = "?API=32" + "&UserId=" + $("#formUserPhone").val(); //userId[1];
//    var res = await callAPI(paramToSend, '讀取量測記錄');
//    //console.log(res);    
//    var 所有量測數據=JSON.parse(res);
//    console.log(所有量測數據);    
//    
//    var dataTemp=[];
//    for (var i=0; i<所有量測數據.length; i++ ) {
//      var 時間Date = new Date(所有量測數據[i].量測時間);
//      var 時間Str  = 時間Date.toLocaleString();   
//      console.log("時間Str", 時間Str);
//      var 卡片 = {
//        "量測記錄時間": 時間Str, //所有量測數據[i].量測時間,              
//        "綜合評價":    所有量測數據[i].HealthScore,
//        "量測紀錄圖片": 所有量測數據[i].PicUrl,              
//        "url": "2-views/量測報告.html?PicUrl="+所有量測數據[i].PicUrl,
//        "section": "A"             
//      };
//      dataTemp.push(卡片); 
//    }
//    
//    data.success(dataTemp);    
//  }
//  
//  if (dataTemp.length==0) {
//    $("#量測記錄title").text("尚無量測記錄");
//  }else {
//    $("#量測記錄title").text("量測記錄");
//  }  
//  //return;
//}

function nullForNow(e) {
  console.log("nullForNow");
  //currentExample = nullForNow;
}

function removeView(e) {
  //console.log("removeView", e);  
  //if (reloadCourseNeeded) {
  //  readCourses(); 
  //  reloadCourseNeeded = false;
  //}
  if (!e.view.element.data("persist")) {
    //console.log(e);
    
    // KPC: 找不到 persist 如何設定，只好用粗暴的做法
    if (e.view.id != "#forms") e.view.purge();
    
    //e.view.purge();
  }

}

//function initSearch(e) {
//  console.log("initSearch");
//  var searchBox = e.view.element.find("#demos-search");
//
//  searchBox.on("input", function () {
//    searchForCourse(searchBox.val()); //, product);
//  });
//
//  searchBox.on("blur", function () {
//    //        if (searchBox.val() == "") {
//    //            hideSearch();
//    //        }
//    searchBox.val("");
//    searchForCourse("");
//    hideSearch();
//  });
//}

var desktop = !kendo.support.mobileOS;

window.app = new kendo.mobile.Application($(document.body), {
  layout: "mainDiv",
  transition: "slide",
  skin: "nova",
  icon: {
    "": '@Url.Content("~/content/mobile/AppIcon72x72.png")',
    "72x72": '@Url.Content("~/content/mobile/AppIcon72x72.png")',
    "76x76": '@Url.Content("~/content/mobile/AppIcon76x76.png")',
    "114x114": '@Url.Content("~/content/mobile/AppIcon72x72@2x.png")',
    "120x120": '@Url.Content("~/content/mobile/AppIcon76x76@2x.png")',
    "152x152": '@Url.Content("~/content/mobile/AppIcon76x76@2x.png")'
  }
});