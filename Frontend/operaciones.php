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
            <div class="col-md-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Acción:
                    </div>
                    <div class="panel-body">
                        <br />
                        <form role="form">
                            <div class="form-group input-group">
                                <i class="fa fa-lightbulb-o" style="font-size:48px;"></i> &nbsp; &nbsp; <label>Use los
                                    botones para accionar la luz</label>
                            </div>


                            <div class="form-group input-group">
                                <!-- <span class="input-group-addon">t (ms)</span>
                                            <input type="number" class="form-control" placeholder="velocidad de transmision"> -->
                            </div>
                            <div class="form-group input-group">
                            </div>
                            <div class="form-group input-group">
                            </div>
                            <div class="form-group input-group">
                            </div>

                        </form>
                        <button class="btn btn-primary" onClick="prenderLed();">Prender</button>
                        <button class="btn btn-warning" onClick="apagarLed();">Apagar</button>
                    </div>
                </div>
            </div>


            <div class="col-md-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Configuración:
                    </div>
                    <div class="panel-body">
                        <br />
                        <form role="form">
                            <div class="form-group input-group">
                                <i class="fa fa-cogs" style="font-size:48px;"></i> &nbsp; <label>Valor de tiempo (ms)
                                    para enviar:</label>
                            </div>


                            <div class="form-group input-group">
                                <span class="input-group-addon">t (ms)</span>
                                <input type="number" id="tiempo" class="form-control"
                                    placeholder="velocidad de transmision">
                            </div>
                            <div class="form-group input-group">
                            </div>



                        </form>
                        <button class="btn btn-primary" onClick="reconfigurar();">Reconfigurar</button>
                    </div>
                </div>
            </div>


            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Mensajes:
                    </div>
                    <div class="panel-body">

                        <div class="form-group">
                            <label>Comunicación MQTT</label>
                            <textarea class="form-control" rows="6" id="mensajes"></textarea>
                        </div>

                    </div>

                </div>
            </div>

        </div>




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