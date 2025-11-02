// Getting the Position;
// Calculates the position needed to center an object of (width, height) within the canvas;
export function getMiddlePosition(canvas, width, height) {

    // Calculates the X position to center the object horizontally;
    const positionX = (canvas.width - width) / 2;
    // Calculates the Y position to center the object vertically;
    const positionY = (canvas.height - height) / 2;

    // Returns an object with the centered coordinates;
    return {x: positionX, y: positionY};
}

// Getting the Center Image Vector with the position;
// Calculates the exact center point (vector) of a game object given its top-left position and dimensions;
export function getCenterVector({x, y}, width, height) {

    // Calculates the center X coordinate (top-left X + half width);
    const centerX = x + width / 2;
    // Calculates the center Y coordinate (top-left Y + half height);
    const centerY = y + height / 2;

    // Returns an object with the center coordinates;
    return {x: centerX, y: centerY};
}

// Max value position to make the gameobjects on canvas;
// Clamps the given position (x, y) so the game object remains entirely inside the canvas boundaries;
export function maxValuePosition(canvas, width, height, {x, y}) {

    // Calculates the maximum valid X position (canvas width - object width) and limits x to this maximum;
    const minPositionX = Math.min(canvas.width - width, x); 
    // Calculates the maximum valid Y position (canvas height - object height) and limits y to this maximum;
    const minPositionY = Math.min(canvas.height - height, y);

    // Returns the final clamped position, ensuring coordinates are never less than 0 (minimum X/Y);
    return {x: Math.max(0, minPositionX), y: Math.max(0, minPositionY)};
}

// Rotation putting angle in degrees and returning radians;
// Converts an angle value from degrees to radians, which is needed for trigonometric functions in JavaScript;
export function rotation(angle) {

    // Conversion formula: radians = degrees * (PI / 180);
    return Math.PI / 180 * angle;
}

// Getting the position vector of the gameobject direction;
// Calculates a point in front of the object's center based on its height and current angle;
export function getFrontOffsetVector({x, y}, height, angle) {

    // Defines the distance from the center to the front (half of the object's height);
    const frontOffset = height / 2;

    // Uses trigonometry (cosine) to calculate the X component of the front point. The offset of (angle - Math.PI / 2) is common for assets drawn facing upwards;
    const frontX = x + frontOffset * Math.cos(angle - Math.PI / 2);
    // Uses trigonometry (sine) to calculate the Y component of the front point;
    const frontY = y + frontOffset * Math.sin(angle - Math.PI / 2);

    // Returns the coordinates of the calculated front point;
    return {x: frontX, y: frontY};
}

// Updating position;
// Calculates the new position of a game object based on its current position, speed, angle, and a ratio;
export function updatePosition({x, y}, speed, angle, ratio) {

    // Calculates the new X position: current X + (speed * X direction component). The ratio factor allows for fine control or interpolation of movement;
    const positionX = x + speed * Math.cos(angle - Math.PI / 2 * ratio);
    // Calculates the new Y position: current Y + (speed * Y direction component);
    const positionY = y + speed * Math.sin(angle - Math.PI / 2 * ratio);

    // Returns the new position coordinates;
    return {x: positionX, y: positionY};
}

// Get differential vector;
// Calculates the vector difference (delta) between the player's position and another position;
export function getDifferentialVector({x, y}, player) {

    // Calculates the difference in X coordinates;
    const differentialX = player.position.x - x;
    // Calculates the difference in Y coordinates;
    const differentialY = player.position.y - y;

    // Returns the components of the differential vector;
    return {differentialX: differentialX, differentialY: differentialY};
}

// Calculates the vector difference (delta) between two arbitrary points;
export function getDifferentialVectorByObject({x, y}, {objectX, objectY}) {

    // Calculates the difference in X coordinates;
    const differentialX = x - objectX;
    // Calculates the difference in Y coordinates;
    const differentialY = y - objectY;

    // Returns the components of the differential vector;
    return {differentialX: differentialX, differentialY: differentialY};
}

