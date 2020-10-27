<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="referrer" content="no-referrer"/>
    <title>Autolong</title>
    <link rel="shortcut icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml"/>
    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml"/>
    <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
</head>
<body>
<div id="root"></div>
<script src="{{asset('js/app.js')}}"></script>
</body>
</html>
