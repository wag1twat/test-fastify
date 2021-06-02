"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){e[n=void 0===n?r:n]=t[r]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&__createBinding(t,e,r);return __setModuleDefault(t,e),t},__awaiter=this&&this.__awaiter||function(e,a,u,s){return new(u=u||Promise)(function(r,t){function n(e){try{o(s.next(e))}catch(e){t(e)}}function i(e){try{o(s.throw(e))}catch(e){t(e)}}function o(e){var t;e.done?r(e.value):((t=e.value)instanceof u?t:new u(function(e){e(t)})).then(n,i)}o((s=s.apply(e,a||[])).next())})},__generator=this&&this.__generator||function(r,n){var i,o,a,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]},e={next:t(0),throw:t(1),return:t(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(i)throw new TypeError("Generator is already executing.");for(;u;)try{if(i=1,o&&(a=2&t[0]?o.return:t[0]?o.throw||((a=o.return)&&a.call(o),0):o.next)&&!(a=a.call(o,t[1])).done)return a;switch(o=0,(t=a?[2&t[0],a.value]:t)[0]){case 0:case 1:a=t;break;case 4:return u.label++,{value:t[1],done:!1};case 5:u.label++,o=t[1],t=[0];continue;case 7:t=u.ops.pop(),u.trys.pop();continue;default:if(!(a=0<(a=u.trys).length&&a[a.length-1])&&(6===t[0]||2===t[0])){u=0;continue}if(3===t[0]&&(!a||t[1]>a[0]&&t[1]<a[3])){u.label=t[1];break}if(6===t[0]&&u.label<a[1]){u.label=a[1],a=t;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(t);break}a[2]&&u.ops.pop(),u.trys.pop();continue}t=n.call(r,u)}catch(e){t=[6,e],o=0}finally{i=a=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.getFileRoute=void 0;var mime_types_1=__importDefault(require("mime-types")),fs=__importStar(require("fs")),path_1=__importDefault(require("path")),errors_1=require("../errors"),utils_1=require("../utils");exports.getFileRoute={method:"GET",url:"/file",schema:{querystring:{path:{type:"string"}},response:{200:{type:"object",properties:{result:{isFileType:!0}}},404:{type:"object",properties:{code:{type:"string"},message:{type:"string"}}}}},preHandler:function(t,r){return __awaiter(void 0,void 0,void 0,function(){return __generator(this,function(e){return utils_1.isPath(t.query.path)?[2]:[2,r.status(404).send(errors_1.InvalidParamsError({query:t.query.path}))]})})},handler:function(i,o){return __awaiter(void 0,void 0,void 0,function(){return __generator(this,function(e){try{fs.readFile(i.query.path,function(e,t){var r=path_1.default.basename(i.query.path),n=mime_types_1.default.lookup(r);o.headers({"Content-Type":n,"Content-Disposition":'attachment; filename="'+r+'"'}).send(e||t)})}catch(e){return[2,o.status(404).send(e)]}return[2]})})}};
//# sourceMappingURL=getFileRoute.js.map
