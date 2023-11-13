import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {

    @property({
        type: Prefab,
        tooltip: 'The prefab'
    })
    public prefabPipes = null;

    @property({
        type: Node,
        tooltip: 'New pipes go'
    })
    public pipePoolHome;

    public pool = new NodePool;
    public createPipe:Node = null;
    
    initPool(){
        let initCount = 4;      // amount of nodes at a time
        
        // fill the node pool
        for(let i=0; i<initCount; i++){
            // new node from the original
            let createPipe = instantiate(this.prefabPipes);

            if(i == 0){
                this.pipePoolHome.addChild(createPipe);
            }else{
                this.pool.put(createPipe);
            }
        }
    }

    addPool(){
        // if pool is not full, add new one
        if(this.pool.size()>0){
            this.createPipe = this.pool.get();
        // else, build a new one in the pool
        }else{
            this.createPipe = instantiate(this.prefabPipes);
        }
        // add pipe
        this.pipePoolHome.addChild(this.createPipe);
    }

    // CLEAR POOL
    reset(){
        this.pipePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}


