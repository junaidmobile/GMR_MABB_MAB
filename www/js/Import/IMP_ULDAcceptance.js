

var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");

var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var UserId = window.localStorage.getItem("UserID");
var html;
var LocationRowID;
var AWBRowID;
var HAWBId;
var inputRowsforLocation = "";
var _ULDFltSeqNo;
var _fba_lba_flag = '';
//document.addEventListener("pause", onPause, false);
//document.addEventListener("resume", onResume, false);
//document.addEventListener("menubutton", onMenuKeyDown, false);

//function onPause() {

//    HHTLogout();
//}

//function onResume() {
//    HHTLogout();
//}

//function onMenuKeyDown() {
//    HHTLogout();
//}

var i = 1;
var increamentVal = 1;
var _xmlDocTable;
var lastQuestion;
var lastNo;
var allRadioValdata = {};
var inputRowsOfAns = "";
var RowID;
var PageNo = 1;
var pageNumberCount;
var currentDate;
var currentYear;
var QuestionaireId;
var CheckListStatus;
var globleULDID;

$(function () {

    if (window.localStorage.getItem("RoleIMPFinalDelivery") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }

    ImportDataList();
    //var formattedDate = new Date();
    //var d = formattedDate.getDate();
    //if (d.toString().length < Number(2))
    //    d = '0' + d;
    //var m = formattedDate.getMonth();
    //m += 1;  // JavaScript months are 0-11
    //if (m.toString().length < Number(2))
    //    m = '0' + m;
    //var y = formattedDate.getFullYear();
    //var t = formattedDate.getTime();
    //var date = m.toString() + '/' + d.toString() + '/' + y.toString();

    //newDate = y.toString() + '-' + m.toString() + '-' + d.toString();
    //  $('#txtFlightDate').val(newDate);

    //var h = date.getHours();
    //var m = date.getMinutes();
    //var s = date.getSeconds();


    $(".next").click(function () {

        //Show previous button
        $('.pre').show();

        //Find the element that's currently showing
        $showing = $('.content .first.visible').first();

        //Find the next element
        $next = $showing.next();

        //Change which div is showing
        $showing.removeClass("visible").hide();
        $next.addClass("visible").show();

        //If there's no more elements, hide the NEXT button
        if (!$next.next().length) {
            // $(this).hide();
            //  console.log(parseInt(pageNumberCount) + '/' + parseInt(increamentVal))

        }

        if (parseInt(pageNumberCount) == parseInt(PageNo) + 1) {
            //alert(parseInt(lastQuestion) + '/' + parseInt(lastNo))
            $(".next").attr('value', 'Finish');
            // $(this).hide();
            // $('#myModal').modal('hide');
            //  return;
            i = 1;
        }
        // var i = 1;
        console.log('increamentVal  / ' + increamentVal)

        console.log(parseInt(pageNumberCount) + '/' + parseInt(increamentVal))
        i++;
        increamentVal = i;
        /* console.log(increamentVal)*/
        PageNo = PageNo + 1;

        ImportULDAcceptanceOnListClick(globleULDID);

        allRadioValdata = {};



    });

    $(".pre").click(function () {
        $('.next').show();

        $showing = $('.content .first.visible').first();
        $next = $showing.prev();
        $showing.removeClass("visible").hide();
        $next.addClass("visible").show();

        if (!$next.prev().length) {
            // $(this).hide();
            // $(".next").attr('value', 'NEXT');
        }
        console.log(parseInt(pageNumberCount) + '/' + parseInt(PageNo))

        if (parseInt(pageNumberCount) == parseInt(PageNo)) {
            $(".next").attr('value', 'NEXT');
            i = 1;
        } else if (parseInt(pageNumberCount) < parseInt(PageNo)) {
            $(".next").attr('value', 'Finish');
            i = 1;
        }

        i--;
        increamentVal = i;
        PageNo = PageNo - 1;
        $('#spnErrormsgonPopup').text('');

        if (PageNo == 0) {
            $('#myModal').modal('hide');
            return;
        }


        if (increamentVal != 0) {
            ImportULDAcceptanceOnListClick(globleULDID);
        } else {
            ImportULDAcceptanceOnListClick(globleULDID);
        }

    });



});


function checkLocation() {
    var location = $('#txtLocation').val();
    if (location == "") {
        //errmsg = "Please scan/enter location.";
        //$.alert(errmsg);
        // $("#spnMsg").text('Please scan/enter location.').css({ 'color': 'red' });

        return;
    } else {
        $('#txtSacnULD').focus();
        $("#spnMsg").text('');
    }
}



//

function openScanner() {

    //   cordova.plugins.barcodeScanner.scan(
    //   function (result) {
    //       alert(result);
    //       barCodeResule = result.text;//.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    //       var str = barCodeResule;
    //       console.log('barCodeResule', barCodeResule)

    //       $('body').mLoading({
    //           text: "Please Wait..",
    //       });
    //       $("#txtSacnULD").val(str);
    //       GetImportULDListForScanning();
    //   },
    //   function (error) {
    //       // alert("Scanning failed: " + error);
    //   },
    //   {
    //       preferFrontCamera: false, // iOS and Android
    //       showFlipCameraButton: true, // iOS and Android
    //       showTorchButton: true, // iOS and Android
    //       torchOn: true, // Android, launch with the torch switched on (if available)
    //       saveHistory: true, // Android, save scan history (default false)
    //       prompt: "Place a barcode inside the scan area", // Android
    //       resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
    //       formats: "CODE_128,QR_CODE,PDF_417,QR_CODE,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF,RSS14,PDF417,RSS_EXPANDED", // default: all but PDF_417 and RSS_EXPANDED
    //       orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
    //       disableAnimations: true, // iOS
    //       disableSuccessBeep: false // iOS
    //   }
    //);
}


