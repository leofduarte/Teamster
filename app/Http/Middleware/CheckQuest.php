<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckQuest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
   public function handle(Request $request, Closure $next): Response
{
    $participant = Auth::guard('participants')->user();

    if ($participant) {
        if ($participant->quest && $request->path() == 'participantquest') {
            return redirect()->route('participant');
        } elseif (!$participant->quest && $request->path() == 'participant') {
            return redirect()->route('participantquest');
        }
    }

    return $next($request);
}
}
