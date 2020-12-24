<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RegistrationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    protected $email;
    protected $password;
    protected $updateUser;

    public function __construct(string $email, string $password, bool $updateUser = false)
    {
        $this->updateUser = $updateUser;
        $this->email = $email;
        $this->password = $password;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $subject = !$this->updateUser ? 'Регистрация в системе ' . env('APP_NAME') : 'Обновление регистрационных данных в системе ' . env('APP_NAME');
        return (new MailMessage)
            ->subject($subject)
            ->view('emails.registration', [
                'email' => $this->email,
                'password' => $this->password,
                'updateUser' => $this->updateUser
            ]);
    }
}
