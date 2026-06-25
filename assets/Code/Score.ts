import { _decorator, AudioSource, Component, director, Label, Node } from 'cc';
import { GameManger } from './Manger/gameManger';
const { ccclass, property } = _decorator;

@ccclass('Score')
export class Score extends Component {
    @property({ type: Label, displayName: "分数显示节点" })
    scoreLabel: Label = null;
    @property({ type: Node, displayName: "暂停UI" })
    pauseUI: Node = null;
    @property({ type: Node, displayName: "开始UI" })
    startUI: Node = null;
    @property({ type: Node, displayName: "飞机UI节点" })
    playerUI: Node = null;

    start() {

    }
    protected onLoad(): void {
        GameManger.getInstance().getNode().on('onScoreChange', this.onScoreChange, this)

    }
    onScoreChange(score: number) {
        this.scoreLabel.string = score.toString()
    }
    protected onDestroy(): void {
        GameManger.getInstance().getNode().off('onScoreChange', this.onScoreChange, this)
        GameManger.getInstance().getNode().off('onGameControllerChange', this.updateIcon, this)
    }
    update(deltaTime: number) {

    }
    /**
     * 游戏控制
     */
    onGameControllerChange() {
        GameManger.getInstance().setGameController()
        this.updateIcon()
    }
    // 更新图标
    updateIcon() {
        const flag = GameManger.getInstance().getGameController()

        if (flag) {
            this.startUI.active = false
            this.pauseUI.active = true
            this.playerUI.getComponent(AudioSource).play()
            GameManger.getInstance().setIsPlayBgMusic(true)
        } else {
            this.startUI.active = true
            this.pauseUI.active = false
            this.playerUI.getComponent(AudioSource).pause()
            GameManger.getInstance().setIsPlayBgMusic(false)
        }

    }
}


