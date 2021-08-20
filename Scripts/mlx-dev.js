(function(window, document){

    let TEMPLATE = document.createElement('template');
    TEMPLATE.innerHTML = '<form onsubmit=_MLX.prevent(event) class=mlx-dev><div class=mlx-window__head><div class=mlx-window__grab data-drog><span>MLX Dev</span></div><button onclick=_MLX.min(this) name=min>─</button><button onclick=_MLX.max(this) name=max style="display:none">+</button><button onclick=_MLX.cls(this)>×</button></div><div class="mlx-window__row mlx-dev__fps"><fieldset><legend>FPS</legend><div><span data-id="fps-count">120</span><div data-id="fps-state"></div></div></fieldset><div><button name="btn-default-values" class="mlx-btn">Reset values</button></div></div><div class="mlx-window__body" data-body><fieldset><legend>Controls</legend><div class="mlx-window__row mlx-dev__ctrl"><div><span>Steps</span><button name="btn-less-steps" class="mlx-btn ele-round">-</button><input name="number-steps" class="mlx-number" min="1" max=144 step=1 value=60 maxlength=3 data-int autocomplete=off><button name="btn-plus-steps"class="mlx-btn ele-round">+</button><button name="btn-default-steps" class="mlx-btn">default</button></div><div><span>1</span><input name="range-steps" type=range class="mlx-range" min=1 max=144 step=1 value=60><span>144</span></div></div><div class="mlx-window__row mlx-dev__ctrl"><div><span>Speed</span><button name="btn-less-speed" class="mlx-btn ele-round">-</button><input name="number-speed" class="mlx-number" min=1 max=600 step=1 value=60 maxlength=3 data-int autocomplete=off><button name="btn-plus-speed" class="mlx-btn ele-round">+</button><button name="btn-default-speed" class="mlx-btn">default</button></div><div><span>1</span><input name="range-speed" type=range class="mlx-range" id="step" min=1 max=600 step=1 value=60><span>600</span></div></div><div class="mlx-window__row mlx-dev__ctrl"><div><span>FPS</span><button name="btn-less-fps" class="mlx-btn ele-round">-</button><input name="number-fps" class="mlx-number" min=1 max=120 step=1 value=60 maxlength=3 data-int autocomplete=off><button name="btn-plus-fps" class="mlx-btn ele-round">+</button><button name="btn-default-fps" class="mlx-btn">default</button></div><div><span>1</span><input name="range-fps" type=range class="mlx-range" min=1 max=120 step=1 value=60><span>120</span></div></div></fieldset></div><div class="mlx-window__foot"><div class="mlx-dev__btns"><button name="btn-stop"><svg width="32" height="32" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g><path d="m13,3l-8,0c-1.1,0 -2,0.9 -2,2l0,8c0,1.1 0.9,2 2,2l8,0c1.1,0 2,-0.9 2,-2l0,-8c0,-1.1 -0.9,-2 -2,-2z"/></g></svg></button><button name="btn-start"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g><path d="m2,14c0,0.547 0.461,1 1,1c0.336,0 0.672,-0.227 1,-0.375l11.258,-5.625c0.273,-0.133 0.742,-0.406 0.742,-1s-0.469,-0.867 -0.742,-1l-11.258,-5.625c-0.328,-0.148 -0.664,-0.375 -1,-0.375c-0.539,0 -1,0.453 -1,1l0,12z"/></g></button><button name="btn-repeat"><svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><g><path d="m94.2422,37.7578a5.9979,5.9979 0 0 0 -8.4844,0l-2.61,2.61a36.0347,36.0347 0 0 0 -35.1478,-28.3678a35.55,35.55 0 0 0 -21.6211,7.3594a5.9977,5.9977 0 0 0 7.2422,9.5625a23.6677,23.6677 0 0 1 14.3789,-4.9219a23.957,23.957 0 0 1 22.6729,16.4766l-3.97,-3.1641a5.9956,5.9956 0 1 0 -7.4765,9.375l15.0351,12a5.99,5.99 0 0 0 7.98,-0.4453l12,-12a5.9979,5.9979 0 0 0 0.0007,-8.4844z"/><path d="m62.3789,67.0781a23.6675,23.6675 0 0 1 -14.3789,4.9219a23.957,23.957 0 0 1 -22.6729,-16.4766l3.97,3.1641a5.9956,5.9956 0 1 0 7.4765,-9.375l-15.0351,-12a6.0071,6.0071 0 0 0 -7.98,0.4453l-12,12a5.9994,5.9994 0 0 0 8.4844,8.4844l2.61,-2.61a36.0347,36.0347 0 0 0 35.1471,28.3678a35.55,35.55 0 0 0 21.6211,-7.3594a5.9977,5.9977 0 1 0 -7.2422,-9.5625z"/></g></svg></button></div></div></form>';

    let COMPONENT_NAME = 'mlx-dev';
    let DEVELOPER = MLX.dev

    let _NUMBER_STEPS = '-a';
    let _RANGE_STEPS = '-b';

    let _NUMBER_SPEED = '-c';
    let _RANGE_SPEED = '-d';

    let _NUMBER_FPS = '-e';
    let _RANGE_FPS = '-f';

    let _LED = '-g';
    let _FPS_COUNT = '-h';

    let CLICK = 'onclick';
    let INPUT = !!document.documentMode? 'onchange' : 'oninput';  //Por IE

    let min, max, value, stepInput, color;

    function setInputsValue(inputs, value){

        //value = parseFloat(value);

        if(isNaN(value))
            return;

        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            min = parseFloat(input.min);
            min = isNaN(min)? -Infinity : min;
            max = parseFloat(input.max);
            max = isNaN(max)? Infinity : max;

            if(value < min || value > max)
                continue;

            input.value = value;
        }
    }

    let mlx_dev = {

        Extends: HTMLElement,

        Constructor: function(){
            let that = this;
            that.appendChild(TEMPLATE.content.cloneNode(true))
            that.className = _MLX.clazz;
            Drog.on(that);

            that[_LED] = that.querySelector('[data-id="fps-state"]');
            that[_FPS_COUNT] = that.querySelector('[data-id="fps-count"]');

            let form = that.querySelector('form');
            that[_NUMBER_STEPS] = form['number-steps'];
            that[_RANGE_STEPS] = form['range-steps'];

            that[_NUMBER_SPEED] = form['number-speed'];
            that[_RANGE_SPEED] = form['range-speed'];

            that[_NUMBER_FPS] = form['number-fps'];
            that[_RANGE_FPS] = form['range-fps'];

            form["btn-default-values"][CLICK] = function(){
                that.reset();
            }

            form["btn-default-steps"][CLICK] = function(){
                that.Steps = 60;
            }

            form["btn-default-speed"][CLICK] = function(){
                that.Speed = 60;
            }

            form["btn-default-fps"][CLICK] = function(){
                that.FPS = 60;
            }

            form['btn-less-steps'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_STEPS].value) || 0;
                stepInput = parseFloat(that[_NUMBER_STEPS].getAttribute('step')) || 1;
                that.Steps = value - stepInput;
            }

            form['btn-plus-steps'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_STEPS].value) || 0;
                stepInput = parseFloat(that[_NUMBER_STEPS].getAttribute('step')) || 1;
                that.Steps = value + stepInput;
            }

            form['btn-less-speed'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_SPEED].value) || 0;
                stepInput = parseFloat(that[_NUMBER_SPEED].getAttribute('step')) || 1;
                that.Speed = value - stepInput;
            }

            form['btn-plus-speed'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_SPEED].value) || 0;
                stepInput = parseFloat(that[_NUMBER_SPEED].getAttribute('step')) || 1;
                that.Speed = value + stepInput;
            }

            form['btn-less-fps'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_FPS].value) || 0;
                stepInput = parseFloat(that[_NUMBER_FPS].getAttribute('step')) || 1;
                that.FPS = value - stepInput;
            }

            form['btn-plus-fps'][CLICK] = function(){
                value = parseFloat(that[_NUMBER_FPS].value) || 0;
                stepInput = parseFloat(that[_NUMBER_FPS].getAttribute('step')) || 1;
                that.FPS = value + stepInput;
            }

            that[_NUMBER_STEPS][INPUT] = function(){
                value = parseFloat(that[_NUMBER_STEPS].value) || 0;
                that.Steps = value
            }

            that[_RANGE_STEPS][INPUT] = function(){
                value = parseFloat(that[_RANGE_STEPS].value) || 0;
                that.Steps = value
            }

            that[_NUMBER_SPEED][INPUT] = function(){
                value = parseFloat(that[_NUMBER_SPEED].value) || 0;
                that.Speed = value
            }

            that[_RANGE_SPEED][INPUT] = function(){
                value = parseFloat(that[_RANGE_SPEED].value) || 0;
                that.Speed = value
            }

            that[_NUMBER_FPS][INPUT] = function(){
                value = parseFloat(that[_NUMBER_FPS].value) || 0;
                that.FPS = value
            }

            that[_RANGE_FPS][INPUT] = function(){
                value = parseFloat(that[_RANGE_FPS].value) || 0;
                that.FPS = value
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

        set Steps(value){
            value = parseFloat(value);
            setInputsValue([ this[_NUMBER_STEPS], this[_RANGE_STEPS] ], value)
            DEVELOPER.steps = value;
        },

        set Speed(value){
            value = parseFloat(value);
            setInputsValue([ this[_NUMBER_SPEED], this[_RANGE_SPEED] ], value)
            DEVELOPER.speed = value;
        },

        set FPS(value){
            value = parseFloat(value);
            setInputsValue([ this[_NUMBER_FPS], this[_RANGE_FPS] ], value)
            DEVELOPER.maxFPS = value;
        },

        set FPSCount(value){
            value = Math.round(value);
            this[_FPS_COUNT].textContent = value;

            if(value <= 14)
                color = '#E22E2F';
            else if(value <= 26)
                color = '#F08130';
            else if(value <= 40)
                color = '#FFD334';
            else if(value <= 54)
                color = '#80C02B';
            else
                color = '#01AD23';

            this[_LED].style.backgroundColor = color;
        },

        reset: function(){
            this.Steps = 60;
            this.Speed = 60;
            this.FPS = 60;
        }
    }

    ES5customElements.define(COMPONENT_NAME, mlx_dev);

})(window, document);