import { _decorator, Component, Node, view, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bg')
export class Bg extends Component {

    @property({ type: Node, displayName: '背景节点1' })
    bg1: Node = null;
    @property({ type: Node, displayName: '背景节点2' })
    bg2: Node = null;

    @property({ type: Number, displayName: '背景速度' })
    speed: number = 100;

    bgHeight: number = 0;

    start() {
        this.bgHeight = this.bg1.getComponent(UITransform).height
    }

    update(deltaTime: number) {
        const speed = this.speed * deltaTime;
        
        // 获取当前位置
        const pos1 = this.bg1.position;
        const pos2 = this.bg2.position;
        
        // 计算新位置
        let newY1 = pos1.y - speed;
        let newY2 = pos2.y - speed;
        
        // 先检查 bg1 是否需要重置，基于 bg2 的新位置
        if (newY1 <= -this.bgHeight) {
            newY1 = newY2 + this.bgHeight;
        }
        
        // 再检查 bg2 是否需要重置，基于 bg1 的新位置（可能已更新）
        if (newY2 <= -this.bgHeight) {
            newY2 = newY1 + this.bgHeight;
        }
        
        // 设置新位置
        this.bg1.setPosition(pos1.x, newY1, pos1.z);
        this.bg2.setPosition(pos2.x, newY2, pos2.z);
    }
}


