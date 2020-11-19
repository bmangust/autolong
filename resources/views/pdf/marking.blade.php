<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Marking</title>
</head>

<body style="font-family: DejaVu Sans, sans-serif; line-height: 1.5;">

    <table style="margin: 80px auto 0; border-collapse: collapse;">
        <tr>
            <td style="padding-bottom: 10px;">
                <span style="border-bottom: 1px solid #000">Seller</span>
            </td>
        </tr>
        <tr>
            <td style="padding-bottom: 10px;">[Какой поставщик]</td>
        </tr>
        <tr>
            <td style="padding-bottom: 10px;">Address: [Какой поставщик]</td>
        </tr>
        <tr>
            <td style="padding-bottom: 10px;">
                <span style="border-bottom: 1px solid #000">Manufacturing</span>
            </td>
        </tr>
        <tr>
            <td style="padding-bottom: 10px;">[Какой поставщик]</td>
        </tr>
        <tr>
            <td style="padding-bottom: 10px;">
                <span style="border-bottom: 1px solid #000">Buyer</span>
            </td>
        </tr>
        <tr>
            <td style="padding-bottom: 10px;">{{ $importer->name_en }}</td>
        </tr>
        <tr>
            <td style="padding-bottom: 30px;">{{ $importer->address }}</td>
        </tr>
        <tr>
            <td style="padding-bottom: 10px;">MODEL OF GOODS</td>
        </tr>
        <tr>
            @foreach($orders as $order)
                @foreach($order->getProductsHsCode() as $hsCode)
                    <td>
                        <span style="border-bottom: 1px dotted #000">{{ $hsCode }}</span>
                    </td>
                @endforeach
            @endforeach
        </tr>
        <tr>
            <td></td>
        </tr>
    </table>
</body>

</html>
