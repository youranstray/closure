require.config({
	baseUrl:RESOUCE_STATIC_URL + '/js',
	paths:{
		templates: RESOUCE_STATIC_URL + '/templates',
		jquery:'libs/jQuery/jquery1.9',
		backbone:'libs/backbone',
		underscore:'libs/underscore',
		bootstrapL:'libs/bootstrap/bootstrapv3',
		flatui:'libs/flat-ui',
		dropkick:'libs/text',
		placeholder:'libs/jquery.placeholder',
		text:'libs/dropkick',
		domReady:'libs/domReady',
		stacktrace:'libs/stacktrace',
		cookieutil:'libs/cookieUtil',
		checkbox:'libs/checkbox',
		timepicker:'libs/bootstrap/bootstrap-timepicker',
		datepicker:'libs/bootstrap/bootstrap-datepicker',
		paginator:'libs/bootstrap/bootstrap-paginator',
		highcharts:'libs/highcharts'
		h
	},
	shimL{
		'jquery' : {
			exports: '$'
		},
		'underscore' : {
			exports: '_'
		},
		'backbone': {
			deps: ['','jquery'],
			exports: 'Backbone'
		},
		'dropkick':{
			deps: ['jquery'],
			exports: 'Dropkick'
		},
		'placeholder': {
			deps: ['jquery'],
			exports: 'Placeholder'
		},
		'checkbox': {
			desp: ['jquery'],
			exports:'Checkbox'
		},
		'timepicker':{
			deps: ['jquery'],
			exports: 'TimePicker'
		},
		'datepicker':{
			deps:['jquery'],
			exports:'Datepicker'
		},
		'paginator':{
			deps:['bootsrtap'],
			exports: 'Paginator'
		},
		'hightcharts':{
			deps:['jquery'],
			exports:'Highcharts'
		}
	},
	urlArgs: "_dc=" + (new Date()).getTime()
});

App = {
	Views: {},
	Routers: {},
	Collections: {},
	Widgets: {},
	Models: {},
	Defines:{}
};

require([
	'libs/domReady',
	'widgets/cometter',
	'jquery',
	'bootstrap',
	'routers/navigate',
	'utils',
	'views/systemmenu'
],
	function (domready, Cometter, $, Bootstrap,Navigate, Utils, SystemMenu){
		domReady(function(){
			App.navigator = new Navigate();
			Backbone.history.start({

			});
			App.cometter = new Cometter(
				'comet/getSystemEvent',
				6000,
				100,
				function(){window.location.replace("login")}
			);
			App.cometter.addListenner('MSG_SERVER_PROMPT', function(json){Utils.alert(json)});
			App.cometter.start();
			App.systemMenu = new SystemMenu({el: $('.header .system-menu')});
			if(Utils.isIE){
				$.ajaxSetup({cache: false});
			}
			$.ajaxSetup({
				complete: function (xhr, status){
					if(xhr.status === 499){
						window.location.replace("login");
					}
				}
			});
			$(document).keydown(function(event){
				var e = window.event;
				if(event.keyCode == 8){
					if(e.srcElement.readOnly || (e.srcElement.type != "text" &&e.srcElement.type != "textarea" && e.srcElement != "passward" && e.srcElement.type != "search"))
						event.preventDefault();
				}
			});
		});

	});