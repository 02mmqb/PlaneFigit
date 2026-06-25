import { _decorator, Component, Label, Node } from 'cc';
import { GameManger } from './Manger/gameManger';
const { ccclass, property } = _decorator;

@ccclass('BombUI')
export class BombUI extends Component {
    @property({ type: Label, displayName: "炸弹数量" })
    bombNumLabel: Label = null;
    gameMangerInstance: GameManger = null;
    start() {

    }
    protected onLoad(): void {
        this.gameMangerInstance = GameManger.getInstance();
        this.gameMangerInstance.getNode().on('onBombChange', this.onBombChange, this);
    }
    onBombChange(num: number) {
        // console.log("数据：",num);

        this.bombNumLabel.string = this.gameMangerInstance.getBombNum().toString()
    }
    protected onDestroy(): void {
        this.gameMangerInstance.getNode().off('onBombChange', this.onBombChange, this);
    }
    update(deltaTime: number) {

    }
}


