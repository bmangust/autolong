<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Commercial Invoice</title>
</head>

<body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5;">

    <h1 style="margin: 50px 0 0 5px; text-transform: uppercase; text-align: center; font-size: 18px;">
        {{ $order->provider->name }}
    </h1>
    <h2 style="margin: 0 0 0 5px; font-weight: normal; font-size: 16px; text-transform: uppercase; text-align: center;">
        {Адрес поставщика}
    </h2>
    <h2 style="text-align: center; font-weight: normal; margin: 0 0 5px; font-size: 16px;">TEL: {{ $order->provider->phone }}
    </h2>
    <h2 style="margin: 0 0 0 5px; font-size: 16px; text-align: center;">
        Commerial invoice
    </h2>
    <table style="text-align: left; border-collapse: collapse; font-size: 10px;">
        <tr>
            <td style="width: 500px">
                Seller: {{ $order->provider->name }}
            </td>
            <td style="width: 300px">
                number: {{ $order->provider->phone }}
            </td>
        </tr>
        <tr>
            <td style="width: 500px">
                TONG YANG VILLAGE BAI ZHANG JI TOWN, WENZHOU,CN
            </td style="width: 300px">
            <td>date: 06 September 2020</td>
        </tr>
    </table>

    <span style="display: block; text-align: left; margin-bottom: 30px; font-size: 10px;">
        TEL: {{ $order->provider->phone }}
    </span>
    <span style="display: block; text-align: left; margin-bottom: 25px; font-size: 10px;">
        TO:{{ $importer->name_ru }} {{ $importer->address }} INN/KPP
        {ИНН и КПП импортера}
    </span>
    <table style="border-collapse: collapse; text-align: center; font-size: 10px;">
        <tr>
            <th style="border: 2px solid #000;">
                filters and accessories for agricultural system
            </th>
            <th style="padding: 15px; border: 2px solid #000;">
                PICTURES
            </th>
            <th style="padding: 15px; border: 2px solid #000;">
                HS CODE
            </th>
            <th style="padding: 15px; border: 2px solid #000;">
                QUANTITY
            </th>
            <th style="padding: 15px; border: 2px solid #000;">
                PRICE (RMB)
            </th>
            <th style="padding: 15px; border: 2px solid #000;">
                AMOUNT (RMB)
            </th>
        </tr>
        @foreach($order->orderItems as $item)
        <tr>
            <td style="padding: 15px; border: 2px solid #000;">
                {{ $item->product->name }}
            </td>
            <td style="padding: 15px; border: 2px solid #000;">
                <img style="width: 100%; max-width: 50px; max-height:50px" src="{{ asset($item->product->image) }}" alt="" />
            </td>
            <td style="padding: 15px; border: 2px solid #000;">
                126465656546
            </td>
            <td style="padding: 15px; border: 2px solid #000;">
                {{ $item->quantity }}
            </td>
            <td style="padding: 15px; border: 2px solid #000;">
                {{ $item->price_cny }}
            </td>
            <td style="padding: 15px; border: 2px solid #000;">
                {{ $item->getSumInCny() }}
            </td>
        </tr>
        @endforeach
        <tr>
            <td style="padding: 15px; border: 2px solid #000;">
                Total
            </td>
            <td style="padding: 15px; border: 2px solid #000;"></td>
            <td style="padding: 15px; border: 2px solid #000;"></td>
            <td style="padding: 15px; border: 2px solid #000;">5350</td>
            <td style="padding: 15px; border: 2px solid #000;"></td>
            <td style="padding: 15px; border: 2px solid #000;">
                113325
            </td>
        </tr>
    </table>

    <table style="border-collapse: collapse; text-align: left; font-size: 10px;">
        <tr>
            <td style="font-size: 12px;">Manufacturing: Wenzhou Lihao Filter Co.,ltd, China</td>
        </tr>
        <tr>
            <td>
                PAYMENT TERMS: 100% prepayment by proforma invoice
                20LH005 dated 22th,May 2020
            </td>
        </tr>
        <tr>
            <td>Contract # 20LH dated 20.05.2020</td>
        </tr>
        <tr>
            <td>Terms of delivery: EXW-Wenzhou</td>
        </tr>
    </table>

    <table style="border-collapse: collapse; text-align: left; margin-top: 25px; font-size: 10px;">
        <tr>
            <td style="width: 150px;">Bank</td>
            <td style="width: 350px;">Agricultural Bank of China ,Zhejiang Branch</td>
        </tr>
        <tr>
            <td style="width: 150px;">Number account</td>
            <td style="width: 350px;">19245101040020662</td>
        </tr>
        <tr>
            <td style="width: 150px;">SWIFT:</td>
            <td style="width: 350px;">ABOCCNBJ110</td>
        </tr>
        <tr>
            <td style="width: 150px;">Address of bank</td>
            <td style="width: 350px;">O55. CHANGQING STREET, HANGZHOU ZHEJIANG PROVINCE,CHINA</td>
        </tr>
    </table>
</body>

</html>