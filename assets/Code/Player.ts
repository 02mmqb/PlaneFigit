import { _decorator, Component, EventTouch, Input, input, Node, view, UITransform, instantiate, Prefab, Contact2DType, Collider2D, Animation, director, ProgressBar } from 'cc';
import { bullet } from './bullet';
import { Rewrad, RewradType } from './Rewrad';
import { GameManger } from './Manger/gameManger';
import { AudioMgr } from './Manger/AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property({ type: Node, displayName: "子弹父节点" })
    bulletParent: Node = null;
    @property({ type: Number, displayName: '子弹发射间隔' })
    bulletInterval = 0.5;
    @property({ type: Prefab, displayName: '子弹预制体1' })
    bulletPrefab1: Prefab = null;
    @property({ type: Prefab, displayName: '子弹预制体1' })
    bulletPrefab2: Prefab = null;
    lastBulletTime = 0;

    @property({ type: ProgressBar, displayName: "生命值进度条" })
    hpBar: ProgressBar = null;
    @property({ type: String, displayName: "击中动画" })
    hitAnimation: string = '';
    @property({ type: String, displayName: "击毁动画" })
    downAnimation: string = '';
    @property({ type: Animation, displayName: "动画节点" })
    playerAnimation: Animation = null;
    @property({ type: Number, displayName: "无敌时间" })
    invincibleTime = 10;
    // 计时器
    invincibleTimer = 0;
    @property({ type: Boolean, displayName: "无敌" })
    isincible = false;
    // 游戏控制器
    gameController = true;
    gameManger: GameManger = null



    collider: Collider2D = null;

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        const bullets = otherCollider.getComponent(bullet)
        const reward = otherCollider.getComponent(Rewrad)
        // console.log('子弹组件:', bullets, '奖励组件:', reward)
        if (reward) {
            const type = reward.type
            switch (type) {
                case RewradType.子弹加速:
                    const oldBulletInterval = this.bulletInterval
                    AudioMgr.inst.playOneShot("Audio/get_double_laser")
                    this.bulletInterval *= 0.2
                    this.scheduleOnce(() => {
                        this.bulletInterval = oldBulletInterval
                    }, 2)
                    break
                case RewradType.炸弹:
                    AudioMgr.inst.playOneShot("Audio/get_bomb")
                    GameManger.getInstance().addBombNode()
                    break
            }
            otherCollider.node.destroy()
            return
        }


        if (this.isincible) {
            return
        }

        if (bullets) {
            otherCollider.node.destroy()
        }
        const hp = this.gameManger.getHp() - 1
        AudioMgr.inst.playOneShot("Audio/achievement")

        this.gameManger.setHp(hp)

    }
    /**
     * 血量判断
     */
    checkHp() {
        const hp = this.gameManger.getHp()

        this.hpBar.progress = hp / 3
        if (hp <= 0) {
            this.playerAnimation.play(this.downAnimation)
            // 击毁动画播放完成后销毁节点
            this.playerAnimation.once(Animation.EventType.FINISHED, () => {
                GameManger.getInstance().setGameEnd()

                this.node.destroy()

            })
        } else {
            this.isincible = true
            this.invincibleTimer = 0
            this.scheduleOnce(() => {
                this.isincible = false
            }, this.invincibleTime)
            this.playerAnimation.play(this.hitAnimation)
        }
    }
    protected onLoad(): void {
        this.gameManger = GameManger.getInstance()
        this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.collider = this.getComponent(Collider2D);
        // 注册单个碰撞体的回调函数
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.gameManger.getNode().on('onHpChange', this.checkHp, this)
    }

    protected onDestroy(): void {
        this.node.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.gameManger.getNode().off('onHpChange', this.checkHp, this)

    }
    onTouchMove(event: EventTouch) {
        const flag = this.gameManger.getGameController()
        if (this.gameManger.getHp() <= 0 || !flag) {
            return
        }
        const { width, height } = view.getVisibleSize()
        const halfW = width / 2 - 40
        const halfH = height / 2 - 80

        const uiPos = event.getUILocation()
        const newX = Math.max(-halfW, Math.min(uiPos.x - width / 2, halfW))
        const newY = Math.max(-halfH, Math.min(uiPos.y - height / 2, halfH))
        this.node.setPosition(newX, newY)
    }


    update(deltaTime: number) {


        this.lastBulletTime += deltaTime

        if (this.lastBulletTime >= this.bulletInterval) {
            this.lastBulletTime = 0
            const { x, y } = this.node.getPosition()
            const bullet1 = instantiate(this.bulletPrefab1)
            const bullet2 = instantiate(this.bulletPrefab2)
            bullet1.setPosition(x - 30, y + 80)
            bullet2.setPosition(x + 30, y + 80)
            bullet1.parent = this.bulletParent
            bullet2.parent = this.bulletParent

        }

    }
}


