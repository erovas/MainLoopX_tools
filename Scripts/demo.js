//#region Creating tools

let mlx_dev = document.createElement('mlx-dev');
let mlx_adv = document.createElement('mlx-adv');
let mlx_info_raw = document.createElement('mlx-info');
let mlx_info_begin = document.createElement('mlx-info');
let mlx_info_end = document.createElement('mlx-info');

mlx_info_raw.title = 'MLX Raw';
mlx_info_begin.title = 'MLX Begin'
mlx_info_end.title = 'MLX End';

//#endregion

//#region Buttons opener tools

dev.onclick = function(){
    if(mlx_dev.isConnected)
        return;

    document.body.appendChild(mlx_dev);
    Drog.move(mlx_dev, 0, 50);
}

adv.onclick = function(){
    if(mlx_adv.isConnected)
        return;

    document.body.appendChild(mlx_adv);
    Drog.move(mlx_adv, 220, 50);
}

infoRaw.onclick = function(){
    if(mlx_info_raw.isConnected)
        return;

    document.body.appendChild(mlx_info_raw);
    Drog.move(mlx_info_raw, 465, 50);
}

infoBegin.onclick = function(){
    if(mlx_info_begin.isConnected)
        return;

    document.body.appendChild(mlx_info_begin);
    Drog.move(mlx_info_begin, 692, 50);
}

infoEnd.onclick = function(){
    if(mlx_info_end.isConnected)
        return;

    document.body.appendChild(mlx_info_end);
    Drog.move(mlx_info_end, 915, 50);
}

//#endregion

//#region Planetarium definition

/**
 * Draw a filled-in circle on the canvas.
 *
 * @param {Number} x
 *   The x-coordinate of the center of the circle.
 * @param {Number} y
 *   The y-coordinate of the center of the circle.
 * @param {Number} r
 *   The radius of the circle.
 * @param {Mixed} [fillStyle]
 *   A canvas fillStyle used to fill the circle. If not specified, the circle
 *   uses the current fillStyle.
 *
 * @member CanvasRenderingContext2D
 */
 CanvasRenderingContext2D.prototype.circle = function(x, y, r, fillStyle) {
    this.beginPath();
    this.arc(x, y, r, 0, 2 * Math.PI, false);
    if (fillStyle) {
        this.fillStyle = fillStyle;
    }
    this.fill();
};

/**
 * The Planet class - an orbiting circle.
 *
 * @param {Object} center
 *   An object with `x` and `y` parameters representing coordinates for the
 *   center of the planet's orbit.
 * @param {Number} radius
 *   The radius of the planet.
 * @param {Number} [orbitRadius=0]
 *   The radius of the planet's orbit.
 * @param {Number} [velocity=0]
 *   The velocity of the planet.
 * @param {String} [color='black']
 *   The color of the planet.
 */
 function Planet(center, radius, orbitRadius, velocity, color) {

    this.defaultValues = {
        center: center,
        x: center.x + orbitRadius,
        y: center.y,
        radius: radius,
        orbitRadius: orbitRadius || 0,
        velocity: velocity || 0,
        color: color || 'black'
    }

    this.center = center;
    this.x = center.x + orbitRadius;
    this.y = center.y;
    this.lastX = this.x;
    this.lastY = this.y;
    this.radius = radius;
    this.orbitRadius = orbitRadius || 0;
    this.velocity = velocity || 0;
    this.theta = 0;
    this.color = color || 'black';
}

Planet.prototype.reset = function(){

    let defaultValues = this.defaultValues;

    this.center = defaultValues.center;
    this.x = defaultValues.x;
    this.y = defaultValues.y;
    this.lastX = defaultValues.x;
    this.lastY = defaultValues.y;
    this.radius = defaultValues.radius;
    this.orbitRadius = defaultValues.orbitRadius;
    this.velocity = defaultValues.velocity;
    this.theta = 0;
    this.color = defaultValues.color;

    this.draw(1)
}

/**
 * Updates the planet's position.
 *
 * @param {Number} delta
 *   The amount of time since the last time the planet was updated, in seconds.
 */
 Planet.prototype.update = function(delta) {
    this.lastX = this.x;
    this.lastY = this.y;
    this.theta += this.velocity * delta;
    this.x = this.center.x + Math.cos(this.theta) * this.orbitRadius;
    this.y = this.center.y + Math.sin(this.theta) * this.orbitRadius;
};

