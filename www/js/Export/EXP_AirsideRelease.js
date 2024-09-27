//document.addEventListener("deviceready", GetCommodityList, false);

var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");

var FlightSeqNo;
var strUldToRelease;
var strBulkToRelease;

var companyCode = window.localStorage.getItem('SHED_AIRPORT_CITY');
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
$(function () {
    $("#btnRelease").attr('disabled', 'disabled');
    if (window.localStorage.getItem("RoleExpAirsideRelease") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }

    $("#chkManual").attr('checked', 'checked');

    var formattedDate = new Date();
    var d = formattedDate.getDate();
    if (d.toString().length < Number(2))
        d = '0' + d;
    var m = formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    if (m.toString().length < Number(2))
        m = '0' + m;
    var y = formattedDate.getFullYear();
    var date = 'OO' + y.toString() + m.toString() + d.toString();
    $('#txtGPNo1').val(date);

    strUldToRelease = '';
    strBulkToRelease = '';

   


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
            $("#divRemark").show();
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

        GetExportCheckListNext($('#ddlULD').val());

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
            $("#divRemark").hide();
            $(".next").attr('value', 'NEXT');
            i = 1;
        } else if (parseInt(pageNumberCount) < parseInt(PageNo)) {
            $("#divRemark").show();
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
            GetExportCheckListNext($('#ddlULD').val());
        } else {
            GetExportCheckListNext($('#ddlULD').val());

            //errmsg = "No preview available.";
            //$.alert(errmsg);
        }



    });



});

