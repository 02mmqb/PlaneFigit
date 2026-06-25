import { _decorator, Component, Node, Prefab, view } from 'cc';
const { ccclass, property } = _decorator;

export enum RewradType {
    子弹加速 = 0,
    炸弹 = 1
}

@ccclass('Rewrad')
export class Rewrad extends Component {
    @property({ type: Number, displayName: '下降速度' })
    speed = 400;

    @property({ type: Number, displayName: '奖励类型 (0=子弹加速, 1=炸弹)' })
    type = RewradType.子弹加速;

    start() {

    }

    update(deltaTime: number) {
        const { x, y } = this.node.getPosition()
        this.node.setPosition(x, y - this.speed * deltaTime)

        const { width, height } = view.getVisibleSize()
        // Cocos 坐标系原点在屏幕中心，屏幕范围是 [-w, w] 和 [-h, h]
        const h = height / 2
        if (y < -h - 100) {
            this.node.destroy()
        }
    }
}


