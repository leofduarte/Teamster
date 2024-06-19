<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Convite para Atividades de Teambuilding</title>
    <style>
        .button:hover {
            background-color: #2b2b2b !important;
        }
    </style>
</head>
<body>
<table class="email-container" style="width: 100%; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; text-align: center; font-family: Arial, sans-serif; color: #333;">
    <tr>
        <td style="background-image: linear-gradient(to right, #7565e4, #56c496); color: white; padding: 10px;">
            <h1>Junta-te à equipa {{ $teamName }}!</h1>
        </td>
    </tr>
    <tr>
        <td style="padding: 20px;">
            <p style="line-height: 1.6;">Olá!</p>
            <p>Estamos muito entusiasmados em convidar-te para te juntares à nossa equipa! Vêm aí novidades que não vais querer perder!</p>
            <p>Clica no botão abaixo para estares a par das novidades:</p>
            <a href="{{ $invitationLink }}" style="display: inline-block; text-decoration: none;">
                <button class="button" style="display: inline-block; width: auto; padding: 10px 20px; margin: 20px auto; background-color: #050505; color: white; text-decoration: none; border-radius: 5px; text-align: center; border: none; cursor: pointer;">Juntar-se à Equipa</button>
            </a>
            <p>Ps. Não respondas a este e-mail, é automático</p>
        </td>
    </tr>
    <tr>
        <td style="background-color: #f3f3f3; padding: 5px; text-align: center;">
            <img src="../../../public/build/assets/logo_horizontal.svg" alt="Logo"/>
            <img src="https://example.com/images/logo_horizontal.svg" alt="Logo da Teamster" style="width: 100px;"/>
            <p style="font-weight: bold;">LOGO</p>
            <p>Boost Your Team With Teamster</p>
        </td>
    </tr>
</table>
</body>
</html>