function GetGPStatus() {

    console.log('company name: ', window.localStorage.getItem('SHED_AIRPORT_CITY'));

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    $('#ddlULD').empty();
    $('#ddlBulk').empty();
    $('#divAddTestLocation').empty();
    html = '';
    strUldToRelease = '';
    strBulkToRelease = '';
    $('#txtReleasedULD').val('');
    $('#txtPendingULD').val('');
    $('#txtReleasedAWB').val('');
    $('#txtPendingAWB').val('');

    if ($('#txtGPNo1').val() == "") {
        // errmsg = "Please enter GP No.";
        $('#spnValMsg').text('Please enter GP No.').css('color', 'red');
        clearAll();
        $.alert(errmsg);
        return;
    } else {
        $('#spnValMsg').text('');
    }

    //if ($('#txtGPNo1').val().length != '14' && this.companyCode == 'BLR') {
    //    errmsg = "Please enter valid GP No for BLR.";
    //    clearAll();
    //    $.alert(errmsg);
    //    return;
    //}

    //if ($('#txtGPNo1').val().length != '13' && this.companyCode == 'tst') {
    //    errmsg = "Please enter valid GP No for Test.";
    //    clearAll();
    //    $.alert(errmsg);
    //    return;
    //}

    var inputXML = '<Root><GatePassNo>' + $('#txtGPNo1').val() + '</GatePassNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    //clearAll();

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetgatePassDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
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

                console.log('just to see the respone: ', xmlDoc);

                $(xmlDoc).find('Table').each(function () {

                    if ($(this).find('Status').text() != 'S') {
                        // $.alert($(this).find('StrMessage').text());
                        $('#spnValMsg').text($(this).find('StrMessage').text()).css('color', 'red');
                        $('#txtReleasedULD').val('');
                        $('#txtPendingULD').val('');
                        $('#txtReleasedAWB').val('');
                        $('#txtPendingAWB').val('');
                    } else {
                        $('#spnValMsg').text('');
                    }
                });

                $(xmlDoc).find('Table1').each(function () {

                    $('#txtReleasedULD').val($(this).find('ULDCount').text());
                    $('#txtPendingULD').val($(this).find('PendingULD').text());
                    $('#txtReleasedAWB').val($(this).find('TrolleyCount').text());
                    $('#txtPendingAWB').val($(this).find('PendingTrolley').text());
                });

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

function GetULDsToRelease() {

    $('#ddlULD').empty();
    $('#divAddTestLocation').empty();
    html = '';

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputXML = '<Root><GPNo>' + $('#txtGPNo1').val() + '</GPNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "UnReleaseULDDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
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
                console.log(xmlDoc);
                strUldToRelease = response;
                $('#ddlULD').empty();
                flagULD = '0';
                $(xmlDoc).find('Table1').each(function (index) {
                    flagULD = '1';
                    var ULDId;
                    var ULDNo;
                    var FltSeqNo;
                    var FltOffPoint;

                    ULDId = $(this).find('ULDSeqNo').text();
                    ULDNo = $(this).find('ULD').text();
                    FltSeqNo = $(this).find('FlightSeqNo').text();
                    FltOffPoint = $(this).find('RoutePoint').text();

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlULD');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(ULDId).text(ULDNo);
                    newOption.appendTo('#ddlULD');

                    //if ($(xmlDoc).find('Table1').length == 1) {
                    //    $('#ddlULD').trigger('change');
                    //}


                    if (index == 0) {
                        GetAWBDetailsForULD(ULDId, FltSeqNo, FltOffPoint, 'U')
                    }

                    $("#ddlULD option").each(function () {
                        $(this).siblings('[value="' + this.value + '"]').remove();
                    });

                });
                /* alert($('#ddlULD').val())*/
                if (flagULD == '1') {
                    //  GetExportCheckListNext($('#ddlULD').val());

                }
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

function GetBULKToRelease() {

    $('#ddlBulk').empty();
    $('#divAddTestLocation').empty();
    html = '';

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputXML = '<Root><GPNo>' + $('#txtGPNo1').val() + '</GPNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "UnReleaseULDDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
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

                strBulkToRelease = response;
                $('#ddlULD').empty();
                var xmlDoc = $.parseXML(response);
                console.log(xmlDoc)
                $(xmlDoc).find('Table2').each(function (index) {

                    var BulkId;
                    var BulkNo;
                    var FltSeqNo;
                    var FltOffPoint;

                    BulkId = $(this).find('TrolleySeqNo').text();
                    BulkNo = $(this).find('Trolley').text();
                    FltSeqNo = $(this).find('FlightSeqNo').text();
                    FltOffPoint = $(this).find('RoutePoint').text();

                    var newOption = $('<option></option>');
                    newOption.val(BulkId).text(BulkNo);
                    newOption.appendTo('#ddlBulk');

                    if (index == 0) {

                        GetAWBDetailsForULD(BulkId, FltSeqNo, FltOffPoint, 'T')
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

function ReleaseULDBulk(flag) {

    //if (flag == 'U') {
    //    if ($('#ddlULD').find('option:selected').text() == "" || $('#ddlULD').find('option:selected').text() == "Select") {
    //        //errmsg = "ULD not selected";
    //        //$.alert(errmsg);
    //        $('#spnValMsg').text('ULD not selected').css('color', 'red');
    //        return;
    //    } else {
    //        $('#spnValMsg').text('');
    //    }
    //}

    if (flag == 'T') {
        if ($('#ddlBulk').find('option:selected').text() == "" || $('#ddlBulk').find('option:selected').text() == "Select") {
            //errmsg = "Bulk not selected";
            //$.alert(errmsg);
            $('#spnValMsg').text('Bulk not selected').css('color', 'red');
            return;
        } else {
            $('#spnValMsg').text('');
        }
    }

    if ($('#txtGPNo1').val() == "") {
        //errmsg = "Please enter GP No.";
        //$.alert(errmsg);
        $('#spnValMsg').text('Please enter GP No.').css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text('');
    }

    if ($('#txtGPNo1').val().length != '14') {
        //errmsg = "Please enter valid GP No.";
        //$.alert(errmsg);
        $('#spnValMsg').text('Please enter valid GP No.').css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text('');
    }

    if (flag == 'U') {
        if ($('#ddlULD').val() == '0') {
            $('#spnValMsg').text('Please select ULD No.').css('color', 'red');
            return;
        } else {
            $('#spnValMsg').text('');
        }
        if (CheckListStatus == 'N') {
            // let text = 'All answer not mark as a Y, do you want to release ULD No.';
            if (confirm('The checklist is rejected/incomplete. Do you want to proceed with the release?') == false) {
                PageNo = 1;
                $(".next").attr('value', 'NEXT');
                return;
            } else {
                PageNo = 1;
                $(".next").attr('value', 'NEXT');
            }
        }
        var ULDseqNo = $('#ddlULD').find('option:selected').val();
    }

    // var ULDseqNo = $('#ddlULD').find('option:selected').val();
    if (flag == 'T') {
        var ULDseqNo = $('#ddlBulk').find('option:selected').val();
    }
    /*var ULDseqNo = $('#ddlBulk').find('option:selected').val();*/

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //var inputXML = '<Root><ULDSeqNo>' + ULDseqNo + '</ULDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    var inputXML = '<Root><GPNo>' + $('#txtGPNo1').val() + '</GPNo><ULDSeqNo>' + ULDseqNo + '</ULDSeqNo><AirportCity>' + AirportCity + '</AirportCity><ULDType>' + flag + '</ULDType><UserId>' + UserId + '</UserId></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "UpdateULDRelease",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');

                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    // $.alert($(this).find('StrMessage').text());
                    $('#spnValMsg').text($(this).find('StrMessage').text()).css('color', 'green');
                });

                $(xmlDoc).find('Table').each(function () {

                    if ($(this).find('Status').text() == 'S')
                        $.alert($(this).find('StrMessage').text());
                        GetGPStatus();
                });

                if (flag == 'U')
                    GetULDsToRelease();
                if (flag == 'T')
                    GetBULKToRelease();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function ShowReleaseULDGrid() {

    if ($('#txtGPNo1').val() == "") {
        //errmsg = "Please enter GP No.";
        //$.alert(errmsg);
        $('#spnValMsg').text('Please enter GP No.').css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text('');
    }

    if ($('#txtGPNo1').val().length != '14') {
        //errmsg = "Please enter valid GP No.";
        //$.alert(errmsg);
        $('#spnValMsg').text('Please enter valid GP No.').css('color', 'red');
        return;

    } else {
        $('#spnValMsg').text('');
    }

    GetULDsToRelease();

    $("#divReleaseBulk").hide();
    $("#divReleaseULD").show();

}

function ShowReleaseBulkGrid() {

    if ($('#txtGPNo1').val() == "") {
        //errmsg = "Please enter GP No.";

        //$.alert(errmsg);
        $('#spnValMsg').text('Please enter GP No.').css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text('');
    }

    if ($('#txtGPNo1').val().length != '14') {
        //errmsg = "Please enter valid GP No.";
        //$.alert(errmsg);
        $('#spnValMsg').text('Please enter valid GP No.').css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text('');
    }

    GetBULKToRelease();

    $("#divReleaseULD").hide();
    $("#divReleaseBulk").show();
}

function ShowTotalPkgsForAWB(AWBid) {
    $('#txtTotPkgs').val(AWBid);
    $('#txtReleasePkgs').val('');
}

function GetAWBDetailsForULD(ULDId, FltSeqNo, FltOffPoint, type) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    //SelectedHawbId = $("#ddlHAWB option:selected").val();      

    //var inputXML = '<Root><AWBNo>' + AWBNo + '</AWBNo><HouseNo>' + HAWBNo + '</HouseNo><IGMNo>' + IgmVal + '</IGMNo><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';

    var inputXML = '<Root><FlightSeqNo>' + FltSeqNo + '</FlightSeqNo><ULDSeqNo>' + ULDId + '</ULDSeqNo><Type>' + type + '</Type><Offpoint>' + FltOffPoint + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetUnitizedShipmentDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                var str = response.d;

                var totalPkgs;

                strXmlStore = str;

                if (str != null && str != "") {
                  
                    $('#divAddTestLocation').empty();
                    html = '';
                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>AWB</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Packages</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table1').each(function (index) {

                        //var outMsg = $(this).find('Status').text();

                        //if (outMsg == 'E') {
                        //    $.alert($(this).find('StrMessage').text());
                        //    return;
                        //}

                        var Awb;
                        var Pkgs;

                        Awb = $(this).find('AWBNo').text().toUpperCase();
                        Pkgs = $(this).find('NOP').text();

                        AddTableLocation(Awb, Pkgs);

                    });

                    $(xmlDoc).find('Table2').each(function (index) {

                        totalPkgs = $(this).find('NOP').text();

                        html += "<tr>";

                        html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:13px;font-weight: bold;'align='center'>TOTAL</td>";

                        html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:13px;font-weight: bold;'align='center'>" + totalPkgs + "</td>";
                        html += "</tr>";


                    });

                    html += "</tbody></table>";

                    if (totalPkgs > Number(0))
                        $('#divAddTestLocation').append(html);
                    else {
                        $('#divAddTestLocation').empty();
                        html = '';
                    }
                }
                else {
                    errmsg = 'Shipment does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
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

function AddTableLocation(AWB, Pkgs) {

    html += "<tr>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + AWB + "</td>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + Pkgs + "</td>";
    html += "</tr>";

}


function ChangeULDBulkToRelease(UldBulSeqNo, type) {
    $("#btnRelease").attr('disabled', 'disabled');
    if ($("#ddlULD").val() == '0') {
        return
    }

    GetExportCheckListNext(UldBulSeqNo);

    $('#divAddTestLocation').empty();
    html = '';

    if (type == 'U') {
        var xmlDoc = $.parseXML(strUldToRelease);

        $(xmlDoc).find('Table1').each(function (index) {

            if ($(this).find('ULDSeqNo').text() == UldBulSeqNo) {

                var FltSeqNo;
                var FltOffPoint;

                FltSeqNo = $(this).find('FlightSeqNo').text();
                FltOffPoint = $(this).find('RoutePoint').text();

                GetAWBDetailsForULD(UldBulSeqNo, FltSeqNo, FltOffPoint, 'U')

            }
        });
    }
    else if (type == 'T') {
        var xmlDoc = $.parseXML(strBulkToRelease);

        $(xmlDoc).find('Table2').each(function (index) {

            if ($(this).find('TrolleySeqNo').text() == UldBulSeqNo) {

                var FltSeqNo;
                var FltOffPoint;

                FltSeqNo = $(this).find('FlightSeqNo').text();
                FltOffPoint = $(this).find('RoutePoint').text();

                GetAWBDetailsForULD(UldBulSeqNo, FltSeqNo, FltOffPoint, 'T')

            }
        });
    }

}


function clearAll() {

    $('#txtGPNo1').val('');
    //$('#txtGPNo2').val('');
    $('#txtReleasedULD').val('');
    $('#txtPendingULD').val('');
    $('#txtReleasedAWB').val('');
    $('#txtPendingAWB').val('');
    $('#txtGPNo1').focus();
    $('#chkManual').removeAttr('checked');
    $('#ddlULD').empty();
    $('#ddlBulk').empty();
    $('#divAddTestLocation').empty();
    $('#divReleaseULD').empty();
    html = '';
    // $('#spnValMsg').text('');

}


function PutGPno() {

    if (document.getElementById('chkManual').checked) {
        var formattedDate = new Date();
        var d = formattedDate.getDate();
        if (d.toString().length < Number(2))
            d = '0' + d;
        var m = formattedDate.getMonth();
        m += 1;  // JavaScript months are 0-11
        if (m.toString().length < Number(2))
            m = '0' + m;
        var y = formattedDate.getFullYear();
        var date = 'OO' + y.toString() + m.toString() + d.toString();
        $('#txtGPNo1').val(date);
        $('#txtGPNo1').focus();

    } else {
        clearAll();
    }

}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function alertDismissed() {
}


function GetExportCheckListNext(uldid) {

    inputRowsOfAns = "";
    inputRowsOfAns += '<Root><CheckListType>7</CheckListType><ULDId>' + uldid + '</ULDId><PageNo>' + PageNo + '</PageNo><PageNoDisplay></PageNoDisplay><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><Remarks>' + $('#txtAreaRemarkincase').val() + '</Remarks><Answers>'
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

                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    PageNo = $(this).find('PageNo').text();
                    PageCount = $(this).find('PageCount').text();
                    CheckListStatus = $(this).find('CheckListStatus').text();

                    if (StrMessage == 'Checklist is already accepted') {
                        $("#btnRelease").attr('disabled', 'disabled');
                        $(".next").attr('value', 'Next');
                        PageNo = 1;
                        $('#txtAreaRemarkincase').val('');
                        $("#divRemark").hide();
                        $.alert(StrMessage);
                    }
                    if (StrMessage == 'Checklist Rejected') {
                        $("#btnRelease").removeAttr('disabled');
                        $(".next").attr('value', 'Next');
                        PageNo = 1;
                        $('#txtAreaRemarkincase').val('');
                        $("#divRemark").hide();
                    }
                    if (StrMessage == 'Checklist Accepted') {
                        $("#btnRelease").removeAttr('disabled');
                        $(".next").attr('value', 'Next');
                        PageNo = 1;
                        $('#txtAreaRemarkincase').val('');
                        $("#divRemark").hide();
                    }

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

function ReleaseULDBulkOnCheck(flag) {

    if (flag == 'U') {
        if ($('#ddlULD').find('option:selected').text() == "" || $('#ddlULD').find('option:selected').text() == "Select") {
            //errmsg = "ULD not selected";
            //$.alert(errmsg);
            $('#spnValMsg').text('ULD not selected').css('color', 'red');
            return;
        } else {
            $('#spnValMsg').text('');
        }
    }

    if (flag == 'T') {
        if ($('#ddlBulk').find('option:selected').text() == "" || $('#ddlBulk').find('option:selected').text() == "Select") {
            //errmsg = "Bulk not selected";
            //$.alert(errmsg);
            $('#spnValMsg').text('Bulk not selected').css('color', 'red');
            return;
        } else {
            $('#spnValMsg').text('');
        }
    }

    if ($('#txtGPNo1').val() == "") {
        //errmsg = "Please enter GP No.";
        //$.alert(errmsg);
        $('#spnValMsg').text('Please enter GP No.').css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text('');
    }

    if ($('#txtGPNo1').val().length != '14') {
        //errmsg = "Please enter valid GP No.";
        //$.alert(errmsg);
        $('#spnValMsg').text('Please enter valid GP No.').css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text('');
    }

    if (flag == 'U')
        var ULDseqNo = $('#ddlULD').find('option:selected').val();
    if (flag == 'T')
        var ULDseqNo = $('#ddlBulk').find('option:selected').val();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //var inputXML = '<Root><ULDSeqNo>' + ULDseqNo + '</ULDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    var inputXML = '<Root><GPNo>' + $('#txtGPNo1').val() + '</GPNo><ULDSeqNo>' + ULDseqNo + '</ULDSeqNo><AirportCity>' + AirportCity + '</AirportCity><ULDType>' + flag + '</ULDType><UserId>' + UserId + '</UserId></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "UpdateULDRelease",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');

                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {
                    $.alert($(this).find('StrMessage').text());
                    //$('#spnValMsg').text($(this).find('StrMessage').text()).css('color', 'green');
                });

                $(xmlDoc).find('Table').each(function () {

                    if ($(this).find('Status').text() == 'S')
                        $.alert($(this).find('StrMessage').text());
                        GetGPStatus();
                });

                if (flag == 'U')
                    GetULDsToRelease();
                if (flag == 'T')
                    GetBULKToRelease();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}