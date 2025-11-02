// Imports the EntityManager, primarily to access the player object;
import EntityManager from "./scriptEntityManager.js";

// Defines the InputManager class, which handles all user input (Keyboard & Gamepad);
class InputManager {

    keys;               
    gamepadIndex;       
    prevShootPressed;   
    _keyboardSpaceHeld; 
    _keySpacePressed;   
    autoFireState;      

    constructor() {

        // Initializes the action state flags (movement, rotation, shooting);
        this.keys = {
            left: false,
            right: false,
            up: false,
            down: false,
            rotateLeft: false,
            rotateRight: false,
            space: false,       // True if any fire input is held (for auto-fire);
            spacePressed: false // True ONLY on the first frame of a fire input (for initial shot/manual fire);
        };

        this.gamepadIndex = null;
        this.prevShootPressed = false;
        this._keyboardSpaceHeld = false;
        this._keySpacePressed = false;

        // Auto-Fire Configuration:
        this.autoFireState = {
            holding: false,                 
            holdDelay: 300,                 // Time (ms) the fire button must be held before auto-fire starts;
            autoFireInterval: 240,          // Time (ms) between subsequent auto-shots;
            nextAutoShot: 0                 // Timestamp for the next allowed auto-fire shot;
        };

        // Event Listeners Setup;
        window.addEventListener("keydown", (e) => this._onKeyDown(e));
        window.addEventListener("keyup", (e) => this._onKeyUp(e));

        window.addEventListener("gamepadconnected", (e) => this._onGamepadConnected(e));
        window.addEventListener("gamepaddisconnected", (e) => this._onGamepadDisconnected(e));
    }

    // Handles key press events, setting the held state flags;
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
                // Edge-Trigger Logic for Keyboard:
                if (!this._keyboardSpaceHeld) {
                    this._keySpacePressed = true; // Set the "pressed once" marker;
                }
                this._keyboardSpaceHeld = true; // Always set the held flag;
                break;
        }
    }

    // Handles key release events, clearing the held state flags;
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

    // Handles the connection of a gamepad;
    _onGamepadConnected(event) {
        this.gamepadIndex = event.gamepad.index;
    }

    // Handles the disconnection of a gamepad;
    _onGamepadDisconnected(event) {
        if (this.gamepadIndex === event.gamepad.index) {
            this.gamepadIndex = null;
        }
    }

    // Main update method, called every game frame to poll gamepad state and normalize input;
    update() {
        let shootPressed = false;               
        let spacePressedFromGamepad = false;    
        let gp = null;
        const deadZone = 0.2; // Threshold to ignore minor joystick movement;

        // Gamepad Polling Logic;
        if (this.gamepadIndex !== null) {
            
            // Must fetch the gamepad state anew every frame via navigator.getGamepads() (standard Gamepad API);
            gp = navigator.getGamepads()[this.gamepadIndex];
            if (gp) {
                
                const b = gp.buttons;

                // Fire input: Check right trigger (index 7) or the main face button (index 0);
                const triggerPressed = b[7] && (b[7].pressed || b[7].value > 0.5);
                const faceButtonPressed = b[0]?.pressed || false;

                shootPressed = triggerPressed || faceButtonPressed;

                // Gamepad Edge-Trigger Logic: True only if shootPressed is true NOW and was false LAST frame;
                spacePressedFromGamepad = (shootPressed && !this.prevShootPressed);
                this.prevShootPressed = shootPressed;

                // Rotation: Combines buttons (shoulders L1/R1, indices 4/5) with the Right Stick X-axis (index 2);
                const axisRX = gp.axes[2] || 0;
                const rotateLeftFromAxis = axisRX < -deadZone;
                const rotateRightFromAxis = axisRX > deadZone;

                this.keys.rotateLeft = (b[4]?.pressed || false) || rotateLeftFromAxis;
                this.keys.rotateRight = (b[5]?.pressed || false) || rotateRightFromAxis;

                // Movement: Combines D-pad buttons (indices 12-15) with the Left Stick axes (indices 0/1);
                const axisX = gp.axes[0] || 0;
                const axisY = gp.axes[1] || 0;

                this.keys.left = axisX < -deadZone || b[14]?.pressed;
                this.keys.right = axisX > deadZone || b[15]?.pressed;
                this.keys.up = axisY < -deadZone || b[12]?.pressed;
                this.keys.down = axisY > deadZone || b[13]?.pressed;
            } 
            else {
                // Gamepad disconnected mid-game
                this.prevShootPressed = false;
            }
        } else {
            // No gamepad connected
            this.prevShootPressed = false;
        }

        // True if EITHER keyboard OR gamepad detected a fresh press this frame;
        this.keys.spacePressed = !!(this._keySpacePressed || spacePressedFromGamepad);

        // Clears the temporary keyboard marker after it has been consumed for edge-detection;
        this._keySpacePressed = false;

        // True if EITHER keyboard is holding space OR gamepad fire button is held;
        const keyboardHeld = !!this._keyboardSpaceHeld;
        this.keys.space = keyboardHeld || shootPressed;
    }

    // Applies the final normalized input states to the player object;
    applyInputs(canvas) {
        
        const player = EntityManager.player;
        const now = Date.now();

        // Applies movement commands while checking against canvas boundaries;
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

        // Rotation Application;
        if (this.keys.rotateLeft) {
            player.rotateLeft();
        }
        if (this.keys.rotateRight) {
            player.rotateRight();
        }   

        // Manual Fire or Auto-Fire Start;
        if (this.keys.spacePressed) {

            player.shoot(); // Fires the initial shot;

            // Start the auto-fire sequence timer;
            this.autoFireState.holding = true;
            this.autoFireState.nextAutoShot = now + this.autoFireState.holdDelay;
        }

        // Triggered only if the input is HELD AND the delay is past;
        if (this.keys.space) {

            if (this.autoFireState.holding && now >= this.autoFireState.nextAutoShot) {
                
                player.shoot(); // Fires the auto-shot;
                
                // Resets the timer for the next auto-shot interval;
                this.autoFireState.nextAutoShot = now + this.autoFireState.autoFireInterval;
            }
        } 
        
        // Auto-Fire Stop: Input released;
        else {
            
            this.autoFireState.holding = false;
            this.autoFireState.nextAutoShot = 0;
        }
    }
}

// Exports the InputManager class;
export default InputManager;