<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Packing List</title>
</head>

<body style="font-family: DejaVu Sans, sans-serif; line-height: 1.5; font-size: 14px;">

    <table style="margin: 0 auto; border-collapse: collapse; text-align: center;">
        <tr>
            <th style="font-size: 24px; font-weight: normal;">{{ $provider->name_company }}</th>
        </tr>
        <tr>
            <td>{{ $provider->manufacturing ? $provider->manufacturing : '-' }}/td>
        </tr>
        <tr>
            <td>TEL: {{ $provider->phone }}</td>
        </tr>
    </table>

    <table style="border-collapse: collapse; margin: 0 auto; text-align: center;">
        <tr>
            <td>TO: LLC «Component Supply»</td>
        </tr>
        <tr>
            <td>{{ $importer->address }}</td>
        </tr>
        <tr>
            <td>INN/KPP 7721305869/ 772101001</td>
        </tr>
    </table>

    <table style="border-collapse: collapse; text-align: center; margin: 0 auto;">
        <caption style="font-weight: bold; font-size: 20px;">{{ $order->packing_list_name }}</caption>
        <tr>
            <th style="font-weight: normal; padding: 5px 15px; border: 1px solid #000;">filters and accessories for <br> agricultural system</th>
            <th style="font-weight: normal; padding: 5px 15px; border: 1px solid #000;">HS</th>
            <th style="font-weight: normal; padding: 5px 15px; border: 1px solid #000;">QUANTITY</th>
            <th style="font-weight: normal; padding: 5px 15px; border: 1px solid #000;">PCS/CTN</th>
            <th style="font-weight: normal; padding: 5px 15px; border: 1px solid #000;">CTNS</th>
            <th style="font-weight: normal; padding: 5px 15px; border: 1px solid #000;" colspan="3">MEAS(cm)</th>
            <th style="font-weight: normal; padding: 5px 15px; border: 1px solid #000;">N.W/CTN</th>
            <th style="font-weight: normal; padding: 5px 15px; border: 1px solid #000;">G.W/CTN</th>
            <th style="font-weight: normal; padding: 5px 15px; border: 1px solid #000;">N.W(KGS)</th>
            <th style="font-weight: normal; padding: 5px 15px; border: 1px solid #000;">G.W(KGS)</th>
            <th style="font-weight: normal; padding: 5px 15px; border: 1px solid #000;">VOLUME</th>
        </tr>
        @foreach($orderItems as $item)
            <tr>
                <td style="padding: 5px 15px; border: 1px solid #000;">{{ $item->product->name }}</td>
                <td style="padding: 5px 15px; border: 1px solid #000;">{{ $item->product->hs_code }}</td>
                <td style="padding: 5px 15px; border: 1px solid #000;">{{ $item->quantity }}</td>
                <td style="padding: 5px 15px; border: 1px solid #000;">
                    @foreach(json_decode($item->pcs_ctn) as $pcsCtn)
                        <table>
                            <tr>
                                <td>{{ $pcsCtn }}</td>
                            </tr>
                        </table>
                    @endforeach
                </td>
                <td style="padding: 5px 15px; border: 1px solid #000;">
                    @foreach(json_decode($item->ctns) as $ctns)
                        <table>
                            <tr>
                                <td>{{ $ctns }}</td>
                            </tr>
                        </table>
                    @endforeach
                </td>
                <td style="padding: 5px 15px; border: 1px solid #000;">{{ json_decode($item->meas)->height }}</td>
                <td style="padding: 5px 15px; border: 1px solid #000;">{{ json_decode($item->meas)->length }}</td>
                <td style="padding: 5px 15px; border: 1px solid #000;">{{ json_decode($item->meas)->width }}</td>
                <td style="padding: 5px 15px; border: 1px solid #000;">{{ $item->product->weight_netto }}</td>
                <td style="padding: 5px 15px; border: 1px solid #000;">{{ $item->product->weight_brutto }}</td>
                <td style="padding: 5px 15px; border: 1px solid #000000;">{{ $item->fullWeightNettoOrderItem() }}</td>
                <td style="padding: 5px 15px; border: 1px solid #000;">{{ $item->fullWeightBruttoOrderItem() }}</td>
                <td style="padding: 5px 15px; border: 1px solid #000;">{{ $item->getVolumeBox() }}</td>
            </tr>
        @endforeach
    </table>

    <table style="border-collapse: collapse; margin: 20px auto 0;">
        <tr>
            <td>
                {{ $contract->name }}
            </td>
        </tr>
        <tr>
            <td>
                Terms of delivery: {{ $contract->supply }}
            </td>
        </tr>
    </table>
    <img style="display: block; max-width: 300px; margin: 0 auto;" src="../../../public/imgs/seal.jpg" alt="">

</body>

</html>
