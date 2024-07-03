<!doctype html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Activities</title>
</head>
<body>
<style>
    .img-logo {
        width: 200px;
        left: 0;
    }
</style>

<img class="img-logo" src="{{ public_path('./storage/logos/logo-teamster.svg') }}" alt="image}">
<h1>Activities</h1>

@foreach ($activities as $activity)
    <h2>{{ $activity->name }}</h2>
    <p>{{ $activity->description }}</p>
    <p>{{ $activity->activities }}</p>
    <p>{{ $activity->schedule }}</p>
    <p>{{ $activity->planner_tasks }}</p>
    <p>{{ $activity->participant_tasks }}</p>
@endforeach
</body>
</html>
