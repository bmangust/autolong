<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Счет на оплату</title>
</head>

<body style="font-family: DejaVu Sans, sans-serif; line-height: 1.5;">

    <h1
        style="margin: 50px 0 0 5px; text-transform: uppercase; text-align: center; font-size: 16px;font-weight: normal">
        {{ $provider->name_company ? $provider->name_company : '-'}}
    </h1>
    <h2 style="margin: 0 0 0 5px; font-weight: normal; font-size: 12px; text-transform: uppercase; text-align: center;">
        {{ $provider->beneficiary_address ? $provider->beneficiary_address : '-' }}
    </h2>
    <h2 style="text-align: center; font-weight: normal; margin: 0 0 5px; font-size: 10px;">Телефон:
        {{ $provider->phone ? $provider->phone : '-' }}
    </h2>
    <h2 style="margin: 0 0 0 5px; font-size: 16px; text-align: center;font-weight: normal">
        Счет на оплату
    </h2>
    <table style="text-align: left; border-collapse: collapse; font-size: 10px;">
        <tr>
            <td style="width: 500px">
                Поставщик: {{ $provider->name_company }}
                <br />
                {{ $provider->beneficiary_address ? $provider->beneficiary_address : '-' }}
                <br />
                Телефон: {{ $provider->phone ? $provider->phone : '-' }}
            </td>
            <td style="width: 500px">
                @if(isset($accountNumber))
                    номер: {{ $accountNumber }}
                @else
                    номер: {{ $order->id }}
                @endif
                <br />
                @if(isset($date))
                    дата: {{ $date }}
                @else
                    дата: {{ \Carbon\Carbon::now()->format('d F Y') }}
                @endif
            </td>
        </tr>
    </table>
    <p style="display: block; text-align: left; margin-top: 20px; margin-bottom: 25px; font-size: 10px;">
        Для: {{ $importer->name_ru ? $importer->name_ru : '-' }} {{ $importer->address ? $importer->address : '-' }}
        ИНН/КПП 7721305869/ 772101001
    </p>
    <table style="border-collapse: collapse; text-align: center; font-size: 10px;" border="1" width="100%">
        <tr>
            <th style="border: 1px solid #000;">
               НАИМЕНОВАНИЕ
            </th>
            <th style="padding: 10px; border: 1px solid #000;">
                ИЗОБРАЖЕНИЕ
            </th>
            <th style="padding: 10px; border: 1px solid #000;">
                КОЛ-ВО
            </th>
            <th style="padding: 10px; border: 1px solid #000;">
                ЦЕНА (RMB)
            </th>
            <th style="padding: 10px; border: 1px solid #000;">
                СУММА (RMB)
            </th>
        </tr>
        @foreach($orderItems as $item)
        <tr>
            <td style="padding: 10px; border: 1px solid #000;">
                {{ $item->translateHtmlCodesToTags($item->product->name_ru) ??  '-'}} {{ $item->product->vendor_code }}
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
                {{ $item->price_cny }}
            </td>
            <td style="padding: 10px; border: 1px solid #000;">
                {{ $item->getSumInCny() }}
            </td>
        </tr>
        @endforeach
        <tr>
            <td style="padding: 10px; border: 1px solid #000;">
                Всего
            </td>
            <td style="padding: 10px; border: 1px solid #000;"></td>
            <td style="padding: 10px; border: 1px solid #000;">{{ $order->getOrderItemsQuantity() }}</td>
            <td style="padding: 10px; border: 1px solid #000;"></td>
            <td style="padding: 10px; border: 1px solid #000;">
                {{ $order->getOrderSumInCny() }}
            </td>
        </tr>
    </table>

    <table style="border-collapse: collapse; text-align: left; font-size: 10px;">
        <tr>
            <td style="font-size: 12px;">Производитель: {{ $provider->manufacturer ? $provider->manufacturer : '-' }}
            </td>
        </tr>
        <tr>
            <td>
                Оплата: {{ $statusPayment }}
            </td>
        </tr>
        <tr>
            @if(isset($contractNumber))
                <td>Контракт {{ $contractNumber }}</td>
            @else
                <td>Контракт '-'</td>
            @endif
        </tr>
        <tr>
            <td>Условия доставки: {{ $supply }}</td>
        </tr>
    </table>

    <table style="border-collapse: collapse; text-align: left; margin-top: 25px; font-size: 10px;">
        <tr>
            <td style="width: 150px;">Банк</td>
            <td style="width: 350px;">
                {{ ($provider->beneficiary_bank_name) ?: '-' }}</td>
        </tr>
        <tr>
            <td style="width: 150px;">Номер счета</td>
            <td style="width: 350px;">
                {{ ($provider->beneficiary_account_name) ?: '-' }}
            </td>
        </tr>
        <tr>
            <td style="width: 150px;">Swift:</td>
            <td style="width: 350px;">
                {{ ($provider->beneficiary_swift_address) ?: '-' }}
            </td>
        </tr>
        <tr>
            <td style="width: 150px;">Адрес банка</td>
            <td style="width: 350px;">
                {{ ($provider->beneficiary_bank_address) ?: '-' }}
            </td>
        </tr>
        @if(isset( $account->importerStamp ))
            <img style="width: 100%; max-width: 150px; margin: 30px 0 0;" src="{{ asset($account->importerStamp) }}" alt="">
        @endif
        @if(isset( $account->importerSignature))
            <img style="width: 100%; max-width: 150px; margin: 30px 0 0;" src="{{ asset($account->importerSignature) }}" alt="">
        @endif
    </table>
</body>
</html>