function GetImportULDListForScanning() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    $('#txtScanFlight').val('');
    $('#txtFlightPrefix').val('');
    $('#txtFlightNo').val('');
    // $('#txtFlightDate').val('');
    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();
    var location = $('#txtLocation').val();
    var txtSacnULD = $('#txtSacnULD').val();

    if (location == "") {
        //errmsg = "Please scan/enter location.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter location.').css({ 'color': 'red' });

        return;
    } else {
        $("#spnMsg").text('');
    }

    if (txtSacnULD == "") {
        //errmsg = "Please scan/enter ULD No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter ULD No.').css({ 'color': 'red' });

        return;
    } else {
        $("#spnMsg").text('');
    }

    // var inputXML = '<Root><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><Offpoint></Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';
    //var inputXML = '<Root><ULDNo></ULDNo><FlightAirline></FlightAirline><FlightNo></FlightNo><FlightDate></FlightDate><AirportCity>MPM</AirportCity><UserId>1</UserId><LocCode>LOC11</LocCode></Root>';

    var inputXML = '<Root><ULDNo>' + txtSacnULD + '</ULDNo><FlightAirline></FlightAirline><FlightNo></FlightNo><FlightDate></FlightDate><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><LocationCode>' + $('#txtLocation').val() + '</LocationCode><Type>A</Type></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetImportULDList",
            data: JSON.stringify({
                'InputXML': inputXML,
                //'strUserId': UserId,
                //'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                $('#tblNewsForGatePass').html('');
                $('#divULDNumberDetails').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {


                    var Status = $(this).find('Status').text();

                    var StrMessage = $(this).find('StrMessage').text()
                    var TxtColor = $(this).find('TxtColor').text()


                    if (Status == 'E') {
                        $("#spnMsg").text('');
                        $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                        //$('#divULDNumberDetails').empty();
                        //$('#divULDNumberDetails').hide();
                        html = '';
                        return true;
                    }

                    //var status = $(this).find('Status').text();

                    //var StrMessage = $(this).find('StrMessage').text()
                    //var TxtColor = $(this).find('TxtColor').text()

                    //$("#spnMsg").text(StrMessage).css({ 'color': TxtColor });

                    //if (status == 'E') {
                    //    $.alert($(this).find('StrMessage').text());
                    //    return;
                    //}
                });

                // $(xmlDoc).find('Table1').each(function () {

                //     FlightSeqNo = $(this).find('FltSeqNo').text();
                // });

                $(xmlDoc).find('Table1').each(function (index) {


                    ULDFltSeqNo = $(this).find('ULDFltSeqNo').text();
                    FlightAirline = $(this).find('FlightAirline').text();
                    FlightNo = $(this).find('FlightNo').text();
                    FlightDate = $(this).find('FlightDate').text();
                    ButtonStatus = $(this).find('ButtonStatus').text();

                    $('#txtFlightPrefix').val(FlightAirline);
                    $('#txtFlightNo').val(FlightNo);

                    var date = FlightDate;
                    var newdate = date.split("-").reverse().join("-");
                    // var FlightDate = newdate
                    //  var newdate = FlightDate.split("-").reverse().join("-");

                    $('#txtFlightDate').val(newdate);

                    //DD = FlightDate.split("-")[0];
                    //MM = FlightDate.split("-")[1];
                    //YY = FlightDate.split("-")[2];

                    //$("#year").val(YY);
                    //$("#month").val(MM);
                    //$("#day").val(DD);

                    // $('#txtFlightDate').val(_FlightDate);

                    if (ButtonStatus == 'A') {
                        $("#btnScanAccpt").removeAttr('disabled');
                    }

                });

                $(xmlDoc).find('Table2').each(function (index) {


                    _ULDFltSeqNo = $(this).find('ULDFltSeqNo').text();
                    ULDNo = $(this).find('ULDNo').text();
                    txtColor = $(this).find('txtColor').text();
                    ButtonStatus = $(this).find('ButtonStatus').text();


                    if (ButtonStatus == 'A') {
                        $("#btnScanAccpt").removeAttr('disabled');
                        $('#divULDNumberDetails').hide();
                    } else if (ButtonStatus == 'D') {
                        $("#btnScanAccpt").attr('disabled', 'disabled');
                        $("#spnMsg").text('ULD No. already accepted.').css({ 'color': txtColor });

                        // $.alert('ULD does not exist.');
                    } else {
                        $("#spnMsg").text('');
                    }

                });



            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}

