import Vue from 'vue';
import hljs from 'highlightjs';
import 'highlightjs/styles/darcula.css';

Vue.directive('highlight', function (el) {
    var blocks = el.querySelectorAll('pre code');
    blocks.forEach(function (block) {
        hljs.highlightBlock(block);
    });
});
