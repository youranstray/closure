define([
	'backbone',
	'text!templates/request-page.html',
	'views/requestform',
	'views/vtabview',
	'views/submitedreqview',
	'views/uncommittedreqview',
	'views/rejectedreqview',
	'views/rejectedreqview',
	'collection/cases',
	'text!templates/search-form.html',
	'views/searchform'
	],
	function (Backbone, reqPageTpl, CaseForm, VtabView, SubmitedReqView, UncommittedReqView, RejectedReqView, Cases,Searchhtm, SearchForm){
		App.Views.Requestmanager = Backbone.View.extend({
			events: {
				'keydown .topbar .search input': 'OnSearchKeyDown',
				'click .topbar .create': 'createBtnClicked',
				'click .topbar .createSearch':'createSearchBtnClicked'
			},
			initialize: function(options){
				_.bindAll(this, 'render', 'loadComplete');
				this.$el.find('.content').html(reqPageTpl);
				this.form = new CaseForm({ el: this.$el.find(.caseform), parent: this});
				this.tabview =  new VtabView({el: this.$el.find('.vtabview'), parent: this});
				this,newReqCollection = new Cases(null, {url:'rest/arraignment/getSavedArrs'});
				this.submiReqCollection = new Cases(null, {url:'rest/arraignment/getCommitedArrs'});
				this.tabview.addview('submited', SubmitedReqView, '审批中的预约', this.subnitReqCollection);
				this.tabview.addview('rejected', RejectedReqView, '被驳回的预约', new Cases(null, {url: 'rest/arraignment/getRejectedArrs'}));
				this.tabview.addview('uncommitted', UncommittedReqView, '未提交的预约', this.newReqCollection);

				this.modalDlg = new App.Widgets.ModalDlg({title: '高级搜索', content: Searchhtm, id: 'search-form'});
				this.modalDlg.form = new SearchForm({el: this.modalDlg.content});
				this.modalDlg.form.on('disappear', this.onsearchformdisappear, this);
				var me = this;
				this.form.on('disappear', this.onformdisaappear, this);
				this.render();
			},
			render: function () {
				this.tabview.render();
			},
			onSearchKeyDown: function (e) {
				if (e.keyCode == 13){
					var View = this.tabview.getCurView();
					if (View) {
						View.render({'caseName': $(e.target).val()});
					}
				}
			},
			onformdisappear: function(reason, form)
			{
				this.form.unload();
				this.animateSwithch(this.form.$el, this.$el.find('.content'));
				if(reason !== 'cancel'){
					var View = this.tabview.getCurView();
					if (View){
						View.render();
					}
				}
			},
			createBtnClicked:function(e){
				this.form.render();
				this.animateSwitch(this.$el.find('.content'), this.form.$el);
				this.form.reload(new App.Models.Case({interUserVOOne: {id: G_USER.id}}));
				this.form.mode('create');
			},
			createSearchBtnClicked: function(e){
				var me = this;
				this.modalDlg.domodal();
				this.modalDlg.form.render();
			},
			onsearchfordisappear: function(reason, form){
				var attrs = form.retrieve();
				this.modalDlg.form.unload();
				this.modalDlg.close();
				if(reason !== 'cancel'){
					var View = this.tabview.getCurView();
					if(View){
						View.render(attrs);
					}
				}
			},
			modifyRequest: function(record){
				this.form.render();
				this.animateSwitch(this.$el.find('.content'), this.form.$el);
				this.form.reload(record);
				this.form.mode('edit');
			},
			loadComplete:function(e){

			},
			animateSwith:function(willhide, willshow){
				willhide.hide(function(){willshow.slideDown();});
			},
		});
		return App.Views.RequestManager;
	});
