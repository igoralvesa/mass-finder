<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmailVerificationController extends Controller
{
    /**
     * Handle email verification. The signed URL from the verification email
     * redirects here. Validates the signature and marks the email as verified.
     */
    public function __invoke(Request $request): JsonResponse
    {
        $user = User::find($request->route('id'));

        if (! $user) {
            return response()->json(['message' => 'Link de verificação inválido.'], 400);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email já verificado.',
                'verified' => true,
            ]);
        }

        if (! hash_equals(
            (string) $request->route('hash'),
            sha1($user->getEmailForVerification())
        )) {
            return response()->json(['message' => 'Link de verificação inválido.'], 400);
        }

        if (! $request->hasValidSignature()) {
            return response()->json(['message' => 'Link expirado. Solicite um novo.'], 400);
        }

        $user->markEmailAsVerified();

        event(new Verified($user));

        return response()->json([
            'message' => 'Email verificado com sucesso.',
            'verified' => true,
        ]);
    }
}
