<!DOCTYPE html>
<html>
<head>
    <title>Join Our Team</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        }
        .email-header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #ddd;
        }
        .email-header h1 {
            margin: 0;
            color: #333;
        }
        .email-body {
            padding: 20px;
        }
        .email-body p {
            line-height: 1.6;
        }
        .email-footer {
            text-align: center;
            padding: 20px;
            border-top: 1px solid #ddd;
        }
        .button {
            display: inline-block;
            background-color: #3490dc;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Join the {{ $teamName }} team!</h1>
        </div>
        <div class="email-body">
            <p>Click the button below to join our team:</p>
            <a href="{{ $invitationLink }}" class="button">Join Team</a>
        </div>
        <div class="email-footer">
            <p>If you have any questions, please reply to this email.</p>
        </div>
    </div>
</body>
</html>
