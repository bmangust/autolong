<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Autolong</title>
</head>

<body
    style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; font-size:14px; line-height:1.4;">

    <!-- wrapper -->
    <table bgcolor="#f7f8fa" align="center" cellspacing="0" cellpadding="0" border="0">

        <!-- header -->
        <tr>
            <td style="padding-left: 20px; padding-right: 20px;">
                <table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0; width: 100%;">
                    <tr>
                        <td
                            style="padding-top: 25px; padding-bottom: 10px; font-family: Arial, Helvetica, sans-serif; font-weight: 600; font-size: 18px; line-height: 22px; color:#3a405f;">
                            Новинки в системе Autolong
                        </td>
                    </tr>
                    <tr>
                        <td
                            style="padding-top: 0px; padding-bottom: 20px; font-family: Arial, Helvetica, sans-serif; font-size:14px; line-height: 18px; color:#949599;">
                            Товары, ожидающие одобрения от {{ \Carbon\Carbon::now()->format('d.m.Y') }}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <!-- /header -->

        @foreach($newProducts as $newProduct)
        <!-- content -->
        <tr>
            <td style="padding-left: 20px; padding-right: 20px; padding-bottom: 10px;">
                <table bgcolor="#ffffff" align="center" border="0" cellpadding="0" cellspacing="0"
                    style="width: 100%; margin: 0; padding: 0; border-radius: 10px;">
                    <tr>
                        <td style="width: 10%; padding-top: 15px; padding-bottom: 15px; padding-left: 15px; padding-right: 15px;">
                            <img border="0" width="65" style="display: block;"
                            src={{ asset($newProduct->image) ?? asset('/imgs/placeholder-product-image.png') }} alt="">
                        </td>
                        <td
                            style="padding-top: 15px; padding-bottom: 15px; padding-left: 15px; padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-weight: 500; font-size: 12px; line-height: 16px; color:#3a405f;">
                            {{ $newProduct->name_ru ?: $newProduct->name_en }}
                            <table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0; width: 100%;">
                                <tr>
                                    <td width="70"
                                        style="padding-top: 10px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 16px; color:#949599;">
                                        Цена:
                                    </td>
                                    <td
                                        style="padding-top: 10px; font-family: Arial, Helvetica, sans-serif; font-weight: 500; font-size: 12px; line-height: 16px; color:#eb5e28;">
                                        {{ $newProduct->price_cny }} ¥
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <!-- /content -->
        @endforeach

        <!-- footer -->
        <tr>
            <td style="padding-top: 15px; padding-bottom: 25px; padding-left: 20px; padding-right: 20px;">
                <table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0; width: 100%;">
                    <tr>
                        <td align="center">
                            <a style="display: block; width: 280px; padding-top: 12px; padding-bottom: 12px; padding-left: 12px;padding-right: 12px; font-family: Arial, Helvetica, sans-serif; font-weight: 600; font-size: 12px; line-height: 16px; color:#ffffff; text-decoration: none; background-color: #eb5e28; border-radius: 10px;" target="_blank" href="#">Перейти к новинкам</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <!-- /footer -->

    </table>
    <!-- /wrapper -->

</body>

</html>
