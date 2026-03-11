<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MassSchedule extends Model
{
    use HasFactory;

    public const SUNDAY = 0;
    public const MONDAY = 1;
    public const TUESDAY = 2;
    public const WEDNESDAY = 3;
    public const THURSDAY = 4;
    public const FRIDAY = 5;
    public const SATURDAY = 6;

    protected $fillable = [
        'parish_id',
        'day_of_week',
        'time',
        'notes',
    ];

    public function parish(): BelongsTo
    {
        return $this->belongsTo(Parish::class);
    }
}
