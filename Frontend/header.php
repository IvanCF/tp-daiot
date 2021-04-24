<?php $archivo_actual = basename($_SERVER['PHP_SELF']);?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TP- DAIOT</title>
    <!-- Bootstrap Styles-->
    <link href="assets/css/bootstrap.css" rel="stylesheet" />
    <!-- FontAwesome Styles-->
    <link href="assets/css/font-awesome.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Morris Chart Styles-->
    <link href="assets/js/morris/morris-0.4.3.min.css" rel="stylesheet" />
    <!-- Custom Styles-->
    <link href="assets/css/custom-styles.css" rel="stylesheet" />
    <link href="assets/css/graficos.css" rel="stylesheet" />
    <link href="assets/css/graficos_h.css" rel="stylesheet" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript">
    </script>

    <!-- TABLE STYLES-->
    <link href="assets/js/dataTables/dataTables.bootstrap.css" rel="stylesheet" />

    <!-- Google Fonts-->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' />
    <link rel="stylesheet" href="assets/js/Lightweight-Chart/cssCharts.css">

</head>

<body>
    <div id="wrapper">
        <nav class="navbar navbar-default top-navbar" role="navigation">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                    <span class="sr-only">...</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html"><strong>DA - IOT</strong></a>
            </div>

            <ul class="nav navbar-top-links navbar-right">


                <!-- /.dropdown -->

                <!-- /.dropdown -->
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                        <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li><a href="#"><i class="fa fa-user fa-fw"></i> Usuario</a>
                        </li>
                        <li><a href="#"><i class="fa fa-gear fa-fw"></i> Perfil</a>
                        </li>
                        <li class="divider"></li>
                        <li><a href="#"><i class="fa fa-sign-out fa-fw"></i> Salir</a>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
        </nav>
        <!--/. NAV TOP  -->
        <nav class="navbar-default navbar-side" role="navigation">

            <div class="sidebar-collapse">
                <ul class="nav" id="main-menu">

                    <li>
                        <?php  if($archivo_actual=="index.php") {?>
                        <a class="active-menu" href="index.php"><i class="fa fa-dashboard"></i> Inicio</a>
                        <?php } else {?>
                        <a href="index.php"><i class="fa fa-dashboard"></i> Inicio</a>
                        <?php } ?>
                    </li>

                    <li>
                        <?php  if($archivo_actual=="operaciones.php") {?>
                        <a class="active-menu" href="operaciones.php"><i class="fa fa-qrcode"></i> Operaciones</a>
                        <?php } else {?>
                        <a href="operaciones.php"><i class="fa fa-qrcode"></i> Operaciones</a>
                        <?php } ?>
                    </li>

                    <li>
                        <?php  if($archivo_actual=="consultas.php") {?>
                        <a class="active-menu" href="consultas.php"><i class="fa fa-table"></i> Consultas</a>
                        <?php } else {?>
                        <a href="consultas.php"><i class="fa fa-table"></i> Consultas</a>
                        <?php } ?>
                    </li>

                    <li>
                        <a href="https://github.com/IvanCF/tp-daiot" target="_blank"><i class="fa fa-creative-commons"></i> Repositorio</a>
                    </li>
                </ul>

            </div>

        </nav>
        <!-- /. NAV SIDE  -->