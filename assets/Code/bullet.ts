import { _decorator, Component, Node, view } from 'cc';
import { AudioMgr } from './Manger/AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('bullet')
export class bullet extends Component {
    @property({ type: Number, displayName: '子弹速度' })
    speed = 400;
    start() {

    }
    protected onLoad(): void {
        AudioMgr.inst.playOneShot("Audio/bullet", 1)
    }

    update(deltaTime: number) {
        const { x, y } = this.node.getPosition()
        this.node.setPosition(x, y + this.speed * deltaTime)

        const { width, height } = view.getVisibleSize()
        // Cocos 坐标系原点在屏幕中心，屏幕范围是 [-w, w] 和 [-h, h]
        const w = width / 2
        const h = height / 2
        if (y > h || y < -h || x > w || x < -w) {
            this.node.destroy()
        }
    }
}


