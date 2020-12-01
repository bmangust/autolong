<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width" />
</head>

<style>
    @media screen and (max-width:480px) {

        body {
            font-size: 12px !important;
        }

        table {
            width: 100% !important;
        }

        td, th {
            padding-left: 24px !important;
            padding-right: 24px !important;
        }

        h1 {
            text-align: left !important;
            font-size: 14px;
        }

        span {
            margin: 0 !important;
        }
    }
</style>

<body
    style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.2; background-color: #f7f8fa; padding-top: 60px;">

<table cellpadding='0' cellspacing='0' border="0" width="600"
       style="border-collapse: collapse; margin: 0 auto; background-color: #ffffff; border-radius: 10px;">
    <tr>
        <th style="padding: 24px 15px 8px 15px;">
            <h1 style="margin: 0; font-size: 18px; font-weight: 600; text-align: center; color: #3a405f;">Восстановления пароля</h1>
        </th>
    </tr>
    <tr>
        <td style="padding-bottom: 26px;">
                <span
                    style="display: block; width: 50px; height: 50px; margin: 0 auto; background-color: #f7f8fa; border-radius: 50%;">
                    <img width="24" height="24" style="display: block; margin: 0 auto; padding-top: 13px;" src={{ asset('/imgs/key.png') }}
                         alt="key">
                </span>
        </td>
    </tr>
    <tr>
        <td style="padding: 0 30px 15px; color: #949599;">
            Уважаемый пользователь,
        </td>
    </tr>
    <tr>
        <td style="padding: 0 30px 15px; color: #949599;">
            Вы запросили восстановление Вашего пароля в системе Autolong,
            если вы этого не делали, проигнорируйте это письмо.
        </td>
    </tr>
    <tr>
        <td style="padding: 0 30px 10px; color: #949599;">
            Чтобы поменять пароль на другой, пройдите по ссылке:
        </td>
    </tr>
    <tr>
        <td style="padding: 0 30px 32px;">
            <a href="{{ $url }}" style="color: #3a405f; text-decoration: none;">{{ $url }}</a>
        </td>
    </tr>
</table>

</body>

</html>