function GetImportULDList() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    $('#txtScanFlight').val('');
    $('#txtFlightPrefix').val('');
    $('#txtFlightNo').val('');
    // $('#txtFlightDate').val('');
    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();
    var location = $('#txtLocation').val();
    var txtSacnULD = $('#txtSacnULD').val();

    if (location == "") {
        //errmsg = "Please scan/enter location.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter location.').css({ 'color': 'red' });

        return;
    } else {
        $("#spnMsg").text('');
    }

    if (txtSacnULD == "") {
        //errmsg = "Please scan/enter ULD No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter ULD No.').css({ 'color': 'red' });

        return;
    } else {
        $("#spnMsg").text('');
    }

    // var inputXML = '<Root><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><Offpoint></Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';
    //var inputXML = '<Root><ULDNo></ULDNo><FlightAirline></FlightAirline><FlightNo></FlightNo><FlightDate></FlightDate><AirportCity>MPM</AirportCity><UserId>1</UserId><LocCode>LOC11</LocCode></Root>';

    var inputXML = '<Root><ULDNo>' + txtSacnULD + '</ULDNo><FlightAirline></FlightAirline><FlightNo></FlightNo><FlightDate></FlightDate><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><LocationCode>' + $('#txtLocation').val() + '</LocationCode><Type>A</Type></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetImportULDList",
            data: JSON.stringify({
                'InputXML': inputXML,
                //'strUserId': UserId,
                //'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                $('#tblNewsForGatePass').html('');
                $('#divULDNumberDetails').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {


                    var Status = $(this).find('Status').text();

                    var StrMessage = $(this).find('StrMessage').text()
                    var TxtColor = $(this).find('TxtColor').text()


                    if (Status == 'E') {
                        $("#spnMsg").text('');
                        $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                        //$('#divULDNumberDetails').empty();
                        //$('#divULDNumberDetails').hide();
                        html = '';
                        return true;
                    }

                    //var status = $(this).find('Status').text();

                    //var StrMessage = $(this).find('StrMessage').text()
                    //var TxtColor = $(this).find('TxtColor').text()

                    //$("#spnMsg").text(StrMessage).css({ 'color': TxtColor });

                    //if (status == 'E') {
                    //    $.alert($(this).find('StrMessage').text());
                    //    return;
                    //}
                });

                // $(xmlDoc).find('Table1').each(function () {

                //     FlightSeqNo = $(this).find('FltSeqNo').text();
                // });

                $(xmlDoc).find('Table1').each(function (index) {


                    ULDFltSeqNo = $(this).find('ULDFltSeqNo').text();
                    FlightAirline = $(this).find('FlightAirline').text();
                    FlightNo = $(this).find('FlightNo').text();
                    FlightDate = $(this).find('FlightDate').text();
                    ButtonStatus = $(this).find('ButtonStatus').text();

                    $('#txtFlightPrefix').val(FlightAirline);
                    $('#txtFlightNo').val(FlightNo);


                    var date = FlightDate;
                    var newdate = date.split("-").reverse().join("-");

                    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                    ];

                    var d = new Date(newdate);

                    _Mont = monthNames[d.getMonth()]

                    DD = FlightDate.split("-")[0];
                    MM = FlightDate.split("-")[1];
                    YY = FlightDate.split("-")[2];


                    var ulddate = DD + '-' + _Mont + '-' + YY;
                    $('#txtFlightDate').val(ulddate);

                    //  var date = FlightDate;
                    //var newdate = date.split("-").reverse().join("-");
                    //// var FlightDate = newdate
                    ////var newdate = FlightDate.split("-").reverse().join("-");

                    //$('#txtFlightDate').val(newdate);

                    //DD = FlightDate.split("-")[0];
                    //MM = FlightDate.split("-")[1];
                    //YY = FlightDate.split("-")[2];

                    //$("#year").val(YY);
                    //$("#month").val(MM);
                    //$("#day").val(DD);

                    // $('#txtFlightDate').val(_FlightDate);
                    //let date = new Date();
                    //const day = date.toLocaleString('default', { day: '2-digit' });
                    //const month = date.toLocaleString('default', { month: 'short' });
                    //const year = date.toLocaleString('default', { year: 'numeric' });
                    //var today = day + '-' + month + '-' + year;
                    //$('#txtFlightDate').val(today);

                    //$("#txtFlightDate").datepicker({
                    //    "value": FlightDate,
                    //    shortYearCutoff: 1,
                    //    changeMonth: true,
                    //    changeYear: true,
                    //    dateFormat: 'dd-M-yy'
                    //});
                    if (ButtonStatus == 'A') {
                        $("#btnScanAccpt").removeAttr('disabled');
                    }

                });

                $(xmlDoc).find('Table2').each(function (index) {


                    _ULDFltSeqNo = $(this).find('ULDFltSeqNo').text();
                    ULDNo = $(this).find('ULDNo').text();
                    txtColor = $(this).find('txtColor').text();
                    ButtonStatus = $(this).find('ButtonStatus').text();


                    if (ButtonStatus == 'A') {
                        $("#btnScanAccpt").removeAttr('disabled');
                        $('#divULDNumberDetails').hide();
                    } else if (ButtonStatus == 'D') {
                        $("#btnScanAccpt").attr('disabled', 'disabled');
                        $("#spnMsg").text('ULD No. already accepted.').css({ 'color': txtColor });

                        // $.alert('ULD does not exist.');
                    } else {
                        $("#spnMsg").text('');
                    }

                });

                ImportULDAcceptanceOnListClick(_ULDFltSeqNo);

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}


