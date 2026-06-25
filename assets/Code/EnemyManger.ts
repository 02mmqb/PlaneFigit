import { _decorator, Component, instantiate, math, Node, Prefab, view, UITransform, Input, input, EventTouch } from 'cc';
import { GameManger } from './Manger/gameManger';
import { Enemy } from './Enemy';
import { AudioMgr } from './Manger/AudioMgr';
const { ccclass, property } = _decorator;



@ccclass('EnnmyManger')
export class EnnmyManger extends Component {


    @property({ type: Number, displayName: "敌人0生成间隔" })
    enemy0SpawnRate: number = 1;
    @property({ type: Prefab, displayName: "敌人0预制体" })
    enemy0Prefab: Prefab = null;
    @property({ type: Number, displayName: "敌人1生成间隔" })
    enemy1SpawnRate: number = 4;
    @property({ type: Prefab, displayName: "敌人1预制体" })
    enemy1Prefab: Prefab = null;
    @property({ type: Number, displayName: "敌人2生成间隔" })
    enemy2SpawnRate: number = 10;
    @property({ type: Prefab, displayName: "敌人2预制体" })
    enemy2Prefab: Prefab = null;





    @property({ type: Number, displayName: "子弹加速生成间隔" })
    bulletSpeedSpawnRate: number = 1;
    @property({ type: Prefab, displayName: "子弹加速预制体" })
    bulletSpeedPrefab: Prefab = null;
    @property({ type: Number, displayName: "炸弹生成间隔" })
    bombSpawnRate: number = 4;
    @property({ type: Prefab, displayName: "炸弹预制体" })
    bombPrefab: Prefab = null;

    // 预制体配置
    proFabs: { prefab: Prefab, spawnRate: number }[] = []
    // 保存回调引用，用于取消定时任务
    callbacks: Function[] = []

    // 双击检测相关
    private lastClickTime: number = 0;
    private doubleClickInterval: number = 300;

    protected onLoad(): void {
        this.proFabs = [
            { prefab: this.enemy0Prefab, spawnRate: this.enemy0SpawnRate },
            { prefab: this.enemy1Prefab, spawnRate: this.enemy1SpawnRate },
            { prefab: this.enemy2Prefab, spawnRate: this.enemy2SpawnRate },
            { prefab: this.bulletSpeedPrefab, spawnRate: this.bulletSpeedSpawnRate },
            { prefab: this.bombPrefab, spawnRate: this.bombSpawnRate }
        ]
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    start() {
        this.proFabs.forEach((item) => {
            const callback = () => this.enemyCreate(item.prefab)
            this.callbacks.push(callback)
            this.schedule(callback, item.spawnRate)
        })
    }
    protected onDestroy(): void {
        this.callbacks.forEach((callback) => {
            this.unschedule(callback)
        })
        this.callbacks = []
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    update(deltaTime: number) {

    }

    enemyCreate(prefab: Prefab) {
        // console.log("生成");

        const enemy0 = instantiate(prefab)
        enemy0.parent = this.node
        const pos = this.getSpawnPos(enemy0)
        enemy0.setPosition(pos.x, pos.y, 0)
    }



    getSpawnPos(enemyNode: Node) {
        const { width, height } = view.getVisibleSize()
        const halfW = width / 2
        const halfH = height / 2

        // 动态获取敌人实际宽度，计算边距
        const uiTransform = enemyNode.getComponent(UITransform)
        const enemyWidth = uiTransform ? uiTransform.width : 50
        const padding = enemyWidth / 2

        return {
            x: math.randomRangeInt(-halfW + padding, halfW - padding),
            y: halfH + 150 + (uiTransform ? uiTransform.height / 2 : 25)
        }
    }

    onTouchEnd(event: EventTouch) {
        const now = Date.now();
        if (now - this.lastClickTime < this.doubleClickInterval) {
            console.log("双击");

            this.triggerBomb();
        }
        this.lastClickTime = now;
    }

    triggerBomb() {
        const gameMgr = GameManger.getInstance();
        if (!gameMgr.useBomb()) return;
         AudioMgr.inst.playOneShot("Audio/use_bomb", 1)
        this.node.children.forEach(child => {
            const enemy = child.getComponent(Enemy);
            if (enemy && enemy.hp > 0) {
                enemy.destroyWithAnimation();
            }
        });
    }
}