/**
 * Draws the planet.
 *
 * @param {Number} interpolationPercentage
 *   How much to interpolate between frames.
 */
 Planet.prototype.draw = function(interpolationPercentage) {
    // Interpolate with the last position to reduce stuttering. (smooth movement)
    var x = this.lastX + (this.x - this.lastX) * interpolationPercentage,
        y = this.lastY + (this.y - this.lastY) * interpolationPercentage;
    /*var x = this.x,
        y = this.y;*/
    context.circle(x, y, this.radius, this.color);
};

/**
 * Updates all planets.
 *
 * @param {Number} delta
 *   The amount of time since the last update, in seconds.
 */
 function update(delta) {
    for (var i = 0, l = planets.length; i < l; i++) {
        planets[i].update(delta);
    }
}

/**
 * Draws all planets.
 *
 * @param {Number} interpolationPercentage
 *   How much to interpolate between frames.
 */
function draw(interpolationPercentage) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0, l = planets.length; i < l; i++) {
        planets[i].draw(interpolationPercentage);
    }
}

function reset() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0, l = planets.length; i < l; i++) {
        planets[i].reset();
    }
}

//#endregion

//#region  RAW, BEGIN and END

function raw(fps, panic, timestamp, frameDelta, lastFrameTimeMs, elapsedTime, lastFpsUpdate, framesSinceLastFpsUpdate, numUpdateSteps){
    mlx_info_raw.update(fps, panic, timestamp, frameDelta, lastFrameTimeMs, elapsedTime, lastFpsUpdate, framesSinceLastFpsUpdate, numUpdateSteps);
}

function begin(fps, panic, timestamp, frameDelta, lastFrameTimeMs, elapsedTime, lastFpsUpdate, framesSinceLastFpsUpdate, numUpdateSteps){
    mlx_info_begin.update(fps, panic, timestamp, frameDelta, lastFrameTimeMs, elapsedTime, lastFpsUpdate, framesSinceLastFpsUpdate, numUpdateSteps);
}

/**
 * Updates the FPS counter.
 *
 * @param {Number} fps
 *   The smoothed frames per second.
 * @param {Boolean} panic
 *   Whether the main loop panicked because the simulation fell too far behind
 *   real time.
 */
function end(fps, panic, timestamp, frameDelta, lastFrameTimeMs, elapsedTime, lastFpsUpdate, framesSinceLastFpsUpdate, numUpdateSteps) {
    
    mlx_dev.FPSCount = fps;
    mlx_adv.FPSCount = fps;
    mlx_info_end.update(fps, panic, timestamp, frameDelta, lastFrameTimeMs, elapsedTime, lastFpsUpdate, framesSinceLastFpsUpdate, numUpdateSteps)

    if (panic) {
        // This pattern introduces non-deterministic behavior, but in this case
        // it's better than the alternative (the application would look like it
        // was running very quickly until the simulation caught up to real
        // time). See the documentation for `MainLoopX.end` for additional
        // explanation.
        var discardedTime = Math.round(MainLoopX.resetFrameDelta());
        console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
    }
}

//#endregion


// Set up the canvas.
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set up the planets.
var smallerDimension = Math.min(window.innerWidth, window.innerHeight),
    earthOrbitRadius = smallerDimension * 0.38,
    moonOrbitRadius = smallerDimension * 0.10,
    moonRadius = smallerDimension * 0.01,
    sunRadius = earthOrbitRadius * 0.5,
    earthRadius = earthOrbitRadius * 0.15,
    sun = new Planet({x: canvas.width*0.5, y: canvas.height * 0.5}, sunRadius, 0, 0, '#FFD000'),
    earth = new Planet(sun, earthRadius, earthOrbitRadius, 0.03 * Math.PI / 180, 'blue'),
    moon = new Planet(earth, moonRadius, moonOrbitRadius, 0.1 * Math.PI / 180, 'gray'),

    jupiter = new Planet(sun, earthRadius, earthOrbitRadius * 2, 0.1 * Math.PI / 180, 'red'),

    planets = [sun, earth, moon, jupiter];


//#region Starting MainLoopX

MLX.update = update;
MLX.draw = draw;
MLX.raw = raw;
MLX.begin = begin;
MLX.end = end;
MLX.reset = reset;
MLX.start();

//#endregion