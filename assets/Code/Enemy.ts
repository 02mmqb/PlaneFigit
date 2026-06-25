import { _decorator, Component, Animation, Collider2D, Contact2DType, view, Vec2, math, log, UITransform, AudioClip } from 'cc';
import { GameManger } from './Manger/gameManger';
import { bullet } from './bullet';
import { AudioMgr } from './Manger/AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    @property({ type: Number, displayName: '移动速度' })
    speed = 300;
    @property({ type: Animation, displayName: "动画节点" })
    explodeAnimation: Animation = null;
    @property({ type: Number, displayName: "生命值" })
    hp = 1
    @property({ type: String, displayName: "击中动画" })
    hitAnimation: string = '';
    @property({ type: String, displayName: "击毁动画" })
    downAnimation: string = '';
    @property({ type: Number, displayName: "击杀所得分数" })
    score: number = 0;
    @property({ type: AudioClip, displayName: "死亡音效" })
    downSound: AudioClip = null;

    visibleSize: math.Size = new math.Size(0, 0)


    collider: Collider2D = null;

    start() {
        this.visibleSize = view.getVisibleSize()
        this.collider = this.getComponent(Collider2D);

        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {

        this.hp -= 1
        const bullets = otherCollider.getComponent(bullet)

        if (bullets) {
            otherCollider.node.destroy()
        }


        if (this.hp <= 0) {
            this.destroyWithAnimation()
        } else {
            this.explodeAnimation.play(this.hitAnimation)
        }

    }
    // onEndContact(contact: Contact2D) {
    //     console.log("敌人结束碰撞")
    // }

    destroyWithAnimation() {
        if (this.collider) {
            this.collider.enabled = false;
        }
        this.hp = 0;
        this.explodeAnimation.play(this.downAnimation);
        this.explodeAnimation.once(Animation.EventType.FINISHED, () => {
            GameManger.getInstance().setScore(GameManger.getInstance().getScore() + this.score);
            AudioMgr.inst.playOneShot(this.downSound)
            this.node.destroy();
        });
    }

    protected onDestroy(): void {
        if (this.collider) {
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update(deltaTime: number) {
        const { x, y } = this.node.getPosition()
        if (this.hp > 0) {

            this.node.setPosition(x, y - this.speed * deltaTime)
        }
        const { width, height } = this.visibleSize
        // Cocos 坐标系原点在屏幕中心，屏幕范围是 [-w, w] 和 [-h, h]
        const h = height / 2
        // 获取敌机自身高度，确保完全移出屏幕才销毁
        const enemyHeight = this.node.getComponent(UITransform)?.height || 0
        if (y < -h - enemyHeight / 2) {
            GameManger.getInstance().setHp(GameManger.getInstance().getHp() - 1)
            this.node.destroy()
        }
    }
}


