(function(window, document){

    let TEMPLATE = document.createElement('template');
    TEMPLATE.innerHTML = '<form onsubmit=_MLX.prevent(event) class=mlx-dev> <div class=mlx-window__head> <div class=mlx-window__grab data-drog> <span data-id="title">MLX Raw</span> </div><button onclick=_MLX.min(this) name=min>─</button> <button onclick=_MLX.max(this) name=max style="display:none">+</button> <button onclick=_MLX.cls(this)>×</button> </div><div class="mlx-window__row mlx-info__fps"> <fieldset> <legend>FPS</legend> <div> <span data-id="fps-count">120</span> </div></fieldset> </div><div class="mlx-window__body" data-body> <fieldset> <legend>Information</legend> <div class="mlx-window__row mlx-info__ctrl"> <div> <span>Time Stamp</span> </div><div> <input name="TS" 1 value="16" readonly> </div></div><div class="mlx-window__row mlx-info__ctrl"> <div> <span>Frame Delta</span> </div><div> <input name="FD" 1 value="16" readonly> </div></div><div class="mlx-window__row mlx-info__ctrl"> <div> <span>Last Frame Delta</span> </div><div> <input name="LFD" value="16" readonly> </div></div><div class="mlx-window__row mlx-info__ctrl"> <div> <span>Elapse Time</span> </div><div> <input name="ET" value="1000" readonly> </div></div><div class="mlx-window__row mlx-info__ctrl"> <div> <span>Last FPS Update</span> </div><div> <input name="LFU" value="0.9" readonly> </div></div><div class="mlx-window__row mlx-info__ctrl"> <div> <span>Frames Since Last FPS Update</span> </div><div> <input name="FSLFU" value=240 readonly> </div></div><div class="mlx-window__row mlx-info__ctrl"> <div> <span>Number Update Steps</span> </div><div> <input name="NUS" value=240 readonly> </div></div><div class="mlx-window__row mlx-info__ctrl"> <div> <span>Panic</span> </div><div> <input name="P" value="false" readonly> </div></div></fieldset> </div><div class="mlx-window__foot"> <div class="mlx-dev__btns"> <button name="btn-stop"><svg width="32" height="32" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g><path d="m13,3l-8,0c-1.1,0 -2,0.9 -2,2l0,8c0,1.1 0.9,2 2,2l8,0c1.1,0 2,-0.9 2,-2l0,-8c0,-1.1 -0.9,-2 -2,-2z"/></g></svg></button> <button name="btn-start"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g><path d="m2,14c0,0.547 0.461,1 1,1c0.336,0 0.672,-0.227 1,-0.375l11.258,-5.625c0.273,-0.133 0.742,-0.406 0.742,-1s-0.469,-0.867 -0.742,-1l-11.258,-5.625c-0.328,-0.148 -0.664,-0.375 -1,-0.375c-0.539,0 -1,0.453 -1,1l0,12z"/></g></svg></button> <button name="btn-repeat"><svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><g><path d="m94.2422,37.7578a5.9979,5.9979 0 0 0 -8.4844,0l-2.61,2.61a36.0347,36.0347 0 0 0 -35.1478,-28.3678a35.55,35.55 0 0 0 -21.6211,7.3594a5.9977,5.9977 0 0 0 7.2422,9.5625a23.6677,23.6677 0 0 1 14.3789,-4.9219a23.957,23.957 0 0 1 22.6729,16.4766l-3.97,-3.1641a5.9956,5.9956 0 1 0 -7.4765,9.375l15.0351,12a5.99,5.99 0 0 0 7.98,-0.4453l12,-12a5.9979,5.9979 0 0 0 0.0007,-8.4844z"/><path d="m62.3789,67.0781a23.6675,23.6675 0 0 1 -14.3789,4.9219a23.957,23.957 0 0 1 -22.6729,-16.4766l3.97,3.1641a5.9956,5.9956 0 1 0 7.4765,-9.375l-15.0351,-12a6.0071,6.0071 0 0 0 -7.98,0.4453l-12,12a5.9994,5.9994 0 0 0 8.4844,8.4844l2.61,-2.61a36.0347,36.0347 0 0 0 35.1471,28.3678a35.55,35.55 0 0 0 21.6211,-7.3594a5.9977,5.9977 0 1 0 -7.2422,-9.5625z"/></g></svg></button> </div></div></form>';

    let COMPONENT_NAME = 'mlx-info';

    let _FORM = '-a';
    let _FPS_COUNT = '-b';
    let CLICK = 'onclick';

    let mlx_info = {

        Extends: HTMLElement,

        Constructor: function(){
            let that = this;
            that.appendChild(TEMPLATE.content.cloneNode(true))
            that.className = _MLX.clazz;
            Drog.on(that);
            let form = that[_FORM] = that.querySelector('form');
            that[_FPS_COUNT] = that.querySelector('[data-id="fps-count"]');

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

        set title(value){
            this.querySelector('[data-id="title"]').textContent = value;
        },

        update: function(fps, panic, timestamp, frameDelta, lastFrameTimeMs, elapsedTime, lastFpsUpdate, framesSinceLastFpsUpdate, numUpdateSteps){
            let that = this;
            that[_FPS_COUNT].textContent = fps;
            that[_FORM]['TS'].value = timestamp;
            that[_FORM]['FD'].value = frameDelta;
            that[_FORM]['LFD'].value = lastFrameTimeMs;
            that[_FORM]['ET'].value = elapsedTime;
            that[_FORM]['LFU'].value = lastFpsUpdate;
            that[_FORM]['FSLFU'].value = framesSinceLastFpsUpdate;
            that[_FORM]['NUS'].value = numUpdateSteps;
            that[_FORM]['P'].value = panic;
        }


    }

    ES5customElements.define(COMPONENT_NAME, mlx_info);

})(window, document);