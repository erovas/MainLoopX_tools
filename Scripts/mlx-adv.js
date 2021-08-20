(function(window, document){

    let TEMPLATE = document.createElement('template');
    TEMPLATE.innerHTML = '<form onsubmit=_MLX.prevent(event) class=mlx-dev> <div class=mlx-window__head> <div class=mlx-window__grab data-drog> <span>MLX Advanced</span> </div><button onclick=_MLX.min(this) name=min>─</button> <button onclick=_MLX.max(this) name=max style="display:none">+</button> <button onclick=_MLX.cls(this)>×</button> </div><div class="mlx-window__row mlx-adv__fps"> <fieldset> <legend>FPS</legend> <div> <span data-id="fps-count">120</span> </div></fieldset> <div> <button name="btn-default-values" class="mlx-btn">Reset values</button> </div></div><div class="mlx-window__body" data-body> <fieldset> <legend>Controls</legend> <div class="mlx-window__row mlx-adv__ctrl"> <div> <span>Time Step</span> <button name="btn-default-TS" class="mlx-btn">default</button> </div><div> <button name="btn-less-TS" class="mlx-btn ele-round">-</button> <input name="number-TS" min=0 step=1 value="16.666666666666668" data-float autocomplete=off> <button name="btn-plus-TS" class="mlx-btn ele-round">+</button> </div></div><div class="mlx-window__row mlx-adv__ctrl"> <div> <span>Simulation Time Step</span> <button name="btn-default-STS" class="mlx-btn">default</button> </div><div> <button name="btn-less-STS" class="mlx-btn ele-round">-</button> <input name="number-STS"  min=0 step=1 value="16.666666666666668" data-float autocomplete=off> <button name="btn-plus-STS" class="mlx-btn ele-round">+</button> </div></div><div class="mlx-window__row mlx-adv__ctrl"> <div> <span>Frame Delay</span> <button name="btn-default-FD" class="mlx-btn">default</button> </div><div> <button name="btn-less-FD" class="mlx-btn ele-round">-</button> <input name="number-FD"  min=0 step=1 value="16.666666666666668" data-float autocomplete=off> <button name="btn-plus-FD" class="mlx-btn ele-round">+</button> </div></div><div class="mlx-window__row mlx-adv__ctrl"> <div> <span>FPS Update Interval</span> <button name="btn-default-FUI" class="mlx-btn">default</button> </div><div> <button name="btn-less-FUI" class="mlx-btn ele-round">-</button> <input name="number-FUI"  min=0 step=1 value="1000" data-int autocomplete=off> <button name="btn-plus-FUI" class="mlx-btn ele-round">+</button> </div></div><div class="mlx-window__row mlx-adv__ctrl"> <div> <span>FPS Alpha</span> <button name="btn-default-FA" class="mlx-btn">default</button> </div><div> <button name="btn-less-FA" class="mlx-btn ele-round">-</button> <input name="number-FA"  min=0 step="0.1" value="0.9" data-float autocomplete=off> <button name="btn-plus-FA" class="mlx-btn ele-round">+</button> </div></div><div class="mlx-window__row mlx-adv__ctrl"> <div> <span>Max Update Steps</span> <button name="btn-default-MUS" class="mlx-btn">default</button> </div><div> <button name="btn-less-MUS" class="mlx-btn ele-round">-</button> <input name="number-MUS"  min=0 step=1 value=240 data-int autocomplete=off> <button name="btn-plus-MUS" class="mlx-btn ele-round">+</button> </div></div></fieldset> </div><div class="mlx-window__foot"> <div class="mlx-dev__btns"> <button name="btn-stop"><svg width="32" height="32" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g><path d="m13,3l-8,0c-1.1,0 -2,0.9 -2,2l0,8c0,1.1 0.9,2 2,2l8,0c1.1,0 2,-0.9 2,-2l0,-8c0,-1.1 -0.9,-2 -2,-2z"/></g></svg></button> <button name="btn-start"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g><path d="m2,14c0,0.547 0.461,1 1,1c0.336,0 0.672,-0.227 1,-0.375l11.258,-5.625c0.273,-0.133 0.742,-0.406 0.742,-1s-0.469,-0.867 -0.742,-1l-11.258,-5.625c-0.328,-0.148 -0.664,-0.375 -1,-0.375c-0.539,0 -1,0.453 -1,1l0,12z"/></g></svg></button> <button name="btn-repeat"><svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><g><path d="m94.2422,37.7578a5.9979,5.9979 0 0 0 -8.4844,0l-2.61,2.61a36.0347,36.0347 0 0 0 -35.1478,-28.3678a35.55,35.55 0 0 0 -21.6211,7.3594a5.9977,5.9977 0 0 0 7.2422,9.5625a23.6677,23.6677 0 0 1 14.3789,-4.9219a23.957,23.957 0 0 1 22.6729,16.4766l-3.97,-3.1641a5.9956,5.9956 0 1 0 -7.4765,9.375l15.0351,12a5.99,5.99 0 0 0 7.98,-0.4453l12,-12a5.9979,5.9979 0 0 0 0.0007,-8.4844z"/><path d="m62.3789,67.0781a23.6675,23.6675 0 0 1 -14.3789,4.9219a23.957,23.957 0 0 1 -22.6729,-16.4766l3.97,3.1641a5.9956,5.9956 0 1 0 7.4765,-9.375l-15.0351,-12a6.0071,6.0071 0 0 0 -7.98,0.4453l-12,12a5.9994,5.9994 0 0 0 8.4844,8.4844l2.61,-2.61a36.0347,36.0347 0 0 0 35.1471,28.3678a35.55,35.55 0 0 0 21.6211,-7.3594a5.9977,5.9977 0 1 0 -7.2422,-9.5625z"/></g></svg></button> </div></div></form>';

    let COMPONENT_NAME = 'mlx-adv';
    let ADVANCED = MLX.advanced;

    let _NUMBER_TIMESTEP = '-a';
    let _NUMBER_SIMULATION_TIMESTEP = '-b';
    let _NUMBER_FRAME_DELAY = '-c';
    let _NUMBER_FPS_UPDATE_INTERVAL = '-d';
    let _NUMBER_FPS_ALPHA = '-e';
    let _NUMBER_MAX_UPDATE_STEPS = '-f';
    let _FPS_COUNT = '-g';

    let CLICK = 'onclick';
    let INPUT = 'oninput';  //Por IE

    let min, max, value, stepInput;

    function setInputValue(input, val){
        min = parseFloat(input.min);
        min = isNaN(min)? -Infinity : min;
        max = parseFloat(input.max);
        max = isNaN(max)? Infinity : max;
        value = parseFloat(val.replace(/,/g, '.'));
        if(value < min || value > max)
            return;

        input.value = val;
    }


    let mlx_adv = {

        Extends: HTMLElement,

        Constructor: function(){
            let that = this;
            that.appendChild(TEMPLATE.content.cloneNode(true))
            that.className = _MLX.clazz;
            Drog.on(that);

            that[_FPS_COUNT] = that.querySelector('[data-id="fps-count"]');
            let form = that.querySelector('form');

            that[_NUMBER_TIMESTEP] = form['number-TS'];
            that[_NUMBER_SIMULATION_TIMESTEP] = form['number-STS'];
            that[_NUMBER_FRAME_DELAY] = form['number-FD'];
            that[_NUMBER_FPS_UPDATE_INTERVAL] = form['number-FUI'];
            that[_NUMBER_FPS_ALPHA] = form['number-FA'];
            that[_NUMBER_MAX_UPDATE_STEPS] = form['number-MUS'];

            form["btn-default-values"][CLICK] = function(){
                that.reset();
            }

            form["btn-default-TS"][CLICK] = function(){
                that.timeStep = 16.666666666666668;
            }

            form['btn-less-TS'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_TIMESTEP].value) || 0;
                stepInput = parseFloat(that[_NUMBER_TIMESTEP].getAttribute('step')) || 1;
                that.timeStep = value - stepInput;
            }

            form['btn-plus-TS'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_TIMESTEP].value) || 0;
                stepInput = parseFloat(that[_NUMBER_TIMESTEP].getAttribute('step')) || 1;
                that.timeStep = value + stepInput;
            }

            that[_NUMBER_TIMESTEP][INPUT] = function(){
                that.timeStep = that[_NUMBER_TIMESTEP].value
            }

            form["btn-default-STS"][CLICK] = function(){
                that.simulationTimeStep = 16.666666666666668;
            }

            form['btn-less-STS'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_SIMULATION_TIMESTEP].value) || 0;
                stepInput = parseFloat(that[_NUMBER_SIMULATION_TIMESTEP].getAttribute('step')) || 1;
                that.simulationTimeStep = value - stepInput;
            }

            form['btn-plus-STS'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_SIMULATION_TIMESTEP].value) || 0;
                stepInput = parseFloat(that[_NUMBER_SIMULATION_TIMESTEP].getAttribute('step')) || 1;
                that.simulationTimeStep = value + stepInput;
            }

            that[_NUMBER_SIMULATION_TIMESTEP][INPUT] = function(){
                that.simulationTimeStep = that[_NUMBER_SIMULATION_TIMESTEP].value
            }

            form["btn-default-FD"][CLICK] = function(){
                that.frameDelay = 16.666666666666668;
            }

            form['btn-less-FD'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_FRAME_DELAY].value) || 0;
                stepInput = parseFloat(that[_NUMBER_FRAME_DELAY].getAttribute('step')) || 1;
                that.frameDelay = value - stepInput;
            }

            form['btn-plus-FD'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_FRAME_DELAY].value) || 0;
                stepInput = parseFloat(that[_NUMBER_FRAME_DELAY].getAttribute('step')) || 1;
                that.frameDelay = value + stepInput;
            }

            that[_NUMBER_FRAME_DELAY][INPUT] = function(){
                that.frameDelay = that[_NUMBER_FRAME_DELAY].value
            }

            form["btn-default-FUI"][CLICK] = function(){
                that.FPSUpdateInterval = 1000;
            }

            form['btn-less-FUI'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_FPS_UPDATE_INTERVAL].value) || 0;
                stepInput = parseFloat(that[_NUMBER_FPS_UPDATE_INTERVAL].getAttribute('step')) || 1;
                that.FPSUpdateInterval = value - stepInput;
            }

            form['btn-plus-FUI'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_FPS_UPDATE_INTERVAL].value) || 0;
                stepInput = parseFloat(that[_NUMBER_FPS_UPDATE_INTERVAL].getAttribute('step')) || 1;
                that.FPSUpdateInterval = value + stepInput;
            }

            that[_NUMBER_FPS_UPDATE_INTERVAL][INPUT] = function(){
                value = that[_NUMBER_FPS_UPDATE_INTERVAL].value;
                
                if(value.indexOf(',') > -1 || value.indexOf('.') > -1)
                    return;

                that.FPSUpdateInterval = value;
            }

            form["btn-default-FA"][CLICK] = function(){
                that.FPSAlpha = 0.9;
            }

            form['btn-less-FA'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_FPS_ALPHA].value) || 0;
                stepInput = parseFloat(that[_NUMBER_FPS_ALPHA].getAttribute('step')) || 1;
                that.FPSAlpha = value - stepInput;
            }

            form['btn-plus-FA'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_FPS_ALPHA].value) || 0;
                stepInput = parseFloat(that[_NUMBER_FPS_ALPHA].getAttribute('step')) || 1;
                that.FPSAlpha = value + stepInput;
            }

            that[_NUMBER_FPS_ALPHA][INPUT] = function(){
                that.FPSAlpha = that[_NUMBER_FPS_ALPHA].value
            }

            form["btn-default-MUS"][CLICK] = function(){
                that.maxUpdateSteps = 240;
            }

            form['btn-less-MUS'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_MAX_UPDATE_STEPS].value) || 0;
                stepInput = parseFloat(that[_NUMBER_MAX_UPDATE_STEPS].getAttribute('step')) || 1;
                that.maxUpdateSteps = value - stepInput;
            }

            form['btn-plus-MUS'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_MAX_UPDATE_STEPS].value) || 0;
                stepInput = parseFloat(that[_NUMBER_MAX_UPDATE_STEPS].getAttribute('step')) || 1;
                that.maxUpdateSteps = value + stepInput;
            }

            that[_NUMBER_MAX_UPDATE_STEPS][INPUT] = function(){

                value = that[_NUMBER_MAX_UPDATE_STEPS].value;

                if(value.indexOf(',') > -1 || value.indexOf('.') > -1)
                    return;

                that.maxUpdateSteps = value;
            }

            form['btn-stop'][CLICK] = function(){
                MLX.stop();
            }

            form['btn-start'][CLICK] = function(){
                MLX.start();
            }

            form['btn-repeat'][CLICK] = function(){
                MLX.resetUser();
            }

        },

        set timeStep(value){
            value += '';
            setInputValue(this[_NUMBER_TIMESTEP], value)
            ADVANCED.timeStep = parseFloat(value.replace(/,/g, '.'));
        },

        set simulationTimeStep(value){
            value += '';
            setInputValue(this[_NUMBER_SIMULATION_TIMESTEP], value)
            ADVANCED.simulationTimeStep = parseFloat(value.replace(/,/g, '.'));
        },

        set frameDelay(value){
            value += '';
            setInputValue(this[_NUMBER_FRAME_DELAY], value)
            ADVANCED.frameDelay = parseFloat(value.replace(/,/g, '.'));
        },

        set FPSUpdateInterval(value){
            ADVANCED.fpsUpdateInterval = parseFloat(value);
            this[_NUMBER_FPS_UPDATE_INTERVAL].value = value;
        },

        set FPSAlpha(value){
            value += '';
            setInputValue(this[_NUMBER_FPS_ALPHA], value)
            ADVANCED.fpsAlpha = parseFloat(value.replace(/,/g, '.'));
        },

        set maxUpdateSteps(value){
            ADVANCED.maxUpdateSteps = parseFloat(value);
            this[_NUMBER_MAX_UPDATE_STEPS].value = value;
        },

        set FPSCount(value){
            this[_FPS_COUNT].textContent = value;
        },

        reset: function(){
            let that = this;
            that.timeStep = 16.666666666666668;
            that.simulationTimeStep = 16.666666666666668;
            that.frameDelay = 16.666666666666668;
            that.FPSUpdateInterval = 1000;
            that.FPSAlpha = 0.9;
            that.maxUpdateSteps = 240;
        }

    }

    ES5customElements.define(COMPONENT_NAME, mlx_adv);

})(window, document);