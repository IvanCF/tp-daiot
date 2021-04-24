/****************************************************************** */
function registrarMediciones(fecha, valor, dispositivoId, estado) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xhttp.open(
        "GET",
        "http://localhost:3001/addMediciones/" + fecha + "/" + valor + "/" + dispositivoId + "/" + estado + "/",
        true
    );
    xhttp.send();


}
/****************************************************************** */
function listarMediciones() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = eval(this.responseText);
            var tam = jsonObj.length;
            var tabla = $("#dataTables-example").DataTable({
                "columns": [null,
                    { "width": "20%" },
                    null,
                    { "width": "20%" },
                    null

                ]
            });


            $("#tabla_contenido").hide(); // llego datos, ocultamos
            for (var i = 0; i < tam; i++) {
                tabla.row.add(Object.values(jsonObj[i])).draw();
                console.log(Object.values(jsonObj[i]));
            }
        }
    };
    xhttp.open("GET", "http://localhost:3001/medicionesRelacionadas", true);
    xhttp.send();
}
/****************************************************************** */
function registrarAccion(fecha, valor, dispositivoId, estado) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xhttp.open(
        "GET",
        "http://localhost:3001/addAccion/" + fecha + "/" + valor + "/" + dispositivoId + "/" + estado + "/",
        true
    );
    xhttp.send();


}