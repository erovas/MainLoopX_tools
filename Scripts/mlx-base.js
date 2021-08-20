(function(window, document){

	let target, min, max, value, keyCode, step, maxlength, valueRaw, valueRawComma, isInteger, isFloat, check, eventInput;

	let OLD_VALUE = '-a';
	let OLD_SELECTION_START = '-b';
	let OLD_SELECTION_END = '-c';

    let BODY_STRING = '[data-body]';
    let NONE_STRING = 'none';
    let MINIMIZE_STRING = 'min';
    let MAXIMIZE_STRING = 'max';
    let FORM_STRING = 'form';

	if(!!document.documentMode){ //Internet Explorer
        eventInput = document.createEvent('Event');
        eventInput.initEvent('input', true, true);
    }
    else {
        eventInput = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
    }

    //#region Control de los inputs como entrada de integer o float

    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        document.addEventListener(event, function(e) {

            target = e.target;
			isInteger = target.hasAttribute('data-int')
			isFloat = target.hasAttribute('data-float')

            if( !isInteger && !isFloat )
                return;

            min = parseFloat(target.min);
            min = isNaN(min)? -Infinity : min;
            max = parseFloat(target.max);
            max = isNaN(max)? Infinity : max;

            valueRaw = target.value
            valueRawComma = valueRaw.replace(/,/g, '.')
            
            value = valueRawComma.length === 1 && valueRawComma.indexOf('.') > -1? 0 : parseFloat(valueRawComma)
            value = isNaN(value)? min : value;

			if(e.type === 'keydown'){
				keyCode = e.keyCode || e.which;

				if(keyCode == 38 || keyCode == 40){
					value = valueRawComma === '-.'? 0 : value;
					step = target.getAttribute('step') || '1';
					step = parseFloat(step.replace(/,/g, '.'));
					step = isInteger? step | 0 : step;
					maxlength = parseFloat(target.getAttribute('maxlength')) || Infinity;
	
					if(keyCode === 38)
						value += step;
					else
						value -= step;

					//Evitar problemas de decimales que tienen varios lenguajes de programacion
					value = parseFloat(parseFloat(value).toPrecision(15));
	
					if(value >= min && value <= max && (value+'').length <= maxlength ){
						value = valueRaw.indexOf(',') > -1? (value+'').replace(/\./g, ',') : value;
						target.value = value;
						//Disparar eventos "input" porque se ha cambiado el value
						target.dispatchEvent(eventInput);
					}
					return;
				}
			}

            

            check = isInteger? (min >= 0? /^\d*$/.test(valueRaw) : /^-?\d*$/.test(valueRaw)) : (min >= 0? /^\d*[.,]?\d*$/.test(valueRaw) : /^-?\d*[.,]?\d*$/.test(valueRaw))

            if ( check && (valueRaw === '' || (value >= min && value <= max) )) {
                target[OLD_VALUE] = valueRaw;
                target[OLD_SELECTION_START] = target.selectionStart;
                target[OLD_SELECTION_END] = target.selectionEnd;
            } 
            else if (target.hasOwnProperty(OLD_VALUE)) {
                target.value = target[OLD_VALUE];
                target.setSelectionRange(target[OLD_SELECTION_START], target[OLD_SELECTION_END]);
            } 
            else {
                target.value = '';
            }
        });
    });

    //#endregion

    function querySelector(root, query){
        return root.querySelector(query);
    }

    function setValueInputs(inputs, values){
        let isArray = values instanceof Array;
        for (let i = 0; i < inputs.length; i++)
            inputs[i].value = isArray? values[i] : values
    }

    window._MLX = {

        clazz: 'mlx-window',

        prevent: function(e){
            e.preventDefault();
        },

        //Minimizar (display:none al body de la ventana) la ventana
        min: function(that){
            let father = that.closest(FORM_STRING);
            querySelector(father, BODY_STRING).style.display = NONE_STRING;
            that.style.display = NONE_STRING;
            father[MAXIMIZE_STRING].style.display = '';
        },

        //Maximizar (display:'' al body de la ventana) la ventana
        max: function(that){
            let father = that.closest(FORM_STRING);
            querySelector(father, BODY_STRING).style.display = '';
            that.style.display = NONE_STRING;
            father[MINIMIZE_STRING].style.display = '';
        },

        //Cerrar (display: none) la ventana
        cls: function(that){
            //that.closest(FORM_STRING).style.display = NONE_STRING
            //console.log(that.closest(FORM_STRING).parentNode)
            let self = that.closest(FORM_STRING).parentNode;
            self.parentNode.removeChild(self);
        },

        less: function(min, step, value, inputs, fn){
            min = parseFloat(min) || -Infinity;
            step = parseFloat(step) || 1;
            value = (parseFloat(value) || 0) - step;
            if(value >= min){
                setValueInputs(inputs, value);
                fn(min, step, value);
            }
        },

        plus: function(max, step, value, inputs, fn){
            max = parseFloat(max) || Infinity;
            step = parseFloat(step) || 1;
            value = (parseFloat(value) || 0) + step;
            if(value <= max){
                setValueInputs(inputs, value);
                fn(min, step, value);
            }
        }
    }

})(window, document);