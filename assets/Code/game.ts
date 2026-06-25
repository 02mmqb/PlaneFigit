import { _decorator, Component, Node } from 'cc';
import { GameManger } from './Manger/gameManger';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
    start() {
        
        GameManger.getInstance().setIsPlayBgMusic(true)
    }

    update(deltaTime: number) {

    }
}


