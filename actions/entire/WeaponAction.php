<?php
/**
 * @copyright Copyright (C) 2016 AIZAWA Hina
 * @license https://github.com/fetus-hina/stat.ink/blob/master/LICENSE MIT
 * @author AIZAWA Hina <hina@bouhime.com>
 */

namespace app\actions\entire;

use Yii;
use yii\web\ViewAction as BaseAction;
use yii\web\NotFoundHttpException;
use app\models\Rule;
use app\models\Weapon;
use app\models\StatWeaponKillDeath;

class WeaponAction extends BaseAction
{
    public $weapon;

    public function init()
    {
        parent::init();
        $key = Yii::$app->request->get('weapon');
        if (is_scalar($key)) {
            $this->weapon = Weapon::findOne(['key' => $key]);
        }
        if (!$this->weapon) {
            throw new NotFoundHttpException(
                Yii::t('yii', 'Page not found.')
            );
        }
    }

    public function run()
    {
        return $this->controller->render('weapon.tpl', [
            'weapon' => $this->weapon,
            'rules' => $this->rules,
            'killDeath' => $this->killDeath,
        ]);
    }

    public function getRules()
    {
        $list = Rule::find()->with('mode')->all();
        array_walk($list, function ($a) {
            $a->name = Yii::t('app-rule', $a->name);
        });
        usort($list, function ($a, $b) {
            if ($a->mode_id !== $b->mode_id) {
                return $a->mode->key === 'regular' ? -1 : 1;
            }
            return strnatcasecmp($a->name, $b->name);
        });
        return $list;
    }

    public function getKillDeath()
    {
        $ret = [];
        foreach (Rule::find()->asArray()->all() as $rule) {
            $tmp = StatWeaponKillDeath::find()
                ->andWhere([
                    'weapon_id' => $this->weapon->id,
                    'rule_id' => $rule['id'],
                ])
                ->orderBy('kill, death')
                ->asArray()
                ->all();
            $ret[$rule['key']] = array_map(function ($a) {
                return [
                    'kill'   => (int)$a['kill'],
                    'death'  => (int)$a['death'],
                    'battle' => (int)$a['battle'],
                    'win'    => (int)$a['win'],
                ];
            }, $tmp);
        }
        return $ret;
    }
}