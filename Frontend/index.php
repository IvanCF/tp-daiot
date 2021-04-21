<?php
include_once("header.php");
?>
<div id="page-wrapper">
    <div class="header">

        <ol class="breadcrumb">
            <li><a href="#">Home</a></li>

            <li class="active">Data</li>
        </ol>

    </div>
    <div id="page-inner">

        <!-- /. ROW  -->

        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="panel panel-primary text-center no-boder blue">
                    <div class="panel-left pull-left blue">
                        <i class="fa fa-thermometer-half fa-5x"></i>

                    </div>
                    <div class="panel-right">
                        <h3>
                            <div id="temperatura">0</div>
                        </h3>
                        <strong> Celcius</strong>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="panel panel-primary text-center no-boder blue">
                    <div class="panel-left pull-left blue">
                        <i class="fa fa-cloud fa-5x"></i>

                    </div>
                    <div class="panel-right">
                        <h3>
                            <div id="humedad">0</div>
                        </h3>
                        <strong> Humedad Relativa</strong>

                    </div>
                </div>
            </div>

        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Temperatura
                    </div>
                    <div class="panel-body">
                        <!--   <div id="morris-line-chart"></div>  -->
                        <figure class="highcharts-figure">
                            <div id="container"></div>

                        </figure>
                    </div>
                </div>
            </div>




            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Humedad
                    </div>
                    <div class="panel-body">
                        <div id="chartdiv"></div>
                    </div>

                </div>
            </div>

        </div>



        <div class="row">




        </div>
        <!--/.row-->


        <div class="row">


        </div>
        <div class="row">
            <div class="col-md-12">

            </div>
        </div>
        <!-- /. ROW  -->





        <div class="row">


        </div>
        <!-- /. ROW  -->


        <footer>
            <p>All right reserved. <a href="#">Esp. IOT - UBA</a></p>


        </footer>
    </div>
    <!-- /. PAGE INNER  -->
</div>
<!-- /. PAGE WRAPPER  -->
</div>
<!-- /. WRAPPER  -->
<?php
include_once("footer.php");

?>