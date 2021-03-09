<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Proforma Invoice</title>
</head>

<body style="font-family: DejaVu Sans, sans-serif; line-height: 1.5;">

    <h1
        style="margin: 50px 0 0 5px; text-transform: uppercase; text-align: center; font-size: 16px;font-weight: normal">
        {{ $provider->name_company ? $provider->name_company : '-'}}
    </h1>
    <h2 style="margin: 0 0 0 5px; font-weight: normal; font-size: 12px; text-transform: uppercase; text-align: center;">
        {{ $provider->beneficiary_address ? $provider->beneficiary_address : '-' }}
    </h2>
    <h2 style="text-align: center; font-weight: normal; margin: 0 0 5px; font-size: 10px;">TEL:
        {{ $provider->phone ? $provider->phone : '-' }}
    </h2>
    <h2 style="margin: 0 0 0 5px; font-size: 16px; text-align: center;font-weight: normal">
        Proforma invoice
    </h2>
    <table style="text-align: left; border-collapse: collapse; font-size: 10px;">
        <tr>
            <td style="width: 500px">
                Seller: {{ $provider->name_company }}
                <br />
                {{ $provider->beneficiary_address ? $provider->beneficiary_address : '-' }}
                <br />
                TEL: {{ $provider->phone ? $provider->phone : '-' }}
            </td>
            <td style="width: 500px">
                @if(isset($proformaNumber))
                    number: {{ $proformaNumber }}
                @else
                    number: {{ $order->id }}
                @endif
                <br />
                @if(isset($date))
                    date: {{ $date }}
                @else
                    date: {{ \Carbon\Carbon::now()->format('d F Y') }}
                @endif
            </td>
        </tr>
    </table>
    <p style="display: block; text-align: left; margin-top: 20px; margin-bottom: 25px; font-size: 10px;">
        TO: {{ $importer->name_ru ? $importer->name_ru : '-' }} {{ $importer->address ? $importer->address : '-' }}
        INN/KPP 7721305869/ 772101001
    </p>
    <table style="border-collapse: collapse; text-align: center; font-size: 10px;" border="1" width="100%">
        <tr>
            <th style="border: 1px solid #000;">
                filters and accessories<br />for agricultural system
            </th>
            <th style="padding: 10px; border: 1px solid #000;">
                PICTURES
            </th>
            <th style="padding: 10px; border: 1px solid #000;">
                QUANTITY
            </th>
            <th style="padding: 10px; border: 1px solid #000;">
                @if($proforma->currency === 'cny')
                    PRICE (CNY)
                @elseif($proforma->currency === 'rub')
                    PRICE (RMB)
                @elseif($proforma->currency === 'usd')
                    PRICE (USD)
                @endif
            </th>
            <th style="padding: 10px; border: 1px solid #000;">
                @if($proforma->currency === 'cny')
                    AMOUNT (CNY)
                @elseif($proforma->currency === 'rub')
                    AMOUNT (RMB)
                @elseif($proforma->currency === 'usd')
                    AMOUNT (USD)
                @endif
            </th>
        </tr>
        @foreach($orderItems as $item)
        <tr>
            <td style="padding: 10px; border: 1px solid #000;">
                {{ $item->translateHtmlCodesToTags($item->product->name_en) ??  '-'}} {{ $item->product->vendor_code }}
            </td>
            <td style="padding: 10px; border: 1px solid #000;">
                @if(!is_null($item->product->image))
                    <img style="width: 100%; max-width: 50px; max-height:50px" src="{{ asset($item->product->image) }}"
                         alt="" />
                @else
                    <img style="width: 100%; max-width: 50px; max-height:50px" src="{{ asset('/imgs/placeholder-product-image.png') }}"
                         alt="placeholder" />
                @endif
            </td>
            <td style="padding: 10px; border: 1px solid #000;">
                {{ $item->quantity }}
            </td>
            <td style="padding: 10px; border: 1px solid #000;">
                @if($proforma->currency === 'cny')
                    {{ $item->price_cny }}
                @elseif($proforma->currency === 'rub')
                    {{ $item->price_rub }}
                @elseif($proforma->currency === 'usd')
                    {{ $item->price_usd }}
                @endif
            </td>
            <td style="padding: 10px; border: 1px solid #000;">
                @if($proforma->currency === 'cny')
                    {{ $item->getSumInCny() }}
                @elseif($proforma->currency === 'rub')
                    {{ $item->getSumInRub() }}
                @elseif($proforma->currency === 'usd')
                    {{ $item->getSumInUsd() }}
                @endif
            </td>
        </tr>
        @endforeach
        <tr>
            <td style="padding: 10px; border: 1px solid #000;">
                Total
            </td>
            <td style="padding: 10px; border: 1px solid #000;"></td>
            <td style="padding: 10px; border: 1px solid #000;">{{ $order->getOrderItemsQuantity() }}</td>
            <td style="padding: 10px; border: 1px solid #000;"></td>
            <td style="padding: 10px; border: 1px solid #000;">
                @if($proforma->currency === 'cny')
                    {{ $order->getOrderSumInCny() }}
                @elseif($proforma->currency === 'rub')
                    {{ $order->getOrderSumInRub() }}
                @elseif($proforma->currency === 'usd')
                    {{  $order->getOrderSumInUsd()  }}
                @endif
            </td>
        </tr>
    </table>

    <table style="border-collapse: collapse; text-align: left; font-size: 10px;">
        <tr>
            <td style="font-size: 12px;">Manufacturing: {{ $provider->manufacturer ? $provider->manufacturer : '-' }}
            </td>
        </tr>
        <tr>
            <td>
                PAYMENT TERMS: {{ $statusPayment }}
            </td>
        </tr>
        <tr>
            @if(isset($contractNumber))
                <td>Contract {{ $contractNumber }}</td>
            @else
                <td>Contract</td>
            @endif
        </tr>
        <tr>
            <td>Terms of delivery: {{ $supply }}</td>
        </tr>
    </table>

    <table style="border-collapse: collapse; text-align: left; margin-top: 25px; font-size: 10px;">
        <tr>
            <td style="width: 150px;">Bank</td>
            <td style="width: 350px;">
                {{ ($order->provider->beneficiary_bank_code) ?: '-' }}</td>
        </tr>
        <tr>
            <td style="width: 150px;">Number account</td>
            <td style="width: 350px;">
                {{ ($order->provider->beneficiary_bank_code) ?: '-' }}
            </td>
        </tr>
        <tr>
            <td style="width: 150px;">SWIFT:</td>
            <td style="width: 350px;">
                {{ ($order->provider->beneficiary_swift_address) ?: '-' }}
            </td>
        </tr>
        <tr>
            <td style="width: 150px;">Address of bank</td>
            <td style="width: 350px;">
                {{ ($order->provider->beneficiary_bank_address) ?: '-' }}
            </td>
        </tr>
    </table>
</body>

</html>
