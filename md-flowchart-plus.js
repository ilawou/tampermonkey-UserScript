// ==UserScript==
// @name         Markdown Mermaid, flowchart, sequence, plantuml 使用
// @namespace    http://172.16.1.160:8080/
// @version      0.0.1
// @description  Markdown Mermaid, flowchart, sequence, plantuml 使用
// @author       junhong.wu
// @match        http://172.16.1.160:8080/*
// @match        https://github.com/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    var init = function(){
        // GitBucket
        if( $(".header-title").text() == 'GitBucket' ){
            console.log('GitBucket');
        } else if( location.href.indexOf('https://github.com') == 0 ){
            console.log('github');
        }

        var _load_mermaid_init = function(){

            if(
                typeof mermaid == "undefined" ||
                typeof flowchart == "undefined" ||
                typeof $().sequenceDiagram == "undefined"
            ){
                setTimeout(_load_mermaid_init, 1000);
            } else {
                mermaid.initialize({startOnLoad:true});
                // render(targetId, mermaidScript, insertDom)
                _replace_mermaid_code();

                $("#btn-preview").on('click', function(){
                    console.log(arguments);
                    setTimeout(
                        _replace_mermaid_code,
                        500
                    );
                });
            }

        };

        var _replace_mermaid_code = function(){
          $('pre.lang-mermaid, pre.lang-Mermaid').each(function(i){
              var $pre = $(this);
              var preId = "__mermaid_pre_"+i;
              $pre.attr('id',preId);
              var mermaidScript = $pre.text();
              var id = "__mermaid_"+i;
              var $newDiv = $("<div id='"+id+"'></div>");
              $pre.after($newDiv);
              mermaid.mermaidAPI.render(preId, mermaidScript, function( code, bindFunctions ){ $('#'+id).html(code); });
          });

          $('pre.lang-flow, pre.lang-Flow').each(function(i){
              var $pre = $(this);
              var preId = "__flow_pre_"+i;
              $pre.attr('id',preId);
              $pre.hide();
              var flowScript = $pre.text();
              var id = "__flowchart_"+i;
              var $newDiv = $("<div id='"+id+"'></div>");
              $pre.after($newDiv);
              var diagram = flowchart.parse(flowScript);
              diagram.drawSVG(id);

          });

          $('pre.lang-sequence, pre.lang-Sequence').each(function(i){
              var $pre = $(this);
              var preId = "__sequence_pre_"+i;
              $pre.attr('id',preId);
              $pre.hide();
              var sequenceScript = $pre.text();
              var id = "__sequence_"+i;
              var $newDiv = $("<div id='"+id+"'>"+sequenceScript+"</div>");
              $pre.after($newDiv);
              //mermaid.mermaidAPI.render(preId, sequenceScript, function( code, bindFunctions ){ $('#'+id).html(code); });
              //$newDiv.sequenceDiagram({theme: 'hand'});
              $newDiv.sequenceDiagram({theme: 'simple'});
          });

          $('pre.lang-plantuml, pre.lang-Plantuml').each(function(i){
              var $pre = $(this);
              var preId = "__plantuml_pre_"+i;
              $pre.attr('id',preId);
              $pre.hide();
              var plantumlScript = $pre.text();
              plantumlScript = plantumlScript.replaceAll('\n',';\n');
              var id = "__plantuml_"+i;
              var $newDiv = $("<div id='"+id+"'><img src='https://www.gravizo.com/svg?"+encodeURIComponent(plantumlScript)+"'></div>");
              $pre.after($newDiv);
          });

        };
        // mermaid
        $("body").append("<script id='js-mermaid' src='https://unpkg.com/mermaid@8.5.2/dist/mermaid.min.js'></script>");
        // sequence
        $("body").append("<script id='js-sequence-webfont' src='https://bramp.github.io/js-sequence-diagrams/js/webfont.js'></script>");
        $("body").append("<script id='js-sequence-snap-svg' src='https://bramp.github.io/js-sequence-diagrams/js/snap.svg-min.js'></script>");
        $("body").append("<script id='js-sequence-underscore' src='https://bramp.github.io/js-sequence-diagrams/js/underscore-min.js'></script>");
        $("body").append("<script id='js-sequence' src='https://bramp.github.io/js-sequence-diagrams/js/sequence-diagram-min.js'></script>");
        // flowchart
        $("body").append("<script id='js-flowchart-raphael' src='https://cdnjs.cloudflare.com/ajax/libs/raphael/2.3.0/raphael.min.js'></script>");
        $("body").append("<script id='js-flowchart' src='https://flowchart.js.org/flowchart-latest.js'></script>");



        _load_mermaid_init();


    };

    if( typeof jQuery === 'undefined'){
       var lp_script_jq = document.createElement('script');
        lp_script_jq.src = "//code.jquery.com/jquery-3.5.1.min.js";
        lp_script_jq.onload = function(){
           init();
        };
        document.body.appendChild(lp_script_jq);
        console.log('load jquery js.');
    } else {
        $(function(){
            init();
        });
    }

})();
