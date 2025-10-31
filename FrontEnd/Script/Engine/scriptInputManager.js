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
            case "q": this.keys.rotateLeft = true; break;
            case "e": this.keys.rotateRight = true; break;
            case " ": 
                // mark keyboard-held; only set the "pressed once" marker when
                // the key transitions from not-held to held to avoid browser key-repeat
                if (!this._keyboardSpaceHeld) {
                    this._keySpacePressed = true; // temporary marker consumed in update()
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
            case "q": this.keys.rotateLeft = false; break;
            case "e": this.keys.rotateRight = false; break;
            case " ": this._keyboardSpaceHeld = false; break;
        }
    }

    _onGamepadConnected(event) {
        console.log(`🎮 Gamepad conectado: ${event.gamepad.id}`);
        this.gamepadIndex = event.gamepad.index;
    }

    _onGamepadDisconnected(event) {
        console.log(`❌ Gamepad desconectado: ${event.gamepad.id}`);
        if (this.gamepadIndex === event.gamepad.index) {
            this.gamepadIndex = null;
        }
    }

    update() {
        // Always process keyboard-based pressed/held flags so keyboard shooting works
        // even when no gamepad is connected.

        let shootPressed = false;
        let spacePressedFromGamepad = false;
        let gp = null;
        const deadZone = 0.2;

        if (this.gamepadIndex !== null) {
            gp = navigator.getGamepads()[this.gamepadIndex];
            if (gp) {
                // --- Botões principais
                const b = gp.buttons;

                // Gatilho ZR / RT / R2 = índice 7
                const triggerPressed = b[7] && (b[7].pressed || b[7].value > 0.5);

                // Botão A / X / B (índice 0) também atira
                const faceButtonPressed = b[0]?.pressed || false;

                shootPressed = triggerPressed || faceButtonPressed;

                // Set edge-trigger for gamepad
                spacePressedFromGamepad = (shootPressed && !this.prevShootPressed);
                this.prevShootPressed = shootPressed;

                // Rotação: buttons OR right-stick horizontal axis (allow rotation while moving with left stick)
                const axisRX = gp.axes[2] || 0; // right stick X
                const rotateLeftFromAxis = axisRX < -deadZone;
                const rotateRightFromAxis = axisRX > deadZone;

                this.keys.rotateLeft = (b[4]?.pressed || false) || rotateLeftFromAxis;
                this.keys.rotateRight = (b[5]?.pressed || false) || rotateRightFromAxis;

                // --- Joystick esquerdo (movimento)
                const axisX = gp.axes[0] || 0;
                const axisY = gp.axes[1] || 0;

                this.keys.left = axisX < -deadZone || b[14]?.pressed;
                this.keys.right = axisX > deadZone || b[15]?.pressed;
                this.keys.up = axisY < -deadZone || b[12]?.pressed;
                this.keys.down = axisY > deadZone || b[13]?.pressed;
            } else {
                // no gamepad object available this frame
                this.prevShootPressed = false;
            }
        } else {
            // no gamepad connected: ensure prevShootPressed reset so edge-detection will work
            this.prevShootPressed = false;
        }

        // Combine keyboard and gamepad pressed events into a single keys.spacePressed that is true
        // only on the first frame the input is detected.
        this.keys.spacePressed = !!(this._keySpacePressed || spacePressedFromGamepad);

        // After exposing the pressed-once flag, clear the temporary keyboard marker so it is
        // only seen for a single update cycle.
        this._keySpacePressed = false;

        // Held state: true if keyboard is holding space OR gamepad trigger/button is held
        const keyboardHeld = !!this._keyboardSpaceHeld;
        this.keys.space = keyboardHeld || shootPressed;
    }

    applyInputs(canvas) {
       
        const player = EntityManager.player;
        const now = Date.now();

        // Movement;
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

        // Rotations;
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