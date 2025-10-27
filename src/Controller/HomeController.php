<?php
namespace App\Controller;

class HomeController {
    public function getData () {
        return [
            "author" => [
                'fullName' => 'Дмитрий Андреев',
                'profession' => 'Инженер-программист (6 лет).',
                'langugeKnowledge' => 'Английский B1'
            ]
        ];
    }
}