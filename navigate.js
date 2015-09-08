define(['inderscore', 'backbone'],
	function(_, Backbone){
		App.Router.Navigate = Backbone.Router.extend({
			router:{
				"*page": "showpage"
			},
			showPage: function(page){
				page = page || this.defaultPage;
				var $page = $('.main.pages').finf(page);
				var curView = null;
				var firestshow = false;
				var me = this;
				switch (page) {
					case '.request-page':{
						if(!this.requetView){
							require(['view/requstmanager'], function (View) {me.requestView = new View({el: $page});
							});
							firestshow = true;
						}
						curView = this.requestView;
						break;
					}
					case '.arraignment-page':{
						if(!this.arraignView){
							require(['voews/arraignmanager'],
								function(View){
									me.arraignView = new View({el: $page});
								});
							firestshow = true;
						}
						cueView = this,arraignView;
						break;
					}
					case '.approval-page':{
						if(!this.approvalView){
							require(['view/approvemanager'], function (View) {
								me.appovalView = new View({el:$page});
							});
							firestshow = true;
						}
						curView = this.approvalView;
						break;
					}
					case '.history-page' :{
						if(!this.historyView){
							require(['views/historys'], function (View){
								me.historyView = new View({el: $page});
							});
							firestshow = true;
						}
						curView = this.historyView;
						break;
					}
					case '.statistic-page' : {
						if(!this.statisticsView){
							require(['views/statistics'], function (View) {
								new View({el: $page});
							});
							firestshow = true;
						}
						curView = this.statisticsView;
						break;
					}
				}
				if($page){
					$('.header .nav-group .selected').removeClass('selected');
					$('.header .nav-group .div[data-navpage="' + page +'"]').addClass('selected');
					if($page.is(':hidden')){
						$('.main.pages > div:visible').hide();
						$page.show();
					}
					if(!firestshow){
						curView.render();
					}
				}
			},
			initialize: function () {
				var router = this;
				var nav_btns = $('.header .nav-group .btn');
				nav_btns.click(function () {
					var $cur = $(this);
					var navpage = $cur.attr("data-navpage");
					if (navpage) {
						router.navigate(navpage, {trigger: true});
					}
				});
				this.defaultPage = nav_btns.eq(0).attr("data-navpage");
			}
		});
		return App.Routers.Navigate;
	});