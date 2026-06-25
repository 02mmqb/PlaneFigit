import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartUI')
export class StartUI extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    onStart(){
        // 加载场景
        director.loadScene("Game")
    }
}


