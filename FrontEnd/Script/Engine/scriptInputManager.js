
import EntityManager from "./scriptEntityManager.js";


class InputManager {

    keys;               
    gamepadIndex;       
    prevShootPressed;   
    _keyboardSpaceHeld; 
    _keySpacePressed;   
    autoFireState;      

    constructor() {


        this.keys = {
            left: false,
            right: false,
            up: false,
            down: false,
            rotateLeft: false,
            rotateRight: false,
            space: false,
            spacePressed: false
        };

        this.gamepadIndex = null;
        this.prevShootPressed = false;
        this._keyboardSpaceHeld = false;
        this._keySpacePressed = false;


        this.autoFireState = {
            holding: false,                 
            holdDelay: 300,
            autoFireInterval: 240,
            nextAutoShot: 0
        };


        window.addEventListener("keydown", (e) => this._onKeyDown(e));
        window.addEventListener("keyup", (e) => this._onKeyUp(e));

        window.addEventListener("gamepadconnected", (e) => this._onGamepadConnected(e));
        window.addEventListener("gamepaddisconnected", (e) => this._onGamepadDisconnected(e));
    }


    _onKeyDown(event) {
        const key = event.key.toLowerCase();
        switch (key) {
            case "w": this.keys.up = true; break;
            case "s": this.keys.down = true; break;
            case "a": this.keys.left = true; break;
            case "d": this.keys.right = true; break;
            case "arrowleft": this.keys.rotateLeft = true; break;
            case "arrowright": this.keys.rotateRight = true; break;
            case " ": 

                if (!this._keyboardSpaceHeld) {
                    this._keySpacePressed = true;
                }
                this._keyboardSpaceHeld = true;
                break;
        }
    }


    _onKeyUp(event) {
        const key = event.key.toLowerCase();
        switch (key) {
            case "w": this.keys.up = false; break;
            case "s": this.keys.down = false; break;
            case "a": this.keys.left = false; break;
            case "d": this.keys.right = false; break;
            case "arrowleft": this.keys.rotateLeft = false; break;
            case "arrowright": this.keys.rotateRight = false; break;
            case " ": this._keyboardSpaceHeld = false; break;
        }
    }


    _onGamepadConnected(event) {
        this.gamepadIndex = event.gamepad.index;
    }


    _onGamepadDisconnected(event) {
        if (this.gamepadIndex === event.gamepad.index) {
            this.gamepadIndex = null;
        }
    }


    update() {
        let shootPressed = false;               
        let spacePressedFromGamepad = false;    
        let gp = null;
        const deadZone = 0.2;


        if (this.gamepadIndex !== null) {
            

            gp = navigator.getGamepads()[this.gamepadIndex];
            if (gp) {
                
                const b = gp.buttons;


                const triggerPressed = b[7] && (b[7].pressed || b[7].value > 0.5);
                const faceButtonPressed = b[0]?.pressed || false;

                shootPressed = triggerPressed || faceButtonPressed;


                spacePressedFromGamepad = (shootPressed && !this.prevShootPressed);
                this.prevShootPressed = shootPressed;


                const axisRX = gp.axes[2] || 0;
                const rotateLeftFromAxis = axisRX < -deadZone;
                const rotateRightFromAxis = axisRX > deadZone;

                this.keys.rotateLeft = (b[4]?.pressed || false) || rotateLeftFromAxis;
                this.keys.rotateRight = (b[5]?.pressed || false) || rotateRightFromAxis;


                const axisX = gp.axes[0] || 0;
                const axisY = gp.axes[1] || 0;

                this.keys.left = axisX < -deadZone || b[14]?.pressed;
                this.keys.right = axisX > deadZone || b[15]?.pressed;
                this.keys.up = axisY < -deadZone || b[12]?.pressed;
                this.keys.down = axisY > deadZone || b[13]?.pressed;
            } 
            else {

                this.prevShootPressed = false;
            }
        } else {

            this.prevShootPressed = false;
        }


        this.keys.spacePressed = !!(this._keySpacePressed || spacePressedFromGamepad);


        this._keySpacePressed = false;


        const keyboardHeld = !!this._keyboardSpaceHeld;
        this.keys.space = keyboardHeld || shootPressed;
    }


    applyInputs(canvas) {
        
        const player = EntityManager.player;
        const now = Date.now();


        if (this.keys.left && player.position.x > 0) {
            player.moveLeft();
        }
        if (this.keys.right && player.position.x < canvas.width - player.width) {
            player.moveRight();
        } 
        if (this.keys.up && player.position.y > 0) {
            player.moveUp();
        } 
        if (this.keys.down && player.position.y < canvas.height - player.height) {
            player.moveDown();
        }


        if (this.keys.rotateLeft) {
            player.rotateLeft();
        }
        if (this.keys.rotateRight) {
            player.rotateRight();
        }   


        if (this.keys.spacePressed) {

            player.shoot();


            this.autoFireState.holding = true;
            this.autoFireState.nextAutoShot = now + this.autoFireState.holdDelay;
        }


        if (this.keys.space) {

            if (this.autoFireState.holding && now >= this.autoFireState.nextAutoShot) {
                
                player.shoot();
                

                this.autoFireState.nextAutoShot = now + this.autoFireState.autoFireInterval;
            }
        } 
        

        else {
            
            this.autoFireState.holding = false;
            this.autoFireState.nextAutoShot = 0;
        }
    }
}


export default InputManager;