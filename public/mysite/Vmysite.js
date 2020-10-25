Vue.component('articles', {
  props: ["aaa"],
  template: "<div class = 'article'>\
                    <h1 class ='title'>{{aaa.title}}</h1>\
                    <p class = 'author'>作者:{{aaa.author}}</p>\
                    <p class = 'date'>{{aaa.date}}</p>\
                    </br>\
                    <span class = 'content' v-html ='aaa.content'></span>\
                </div>",
});
Vue.component('navli', {
  props: ["navitem"],
  template: "<li class='navLi' @click='jumpToHtml'>{{navitem.name}}</li>",
  methods: {
    jumpToHtml: function () {
      window.location.href = this.navitem.url;
    }
  },
});
Vue.component('pages', {
  props: ["page"],
  template: "<li>{{page.text}}</li>"
});

var app = new Vue({
  el: "#container",
  data: {
    articles: [],
    pageNum: [{
      id: 0,
      text: "上一页"
    }, {
      id: 1,
      text: "1"
    }, {
      id: -1,
      text: "下一页"
    }],

  },
  methods: {
    greet: function () {
      var thiss = this;
      $.post('/article/getall', {
        page: 1,
        limit: 5
      }, function (res) {
        var arr = [];
        for (var i in res.msg) {
          arr.push([res.msg[i], i]);
        };
        arr.reverse();
        var len = arr.length;
        var obj = {};
        for (var i = 0; i < len; i++) {
          arr[i][1] = i; //修改vue的排序
          obj[arr[i][1]] = arr[i][0];
        }
        console.log(arr);
        thiss.articles = obj;
      });
    }
  },
  mounted: function () {
    this.greet()
  }
})

var app1 = new Vue({
  el: "#nav",
  data: {
    navList: [{
      name: "首页",
      url: "./"
    }, {
      name: "地图",
      url: "./map/main.html"
    }, {
      name: "抽奖",
      url: "./choujiang.html"
    }]
  }
})