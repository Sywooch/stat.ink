<?php
/**
 * @copyright Copyright (C) 2016 AIZAWA Hina
 * @license https://github.com/fetus-hina/stat.ink/blob/master/LICENSE MIT
 * @author AIZAWA Hina <hina@bouhime.com>
 */

namespace app\assets;

use yii\web\AssetBundle;

class BattleShowPrivateAsset extends AssetBundle
{
    public $sourcePath = '@app/resources/.compiled/stat.ink';
    public $js = [
        'battle-show--private.js',
    ];
    public $css = [
        'battle-show--private.css',
    ];
    public $depends = [
        'yii\web\JqueryAsset',
        AppAsset::class,
    ];
}
