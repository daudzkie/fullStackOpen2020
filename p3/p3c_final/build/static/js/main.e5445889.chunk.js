(this.webpackJsonpcovidtracker=this.webpackJsonpcovidtracker||[]).push([[0],{14:function(e,t,n){e.exports=n(36)},36:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(13),u=n.n(r),c=n(2),l=n(3),i=n.n(l),s=function(){return i.a.get("/api/persons")},m=function(e){return i.a.post("/api/persons",e)},d=function(e,t){return i.a.put("".concat("/api/persons","/").concat(e),t)},f=function(e){var t=e.message,n=e.error;if(null===t)return null;var a={};return a=n?{color:"red",backgroundColor:"#lime",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}:{color:"green",backgroundColor:"#00968",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},o.a.createElement("div",{style:a},t)},b=function(){var e=Object(a.useState)({}),t=Object(c.a)(e,2),n=t[0],r=t[1],u=Object(a.useState)([]),l=Object(c.a)(u,2),b=l[0],p=l[1],g=Object(a.useState)(""),v=Object(c.a)(g,2),E=v[0],h=v[1],O=Object(a.useState)(""),j=Object(c.a)(O,2),y=j[0],w=j[1],S=Object(a.useState)(""),k=Object(c.a)(S,2),C=k[0],A=k[1],x=Object(a.useState)(null),B=Object(c.a)(x,2),z=B[0],J=B[1],R=Object(a.useState)(!1),T=Object(c.a)(R,2),D=T[0],F=T[1];Object(a.useEffect)((function(){s().then((function(e){r(e.data)}))}),[E,y]),console.log("Entries Arr",n);return console.log("Filter Array",b),o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(f,{message:z,error:D}),o.a.createElement("p",null,"filter shown with "," ",o.a.createElement("input",{type:"text",value:E,onChange:function(e){h(e.target.value),p(n.filter((function(e){return e.name&&-1!==e.name.indexOf(E)})))}}),o.a.createElement("button",{onClick:function(e){p([]),h("")}},"clear")),o.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={name:y,number:C};if(n.find((function(e){return e.name===y}))){var a=n.find((function(e){return e.name===y}));window.confirm(y+" is already in your contacts. Would you like to update the info?")&&d(a.id,t).then((function(e){console.log(y+" information was updated"),J(y+" information was updated"),F(!1),w(""),A("")}))}else m(t).then((function(e){r(n.concat(t)),J(y+" is successfully added"),F(!1)})),setTimeout((function(){J(null)}),5e3),w(""),A("")}},o.a.createElement("div",null,o.a.createElement("p",null,"name:"," ",o.a.createElement("input",{placeholder:"name",value:y,onChange:function(e){w(e.target.value)}})),o.a.createElement("p",null,"number: "," ",o.a.createElement("input",{placeholder:"number",value:C,onChange:function(e){A(e.target.value)}}))),o.a.createElement("button",null,"Add new")),o.a.createElement("h2",null,"Numbers"),b.map((function(e,t){return o.a.createElement("h4",{key:t},e.id," ",e.name," - ",e.number," "," ",o.a.createElement("button",{onClick:(a=e.id,r=e.name,function(){var e="/api/persons/".concat(a);console.log(a),console.log(r),console.log(e),window.confirm("Are your sure you want to remove "+r+" ?")&&i.a.delete(e).then((function(e){console.log(e),p(n.filter((function(e){return e.id!==a})))})),J(r+" was successfully removed from the server"),F(!0),h(""),setTimeout((function(){J(null)}),5e3)})},"delete"));var a,r})))};u.a.render(o.a.createElement(b,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.e5445889.chunk.js.map