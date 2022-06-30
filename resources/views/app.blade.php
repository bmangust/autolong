<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="referrer" content="no-referrer"/>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Autolong</title>
    <link rel="shortcut icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml"/>
    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml"/>
    <link href="{{ asset('css/app.css?v=0.1.5') }}" rel="stylesheet" type="text/css">
</head>
<body>
<div id="root"></div>
<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
