<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Commercial Invoice</title>
        <style>
            table {
                border-collapse: collapse;
                margin-bottom: 20px;
            }

            th,
            td {
                padding: 15px;
                border: 1px solid #000;
            }

            ul {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            span {
                display: block;
                margin-bottom: 5px;
            }

            .center {
                max-width: 550px;
                text-align: center;
                margin-bottom: 5px;
            }

            .group {
                max-width: 550px;
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            }

            .solo {
                margin-bottom: 15px;
            }

            .solo:last-of-type {
                margin-top: 10px;
                margin-bottom: 25px;
            }

            .group-bottom {
                max-width: 300px;
                display: flex;
                justify-content: space-between;
            }

            .group-bottom span {
                width: 50%;
            }

            .mt {
                margin-top: 20px;
            }

            .group-list {
                display: flex;
            }

            .group-list ul {
                margin-right: 30px;
            }
        </style>
    </head>
    <body>
        <div class="center">
            <h1>{{ $order->provider->name }}</h1>
            <h3>{Адрес поставщика}</h3>
            <a href="#">{{ $order->provider->phone }}</a>
            <h2>Proforma invoice</h2>
        </div>
        <div class="group">
            <span>Seller: {{ $order->provider->name }} </span>
            <span>number: {{ $order->provider->phone }} </span>
        </div>
        <div class="group">
            <span>{Адрес поставщика}</span>
            <span>date: {???} </span>
        </div>
        <div class="solo">TEL: {{ $order->provider->phone }}</div>
        <div class="solo">
            TO:{{ $importer->name_ru }} {{ $importer->address }} INN/KPP {ИНН и КПП
            импортера}
        </div>
        <table>
            <tr>
                <th>filters and accessories for agricultural system</th>
                <th>PICTURES</th>
                <th>HS CODE</th>
                <th>QUANTITY</th>
                <th>FOB PRICE (RMB)</th>
                <th>AMOUNT (RMB)</th>
            </tr>
            <tr>
                <td>{Артикул товара}</td>
                <td>{Изображение товара}</td>
                <td>126465656546</td>
                <td>{кол-во товара}</td>
                <td>{Цена за единицу}</td>
                <td>{Сумма}</td>
            </tr>
            @foreach($order->orderItems as $item)
            <tr>
                <td>{{ $item->product->name }}</td>
                <td>
                    <img src="{{ asset($item->product->image) }}" alt="" />
                </td>
                <td>126465656546</td>
                <td>{{ $item->quantity }}</td>
                <td>{{ $item->price_cny }}</td>
                <td>{{ $item->getSumInCny() }}</td>
            </tr>
            @endforeach
            <tr>
                <td>Total</td>
                <td></td>
                <td></td>
                <td>5350</td>
                <td></td>
                <td>113325</td>
            </tr>
        </table>

        <div class="group-list">
            <ul>
                <li>Manufacturing: {Название поставщика}</li>
                <li>PAYMENT TERMS: 100% prepayment</li>
                <li>Contract # 20LH dated 20.05.2020</li>
                <li>Terms of delivery: EXW-Wenzhou</li>
            </ul>
            <img src="https://via.placeholder.com/150x50" alt="" />
        </div>

        <div class="group-bottom mt">
            <span>Bank </span>
            <span>{Название банка} </span>
        </div>
        <div class="group-bottom">
            <span>Number account </span>
            <span>{Номер счета} </span>
        </div>
        <div class="group-bottom">
            <span>SWIFT: </span>
            <span>{Свифт код} </span>
        </div>
        <div class="group-bottom">
            <span>Address of bank </span>
            <span>{Адрес банка} </span>
        </div>
    </body>
</html>
