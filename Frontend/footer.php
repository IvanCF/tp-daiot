<!-- JS Scripts-->
<!-- jQuery Js -->
<script src="assets/js/jquery-1.10.2.js"></script>
<!-- Bootstrap Js -->
<script src="assets/js/bootstrap.min.js"></script>

<!-- Metis Menu Js -->
<script src="assets/js/jquery.metisMenu.js"></script>
<!-- Morris Chart Js -->
<script src="assets/js/morris/raphael-2.1.0.min.js"></script>
<!--  <script src="assets/js/morris/morris.js"></script> -->


<script src="assets/js/easypiechart.js"></script>
<script src="assets/js/easypiechart-data.js"></script>

<script src="assets/js/Lightweight-Chart/jquery.chart.js"></script>

<!-- Custom Js -->
<!--  <script src="assets/js/custom-scripts.js"></script> -->

<script>
</script>

<!-- graficos --- libreria highcharts-->
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>



<!-- grafico humedad-->
<!-- libreria amcharts -->
<script src="https://cdn.amcharts.com/lib/4/core.js"></script>
<script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
<script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>

<!--- se usa en todo -->
<script src="assets/js/serviceAPI.js"></script>


<?php 
    $archivo_actual = basename($_SERVER['PHP_SELF']); 
    
    if($archivo_actual=="index.php"){

   ?>

<script src="assets/js/graficos.js"></script>
<?php
    }

    if($archivo_actual=="operaciones.php"){

    ?>
<script src="assets/js/operaciones.js"></script>
<?php
    }
    if($archivo_actual=="consultas.php"){
    ?>



<!-- DATA TABLE SCRIPTS -->
<script src="assets/js/dataTables/jquery.dataTables.js"></script>
<script src="assets/js/dataTables/dataTables.bootstrap.js"></script>


<script>
$(document).ready(function() {

    listarMediciones();

});
</script>
<?php } ?>



</body>

</html>