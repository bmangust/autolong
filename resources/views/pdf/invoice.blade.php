<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Commercial Invoice</title>
</head>

<body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5;">

    <h1 style="margin: 50px 0 0 5px; text-transform: uppercase; text-align: center; font-size: 16px;font-weight: normal">
        {{ $order->provider->name_company }}
    </h1>
    <h2 style="margin: 0 0 0 5px; font-weight: normal; font-size: 12px; text-transform: uppercase; text-align: center;">
        {{ $order->provider->beneficiary_address }}
    </h2>
    <h2 style="text-align: center; font-weight: normal; margin: 0 0 5px; font-size: 10px;">TEL: {{ $order->provider->phone }}
    </h2>
    <h2 style="margin: 0 0 0 5px; font-size: 16px; text-align: center;font-weight: normal">
        Commercial invoice
    </h2>
    <table style="text-align: left; border-collapse: collapse; font-size: 10px;">
        <tr>
            <td style="width: 500px">
                Seller: {{ $order->provider->name }}
                <br/>
                {{ $order->provider->beneficiary_address }}
                <br/>
                TEL: {{ $order->provider->phone }}
            </td>
            <td style="width: 500px">
                number: {{ $order->id }}
                <br/>
                date: {{ $order->created_at }}
            </td>
        </tr>
    </table>
    <p style="display: block; text-align: left; margin-top: 20px; margin-bottom: 25px; font-size: 10px;">
        TO: {{ $importer->name_ru }} {{ $importer->address }} INN/KPP 7721305869/ 772101001
    </p>
    <table style="border-collapse: collapse; text-align: center; font-size: 10px;" border="1" width="100%">
        <tr>
            <th style="border: 1px solid #000;">
                filters and accessories<br/>for agricultural system
            </th>
            <th style="padding: 10px; border: 1px solid #000;">
                PICTURES
            </th>
            <th style="padding: 10px; border: 1px solid #000;">
                HS CODE
            </th>
            <th style="padding: 10px; border: 1px solid #000;">
                QUANTITY
            </th>
            <th style="padding: 10px; border: 1px solid #000;">
                PRICE (RMB)
            </th>
            <th style="padding: 10px; border: 1px solid #000;">
                AMOUNT (RMB)
            </th>
        </tr>
        @foreach($order->orderItems as $item)
        <tr>
            <td style="padding: 10px; border: 1px solid #000;">
                {{ $item->product->name_en }} {{ $item->product->vendor_code }}
            </td>
            <td style="padding: 10px; border: 1px solid #000;">
                <img style="width: 100%; max-width: 50px; max-height:50px" src="{{ asset($item->product->image) }}" alt="" />
            </td>
            <td style="padding: 10px; border: 1px solid #000;">
                hs code
            </td>
            <td style="padding: 10px; border: 1px solid #000;">
                {{ $item->quantity }}
            </td>
            <td style="padding: 10px; border: 1px solid #000;">
                {{ $item->price_cny }}
            </td>
            <td style="padding: 10px; border: 1px solid #000;">
                {{ $item->getSumInCny() }}
            </td>
        </tr>
        @endforeach
        <tr>
            <td style="padding: 10px; border: 1px solid #000;">
                Total
            </td>
            <td style="padding: 10px; border: 1px solid #000;"></td>
            <td style="padding: 10px; border: 1px solid #000;"></td>
            <td style="padding: 10px; border: 1px solid #000;">?</td>
            <td style="padding: 10px; border: 1px solid #000;"></td>
            <td style="padding: 10px; border: 1px solid #000;">
                ?
            </td>
        </tr>
    </table>

    <table style="border-collapse: collapse; text-align: left; font-size: 10px;">
        <tr>
            <td style="font-size: 12px;">Manufacturing: ?</td>
        </tr>
        <tr>
            <td>
                PAYMENT TERMS: ?
            </td>
        </tr>
        <tr>
            <td>Contract ?</td>
        </tr>
        <tr>
            <td>Terms of delivery: ?</td>
        </tr>
    </table>

    <table style="border-collapse: collapse; text-align: left; margin-top: 25px; font-size: 10px;">
        <tr>
            <td style="width: 150px;">Bank</td>
            <td style="width: 350px;">{{ ($order->provider->beneficiary_bank_name) ? $order->provider->beneficiary_bank_name : '-' }}</td>
        </tr>
        <tr>
            <td style="width: 150px;">Number account</td>
            <td style="width: 350px;">{{ ($order->provider->beneficiary_account_name) ? $order->provider->beneficiary_account_name : '-' }}</td>
        </tr>
        <tr>
            <td style="width: 150px;">SWIFT:</td>
            <td style="width: 350px;">{{ ($order->provider->beneficiary_swift_address) ? $order->provider->beneficiary_swift_address : '-' }}</td>
        </tr>
        <tr>
            <td style="width: 150px;">Address of bank</td>
            <td style="width: 350px;">{{ ($order->provider->beneficiary_bank_address) ? $order->provider->beneficiary_bank_address : '-' }}</td>
        </tr>
    </table>
</body>

</html>
