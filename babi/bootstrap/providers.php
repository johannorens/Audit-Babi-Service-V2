<?php

return [
    App\Providers\AppServiceProvider::class,
    App\Providers\PrometheusServiceProvider::class,
    ...(class_exists(\Laravel\Telescope\TelescopeServiceProvider::class) ? [
        App\Providers\TelescopeServiceProvider::class,
    ] : []),
];
