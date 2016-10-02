<?php
/**
 * @copyright Copyright (C) 2016 AIZAWA Hina
 * @license https://github.com/fetus-hina/stat.ink/blob/master/LICENSE MIT
 * @author AIZAWA Hina <hina@bouhime.com>
 */

namespace app\commands;

use Yii;
use yii\console\Controller;
use yii\helpers\Json;

class StreamerController extends Controller
{
    public function actionConfig()
    {
        $rawConfig = require(__DIR__ . '/../config/db.php');
        $dsn = $this->parseDsn($rawConfig['dsn']);
        $ret = [
            'host' => $dsn['host'],
            'port' => $dsn['port'] ?? 5432,
            'user' => $rawConfig['username'],
            'password' => $rawConfig['password'],
            'database' => $dsn['dbname'],
        ];
        echo Json::encode($ret) . "\n";
        return 0;
    }

    private function parseDsn(string $dsn) : array
    {
        if (!preg_match('/^pgsql:(.+)/', $dsn, $match)) {
            fwrite(STDERR, "DSN string is not a postgres\'s\n");
            exit(1);
        }
        $ret = [];
        foreach(explode(';', $match[1]) as $pair) {
            list($key, $value) = explode('=', $pair, 2);
            $ret[$key] = urldecode($value);
        };
        return $ret;
    }
}
