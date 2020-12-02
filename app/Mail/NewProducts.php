<?php

namespace App\Mail;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewProducts extends Mailable implements ShouldQueue
{
    use Queueable;
    use SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    protected $newProducts;

    public function __construct($newProducts)
    {
        $this->newProducts = $newProducts;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(env('MAIL_FROM_ADDRESS'))
                    ->subject('Новинки в системе Autolong от ' . Carbon::now()->format('d.m'))
                    ->view('emails.newproducts')
                    ->with([
                        'newProducts' => $this->newProducts,
                    ]);
    }
}
