<?php
/**
 * @copyright Copyright (C) 2016 AIZAWA Hina
 * @license https://github.com/fetus-hina/stat.ink/blob/master/LICENSE MIT
 * @author AIZAWA Hina <hina@bouhime.com>
 */

namespace app\assets;

use Yii;
use app\models\Map;
use yii\helpers\Html;
use yii\helpers\Json;
use yii\web\AssetBundle;
use yii\web\View;

class MapDataJsonAsset extends AssetBundle
{
    public $depends = [
        MapImageAsset::class,
    ];

    public function init()
    {
        parent::init();
        Yii::$app->view->on(View::EVENT_BEGIN_BODY, function () {
            echo Html::tag('script', $this->json, ['type' => 'application/json', 'id' => 'map-data-json']) . "\n";
        });
    }

    public function getJson() : string
    {
        $am = Yii::$app->assetManager;
        $images = $am->getBundle(MapImageAsset::class);

        $ret = [];
        $maps = Map::find()->asArray()->all();
        foreach ($maps as $map) {
            $ret[$map['key']] = [
                'key'   => $map['key'],
                'name'  => Yii::t('app-map', $map['name']),
                'short' => Yii::t('app-map', $map['short_name']),
                'images' => [
                    'daytime'       => $am->getAssetUrl($images, 'daytime/' . $map['key'] . '.jpg'),
                    'daytime-blur'  => $am->getAssetUrl($images, 'daytime-blur/' . $map['key'] . '.jpg'),
                    'gray-blur'     => $am->getAssetUrl($images, 'gray-blur/' . $map['key'] . '.jpg'),
                ],
            ];
        }
        return Json::htmlEncode($ret);
    }
}
