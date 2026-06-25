import { _decorator, Component, director, Label, Node } from 'cc';
import { GameManger } from './Manger/gameManger';
import { AudioMgr } from './Manger/AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('GameOver')
export class GameOver extends Component {

    @property({ type: Label, displayName: "历史最高分" })
    historyScoreLabel: Label = null;
    @property({ type: Label, displayName: "最终分数" })
    finalScoreLabel: Label = null;
    @property({ type: Node, displayName: "overUI" })
    overUINode: Node = null;
    gameMgrInstance: GameManger = null;



    protected onLoad(): void {
        this.gameMgrInstance = GameManger.getInstance()

        this.gameMgrInstance.getNode().on("onGameEndChange", this.onGameEndChange, this);
    }
    onGameEndChange() {
        this.gameMgrInstance.setIsPlayBgMusic(false)
        AudioMgr.inst.play("Audio/game_over", 1)
        const key = 'score'
        const gameScore = this.gameMgrInstance.getScore()
        const score = Number(localStorage.getItem(key) || 0)
        const maxScore = Math.max(score, gameScore).toString()
        localStorage.setItem(key, maxScore)
        director.pause()
        this.finalScoreLabel.string = gameScore.toString()
        this.historyScoreLabel.string = score.toString()
        this.overUINode.active = true

    }
    protected onDestroy(): void {
        this.gameMgrInstance.getNode().off("onGameEndChange", this.onGameEndChange, this);
    }
    update(deltaTime: number) {

    }

    protected onRestart(): void {
        AudioMgr.inst.stop();
        // 重置游戏数据和清理节点
        this.gameMgrInstance.resetGame();

        director.resume();
        director.loadScene(director.getScene().name);
    }
    protected onClose(): void {
        // 重置游戏数据和清理节点
        this.gameMgrInstance.resetGame();
        AudioMgr.inst.stop();
        director.loadScene('main')
        director.resume()
    }
}