// Get magnitude of the vector;
// Calculates the length (magnitude) of a vector using the Pythagorean theorem;
export function getVectorMagnitude({differentialX, differentialY}) {

    // Uses Math.hypot() (square root of sum of squares) for efficient calculation of vector length;
    return Math.hypot(differentialX, differentialY);
}

// Getting normalized vector;
// Converts a vector into a unit vector (length 1) while preserving its direction;
export function getNormalizedVector({x, y}, magnitude = null) {

    // Checks if the magnitude was pre-calculated and passed;
    if (magnitude == null) {
        // If not, calculates the magnitude of the vector;
        magnitude = getVectorMagnitude({differentialX: x, differentialY: y});
    }

    // Calculates the X component of the normalized vector (X component / magnitude);
    return {normalizedX: x / magnitude, normalizedY: y / magnitude};
}

// Getting lateral variance values;
// Generates a fluctuating (sine wave) value for creating lateral movement or variation;
export function getLateralFactor(speed) {

    // Uses the sine of the current time (divided by 500 for frequency) multiplied by a factor (0.3) and the base speed;
    return Math.sin(Date.now() / 500) * 0.3 * speed;
}

// Updating angle with the difference of the positions;
// Calculates the angle (in radians) needed to point from one position to another (based on the differential vector);
export function updateAngle({differentialX, differentialY}) {

    // Uses Math.atan2() to safely calculate the angle (in radians) from the differential Y and X components. Adding Math.PI / 2 accounts for common asset orientation;
    return Math.atan2(differentialY, differentialX) + Math.PI / 2;
}

// Rotation of a Vector, using 2D rotation Matrix;
// Applies a 2D rotation matrix to rotate a vector by a given angle (in radians);
export function rotateVector({x, y}, angle) {

    // Standard 2D rotation formula for the X component: x' = x*cos(a) - y*sin(a);
    const rotatedX = x * Math.cos(angle) - y * Math.sin(angle);
    // Standard 2D rotation formula for the Y component: y' = x*sin(a) + y*cos(a);
    const rotatedY = x * Math.sin(angle) + y * Math.cos(angle);

    // Returns the components of the new rotated vector;
    return {rotatedX: rotatedX, rotatedY: rotatedY};
}

// Linear Scalar interpolation;
// Performs Linear Interpolation (Lerp) between two scalar values;
export function scalarLerp(initialValue, finalValue, lerpFactor) {

    // Lerp formula: start + (end - start) * factor. The factor is typically between 0 and 1;
    return initialValue + (finalValue - initialValue) * lerpFactor;
}

// Performs Linear Interpolation (Lerp) between two 2D vectors (points);
export function vectorLerp({startX, endX}, {startY, endY}, lerpFactor) {

    // Applies scalar Lerp to the X coordinates;
    const lerpX = scalarLerp(startX, endX, lerpFactor);
    // Applies scalar Lerp to the Y coordinates;
    const lerpY = scalarLerp(startY, endY, lerpFactor);

    // Returns the interpolated point;
    return {x: lerpX, y: lerpY};
}

// Getting the Percent of;
// Calculates a percentage of a given value;
export function getPercentOf(value, percent) {
    
    // Calculates the result using the formula: value * (percent / 100);
    return value * (percent / 100);
}

// Clamp function to make it inside an interval;
// Limits a value to stay within a specified minimum and maximum range;
export function clamp(value, minValue, maxValue) {

    // Uses Math.max() to ensure the value is not below the min, and Math.min() to ensure it's not above the max;
    return Math.max(minValue, Math.min(maxValue, value));
}

// Checks if a value is within a given interval (inclusive);
export function isInInterval(value, minValue, maxValue) {

    // Checks if the value is greater than or equal to the minimum AND less than or equal to the maximum;
    if (value >= minValue && value <= maxValue) {
        // Returns true if the condition is met;
        return true;
    }
    
    // Returns false otherwise;
    return false;
}