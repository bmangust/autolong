<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Autolong</title>

    <style type="text/css">
        body {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            text-size-adjust: 100%;
            margin: 0;
            padding: 0;
        }

        table {
            border-spacing: 0;
            border-collapse: collapse;
        }

        table td {
            border-collapse: collapse;
        }

        img {
            -ms-interpolation-mode: bicubic;
            display: block;
            outline: none;
            text-decoration: none;
        }

        a img {
            border: none;
        }

        p {
            margin: 0;
            padding: 0;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            color: #3a405f;
            line-height: 100%;
        }


        body,
        #body_style {
            width: 100% !important;
            min-height: 1000px;
            color: #3a405f;
            background-color: #f7f8fa;
            font-family: -apple-system, BlinkMacSystemFont, Arial, Helvetica, sans-serif;
            font-size: 14px;
            line-height: 1.4;
        }

        a {
            color: #3a405f;
            text-decoration: none;
        }

        a:link {
            color: #3a405f;
            text-decoration: none;
        }

        a:visited {
            color: #3a405f;
            text-decoration: none;
        }

        a:focus {
            color: #3a405f !important;
        }

        a:hover {
            color: #3a405f !important;
        }

        @media only screen and (max-width: 639px) {

            .table {
                width: 320px !important;
            }

            .table td {
                text-align: left;
            }

            .innertable {
                width: 300px !important;
            }

            .collapse-cell {
                width: 300px !important;
            }

        }
    </style>
</head>


<body
    style="width:100% !important; min-height:1000px; color:#3a405f; background-color: #f7f8fa; font-family:-apple-system,Arial,Helvetica,sans-serif; font-size:14px; line-height:1.4;"
    alink="#1990fe" link="#1990fe" text="#3a405f">


    <!-- PAGE WRAPPER -->
    <div id="body_style">

        <!-- Wrapper/Container Table -->
        <table cellpadding="0" cellspacing="0" border="0" align="center"
            style="width:100% !important; margin:0; padding:0;">

            <!-- HEADER -->
            <tr>
                <td bgcolor="#f7f8fa" style="padding-top: 50px;">
                    <table bgcolor="#f7f8fa" width="600" cellpadding="0" cellspacing="0" border="0" align="center"
                        class="innertable">
                        <tr>
                            <td style="padding-bottom: 20px;">
                                <h1 style="font-size: 18px; font-weight: 600; text-align: left; color: #3a405f;">Новинки
                                    в
                                    системе Autolong</h1>
                                <p style="color: #949599;">Товары, ожидающие одобрения от
                                    {{ \Carbon\Carbon::now()->format('d.m.Y') }}</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- /HEADER -->

            @foreach($newProducts as $newProduct)
            <tr bgcolor="#f7f8fa">
                <td style="padding-bottom: 10px;">
                    <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="table"
                        bgcolor="#ffffff" style="border-radius: 10px;">

                        <!-- CONTENT -->
                        <tr>
                            <td>
                                <table class="innertable" bgcolor="#ffffff" width="550" cellpadding="0" cellspacing="0"
                                    border="0" align="center">
                                    <tr>
                                        <td style="padding-top: 15px; padding-bottom: 15px;">
                                            <table align="left" width="80" cellpadding="0" cellspacing="0" border="0"
                                                class="collapse-cell">
                                                <tr>
                                                    <td style="padding-bottom: 10px;">
                                                        <img width="65" height="50"
                                            src={{ asset($newProduct->image) ?? asset('/imgs/placeholder-product-image.png') }} alt="product">
                                                    </td>
                                                </tr>
                                            </table>
                                            <table align="right" width="470" cellpadding="0" cellspacing="0" border="0"
                                                class="collapse-cell">
                                                <tr>
                                                    <td>
                                                        {{ $newProduct->name_ru ?: $newProduct->name_en }}
                                                        <p style="padding-top: 10px;">
                                                            <span style="color: #949599; padding-right: 40px;">
                                                                Цена:
                                                            </span>
                                                            <span style="color: #f44a0e;">
                                                                {{ $newProduct->price_cny }} ¥
                                                            </span>
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- /CONTENT -->

                    </table>
                </td>
            </tr>
            @endforeach


            <!-- footer -->
            <tr>
                <td>
                    <table bgcolor="#f7f8fa" width="600" cellpadding="0" cellspacing="0" border="0" align="center"
                        class="innertable">
                        <tr>
                            <td align="center" style="padding-top: 5px;" class="collapse-cell">
                                <a href={{ asset('newproducts') }}
                                    style="display: block; width: 300px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; background-color: #f44a0e; border-radius: 10px; color: #ffffff;">Перейти
                                    к новинкам</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- /footer -->
        </table>
        <!-- End of wrapper table -->


    </div>
    <!-- /PAGE WRAPPER -->

</body>

</html>