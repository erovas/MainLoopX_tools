/**
 * template-tag-polyfill.js v1.1.0
 * Polyfill de <template> que intenta darle toda la funcionalidad nativa de este elemento en navegadores que NO lo soportan
 * [Back-compatibility: IE11+]
 * Copyright (c) 2021, Emanuel Rojas Vásquez
 * BSD 3-Clause License
 * https://github.com/erovas/template-tag-polyfill.js
 */
(function(window, document){

    if(window.HTMLTemplateElement)
        return;

    //#region CONSTANTES

    let INNERHTML_TXT = 'innerHTML';
    let OUTERHTML_TXT = 'outerHTML';
    let TEMPLATE_TAGNAME = 'TEMPLATE';

    //Guardara de forma "privada" un pseudo innerHTML del <template>
    let INNERHTML_ATTRIBUTE = '-i';  
    
    //Funciones nativas, porque se van a sobre escribir
    let PROTOTYPE_HTMLELEMENT = HTMLElement.prototype;
    let NATIVE_INNERHTML = Object.getOwnPropertyDescriptor(PROTOTYPE_HTMLELEMENT, INNERHTML_TXT);
    let NATIVE_OUTERHTML = Object.getOwnPropertyDescriptor(PROTOTYPE_HTMLELEMENT, OUTERHTML_TXT);
    let NATIVE_REMOVECHILD = PROTOTYPE_HTMLELEMENT.removeChild;
    let NATIVE_APPENDCHILD = PROTOTYPE_HTMLELEMENT.appendChild;
    let NATIVE_CREATEELEMENT = document.createElement;

    //<style> utilizado para display:none de todos los <template>
    let STYLE = NATIVE_CREATEELEMENT.call(document, 'style');

    //<div> utilizado para renderizar y generar el innerHTML
    let DIV = NATIVE_CREATEELEMENT.call(document, 'div');

    //Lista de nodos que estan en el DOM, para posteriormente renderizarlos
    let NODELIST_TEMPLATE = document.getElementsByTagName(TEMPLATE_TAGNAME);

    //#endregion

    //#region Funciones auxiliares

    /**
     * Renderiza y hace el polyfill de un <template> previamente creado
     * @param {HTMLElement} tag 
     */
    function _aux_renderTemplate(tag){

        //El <template> YA está renderizado
        if(tag.content)
            return;

        //Generar speudo innerHTML
        tag[INNERHTML_ATTRIBUTE] = NATIVE_INNERHTML.get.call(tag);

        let child = tag.childNodes;
        tag.content = document.createDocumentFragment();

        //Se llena el "content" con los hijos ilegitimos de <template>
        while(child[0])
            NATIVE_APPENDCHILD.call(tag.content, child[0]);

        //Asociar el constructor "original" reemplazando a "HTMLUnknownElement"
        tag.constructor = HTMLTemplateElement;
    }

    /**
     * Para realizar la acción de renderizado de los <template> que estan en el nodelist
     */
    function _aux_action(){
        //Asi para evitar problemas con el nodeList, porque quizas dentro de
        //<template> hay otro <template>
        let ARRAY_TEMPLATE = [].slice.call(NODELIST_TEMPLATE);

        for (let i = 0; i < ARRAY_TEMPLATE.length; i++)
            _aux_renderTemplate(ARRAY_TEMPLATE[i]);
    }

    //#endregion

    //#region Polyfill inicial en el DOM ya creado

    //Para emular el "instanceof" y la interfaz del objeto nativo
    window.HTMLTemplateElement = HTMLElement;

    //Ocultar <template>
    NATIVE_INNERHTML.set.call(STYLE, 'template{display:none}');
    NATIVE_APPENDCHILD.call(document.head, STYLE);

    //Renderizar todos los <template> que estan en el documento
    if(document.readyState == 'complete'){
        _aux_action();
        NODELIST_TEMPLATE = null;
    }
    else {
        let mutation = new MutationObserver(_aux_action);
        mutation.observe(document.documentElement, { childList: true, subtree: true });
        window.addEventListener('load', function(){
            mutation.disconnect();
            mutation = NODELIST_TEMPLATE = null;
        });
    }

    //#endregion

    //#region Redefinicion de metodos nativos

    Object.defineProperty(PROTOTYPE_HTMLELEMENT, INNERHTML_TXT, {

        get: function(){
            //Devuelve el pseudo innerHTML string si es un <template>
            return this.tagName == TEMPLATE_TAGNAME? this[INNERHTML_ATTRIBUTE] : NATIVE_INNERHTML.get.call(this);
        },

        set: function(value){

            let that = this;
            let array_templates;
            let i;

            if(that.tagName == TEMPLATE_TAGNAME){

                //Se renderizan los nodos.
                NATIVE_INNERHTML.set.call(DIV, value);

                //Se genera el pseudo innerHTML string
                that[INNERHTML_ATTRIBUTE] = NATIVE_INNERHTML.get.call(DIV);

                //Posibles <template> dentro del <template>
                array_templates = [].slice.call(DIV.getElementsByTagName(TEMPLATE_TAGNAME));

                //Se polyfillicean los posibles <templates> internos
                for (i = 0; i < array_templates.length; i++)
                    _aux_renderTemplate(array_templates[i]);

                let content = that.content;
                let childAdd = DIV.childNodes;
                let childRemove = content.childNodes;
                
                //Se eliminan los nodos del content del template
                while(childRemove[0])
                    NATIVE_REMOVECHILD.call(content, childRemove[0]);

                //Se agregan los nuevos nodos al content del template
                while(childAdd[0])
                    NATIVE_APPENDCHILD.call(content, childAdd[0]);
            }
            else {
                //NO es un <template>
                NATIVE_INNERHTML.set.call(that, value);

                //Posibles <template> dentro del este <element>
                array_templates = [].slice.call(DIV.getElementsByTagName(TEMPLATE_TAGNAME));

                //Se polyfillicean los posibles <templates> internos
                for (i = 0; i < array_templates.length; i++)
                    _aux_renderTemplate(array_templates[i]);
            }
        },

        configurable: true,
        enumerable: true
    });

    Object.defineProperty(PROTOTYPE_HTMLELEMENT, OUTERHTML_TXT, {

        get: function(){

            let that = this;

            if(that.tagName != TEMPLATE_TAGNAME)
                return NATIVE_OUTERHTML.get.call(that);

            let template = TEMPLATE_TAGNAME.toLowerCase();
            let n_outer = '<' + template;
            let attrs = that.attributes;
            let element;
            let i;

            //Montaje de un outerHTML simulado (toca de esta manera, o sino NO genera bien el <tag>)
            for (i = 0; i < attrs.length; i++) {
                element = attrs[i];
                n_outer += ' ' + element.name + '="' + element.value + '"';
            }
            
            return n_outer + '>' + that[INNERHTML_TXT] + '</' + template + '>';
        },

        set: function(value){
            NATIVE_OUTERHTML.set.call(this, value);
        },

        configurable: true,
        enumerable: true
    });

    Object.defineProperty(Document.prototype, 'createElement', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function(tagName, options){

            let tag = NATIVE_CREATEELEMENT.apply(this, arguments);

            if(tag.tagName == TEMPLATE_TAGNAME){
                tag.content = this.createDocumentFragment();
                tag.constructor = HTMLTemplateElement;
            }

            return tag;
        }
    });

    //#endregion

})(window, document);