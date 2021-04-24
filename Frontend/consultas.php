<?php
include_once("header.php");
?>
<div id="page-wrapper">
    <div class="header">

        <ol class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li><a href="#">mediciones</a></li>
            <li class="active">Data</li>
        </ol>

    </div>

    <div id="page-inner">

        <div class="row">
            <div class="col-md-12">
                <!-- Advanced Tables -->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Registro de mediciones
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                <thead>
                                    <tr>
                                    <th>Código</th>
                                    <th>Fecha</th>
                                        <th>Valor</th>
                                        <th>Dispositivo</th>
                                        <th>Estado</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>

                                  
                                </tbody>
                            </table>
                        </div>
							      <div id="tabla_contenido">
                        <center>
                        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
   <p><span class="">Consultando datos...</span></p> 
                        </center>
    
    </div>
                    </div>
                </div>
                <!--End Advanced Tables -->
            </div>
        </div>

    </div>

</div>
<!-- /. PAGE INNER  -->
</div>
<!-- /. PAGE WRAPPER  -->


<?php
include_once("footer.php");

?>