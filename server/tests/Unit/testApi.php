<?php

namespace Tests\Unit;

// use PHPUnit\Framework\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use function PHPUnit\Framework\assertJson;

class testApi extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/api/register');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data'=>[
                '*'=>[
                    'id',
                    'email',
                    'name',
                    'password',
                    'gender',
                    'created_at',
                    'updated_at',
                ]
            ]
        ]);
        $this->assertTrue(true);
    }
    public function test_login_api(): void
    {
        $response = $this->get('/api/login');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data'=>[
                '*'=>[
                    'id',
                    'phone_number',
                    'password',
                    'created_at',
                    'updated_at',
                ]
            ]
        ]);
        $this->assertTrue(true);
    }
}