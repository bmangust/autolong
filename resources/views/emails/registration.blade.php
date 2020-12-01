<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width"/>
</head>

<style>
    @media screen and (max-width: 480px) {

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
    @if($updateUser)
        <tr>

            <th style="padding: 24px 30px 20px 30px;">
                <h1 style="margin: 0; font-size: 18px; font-weight: 600; text-align: left; color: #3a405f;">Обновление регистрационных данных.</h1>
            </th>
        </tr>
        <tr>
            <td style="padding: 0 30px 15px; color: #949599;">
                Уважаемый пользователь, Ваши данные успешно обновлены в системе Autolong.
            </td>
        </tr>
    @else
        <tr>
            <th style="padding: 24px 30px 20px 30px;">
                <h1 style="margin: 0; font-size: 18px; font-weight: 600; text-align: left; color: #3a405f;">Создание
                    нового
                    пользователя</h1>
            </th>
        </tr>
        <tr>
            <td style="padding: 0 30px 15px; color: #949599;">
                Уважаемый пользователь, Вы успешно зарегистрированы в системе Autolong.
            </td>
        </tr>
    @endif
    <tr>
        <td style="padding: 0 30px 15px; color: #949599;">
            Ваш E-mail: <span style="color: #f44a0e;">{{ $email }}</span>
        </td>
    </tr>
    <tr>
        <td style="padding: 0 30px 15px; color: #949599;">
            Ваш пароль: <span style="color: #f44a0e;">{{ $password }}</span>
        </td>
    </tr>
    <tr>
        <td style="padding: 0 30px 10px; color: #949599;">
            Чтобы войти в систему, пройдите по ссылке:
        </td>
    </tr>
    <tr>
        <td style="padding: 0 30px 32px;">
            <a href="{{ asset('') }}" style="color: #3a405f; text-decoration: none;">{{ asset('') }}</a>
        </td>
    </tr>
</table>

</body>

</html>