function GetImportULDListWithFlightDetails() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    $('#txtSacnULD').val('');
    $('#txtScanFlight').val('');
    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();


    //var d = $('#txtFlightDate').val().slice(0, 2);
    //var m = $('#txtFlightDate').val().slice(2, 4);
    //var y = $('#txtFlightDate').val().slice(4, 8);
    //var FlightDate = y + '-' + m + '-' + d;
    //day = Number(d);
    //month = Number(m) - 1; //bloody 0-indexed month
    //year = Number(y);

    //let nd = year + '/' + month + '/' + day;


    //var nd = new Date(year, month, day);
    //if (nd.getFullYear() == year && nd.getMonth() == month && nd.getDate() == day) {
    //    alert('ok');
    //    return true;
    //} else {
    //    alert('no')
    //    return false;
    //}


    // let nd = new Date(year, month, day);

    // let yearMatches = nd.getUTCFullYear() === year;
    // let monthMatches = nd.getUTCMonth() === month;
    // let dayMatches = nd.getUTCDate() === day;

    // if (yearMatches == true && monthMatches == true && dayMatches == true) {
    //     alert('ok')
    // }




    var date = $('#txtFlightDate').val();
    var newdate = date.split("-").reverse().join("-");
    //newdate// $('#txtFlightDate').val();//$("#year").val() + '-' + $("#month").val() + '-' + $("#day").val();
    FlightDate = date;
    //var nd = new Date(y, m, d);
    //if (nd.getFullYear() == y && nd.getMonth() == m && nd.getDate() == d) {

    //    return true;
    //} else {
    //    $("#spnMsg").text('Invalid date').css({ 'color': 'red' });
    //    return;
    //}



    if (FlightPrefix == "" || FlightNo == "") {
        //errmsg = "Please enter valid flight No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please enter valid flight No.').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if (FlightDate == "") {
        //errmsg = "Please enter flight date";
        //$.alert(errmsg);
        $("#spnMsg").text('Please enter flight date').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }


    var inputXML = '<Root><ULDNo></ULDNo><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><LocationCode>' + $('#txtLocation').val() + '</LocationCode><Type>A</Type></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetImportULDList",
            data: JSON.stringify({
                'InputXML': inputXML,
                //'strUserId': UserId,
                //'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                $('#divULDNumberDetails').empty();
                $("body").mLoading('hide');
                var str = response.d;
                var xmlDoc = $.parseXML(str);
                console.log(response.d)

                $("#btnScanAccpt").attr('disabled', 'disabled');


                $(xmlDoc).find('Table').each(function (index) {

                    var Status = $(this).find('Status').text();

                    var StrMessage = $(this).find('StrMessage').text()
                    var TxtColor = $(this).find('TxtColor').text()


                    if (Status == 'E') {
                        $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                        $('#divULDNumberDetails').empty();
                        $('#divULDNumberDetails').hide();
                        html = '';
                        return true;
                    }


                });

                if (str != null && str != "") {

                    html = '';

                    html = '<table id="tblULDNumberDetails" border="1" style="width:100%;table-layout:fixed;word-break:break-word;border-color: #ddd;margin-top: 2%;">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">ULD Number</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">Action</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var xmlDoc = $.parseXML(str);
                    var f = '0';
                    $(xmlDoc).find('Table2').each(function (index) {

                        var Status = $(this).find('Status').text();
                        var StrMessage = $(this).find('StrMessage').text();
                        if (Status == 'E') {
                            $.alert(StrMessage);
                            $('#divULDNumberDetails').empty();
                            $('#divULDNumberDetails').hide();
                            html = '';
                            return;
                        }
                        f = '1';
                        ULDFltSeqNo = $(this).find('ULDFltSeqNo').text();
                        ULDNo = $(this).find('ULDNo').text();
                        txtColor = $(this).find('txtColor').text();
                        ButtonStatus = $(this).find('ButtonStatus').text();
                        FLIGHT_EVENT_TYPE = $(this).find('FlightEventType').text();

                        ULDNoList(ULDFltSeqNo, ULDNo, txtColor, ButtonStatus, FLIGHT_EVENT_TYPE);
                    });
                    html += "</tbody></table>";
                    if (f == '1') {
                        $('#divULDNumberDetails').show();
                        $('#divULDNumberDetails').append(html);
                    }


                } else {
                    errmsg = 'Flight No. does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}


function ScanFlightDetail() {


    $('#txtSacnULD').val('');

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //var FlightPrefix = $('#txtFlightPrefix').val();
    //var FlightNo = $('#txtFlightNo').val();
    //var FlightDate = $('#txtFlightDate').val();
    //var location = $('#txtLocation').val();
    //var txtSacnULD = $('#txtSacnULD').val();


    //if (FlightPrefix == "" || FlightNo == "") {
    //    errmsg = "Please enter valid Flight No.";
    //    $.alert(errmsg);
    //    return;
    //}

    if ($('#txtScanFlight').val() == '') {
        //errmsg = "Please enter Flight Date";
        //$.alert(errmsg);
        $('#spnMsg').text('');

        return;
    }


    var inputXML = '<Root><ULDNo></ULDNo><FlightAirline></FlightAirline><FlightNo></FlightNo><FlightDate></FlightDate><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><LocationCode>' + $('#txtLocation').val() + '</LocationCode><Type>A</Type><FltScanValue>' + $('#txtScanFlight').val() + '</FltScanValue></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetImportULDList",
            data: JSON.stringify({
                'InputXML': inputXML,
                //'strUserId': UserId,
                //'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                $('#divULDNumberDetails').empty();
                $("body").mLoading('hide');
                var str = response.d;
                var xmlDoc = $.parseXML(str);
                console.log(response.d)


                $(xmlDoc).find('Table').each(function (index) {
                    $("#spnMsg").text('');
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    var TxtColor = $(this).find('TxtColor').text();

                    if (Status == 'E') {

                        $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                        $('#divULDNumberDetails').empty();
                        $('#divULDNumberDetails').hide();
                        html = '';
                        return true;
                    }


                });


                $(xmlDoc).find('Table1').each(function (index) {


                    ULDFltSeqNo = $(this).find('ULDFltSeqNo').text();
                    FlightAirline = $(this).find('FlightAirline').text();
                    FlightNo = $(this).find('FlightNo').text();
                    FlightDate = $(this).find('FlightDate').text();
                    ButtonStatus = $(this).find('ButtonStatus').text();

                    $('#txtFlightPrefix').val(FlightAirline);
                    $('#txtFlightNo').val(FlightNo);


                    //   var newdate = FlightDate.split("-").reverse().join("-");

                    var date = FlightDate;
                    var newdate = date.split("-").reverse().join("-");

                    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                    ];

                    var d = new Date(newdate);

                    _Mont = monthNames[d.getMonth()]

                    DD = FlightDate.split("-")[0];
                    MM = FlightDate.split("-")[1];
                    YY = FlightDate.split("-")[2];


                    var ulddate = DD + '-' + _Mont + '-' + YY;
                    $('#txtFlightDate').val(ulddate);

                    //MM = FlightDate.split("-")[0];
                    //DD = FlightDate.split("-")[1];
                    //YY = FlightDate.split("-")[2];

                    //var _FlightDate = $("#year").val(YY) + '-' + $("#month").val(MM) + '-' + $("#day").val(YY);

                    //   $('#txtFlightDate').val(newdate);

                    //DD = FlightDate.split("-")[0];
                    //MM = FlightDate.split("-")[1];
                    //YY = FlightDate.split("-")[2];

                    //$("#year").val(YY);
                    //$("#month").val(MM);
                    //$("#day").val(DD);

                    if (ButtonStatus == 'A') {
                        $("#btnScanAccpt").removeAttr('disabled');
                    }

                });


                if (str != null && str != "") {

                    html = '';

                    html = '<table id="tblULDNumberDetails" border="1" style="width:100%;table-layout:fixed;word-break:break-word;border-color: #ddd;margin-top: 2%;">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">ULD Number</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">Action</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var xmlDoc = $.parseXML(str);
                    var flag = '0';
                    $(xmlDoc).find('Table2').each(function (index) {

                        var Status = $(this).find('Status').text();
                        var StrMessage = $(this).find('StrMessage').text();
                        if (Status == 'E') {
                            $.alert(StrMessage);
                            $('#divULDNumberDetails').empty();
                            $('#divULDNumberDetails').hide();
                            html = '';
                            return;
                        }

                        flag = '1';

                        ULDFltSeqNo = $(this).find('ULDFltSeqNo').text();
                        ULDNo = $(this).find('ULDNo').text();
                        txtColor = $(this).find('txtColor').text();
                        ButtonStatus = $(this).find('ButtonStatus').text();
                        FLIGHT_EVENT_TYPE = $(this).find('FlightEventType').text();

                        ULDNoList(ULDFltSeqNo, ULDNo, txtColor, ButtonStatus, FLIGHT_EVENT_TYPE);
                    });
                    html += "</tbody></table>";
                    if (flag == '1') {
                        $('#divULDNumberDetails').show();
                        $('#divULDNumberDetails').append(html);
                    }


                } else {
                    errmsg = 'Flight No. does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}
var fba;
var fbl;
function ULDNoList(ULDFltSeqNo, ULDNo, txtColor, ButtonStatus, FLIGHT_EVENT_TYPE) {

    if (ULDNo == 'BULK') {
        const myArray = FLIGHT_EVENT_TYPE.split(",");
        fba = myArray[0];
        fbl = myArray[1];

    }

    html += '<tr>';

    html += '<td style="padding-left: 4px;font-size:14px;color:' + txtColor + ';" id="tdGatepass">' + ULDNo + '</td>';

    if (ButtonStatus == 'A') {
        if (ULDNo == 'BULK') {
            html += '<td style="font-size:14px;padding: 5px;padding-left: 10%;"><button onclick="setFBA_LBA_Flag(\'' + 'FBA' + '\');ImportULDAcceptanceOnListClick(\'' + ULDFltSeqNo + '\');" class="btn ButtonColor">FBA</button><button style="margin-left:20px;" onclick="setFBA_LBA_Flag(\'' + 'LBA' + '\');ImportULDAcceptanceOnListClick(\'' + ULDFltSeqNo + '\');" class="btn" disabled>LBA</button></td>';
        } else {
            html += '<td style="padding-left: 20%;font-size:14px;padding: 5px;padding-left: 20%;"><button onclick="ImportULDAcceptanceOnListClick(\'' + ULDFltSeqNo + '\');" class="btn ButtonColor">Accept</button></td>';
        }
    } else if (ButtonStatus == 'D') {
        if (ULDNo == 'BULK') {
            if (FLIGHT_EVENT_TYPE == 'FBA') {
                html += '<td style="font-size:14px;padding: 5px;padding-left: 10%;"><button onclick="ImportULDAcceptanceOnListClick(\'' + ULDFltSeqNo + '\');" class="btn" disabled>FBA</button><button style="margin-left:20px;" onclick="setFBA_LBA_Flag(\'' + 'LBA' + '\');ImportULDAcceptanceOnListClick(\'' + ULDFltSeqNo + '\');" class="btn ButtonColor">LBA</button></td>';
            }
            if (FLIGHT_EVENT_TYPE == 'LBA') {
                html += '<td style="font-size:14px;padding: 5px;padding-left: 10%;"><button onclick="setFBA_LBA_Flag(\'' + 'FBA' + '\');ImportULDAcceptanceOnListClick(\'' + ULDFltSeqNo + '\');" class="btn ButtonColor">FBA</button><button style="margin-left:20px;" onclick="ImportULDAcceptanceOnListClick(\'' + ULDFltSeqNo + '\');" class="btn " disabled>LBA</button></td>';
            }
            if (FLIGHT_EVENT_TYPE == "FBA,LBA") {
                html += '<td style="font-size:14px;padding: 5px;padding-left: 10%;"><button onclick="ImportULDAcceptanceOnListClick(\'' + ULDFltSeqNo + '\');" class="btn" disabled>FBA</button><button style="margin-left:20px;" onclick="ImportULDAcceptanceOnListClick(\'' + ULDFltSeqNo + '\');" class="btn" disabled>LBA</button></td>';
            }
            if (FLIGHT_EVENT_TYPE == "LBA,FBA") {
                html += '<td style="font-size:14px;padding: 5px;padding-left: 10%;"><button onclick="ImportULDAcceptanceOnListClick(\'' + ULDFltSeqNo + '\');" class="btn" disabled>FBA</button><button style="margin-left:20px;" onclick="ImportULDAcceptanceOnListClick(\'' + ULDFltSeqNo + '\');" class="btn" disabled>LBA</button></td>';
            }
        } else {
            html += '<td style="padding-left: 20%;font-size:14px;padding: 5px;padding-left: 20%;"><button  class="btn" disabled>Accepted</button></td>';
        }
    }

    html += '</tr>';
}

function setFBA_LBA_Flag(setFlg) {

    _fba_lba_flag = setFlg;

}

function ImportULDAcceptance() {

    if (CheckListStatus == 'Checklist Rejected') {
        let text = 'The checklist is rejected/incomplete. Do you want to proceed with the release?';
        if (confirm(text) == true) {
            PageNo = 1
            $(".next").attr('value', 'NEXT');
        } else {
            PageNo = 1
            $(".next").attr('value', 'NEXT');
            return
        }
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();
    var location = $('#txtLocation').val();
    var txtSacnULD = $('#txtSacnULD').val();


    var location = $('#txtLocation').val();
    var txtSacnULD = $('#txtSacnULD').val();

    if (location == "") {
        //errmsg = "Please scan/enter location.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter location.').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if (txtSacnULD == "") {
        //errmsg = "Please scan/enter ULD No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter ULD No.').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if ($('#txtFlightDate').val() == "") {
        //errmsg = "Please scan/enter ULD No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please select flight date.').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    // var inputXML = '<Root><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><Offpoint></Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';
    //var inputXML = '<Root><ULDNo>' + txtSacnULD + '</ULDNo><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate>';

    var inputXML = '<Root><ULDFltSeqNo>' + _ULDFltSeqNo + '</ULDFltSeqNo><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><LocationCode>' + $('#txtLocation').val() + '</LocationCode><Type>A</Type></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "ImportULDAcceptance",
            data: JSON.stringify({
                'InputXML': inputXML,
                //'strUserId': UserId,
                //'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                $("#btnScanAccpt").removeAttr('disabled');
                $('#tblNewsForGatePass').hide();
                $('#divULDNumberDetails').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {

                    //var status = $(this).find('Status').text();
                    //$.alert($(this).find('StrMessage').text());
                    //if (status == 'E') {
                    //    // $.alert($(this).find('StrMessage').text());
                    //}
                    $("#spnMsg").text('');
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    var TxtColor = $(this).find('TxtColor').text();

                    if (Status == 'E') {

                        $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                        $('#divULDNumberDetails').empty();
                        $('#divULDNumberDetails').hide();
                        html = '';
                        return true;
                    } else {
                        $("#btnScanAccpt").attr('disabled', 'disabled');
                        $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                    }
                });

                // $(xmlDoc).find('Table1').each(function () {

                //     FlightSeqNo = $(this).find('FltSeqNo').text();
                // });

                //  GetImportULDList();

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}


function AfterCheckListImportULDAcceptanceOnListClick(txtSacnULD) {

    if (CheckListStatus == 'Checklist Rejected') {
        let text = 'The checklist is rejected/incomplete. Do you want to proceed with the release?';
        if (confirm(text) == true) {
            PageNo = 1
            $(".next").attr('value', 'NEXT');
        } else {
            PageNo = 1
            $(".next").attr('value', 'NEXT');
            return
        }
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();
    var location = $('#txtLocation').val();
    //var txtSacnULD = $('#txtSacnULD').val();


    //if (location == "") {
    //    errmsg = "Please enter Location.";
    //    $.alert(errmsg);
    //    return;
    //}

    if (txtSacnULD == "") {
        //errmsg = "Please scan/enter ULD No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter ULD No.').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    // var inputXML = '<Root><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><Offpoint></Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';
    //var inputXML = '<Root><ULDNo>' + txtSacnULD + '</ULDNo><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate>';

    var inputXML = '<Root><ULDFltSeqNo>' + txtSacnULD + '</ULDFltSeqNo><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><LocationCode>' + $('#txtLocation').val() + '</LocationCode><Type>A</Type><EventType>' + _fba_lba_flag + '</EventType></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            //  url: 'http://10.22.2.72:8080/CELEBIBUD/Services/HHTImpServices.asmx/' + "ImportULDAcceptance",
            url: GHAImportFlightserviceURL + "ImportULDAcceptance",
            data: JSON.stringify({
                'InputXML': inputXML,
                //'strUserId': UserId,
                //'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                $("#btnScanAccpt").removeAttr('disabled');
                $('#tblNewsForGatePass').hide();
                $('#divULDNumberDetails').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {

                    //var status = $(this).find('Status').text();
                    //$.alert($(this).find('StrMessage').text());
                    ////if (status == 'E') {
                    ////    $.alert($(this).find('StrMessage').text());
                    ////}
                    $("#spnMsg").text('');
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    var TxtColor = $(this).find('TxtColor').text();

                    if (Status == 'E') {

                        //  $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                        $.alert(StrMessage).css({ 'color': TxtColor });
                        $('#divULDNumberDetails').empty();
                        $('#divULDNumberDetails').hide();
                        html = '';
                        return true;
                    } else {
                        $.alert(StrMessage).css({ 'color': TxtColor });
                        //$("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                    }
                });
                GetImportULDListWithFlightDetails();

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}


function clearAWBDetails() {
    $('#txtSacnULD').val('');
    $('#txtScanFlight').val('');
    $('#txtFlightPrefix').val('');
    $('#txtFlightNo').val('');
    $('#txtFlightDate').val('');
    $('#tblNewsForGatePass').hide();
    $('#divULDNumberDetails').empty();
    $('#divULDNumberDetails').hide();

    //var now = new Date();

    //var day = ("0" + now.getDate()).slice(-2);
    //var month = ("0" + (now.getMonth() + 1)).slice(-2);

    //var today = (day) + "-" + (month) + "-" + now.getFullYear();

    //$('#txtFlightDate').val(today);



    // let date = new Date();
    // const day = date.toLocaleString('default', { day: '2-digit' });
    // const month = date.toLocaleString('default', { month: 'short' });
    // const year = date.toLocaleString('default', { year: 'numeric' });
    // var today = day + '-' + month + '-' + year;
    // $('#txtFlightDate').val(today);

    // $("#txtFlightDate").datepicker({
    //     shortYearCutoff: 1,
    //     changeMonth: true,
    //     changeYear: true,
    //     dateFormat: 'dd-M-yy'
    // });

    $('#txtLocation').val('');
    $('#spnMsg').text('');
    $('#txtLocation').focus();



}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}



function ImportDataList() {
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "ImportDataList",
            data: JSON.stringify({ 'pi_strQueryType': 'I' }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;                
                $("body").mLoading('hide');
                response = response.d;

                var str = response;
                autoLocationArray = new Array();

                // This will return an array with strings "1", "2", etc.
                autoLocationArray = str.split(",");
                console.log(autoLocationArray)
                $("#txtLocation").autocomplete({
                    source: autoLocationArray,
                    minLength: 1,
                    select: function (event, ui) {
                        log(ui.item ?
                            "Selected: " + ui.item.label :
                            "Nothing selected, input was " + this.value);
                    },
                    open: function () {
                        $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                    },
                    close: function () {
                        $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                    }
                });
                $.ui.autocomplete.filter = function (array, term) {
                    var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
                    return $.grep(array, function (value) {
                        return matcher.test(value.label || value.value || value);
                    });
                };
            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}


function log(message) {
    $("<div>").text(message).prependTo("#log");
    $("#log").scrollTop(0);
}

function ImportULDAcceptanceOnListClick(uldid) {

    if (uldid.indexOf('~') > -1) {
        let text = uldid;
        const myArray = text.split("~");
        _uldid = myArray[0];
        globleULDID = uldid;
    }
    else {
        _uldid = _uldid;
    }

    inputRowsOfAns = "";
    inputRowsOfAns += '<Root><CheckListType>7</CheckListType><ULDId>' + _uldid + '</ULDId><PageNo>' + PageNo + '</PageNo><PageNoDisplay></PageNoDisplay><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><Answers>'
    $('#tblChecklist tr').each(function () {
        $(this).find("input").each(function () {
            ItemCode = $(this).val();
            var name = $(this).attr('name');
            var Qid = name.split('~');
            var option = $(this).attr('id');
            var QuestionIDInsert = Qid[1]
            if ($(this).is(':checked') == true) {
                inputRowsOfAns += "<Answer><QuestionID>" + QuestionIDInsert + "</QuestionID><Option>" + option + "</Option></Answer>"
            }
        });
    });
    inputRowsOfAns += "</Answers></Root>";
    //  console.log(inputRowsOfAns)
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    //InputXMLforNext = '<Root><CheckListType>' + chkID + '</CheckListType><AWBId>' + RowID + '</AWBId><QuestionaireMasterNo>' + QuestionaireId + '</QuestionaireMasterNo><PageNo>' + PageNo + '</PageNo><PageNoDisplay></PageNoDisplay><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId></Root>';
    //InputXMLforNext = '<Root><CheckListType>DGR1</CheckListType><AWBId>99</AWBId><PageNo>1</PageNo><PageNoDisplay></PageNoDisplay><AirportCity>BUD</AirportCity><UserId>1</UserId>';


    // InputXML = "<Root><CheckListType>DGR3</CheckListType><AWBId>1</AWBId><PageNo>2</PageNo><PageNoDisplay>1-4</PageNoDisplay><AirportCity>BUD</AirportCity><UserId></UserId></Root>";
    // console.log(InputXML)
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "EXPORTCheckListULDNext",
            data: JSON.stringify({ 'InputXML': inputRowsOfAns }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                //var str = response.d;
                var xmlDoc = $.parseXML(response);
                //$('#divVCTDetail').html('');
                //$('#divVCTDetail').empty();
                console.log(xmlDoc);

                var _Status;
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    PageNo = $(this).find('PageNo').text();
                    PageCount = $(this).find('PageCount').text();
                    CheckListStatus = StrMessage// $(this).find('CheckListStatus').text();


                });


                $(xmlDoc).find('Table1').each(function (index) {
                    QuestionSet = $(this).find('QuestionSet').text();
                    //  QuestionSet

                    var QNo = QuestionSet.split(',');
                    lastQuestion = QNo[2];
                    //  console.log('lastQuestion ' + lastQuestion)

                });
                $(xmlDoc).find('Table').each(function (index) {
                    $('#divCheckListDetail').empty();

                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    $(".next").removeAttr('disabled');
                    if (Status == 'E') {
                        if (StrMessage.includes('Checks are pending') == true) {
                            $('#spnErrormsgonPopup').text(StrMessage).css('color', 'red');
                            if (PageNo > parseInt(pageNumberCount)) {
                                $(".next").attr('disabled', 'disabled');
                                return
                            }

                            return;
                        }

                        $('#spnErrormsg').text(StrMessage).css('color', 'red');
                        return;
                    } else {
                        if (StrMessage != '') {
                            $('#myModal').modal('toggle');
                            $('#spnErrormsg').text(StrMessage).css('color', 'green');
                            $('#divCheckListDetail').empty();
                            html = '';
                            //  setTimeout(GetExportCheckListSearch , 5000);
                            // GetExportCheckListSearch();
                            return;
                        }
                        PageNo = parseInt($(this).find('PageNo').text());
                        PageCount = parseInt($(this).find('PageCount').text());
                        pageNumberCount = parseInt(PageCount);

                    }
                    $('#myModal').modal('show');
                    html = '';
                    html += '<div class="form-group col-xs-12 col-sm-6 col-md-6 NoPadding class=" first visible"" >';
                    html += '<table id="tblChecklist" class="table table-striped table-bordered">';
                    html += '<thead style="background-color:rgb(208, 225, 244);">';
                    html += '<tr>';
                    html += '<th  style="background-color:rgb(208, 225, 244);">Questions</th>';
                    html += '<th style="background-color:rgb(208, 225, 244);">Yes</th>';
                    html += '<th style="background-color:rgb(208, 225, 244);">No</th>';
                    //html += '<th style="background-color:rgb(208, 225, 244);">N/A</th>';
                    html += '</tr>';
                    html += '<tr>';
                    // if (index == 0) {
                    //  html += '<td colspan="4" style="background-color: rgb(224, 243, 215);"> <label id="lblHeading">' + show + '</label> </td>';
                    //  }

                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var HasChild;
                    var QuestionId;
                    var flag = '0';
                    $(xmlDoc).find('Table2').each(function (index) {
                        $('#lblMessage').text('');
                        //var Status = $(this).find('Status').text();
                        //var StrMessage = $(this).find('StrMessage').text();
                        //if (Status == 'E') {
                        //    $.alert(StrMessage);
                        //    $('#divULDNumberDetails').empty();
                        //    $('#divULDNumberDetails').hide();
                        //    html = '';
                        //    return;
                        //}

                        KeyValue = $(this).find('KeyValue').text();
                        Question = $(this).find('Question').text();
                        IsBold = $(this).find('IsBold').text();
                        Color = $(this).find('Color').text();
                        IsYes = $(this).find('IsYes').text();
                        IsNo = $(this).find('IsNo').text();
                        IsNA = $(this).find('IsNA').text();
                        IsNote = $(this).find('IsNote').text();
                        IsOptionChecked = $(this).find('IsOptionChecked').text();

                        var Lno = Question.split('.');
                        lastNo = Lno[0];

                        CheckListDetailsForShow(KeyValue, Question, IsBold, Color, IsYes, IsNo, IsNA, IsNote, IsOptionChecked);

                    });

                    html += '</tbody></table>';

                    html += '</div >';
                    //    $('#divCheckListDetail').show();
                    $('#divCheckListDetail').append(html);

                });

                if (CheckListStatus == 'Checklist Rejected') {
                    AfterCheckListImportULDAcceptanceOnListClick(globleULDID);
                }

                if (CheckListStatus == 'Checklist is already accepted') {
                    AfterCheckListImportULDAcceptanceOnListClick(globleULDID);
                }

                if (CheckListStatus == 'Checklist Accepted') {
                    AfterCheckListImportULDAcceptanceOnListClick(globleULDID);
                }

                //if (parseInt(pageNumberCount) == parseInt(increamentVal)) {
                //    //  alert(parseInt(lastQuestion) + '/' + parseInt(lastNo))
                //    $(".next").attr('value', 'Finish');
                //    //   $(this).hide();
                //    //  $('#myModal').modal('hide');
                //    //  return;
                //}
            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}


function CheckListDetailsForShow(KeyValue, Question, IsBold, Color, IsYes, IsNo, IsNA, IsNote, IsOptionChecked) {
    var AllKeys = KeyValue.split('~');

    //  html += '<tr style="border-bottom: solid thin #ccc;">';
    html += '<tr>';
    if (IsBold == 'Y') {
        html += '<td colSpan=""><span style="font-weight: bold;">' + Question + '</span></td>';
    } else {
        if (Question.includes('Note') == true) {
            html += '<td colSpan="8"><span style="color:' + Color + '">' + Question + '</span></td>';
        } else {
            if (AllKeys[0] != 'C') {
                html += '<td colSpan="8"><span style="color:' + Color + '">' + Question + '</span></td>';
            } else {
                html += '<td><span style="color:' + Color + '">' + Question + '</span></td>';
            }

        }
        //if (Question.includes('Note') == true) {
        //    html += '<td colSpan="8" style="font-weight: bold;"><span style="color:' + Color + '">' + Question + '</span></td>';
        //} else {
        //    html += '<td><span style="color:' + Color + '">' + Question + '</span></td>';
        //}
    }

    if (AllKeys[0] == 'C') {


        if (IsYes == 'Y') {
            html += '<td><label class="radio-inline"> <input   type="radio" name="' + KeyValue + '" id="Yes" value="" checked="checked"> </label></td>';
        } else {
            if (IsYes != 'X') {
                html += '<td><label class="radio-inline"> <input   type="radio" name="' + KeyValue + '" id="Yes" value="" > </label></td>';
            }
        }

        if (IsNo == 'Y') {
            html += '<td><label class="radio-inline"> <input   type="radio" name="' + KeyValue + '" id="No" value="" checked="checked"> </label></td>';
        } else {
            if (IsNo != 'X') {
                html += '<td><label class="radio-inline"> <input  type="radio" name="' + KeyValue + '" id="No" value=""> </label></td>';
            }
        }

        //if (IsNA == 'Y') {
        //    if (IsNA != 'X') {
        //        html += '<td><label class="radio-inline"> <input  type="radio" name="' + KeyValue + '" id="NA" value="" checked="checked"> </label></td>';
        //    }
        //} else {
        //    if (IsNA != 'X') {
        //        html += '<td><label class="radio-inline"> <input  type="radio" name="' + KeyValue + '" id="NA" value="" > </label></td>';
        //    }
        //}
    }

    html += '</tr>';
}
