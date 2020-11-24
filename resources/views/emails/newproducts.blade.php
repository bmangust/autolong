<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width" />
</head>

<style>
    @media screen and (max-width:480px) {
        table {
            width: 100% !important;
        }

    }
</style>

<body style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.2; padding-top: 60px;">

    <table cellpadding='0' cellspacing='0' border="0" width="600"
        style="border-collapse: collapse; margin: 0 auto; background-color: #f7f8fa; border-radius: 10px;">
        <tr>
            <th style="padding: 25px 23px 10px 23px;">
                <h1 style="margin: 0; font-size: 18px; font-weight: 600; text-align: left; color: #3a405f;">Новинки в
                    системе Autolong</h1>
            </th>
        </tr>
        <tr>
            <td style="padding: 0 23px 20px 23px; color: #949599;">
                Товары, ожидающие одобрения от {{ \Carbon\Carbon::now()->format('d.m.Y') }}
            </td>
        </tr>
        @foreach($newProducts as $newProduct)
        <tr>
            <td style="padding: 0 23px 25px;">
                <table cellpadding='0' cellspacing='0' border="0"
                    style="border-collapse: collapse; background-color: #ffffff; border-radius: 10px;">
                    <tr>
                        <td style="padding: 10px 15px 10px;">
                            <table cellpadding='0' cellspacing='0' border="0" style="border-collapse: collapse;">
                                <tr>
                                    <td>
                                        <img width="65" height="50"
                                            src={{ asset($newProduct->image) ?? asset('public/imgs/placeholder-product-image.png') }} alt="product">
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding: 10px 10px 10px 0;">
                            <table cellpadding='0' cellspacing='0' border="0" style="border-collapse: collapse;">
                                <tr>
                                    <td
                                        style="padding-bottom: 10px; font-weight: 600; font-size: 10px; color: #3a405f;">
                                        {{ $newProduct->name_ru ?: $newProduct->name_en }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table cellpadding='0' cellspacing='0' border="0" width='150'
                                            style="border-collapse: collapse;">
                                            <tr>
                                                <td style="color: #949599;">
                                                    Цена:
                                                </td>
                                                <td style="color: #eb5e28;">
                                                    {{ $newProduct->price_cny }} ¥
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        @endforeach
        <tr>
            <td style="padding: 0 23px 30px; text-align: center;">
                <a href={{ asset('newproducts') }}
                    style="display: inline-block; width: 300px; padding: 10px 10px; background-color: #eb5e28; border-radius: 10px; text-decoration: none; color: #ffffff;">Перейти
                    к
                    новинкам</a>
            </td>
        </tr>
    </table>

</body>

</html>
