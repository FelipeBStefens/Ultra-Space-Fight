
class InputManager {

    constructor() {
        this.keys = {
            left: false,
            right: false,
            up: false,
            down: false,
            rotateLeft: false,
            rotateRight: false,
            space: false,
            // spacePressed = true only on the frame the button was initially pressed
            spacePressed: false
        };

        this.gamepadIndex = null;
        this.prevShootPressed = false;
        // track keyboard-held space separately so gamepad doesn't latch the held state
        this._keyboardSpaceHeld = false;

        // Teclado
        window.addEventListener("keydown", (e) => this._onKeyDown(e));
        window.addEventListener("keyup", (e) => this._onKeyUp(e));

        // Gamepad
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
                // mark keyboard-held and mark as a pressed-once event
                this._keyboardSpaceHeld = true;
                this._keySpacePressed = true; // temporary marker consumed in update()
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
        if (this.gamepadIndex === null) return;

        const gp = navigator.getGamepads()[this.gamepadIndex];
        if (!gp) return;

        // --- Botões principais
        const b = gp.buttons;

        // Gatilho ZR / RT / R2 = índice 7
        const triggerPressed = b[7] && (b[7].pressed || b[7].value > 0.5);

        // Botão A / X / B (índice 0) também atira
        const faceButtonPressed = b[0]?.pressed || false;

        // Ação de tiro
        // --- Ação de tiro com detecção de "apertou agora" ---
        const shootPressed = triggerPressed || faceButtonPressed;

        // Dispara apenas no momento em que o botão é pressionado
        // Set edge-trigger for gamepad
        const spacePressedFromGamepad = (shootPressed && !this.prevShootPressed);
        this.prevShootPressed = shootPressed;

    // Combine keyboard and gamepad pressed events into a single keys.spacePressed that is true
    // only on the first frame the input is detected.
    this.keys.spacePressed = !!(this._keySpacePressed || spacePressedFromGamepad);

    // After exposing the pressed-once flag, clear the temporary keyboard marker so it is
    // only seen for a single update cycle.
    this._keySpacePressed = false;

    // Held state: true if keyboard is holding space OR gamepad trigger/button is held
    const keyboardHeld = !!this._keyboardSpaceHeld;
    this.keys.space = keyboardHeld || shootPressed;

    // Rotação: buttons OR right-stick horizontal axis (allow rotation while moving with left stick)
    const axisRX = gp.axes[2] || 0; // right stick X
    const deadZone = 0.2;
    const rotateLeftFromAxis = axisRX < -deadZone;
    const rotateRightFromAxis = axisRX > deadZone;

    this.keys.rotateLeft = (b[4]?.pressed || false) || rotateLeftFromAxis;
    this.keys.rotateRight = (b[5]?.pressed || false) || rotateRightFromAxis; // RB / R1 / ZR (short)

        // --- Joystick esquerdo (movimento)
    const axisX = gp.axes[0] || 0;
    const axisY = gp.axes[1] || 0;

    this.keys.left = axisX < -deadZone || b[14]?.pressed;
    this.keys.right = axisX > deadZone || b[15]?.pressed;
    this.keys.up = axisY < -deadZone || b[12]?.pressed;
    this.keys.down = axisY > deadZone || b[13]?.pressed;
    }
}

export default InputManager;