import { Node, director } from 'cc';
import { AudioMgr } from './AudioMgr';

export class GameManger {
    private static inst: GameManger;
    public static getInstance(): GameManger {
        if (this.inst == null) {
            this.inst = new GameManger();
        }
        return this.inst;
    }

    // 保存游戏管理器节点的引用
    private gameMgrNode: Node = null;

    private constructor() {
        let gameMgr = new Node();
        gameMgr.name = '__GameMgr__';
        this.gameMgrNode = gameMgr;

        // 添加到场景并设为常驻节点
        director.getScene().addChild(gameMgr);
        director.addPersistRootNode(gameMgr);
    }

    // 获取游戏管理器节点
    public getNode(): Node {
        return this.gameMgrNode;
    }



    //  炸弹
    private bombNum: number = 0;
    // 分数
    private score: number = 0;
    // 游戏控制器
    private gameController: boolean = true;
    // 游戏结束
    private gameEnd: boolean = false;
    // 玩家生命值
    private hp: number = 3;
    // 是否播放背景音乐
    private _isPlayBgMusic: boolean = true;
    private _instance: AudioMgr = AudioMgr.inst;
    private _bgMusic: string = "Audio/bg/game_music";

    // 添加炸弹节点
    public addBombNode() {
        this.bombNum++
        this.gameMgrNode.emit('onBombChange', this.bombNum);
    }
    getBombNum(): number {
        return this.bombNum;
    }
    useBomb() {
        if (this.bombNum > 0) {
            this.bombNum--;
            this.gameMgrNode.emit('onBombChange', this.bombNum);
            return true;
        }
        return false;
    }
    getScore(): number {
        return this.score;
    }
    setScore(score: number) {
        this.score = score;
        this.gameMgrNode.emit('onScoreChange', this.score);
    }
    getGameController(): boolean {
        return this.gameController;
    }
    setGameController() {
        this.gameController = !this.gameController;
        if (this.gameController) {
            director.resume()
        } else {
            director.pause()
        }
        this.gameMgrNode.emit('onGameControllerChange');
    }
    getGameEnd(): boolean {
        return this.gameEnd;
    }
    setGameEnd() {
        this.gameEnd = true;
        this.gameMgrNode.emit('onGameEndChange');
    }
    getHp(): number {
        return this.hp;
    }
    setHp(hp: number) {
        this.hp = Math.min(3, Math.max(0, hp));
        this.gameMgrNode.emit('onHpChange', this.hp);
    }
    getIsPlayBgMusic(): boolean {
        return this._isPlayBgMusic;
    }
    setIsPlayBgMusic(isPlay: boolean) {
        this._isPlayBgMusic = isPlay;

        if (this._isPlayBgMusic) {
            this._instance.play(this._bgMusic, 0.1, true)
        } else {
            this._instance.pause()
        }
    }

    // 重置游戏数据
    resetGame() {
        this.score = 0;
        this.bombNum = 0;
        this.hp = 3;
        this.gameEnd = false;
        this.gameController = true;
        this._isPlayBgMusic = false;
    }

}
