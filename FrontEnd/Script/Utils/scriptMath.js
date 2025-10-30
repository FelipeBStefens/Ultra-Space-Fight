
// Getting the Position;
export function getMiddlePosition(canvas, width, height) {

    const positionX = (canvas.width - width) / 2;
    const positionY = (canvas.height - height) / 2;

    return {x: positionX, y: positionY};
}

// Getting the Center Image Vector with the position;
export function getCenterVector({x, y}, width, height) {

    const centerX = x + width / 2;
    const centerY = y + height / 2;

    return {x: centerX, y: centerY};
}

// Max value position to make the gameobjects on canvas;
export function maxValuePosition(canvas, width, height, {x, y}) {

    const minPositionX = Math.min(canvas.width - width, x); 
    const minPositionY = Math.min(canvas.height - height, y);

    return {x: Math.max(0, minPositionX), y: Math.max(0, minPositionY)};
}

// Rotation putting angle in degrees and returning radians;
export function rotation(angle) {

    return Math.PI / 180 * angle;
}

// Getting the position vector of the gameobject direction;
export function getFrontOffsetVector({x, y}, height, angle) {

    const frontOffset = height / 2;

    const frontX = x + frontOffset * Math.cos(angle - Math.PI / 2);
    const frontY = y + frontOffset * Math.sin(angle - Math.PI / 2);

    return {x: frontX, y: frontY};
}

// Updating position;
export function updatePosition({x, y}, speed, angle, ratio) {

    const positionX = x + speed * Math.cos(angle - Math.PI / 2 * ratio);
    const positionY = y + speed * Math.sin(angle - Math.PI / 2 * ratio);

    return {x: positionX, y: positionY};
}

// Get differential vector;
export function getDifferentialVector({x, y}, player) {

    const differentialX = player.position.x - x;
    const differentialY = player.position.y - y;

    return {differentialX: differentialX, differentialY: differentialY};
}

// Get magnitude of the vector;
export function getVectorMagnitude({differentialX, differentialY}) {

    return Math.hypot(differentialX, differentialY);
}

// Getting normalized vector;
export function getNormalizedVector({x, y}, magnitude = null) {

    if (magnitude == null) {
        magnitude = getVectorMagnitude({differentialX: x, differentialY: y});
    }

    return {normalizedX: x / magnitude, normalizedY: y / magnitude};
}

// Getting lateral variance values;
export function getLateralFactor(speed) {

    return Math.sin(Date.now() / 500) * 0.3 * speed;
}

// Updating angle with the difference of the positions;
export function updateAngle({differentialX, differentialY}) {

    return Math.atan2(differentialY, differentialX) + Math.PI / 2;
}

// Rotation of a Vector, using 2D rotation Matrix;
export function rotateVector({x, y}, angle) {

    const rotatedX = x * Math.cos(angle) - y * Math.sin(angle);
    const rotatedY = x * Math.sin(angle) + y * Math.cos(angle);

    return {rotatedX: rotatedX, rotatedY: rotatedY};
}

export function lerp() {}