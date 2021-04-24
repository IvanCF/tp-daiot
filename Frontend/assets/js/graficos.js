//******************************************** */
var TEMPERATURA = 0;
var HUMEDAD = 0;
var SERVER = "192.168.1.39";
var PUERTO = 9001;

// Create a client instance
client = new Paho.MQTT.Client(SERVER, PUERTO, "clientId");

// set callback handlers
client.onConnectionLost = function(responseObject) {
    console.log("Connection Lost: " + responseObject.errorMessage);
}

client.onMessageArrived = function(message) {
    console.log("Message llega: " + message.payloadString);

    var data_json = JSON.parse(message.payloadString);
    TEMPERATURA = Number(data_json.temperatura);
    HUMEDAD = Number(data_json.humedad);
    document.getElementById("humedad").innerHTML = HUMEDAD + "%";
    document.getElementById("temperatura").innerHTML = TEMPERATURA + "°";
	
	  //enviar a la BD
    var hoy = new Date();
    var fecha = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
    var fecha_time = fecha + " | " + hoy.getHours() + " : " + hoy.getMinutes() + " : " + hoy.getSeconds();
    registrarMediciones(fecha_time, TEMPERATURA, 1, "activo");
    registrarMediciones(fecha_time, HUMEDAD, 2, "activo");
}

// Called when the connection is made
function onConnect() {
    console.log("conectado al broker...");
    client.subscribe("publish/data");
}

// Connect the client, providing an onConnect callback
client.connect({
    onSuccess: onConnect,
      mqttVersion: 3
});

//**************** GRAFICO HUMEDAD*************************** */
am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // create chart
    var chart = am4core.create("chartdiv", am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.innerRadius = -25;

    var axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
    axis.renderer.grid.template.strokeOpacity = 0.3;

    var colorSet = new am4core.ColorSet();

    var range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 50;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);
    range0.axisFill.zIndex = -1;

    var range1 = axis.axisRanges.create();
    range1.value = 50;
    range1.endValue = 80;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(2);
    range1.axisFill.zIndex = -1;

    var range2 = axis.axisRanges.create();
    range2.value = 80;
    range2.endValue = 100;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = colorSet.getIndex(4);
    range2.axisFill.zIndex = -1;

    var hand = chart.hands.push(new am4charts.ClockHand());

    // using chart.setTimeout method as the timeout will be disposed together with a chart
    chart.setTimeout(randomValue, 2000);

    function randomValue() {
        console.log(HUMEDAD);
        hand.showValue(HUMEDAD, 1000, am4core.ease.cubicOut);
        chart.setTimeout(randomValue, 2000);
    }

}); // end am4core.ready()


/************************GRAFICO TEMP******************************** */

Highcharts.chart('container', {
    chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
            load: function() {

                // set up the updating of the chart each second
                var series = this.series[0];
                setInterval(function() {
                    var x = (new Date()).getTime(), // current time
                        y = TEMPERATURA; //Math.random();
                    series.addPoint([x, y], true, true);
                }, 1000);
            }
        }
    },

    time: {
        useUTC: false
    },

    title: {
        text: 'Monitoreo en tiempo real'
    },

    accessibility: {
        announceNewData: {
            enabled: true,
            minAnnounceInterval: 15000,
            announcementFormatter: function(allSeries, newSeries, newPoint) {
                if (newPoint) {
                    return 'New point added. Value: ' + newPoint.y;
                }
                return false;
            }
        }
    },

    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },

    yAxis: {
        title: {
            text: 'Value'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },

    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
    },

    legend: {
        enabled: false
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: 'Temperatura',
        data: (function() {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -19; i <= 0; i += 1) {
                data.push({
                    x: time + i * 1000,
                    y: Math.random()
                });
            }
            return data;
        }())
    }]
});