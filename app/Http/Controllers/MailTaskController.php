<?php

namespace App\Http\Controllers;

use App\MailTask;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class MailTaskController extends Controller
{
    public function index()
    {
        $mailTask = MailTask::first();

        if (is_null($mailTask)) {
            return response()->json([], 200);
        }

        return response()->json([
            'dispatchTime' => $mailTask->dispatch_time,
            'email' => $mailTask->email
        ], 200);
    }

    public function changeTime(Request $request)
    {
        $mailTask = MailTask::first();
        $dispatchTime = $request->input('dispatchTime');
        $email = $request->input('email');
        if (is_null($mailTask)) {
            $mailTask->create(['email' => $email, 'dispatch_time' => $dispatchTime]);
        } else {
            $mailTask->update(['email' => $email, 'dispatch_time' => $dispatchTime]);
        }
        return response()->json([
            'dispatchTime' => $mailTask->dispatch_time,
            'email' => $mailTask->email
        ], 200);
    }

    public function destroy()
    {
        $mailTask = MailTask::first();
        if (is_null($mailTask)) {
            throw new HttpException(404, 'Данной задачи не существует');
        }
        $mailTask->delete();
        return response()->json([], 204);
    }
}
