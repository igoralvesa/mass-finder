<?php

namespace App\Http\Middleware;

use App\Models\Parish;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureParishIsApproved
{
    public function handle(Request $request, Closure $next): Response
    {
        $parish = $request->user()?->parish;

        if (! $parish || $parish->status !== Parish::STATUS_APPROVED) {
            $message = match ($parish?->status) {
                Parish::STATUS_PENDING => 'Sua paróquia está aguardando aprovação.',
                Parish::STATUS_REJECTED => 'Sua paróquia foi rejeitada.',
                default => 'Paróquia não encontrada.',
            };

            return response()->json(['message' => $message], 403);
        }

        return $next($request);
    }
}
