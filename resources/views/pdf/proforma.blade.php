<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Proforma</title>
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

        </style>
    </head>
    <body>
        <div class="center">
            <h1>{Название поставщика}</h1>
            <h3>{Адрес поставщика}</h2>
            <a href="#">{Телефон поставщика}</h3>
            <h2>Proforma invoice</h4>
        </div>
        <div class="group">
            <span>Seller: {Название поставщика} </span>
            <span>number: {???} </span>
        </div>
        <div class="group">
            <span>{Адрес поставщика}</span>
            <span>date: {???} </span>
        </div>
        <div class="solo">TEL: {Телефон поставщика}</div>
        <div class="solo">
            TO:{Название импортера} {Адрес импортера} INN/KPP {ИНН и КПП
            импортера}
        </div>
        <table>
            <tr>
                <th>filters and accessories for agricultural system</th>
                <th>PICTURES</th>
                <th>QUANTITY</th>
                <th>FOB PRICE (RMB)</th>
                <th>AMOUNT (RMB)</th>
            </tr>
            <tr>
                <td>{Артикул товара}</td>
                <td>{Изображение товара}</td>
                <td>{кол-во товара}</td>
                <td>{Цена за единицу}</td>
                <td>{Сумма}</td>
            </tr>
            <tr>
                <td>PL-420 (D-110, H-230)</td>
                <td>
                    <img src="https://via.placeholder.com/150x50" alt="" />
                </td>
                <td>1000</td>
                <td>16</td>
                <td>16000</td>
            </tr>
            <tr>
                <td>PL-270 Filter with cup D-110, H-150</td>
                <td>
                    <img src="https://via.placeholder.com/150x50" alt="" />
                </td>
                <td>1000</td>
                <td>17</td>
                <td>17000</td>
            </tr>
            <tr>
                <td>PL-420 Filter with cup D-110, H-230</td>
                <td><img src="https://via.placeholder.com/150x50" alt="" /></td>
                <td>3000</td>
                <td>20</td>
                <td>60000</td>
            </tr>
            <tr>
                <td>Filter PL-270S with base and cup</td>
                <td><img src="https://via.placeholder.com/150x50" alt="" /></td>
                <td>100</td>
                <td>63</td>
                <td>6300</td>
            </tr>
            <tr>
                <td>Filter PL-420S with base and cup</td>
                <td><img src="https://via.placeholder.com/150x50" alt="" /></td>
                <td>100</td>
                <td>66</td>
                <td>6600</td>
            </tr>
            <tr>
                <td>Separator base PL-270/420 УС</td>
                <td><img src="https://via.placeholder.com/150x50" alt="" /></td>
                <td>150</td>
                <td>49,5</td>
                <td>7425</td>
            </tr>
            <tr>
                <td>Total</td>
                <td></td>
                <td>5350</td>
                <td></td>
                <td>113325</td>
            </tr>
        </table>

        <span>Manufacturing: {Название поставщика} </span>
        <span>PAYMENT TERMS: 100% prepayment </span>
        <span>Contract # 20LH dated 20.05.2020 </span>
        <span>Terms of delivery: EXW-Wenzhou </span>

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

