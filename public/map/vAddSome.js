Vue.component("addSome",{
        props: ["cross"],
    template: '<li>{{cross.name}}</li>'
})

var addSome = new Vue({
    el:"#addSpan",
    data:{
    }
})