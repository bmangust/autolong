<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contract</title>
</head>

<body style="font-family: DejaVu Sans, sans-serif; line-height: 1.2;">
    <table style="margin: 0 auto; border-collapse: collapse; vertical-align: baseline;">
        <tr>
            <th style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <span style="display: block; text-align: center;">Контракт № {{ $name }}</span>
                <span style="display: block; text-align: left;">г. Москва</span>
                <span
                    style="display: inline-block; text-align: right; margin-left: 100px; border-bottom: 2px solid #000; line-height: 1;">{{ $date }}</span>
            </th>
            <th style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <span style="display: block; text-align: center;">Contract {{ $name }}</span>
                <span style="display: block; text-align: left;">Moscow</span>
                <span
                    style="display: inline-block; text-align: right; margin-left: 100px; border-bottom: 2px solid #000; line-height: 1;">{{ $date }}</span>
            </th>
        </tr>
        <tr>``
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <p style="margin: 0;">
                    {{ $provider->name_company ? $provider->name_company : '-' }}
                    {{ $provider->country ? $provider->country->name : '-' }}, именуемое в дальнейшем
                    <i>Продавец</i>, в лице Директора !ИМЯ ДИРЕКТОРА!, и Общество с
                    ограниченной ответственностью «Деталь поставка», Россия,
                    именуемое в дальнейшем <i>Покупатель</i>, в лице Директора
                    Холоденко Андрея Геннадьевича, действующего на основании
                    Устава, с другой стороны, заключили настоящий Контракт о
                    нижеследующем:
                </p>
            </td>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <p style="margin: 0;">
                    {{ $provider->name_company ? $provider->name_company : '-' }}
                    {{ $provider->country ? $provider->country->name : '-' }} hereinafter referred to
                    as <i>‘the Seller’</i>, represented by the Director !ИМЯ ДИРЕКТОРА!,
                    on the one part, and LLC «Component Supply»(«СS LLC»,
                    Russia, hereinafter referred to as <i><i>‘the Buyer’</i></i>, on
                    behalf of Director Kholodenko Andrey Gennadyevich,
                    acting on the basis of the Charter on the other part,
                    enter into this contract and hereby agree as follows:
                </p>
            </td>
        </tr>
        <tr>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    1. Предмет Контракта
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">1.1.</span>
                    <i>Продавец</i>
                    продал, а <i>Покупатель</i> купил на условиях {{ $supply }}
                    согласно Инкотермс-2010, {{ $classificationRu }}, (далее –
                    Товар), производства {{ $provider->name_company ? $provider->name_company : '-' }}
                    {{ $provider->country ? $provider->country->name : '-' }}.
                    Товар ввозится на территорию Российской Федерации.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">1.2.</span>
                    Наименование, количество поставляемого Товара, цены за
                    единицу Товара по артикулам указываются в инвойсе к
                    данному Контракту.
                </p>
            </td>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    1. Subject matter of the Contract
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">1.1.</span>
                    <i>Seller</i> has
                    sold and the <i>Buyer</i> has bought on terms {{ $supply }} in
                    accordance with Incoterms 2010, {{ $classificationEn }}, (hereinafter -
                    Goods), {{ $provider->name_company ? $provider->name_company : '-' }}
                    {{ $provider->country ? $provider->country->name : '-' }}. Goods are being imported into the
                    territory of the Russian Federation.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">1.2.</span>
                    Name,
                    quantity of supplied goods, the unit price of the Goods
                    per each article are being listed in invoice to this
                    Contract.
                </p>
            </td>
        </tr>
        <tr>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    2. Цена и общая сумма Контракта
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">2.1.</span>
                    <i>Продавец</i> обязуется поставить <i>Покупателю</i> товар на общую
                    сумму Контракта. Общая сумма настоящего Контракта
                    составляет {{ $orderPrice }}китайских юаней. Согласованная
                    сторонами цена Товара устанавливается в CNY и
                    указывается Инвойсах.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">2.2.</span>
                    Цена каждой партии товара, подлежащая уплате за ввозимый
                    товар (цена сделки), выделена из общей суммы Контракта,
                    указывается в инвойсе и входит в общую сумму Контракта.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">2.3.</span>
                    Инвойс на поставляемый товар выставляется
                    непосредственно <i>Продавцом</i>. Инвойс должен содержать номер
                    и дату Контракта, номер и дату инвойса, наименование и
                    адрес Сторон, подпись и штамп (оттиск печати) <i>Продавца</i>.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;"> 2.4.</span>
                    В инвойсе указывается: цена поставляемой партии товара,
                    подлежащая уплате <i>Продавцу</i>; наименование товара; цена за
                    единицу товара; количество каждого наименования; общая
                    стоимость по каждому наименованию товара в данной
                    поставке; общая стоимость товара, подлежащего оплате по
                    данной поставке; срок оплаты товара по данной поставке;
                    изготовитель.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">2.5.</span>
                    Стороны не устанавливают дополнительных условий и
                    ограничений для цены сделки.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">2.6.</span>
                    Право собственности на товары переходит от Продавца к
                    Покупателю в момент выдачи груза со склада Продавца.
                </p>
            </td>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    2. Price and total amount of the Contract
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">2.1.</span>
                    The <i>Seller</i> undertakes to supply to <i>Buyer</i> with the Goods
                    in the total amount of the Contract. The total value of
                    the contract is {{ $orderPrice }} CNY. The parties have agreed the
                    price of the goods is set in CNY and stated in invoices.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">2.2.</span>
                    The price for each consignment of goods payable for
                    imported goods (the transaction price) shall be detailed
                    in the total amount of the Contract, specified in an
                    invoice and included in the total amount of the
                    Contract.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">2.3.</span>
                    An invoice for delivered goods shall be issued directly
                    by <i>the Seller</i>. An invoice shall include the number and
                    the date of the Contract, a number and a date of the
                    invoice, the name and address of the Parties, a
                    signature and a stamp (impression of the seal) of <i>the Seller</i>.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;"> 2.4.</span>
                    The invoice shall include: price for the delivered
                    consignment of goods payable to <i>the Seller</i>; description
                    of the goods; price for each item of goods; quantity of
                    each item; total value of each item of goods in the
                    delivery; total value of the goods payable for the
                    delivery; due date of payment for the delivery;
                    manufacturer.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">2.5.</span>
                    The Parties shall not set additional conditions and
                    limitations for the transaction price.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">2.6.</span>
                    The property right to goods passes from the Seller to
                    the Buyer at the time of delivery of freight from a
                    warehouse of the Seller.
                </p>
            </td>
        </tr>
        <tr>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    3. Условия поставки
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">3.1.</span>
                    Поставка
                    Товара производится в соответствии ИНКОТЕРМС {{ $supply }}.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">3.2.</span>
                    Права
                    собственности на товар и риски утраты или порчи товара
                    переходят от Продавца к Покупателю в момент поставки
                    товара Покупателю (либо его уполномоченному
                    транспортному агенту).
                </p>
            </td>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    3. Terms of delivery
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">3.1.</span>
                    The Goods
                    shall be delivered in accordance with INCOTERMS
                    {{ $supply }}.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">3.2.</span>
                    Property
                    rights on the Goods and risks of its accidental loss or
                    damage shall be transferred from Seller to the Buyer at
                    the moment of delivery of the goods to Buyer (or its
                    authorized shipping agent).
                </p>
            </td>
        </tr>
        <tr>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    4. Количество и сроки поставки
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">4.1.</span>
                    Количество товара в каждой поставке, конкретный ассортимент, срок поставки предварительно
                    согласовываются Сторонами и указываются в инвойсе.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">4.2.</span>
                    Единица измерения: штука, 100 штук, 1000 штук, набор, комплект, килограмм.
                </p>
            </td>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    4. Quantity and time of delivery
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">4.1.</span>
                    Quantity of goods in each delivery, specific range of products, terms of delivery shall be
                    preliminarily agreed by the Parties and specified in invoice.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">4.2.</span>
                    Units of measurement are a piece, 100 pieces, 1000 pieces, a set, and a package, kilogram.
                </p>
            </td>
        </tr>
        <tr>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    5. Условия оплаты
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">5.1.</span>
                    Оплата поставки Товара производится в китайских юанях банковским переводом на счет Продавца. Оплата
                    осуществляется на условиях ПРЕДОПЛАТЫ за товар и оговаривается в проформах инвойс.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">5.2.</span>
                    Оплата поставки Товара производится прямым денежным переводом на счет Продавца, в соответствии с
                    банковскими реквизитами, обозначенными в пункте 14.1 настоящего Контракта.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">5.3.</span>
                    Датой платежа считается дата списания денежных средств со счета Покупателя.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">5.4.</span>
                    Все расходы, связанные с перечислением средств на территории Покупателя, оплачиваются Покупателем;
                    на территории <i>Продавца</i> – оплачиваются <i>Продавцом</i>.
                </p>
            </td>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    5. Terms of payment
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">5.1.</span>
                    Payment of delivery of the goods shall be made in CNY bank transfer. Payment is carried out on an
                    advance-payment basis for goods and the invoice makes a reservation in proforma invoice.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">5.2.</span>
                    Delivery of the Goods shall be paid for by direct money transfer to <i>the Seller</i> account in
                    accordance
                    with the bank details specified in paragraph 14.1 of this Contract.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">5.3.</span>
                    The date of payment shall be the date of debiting of cash from <i>the Buyer’s</i> account.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">5.4.</span>
                    All the expenses related to transfer of cash in the territory of <i>the Buyer</i> shall be paid by
                    the
                    Buyer; in the territory of <i>the Seller</i> – paid by <i>the Seller</i>.
                </p>
            </td>
        </tr>
        <tr>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    6. Обязанности сторон
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">6.1.</span>
                    <i>Продавец</i> обязан:
                </p>
                <p style="margin: 0;">
                    a) отгружать партии товаров точно в срок, согласованный сторонами, указанный в инвойсе. Уведомлять
                    <i>Покупателя</i> о возможной задержке отгрузки не позднее, чем за 15 дней до отгрузки.
                </p>
                <p style="margin: 0;">
                    b) по электронной почте извещать <i>Покупателя</i> о готовности товаров к отгрузке не позднее, чем
                    за 7 дней до отгрузки.
                </p>
                <p style="margin: 0;">
                    с) по факту отгрузки выслать <i>Покупателю</i> по электронной почте отгрузочные документы не позднее
                    чем через 3 дня: Инвойс – 1 копия, 1 файл – формат Excel; Упаковочный лист – 1 копия, 1 файл –
                    формат Excel
                    В целях оптимизации документооборота, копии отгрузочных документов включая инвойсы, упаковочные
                    листы, переписка Сторон, присланные по факсимильной связи или электронной почте имеют силу
                    оригиналов и принимаются Сторонами.
                    По письменному требованию Покупателя Продавец обязан в течении 30 дней направить Покупателю
                    Дополнительные соглашения и приложения к Контракту, а также любые документы по Контракту исходящие
                    от продавца (инвойсы, упаковочные листы и так далее) – в виде оригиналов. В случае не своевременного
                    предоставления оригинального комплекта документов Покупателю (или указанного им транспортного
                    агента) на Продавца налагается штраф в размере 0,5% от суммы стоимости товара в конкретном
                    контейнере за каждый день просрочки.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">6.2.</span>
                    <i>Покупатель</i> обязан:
                </p>
                <p style="margin: 0;">
                    a) принять поставку в соответствие с условиями данного Контракта;
                </p>
                <p style="margin: 0;">
                    b) полностью оплатить стоимость товаров на условиях данного контракта;
                </p>
                <p style="margin: 0;">
                    c) предоставить <i>Продавцу</i> инструкции по отгрузке и не менее чем за 10 дней до согласованной
                    сторонами даты отгрузки.
                </p>
            </td>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    6. Obligations of the Parties
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">6.1.</span>
                    <i>The Seller</i> shall be obliged:
                </p>
                <p style="margin: 0;">
                    a) to dispatch consignments of goods within the term agreed by the parties and specified in the in
                    invoice. To notify <i>the Buyer</i> of possible delay in shipment not later than 15 days prior to
                    the date of shipment.
                </p>
                <p style="margin: 0;">
                    b) to notify <i>the Buyer</i> by e-mail of readiness of the goods for shipment not later than 7 days
                    prior to the date of shipment.
                </p>
                <p style="margin: 0;">
                    c) after shipment, to send the shipping documents to <i>the Buyer</i> by e-mail not later than
                    within 3 days: Invoice - 1 copy, 1 file - Excel format; packing list - 1 copy, 1 file - Excel
                    format;
                </p>
                <p style="margin: 0;">
                    In order to streamline paperwork, copies of shipping documents including invoices, packing lists,
                    correspondence of the Parties, sent by facsimile or e-mail to have the force of the originals and
                    are accepted by the Parties.
                </p>
                <p style="margin: 0;">
                    The seller has to send additional agreement and addendum to the Contract and any documents emanating
                    from the Contract Vendor (invoices, packing slips, etc.) – in the form of the originals within 30
                    days after receiving written request of the Buyer. 0.5% penalties from the cost of the Goods of the
                    certain container per each working day delay of the sending the set of original documents to the
                    BUYER (or assigned shipping agent) is to be imposed on the SELLER.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">6.2.</span>
                    <i>The Buyer</i> shall be obliged:
                </p>
                <p style="margin: 0;">
                    a) to accept delivery in accordance with terms and conditions of this Contract;
                </p>
                <p style="margin: 0;">
                    b) to pay in full for the goods, subject to conditions of this contract;
                </p>
                <p style="margin: 0;">
                    c) to provide <i>the Seller</i> with shipping instructions at least 10 days prior to the date of
                    shipment agreed by the parties;
                </p>
            </td>
        </tr>
        <tr>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    7. Качество товара и гарантии
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">7.1.</span>
                    Качество поставляемых по настоящему Контракту товаров должно быть обычного экспортного качества
                    Продавца, соответствовать согласованным образцам и действующим требованиям технических регламентов
                    или иных стандартов в отношении данного товара.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">7.2.</span>
                    Поставка поврежденного товара приравнивается к поставке товара ненадлежащего качества, а именно
                    товаров с внутренними дефектами из-за некачественного изготовления и/или применения некачественных
                    материалов (такие дефекты незаметны при внешнем осмотре и проявляются в процессе пользования
                    изделием) и товаров с механическими, коррозионными и прочими внешними дефектами.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">7.3.</span>
                    Для Товара, качество которого требуют специальных гарантий, устанавливается гарантийный срок 12
                    месяцев со дня поставки.
                </p>
            </td>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    7. Quality of Goods and Guarantees
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">7.1.</span>
                    Quality of the goods delivered under this Contract shall be of ordinary export quality of the
                    seller, correspond to agreed samples and the applicable requirements of the technical regulations or
                    other standards for this goods.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">7.2.</span>
                    Delivery of damaged goods shall be treated as delivery of goods of inadequate quality, namely, the
                    goods with internal defects caused by substandard production and/or use of poor-quality materials
                    (such defects are invisible during external examination and become apparent in the process of using
                    a product) and goods with mechanical, corrosive and other external defects.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">7.3.</span>
                    A warranty period of 12 months from the date of shipment shall be set for the Goods, which qualities
                    require specific warranties.
                </p>
            </td>
        </tr>
        <tr>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    8. Упаковка и маркировка
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">8.1.</span>
                    Товар должен отгружаться в упаковке, соответствующей характеру данного товара. Упаковка должна
                    обеспечивать полную сохранность груза от всякого рода повреждений и коррозии при перевозке его всеми
                    видами транспорта с учетом перегрузок в пути, а также длительного хранения.
                </p>
            </td>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    8. Packaging and Marking
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">8.1.</span>
                    The Goods shall be shipped in the package corresponding to the nature of the goods. Package shall
                    ensure complete safety of goods from any kind of damage and corrosion during their transportation by
                    all modes of transport, taking into account congestion on the road, as well as long-term storage.
                </p>
            </td>
        </tr>
        <tr>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    9. Санкции и рекламации
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">9.1.</span>
                    В случае, если <i>Продавец</i> не отправил груз в срок, указанный в инвойсе, не согласовав задержку
                    с <i>Покупателем</i>, <i>Продавец</i> обязан выплатить штраф в размере 0,1 % от стоимости партии за
                    каждый день просрочки в первую неделю задержки и 1% стоимости партии за каждую последующую. Общая
                    сумма штрафа не может превышать 10% стоимости партии.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">9.2.</span>
                    В случае, если <i>Продавец</i> сдаёт оригиналы транспортных документов позже, чем в указанный срок
                    (6.1.d)
                    после получения платежного подтверждения, и груз уже находится в пути, <i>Продавец</i> обязуется
                    возместить
                    <i>Покупателю</i> все расходы, связанные с простоем контейнера.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">9.3.</span>
                    В случае фактических отклонений параметров товаров от тех, что указаны в Требованиях по Маркировке
                    или Требованиях по Упаковке, <i>Продавец</i> обязуется выплатить штраф в размере 10% от суммы партии
                    товара.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">9.4.</span>
                    Если задержка отгрузки превышает 30 дней, <i>Покупатель</i> вправе отказаться от принятия поставки.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">9.5.</span>
                    Приёмка товара по количеству и качеству производится получателем в течение одного месяца после
                    поступления товара на склад <i>Покупателя</i>. В случае расхождения товара по количеству, указанному
                    в инвойсе либо обнаружения некачественного (неукомплектованного) товара, <i>Покупатель</i>
                    составляет
                    односторонний акт и в течение одной недели отправляет его <i>Продавцу</i>. Претензии по качеству,
                    поступившие <i>Покупателю</i> от покупателей в России и признанные обоснованными, направляются
                    <i>Продавцу</i> в
                    течение гарантийного срока. Продавец в течение одного месяца направляет ответ на претензию
                    Покупателю. В случае принятия претензии обоснованной, <i>Продавец</i> обязан компенсировать сумму
                    рекламации (претензии) и перечислить всю сумму претензии на счет <i>Покупателя</i> в течение 14 дней
                    после
                    подписания рекламации обеими сторонами. До тех пор, пока обе стороны не придут к соглашению по
                    существу выставленной претензии, <i>Покупатель</i> имеет право задерживать следующий платеж.
                    В случае обнаружения некачественного или поврежденного товара перед отгрузкой, Поставщик за свой
                    счет устраняет брак или производит замену такого товара. При этом задержка отгрузки товара
                    компенсируется в порядке, указанном в пункте 9.1 настоящего Контракта.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">9.6.</span>
                    Представитель <i>Продавца</i> вправе за свой счет приехать на склад <i>Покупателя</i> и
                    удостовериться в основательности претензии в течение 15 дней с момента ее выставления.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">9.7.</span>
                    Обе стороны вправе привлекать независимые организации на территории России для проверки
                    поставляемого товара. Обе стороны принимают решение такой экспертной комиссии как окончательное.
                </p>
            </td>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    9. Sanctions and Reclamations
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">9.1.</span>
                    If <i>the Seller</i> does not forward cargo within the term specified in the invoice for the without
                    agreeing delay with <i>the Buyer</i>, <i>the Seller</i> shall pay a fine in the amount of 0.1% of
                    cost of the
                    goods delivery for each day of delay within the first week of delay and 1% of cost of the goods
                    delivery for each following week. Total amount of a fine cannot exceed 10% of goods delivery value.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">9.2.</span>
                    If <i>the Seller</i> hands over originals of shipping documents later than within the specified
                    period
                    (6.1.d) after receipt of payment confirmation and the cargo is already in the trans-shipment point,
                    <i>the Seller</i> shall be obliged to compensate to <i>the Buyer</i> for all expenses related to
                    downtime of the
                    container.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">9.3.</span>
                    In case of actual deviations of characteristic of goods from those specified in the Requirements for
                    Marking or the Requirements for Packaging, the Seller undertakes to pay a fine in the amount of 10%
                    of the sum of the goods delivery.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">9.4.</span>
                    If delay in shipment exceeds 30 days, <i>the Buyer</i> shall be entitled to refuse from accepting
                    delivery.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">9.5.</span>
                    The Goods shall be accepted by the consignee on the basis of their quantity and quality within one
                    month after delivery thereof to <i>the Buyer’s</i> warehouse. In case of differences of the goods in
                    the quantity specified in the invoice or detection of the goods of poor quality (incomplete), <i>the
                        Buyer</i> shall execute a unilateral act and send it to the Seller within one week. Claims for
                    quality laid to <i>the Buyer</i> from purchases in Russia and recognized as reasonable ones shall be
                    sent to <i>the Seller</i> within the warranty period. <i>The Seller</i> shall send a reply to <i>the
                        Buyer’s</i> claim within one month. In case of recognition of the claim as reasonable, <i>the
                        Seller</i> shall be obliged to compensate for the amount of reclamation (claim) and to transfer
                    all the amount of the claim to <i>the Buyer’s</i> account within 14 days after signing the
                    reclamation by both parties. Until both parties come to an agreement on essence of the laid claim,
                    <i>the Buyer</i> shall have the right to delay the following payment.
                    If non- conditioned or damaged goods found before the shipment, <i>the Seller</i> should fix up
                    non-condition or to change damaged goods on his own expense. Herewith the delay of shipment should
                    be compensated in terms, stipulated in paragraph 9.1 of present Contract.

                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">9.6.</span>
                    A representative of <i>the Seller</i> shall have the right to arrive at the Buyer’s warehouse at
                    Seller’s expense and to make sure of reasonableness of the claim within 15 days from the date of
                    such claim.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">9.7.</span>
                    Both parties shall have the right to attract independent organizations in Russia for inspection of
                    the delivered goods. Both parties shall consider the opinion of such expert commission as final and
                    binding.
                </p>
            </td>
        </tr>
        <tr>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    10. Страхование
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">10.1.</span>
                    <i>Покупатель</i> может осуществлять страхование каждой партии товаров, отправленных согласно
                    заказу, по своему усмотрению и за свой счет.
                </p>
            </td>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    10. Insurance
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">10.1.</span>
                    <i>The Buyer</i> can insure each consignment of goods forwarded according to the order at its own
                    discretion and expense.
                </p>
            </td>
        </tr>
        <tr>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    11. Форс-мажор
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">11.1.</span>
                    Стороны освобождаются от ответственности за частичное или полное невыполнение обязательств по
                    данному Контракту в случае форс-мажора.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">11.2.</span>
                    Следующие обстоятельства относятся к форс-мажору: землетрясения, наводнения, пожарища, эпидемии,
                    несовместимые с жизнедеятельностью случаи, официальные забастовки, общественные беспорядки, мятежи
                    или иные ситуации не подвластные сторонам и, повлекшие за собой невозможность выполнить
                    обязательства по данному Контракту.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">11.3.</span>
                    В случае, если одна из сторон не может выполнить свои обязательства по данному Контракту в связи с
                    форс-мажором, она обязана уведомить другую сторону о задержке или полном прекращении исполнения
                    своих обязательств в течение трех дней с момента возникновения форс-мажора. Подтверждением
                    форс-мажора является единственно Сертификат Промышленной палаты страны <i>Продавца</i> или
                    <i>Покупателя</i>, прямо указывающий на наличие форс-мажорных обстоятельств.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">11.4.</span>
                    В случае, если форс-мажор продолжается более 3 месяцев, каждая из сторон имеет право полностью
                    отказаться от исполнения своих обязательств по данному Контракту. Ни одна из сторон при этом не
                    имеет право требовать с другой стороны никаких компенсаций ущерба. <i>Продавец</i> в таком случае
                    обязан незамедлительно вернуть на счет <i>Покупателя</i> все суммы, полученные по невыполненным
                    обязательствам согласно данному Контракту.
                </p>
            </td>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    11. Force majeure
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">11.1.</span>
                    The parties shall be discharged from liability for partial or complete failure to perform
                    obligations under the Contract in case of force majeure.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">11.2.</span>
                    The following circumstances shall be referred to force majeure: earthquakes, floods, fires,
                    epidemics, cases incompatible with vital functions, official strikes, social unrest, riots or other
                    situations beyond control of the parties and resulting in an inability to perform obligations under
                    this Contract.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">11.3.</span>
                    If one of the parties is unable to perform its obligations under the Contract because of force
                    majeure, it shall notify the other party of delay or complete termination to perform its obligations
                    within three days from force majeure. Confirmation of force majeure shall only be a Certificate of
                    the Chamber of Commerce and Industry of <i>the Seller’s</i> or <i>the Buyer’s</i> country clearly
                    specifying force
                    majeure events.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">11.4.</span>
                    If force majeure continues for more than 3 months, each of the parties shall have the right to
                    completely refuse from its obligations under this Contract. In this case, neither of the parties
                    shall have the right to require any indemnification of damage from the other party. <i>The
                        Seller</i> shall
                    be obliged to return to <i>the Buyer’s</i> account all the sums received for outstanding obligations
                    under this Contract.
                </p>
            </td>
        </tr>
        <tr>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    12. Прочие условия
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">12.1.</span>
                    Все Дополнительные соглашения и Приложения к настоящему Контракту действительны лишь в том случае,
                    если они совершены в письменной форме и подписаны обеими Сторонами. По просьбе Сторон,
                    Дополнительные соглашения могут делаться только на русском или английском языках.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">12.2.</span>
                    Срок действия настоящего Контракта истекает {{ $contractEndDate ? $contractEndDate :'«31» декабря 2020г'}}. Срок действия Контракта может быть
                    изменен по взаимному соглашению сторон, что оформляется документально.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">12.3.</span>
                    Дополнительные соглашения и Приложения к настоящему Контракту подписанные сторонами, могут быть
                    заключены посредством факсимильной связи или электронной почты, при этом подписанные и переданные по
                    факсимильной связи или электронной почте документы имеют силу оригиналов и принимаются Сторонами.
                    При оформлении Дополнительных соглашений и Приложений к настоящему Контракту, инвойсов, упаковочных
                    листов, переписки между Сторонами, Стороны допускают факсимильное воспроизведение подписей
                    («факсимиле») с помощью средств механического или иного копирования либо аналога собственноручной
                    подписи.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">12.4.</span>
                    Настоящий Контракт составлен в двух экземплярах на русском и английском языках, причем оба текста
                    имеют одинаковую юридическую силу.
                </p>
            </td>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    12. Miscellaneous
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">12.1.</span>
                    All Additional Agreements and Appendices to this Contract shall be effective, only if they are
                    executed in writing and signed by both Parties. At the request of the Parties, Additional Agreements
                    may be executed either in the Russian language or in the English language.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">12.2.</span>
                    The Contract expires on {{ $contractEndDate ? $contractEndDate :'December 31, 2020'}}. The term of the Contract may be changed as mutually
                    agreed by the parties, which shall be executed in writing.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">12.3.</span>
                    Additional Agreements and Annexes to this Contract signed by the parties, may be made by fax or
                    e-mail, with signed and sent by fax or e-mail documents are originals and are accepted by the
                    Parties. When placing an additional agreement and Annexes to this Contract, invoices, packing lists,
                    correspondence between the Parties, the Parties accept facsimile signatures (facsimile) with the
                    help of the mechanical or other copying or analog of a handwritten signature.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">12.4.</span>
                    This Contract is executed in two equally authentic copies in the Russian and English languages.
                </p>
            </td>
        </tr>
        <tr>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    13. Арбитраж
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">13.1.</span>
                    Все споры, которые могли бы возникнуть из настоящего Контракта или по поводу Контракта, стороны
                    пытаются решить по взаимному согласию путем переговоров.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">13.2.</span>
                    Если стороны не достигнут компромисса, то все споры и разногласия подлежат рассмотрению в
                    Арбитражном суде Москвы, при этом применяется российское процессуальное законодательство.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">13.3.</span>
                    По вопросам, не регулируемым условиями настоящего контракта, стороны руководствуются российским
                    правом.
                </p>
            </td>
            <td style="width: 340px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: center; margin: 0;">
                    13. Arbitration
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">13.1.</span>
                    All disputes arising out of or in relation to this Contract shall be resolved through negotiations.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">13.2.</span>
                    If the Parties fail to reach a compromise, all disputes and controversies shall be referred to the
                    Arbitration Court of Moscow and Russian Federation rules are being used.
                </p>
                <p style="margin: 0;">
                    <span style="font-weight: bold;">13.3.</span>
                    With respect to issues not regulated by this Contract, the parties shall be governed by the Russian
                    law.
                </p>
            </td>
        </tr>
        <tr style="">
            <td style="width: 340px; height: 800px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: left; margin: 0; ">
                    14. Юридические адреса и банковские реквизиты сторон:
                </h4>
                <p style="margin: 0; ">
                    <span style="font-weight: bold; border-bottom: 2px solid #000;">14.1.
                        ПОКУПАТЕЛЬ:</span>
                </p>
                <p style="margin: 0;">
                    ПОКУПАТЕЛЬ: {{ $importer->name_ru }}
                </p>
                <p style="margin: 0;">
                    ОГРН 1157746416960
                </p>
                <p style="margin: 0;">
                    ИНН/КПП 7721305869/ 772101001
                </p>
                <p style="margin: 0;">
                    ОКПО 45086890
                </p>
                <p style="margin: 0;">
                    {{ $importer->address }}
                </p>
                <p style="margin: 0;">
                    Обособленное подразделение: 142715, Московская область, Ленинский район, Городское поселение Видное
                    (пгт), д. Апаринки, вл. 11
                </p>
                <p style="margin: 0;">
                    Р/сч в Юанях: 40702156438000000728
                </p>
                <p style="margin: 0;">
                    В <b>ПАО Сбербанк</b>
                </p>
                <p style="margin: 0;">
                    К/с 30101810400000000225
                </p>
                <p style="margin: 0;">
                    SWIFT: SABRRUMM
                </p>
                <p style="margin: 0;">
                    АДРЕС БАНКА:
                </p>
                <p style="margin: 0;">
                    Российская Федерация г.Москва, ул. Вавилова, д.19
                </p>
                <p style="margin: 0;">
                    БИК 044525225
                </p>
                <p style="margin: 0; ">
                    ПОКУПАТЕЛЬ/THE BUYER
                </p>
                <p style="margin: 0; ">
                    Директор/Director
                </p>
                <p style="margin: 0; ">
                    _Kholodenko A.G.___
                </p>
                <img style="max-width: 300px; max-height: 300px;" src="{{ asset('imgs/seal.png') }}" alt="">
            </td>
            <td style="width: 340px; height: 800px; padding: 5px; border: 1px solid #000000; vertical-align: baseline;">
                <h4 style="text-align: left; margin: 0; ">
                    14. Legal addresses and bank details of the parties:
                </h4>
                <p style="margin: 0;">
                    <span style="font-weight: bold; border-bottom: 2px solid #000; ">14.1. THE
                        BUYER:</span>
                </p>
                <p style="margin: 0;">
                    Name: «{{ $provider->name_company ? $provider->name_company : '-'}}»
                </p>
                <p style="margin: 0;">
                    Address: TONG YANG VILLAGE BAI ZHANG JI TOWN, WENZHOU,CN
                </p>
                <p style="margin: 0;">
                    Beneficiary:
                </p>
                <p style="margin: 0;">
                    Bank: {{ $provider->beneficiary_bank_name ? $provider->beneficiary_bank_name : '-' }}
                </p>
                <p style="margin: 0;">
                    Number account  {{ $provider->beneficiary_account_name ? $provider->beneficiary_account_name : '-' }}
                </p>
                <p style="margin: 0;">
                    SWIFT: {{ $provider->beneficiary_swift_address ? $provider->beneficiary_swift_address : '-' }}
                </p>
                <p style="margin: 0;">
                    Address of bank {{ $provider->beneficiary_bank_address ? $provider->beneficiary_bank_address : '-' }}
                </p>
                <p style="margin: 0;">
                    Директор/Director
                </p>
                <p style="margin: 0;">
                    Chi Ning !{ИМЯ ДИРЕКТОРА}!
                </p>
                <img style="max-width: 300px; max-height: 300px;" src="{{ asset('imgs/seal.jpg') }}" alt="">
            </td>
        </tr>
    </table>
</body>

</html>
