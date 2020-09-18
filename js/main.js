$(function(){
	//解决键盘收起后页面不下沉的bug
	$('input[type="text"], input[type="number"]')
		.blur(function(){
			setTimeout(function(){
				var jFocused = $(':focus');
				//去除掉点击其他input丧失焦点的情况
				if(!jFocused.length){
					window.scroll(0,0);
				}
			})
		})
})

//页面切换方法
var page = {
	prev: 0,
	current: 0,
	page: null,
	track: [],
	init: function(){
		var self = this
		this.page = $('.page')

		this.bind()

		//测试用，去到哪页填哪页
		// this.go2(3)
		// setTimeout(function(){
		// 	self.go2(5)
		// }, 2*1000)
	},
	bind: function(){
		var self = this;
	},
	//去特定页
	//第二个参数className为去到目的页后给目的页添加一个特定class，暂时未用到，写上以备不时之需
	go2: function(i, cb){
		var self = this,
			bPrev = i > this.prev ? false : true

		if(i < 0){
			i = 0
		}

		if(i == self.current){
			return false
		}
		if(i == 3){
			$('#page_'+i)
			.addClass('current opci');
		} else {
			this.page
			.removeClass('current')
			$('#page_'+i)
			.addClass('current');
		}

		this.prev = i >= this.current ? this.current : i - 1
		this.current = i

	},
	//上一页
	prev: function(cb){
		var self = this

		this.go2(self.prev, cb)
	},
	//下一页
	next: function(cb){
		var self = this
		this.go2(self.current+1, cb)
	}
}
page.init();

var main = {
	num: 6,
	count: 0,
	countArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	countShuffle: null,
	eventtxt: [
		{
			num: 3,
			type: '',
			txt: '你居然触发了过关格！那就让这个欧气鉴定器来测测你的属性，器来！',
			url: '//player.bilibili.com/player.html?bvid=BV1F54y1m7tW&page=1'
		},{
			num: 6,
			type: '游戏',
			txt: '今天你参加了点钞比赛，听说只要赢得比赛就能拿到【欧洲玄学大法】。路人A不知为什么一直干扰你，最终你以1张的失误惜败于对手。',
			url: '//player.bilibili.com/player.html?bvid=BV1yk4y1y7uo&page=1'
		},{
			num: 5,
			type: '惩罚',
			txt: '你的对手对你使出了一招【天降正义】，以迅雷不及掩耳之势从你身边掠过。等你回过神时，发现自己脸上挂满了夹子，脸肿得和馒头一样大，只好去医院就医休息一天。',
			url: '//player.bilibili.com/player.html?bvid=BV1Dt4y1S7RC&page=1'
		},{
			num: 4,
			type: '事件',
			txt: '某天清晨醒来，你发现自己的头发竟然全部消失了！医生告诉你这是秃头症。伤心之余，你只好购买了医生推荐的植发套餐。',
			url: '//player.bilibili.com/player.html?bvid=BV1Hi4y1u7uL&page=1'
		},{
			num: 2,
			type: '奖励',
			txt: '买菜结账时，收银员欣喜的告诉你，你获得了友谊天长地久短袖一件。虽然你极力拒绝，但是店员仍旧强行把你和你的朋友套在了一起。',
			url: '//player.bilibili.com/player.html?bvid=BV1Ep4y1e7ce&page=1'
		},{
			num: 2,
			type: '游戏',
			txt: '公司团建，领导提议玩一个【鞋底撕名牌】的小游戏。面对强壮的你，小姐姐对你抛去了媚眼。你笑了笑，把她的脚抓得更紧了。最后，在她复杂的眼神里，你脱下她的鞋赢得了胜利。',
			url: '//player.bilibili.com/player.html?bvid=BV1Wi4y1u7Bu&page=1'
		},{
			num: 1,
			type: '游戏',
			txt: '你和妹妹一起参加【顶梁柱】比赛，你决定和妹妹合作一起通关。结果在抱起妹妹时，你的身体感受到一种超负荷的能量，成功闪了腰。你们只好中止比赛，去医院看病。',
			url: '//player.bilibili.com/player.html?bvid=BV1Fy4y1y79T&page=1'
		},{
			num: 1,
			type: '事件',
			txt: '朋友买了新款的撕腿毛神器，趁你不备先在你腿上试验了一下。你瞬间痛到两眼发黑，随后从朋友手里夺过神器，把朋友的汗毛撕了下来。听着朋友的惨叫，你慢悠悠的说，“这场游戏，没有赢家。”',
			url: '//player.bilibili.com/player.html?bvid=BV1nK4y1a7t6&page=1'
		},{
			num: 6,
			type: '奖励',
			txt: '你抽奖中了《神武4真好玩》综艺的嘉宾资格，在兴高采烈的上了节目5分钟，却因为回答过于生硬，在场的工作人员无一能接，最终拍摄中止。',
			url: '//player.bilibili.com/player.html?bvid=BV14A411E7pg&page=1'
		},{
			num: 6,
			type: '事件',
			txt: '你参加了一场绘画比赛，却在不知不觉中睡着了。等到醒来的时候，离交卷只剩5分钟了。于是你急中生智，拿出保鲜膜套在画框上，用脸用力的穿过了保鲜膜，成为了冠军！',
			url: '//player.bilibili.com/player.html?bvid=BV1kK4y1a7fn&page=1 '
		},
	],
	event: {
		'1': {
			upper: 2,
			type: ['youxi', 'shijian']
		},
		'2': {
			upper: 2,
			type: ['youxi', 'jiangli']
		},
		'4': {
			upper: 0,
			type: ['shijian']
		},
		'5': {
			upper: 0,
			type: ['chengfa']
		},
		'6': {
			upper: 3,
			type: ['youxi', 'shijian', 'jiangli']
		}

	},
	typeVal: {
		youxi: 1,
		chengfa: 2,
		shijian: 3,
		jiangli: 4
	},
	typeName: {
		youxi: '游戏',
		chengfa: '惩罚',
		shijian: '事件',
		jiangli: '奖励'
	},
	init: function () {
		this.bind();
		this.shuffle();
	},
	bind: function () {
		var self = this;

		$('.home_ctrl').on('click', function () {
			page.go2(1);
			self.initModel();
		});
		$('.model_item').on('click', function () {
			$('.model_item').removeClass('current');
			var $next = $(this).next();
			if ($next.length > 0) {
				$next.addClass('current');
			} else {
				self.closeModel();
			}
		});
		$('.touzi_pause').on('click', function () {
			self.palyTouzi();
		});
		$('.play_btn').on('click', function () {
			var video = document.getElementById('res_video');
			video.play();
			setTimeout(function () {
				$('.video_preview').hide();
			},1000)
		});
		$('.res_icon').on('click', function () {
			// var myVideo = document.getElementById('video');
			// myVideo.removeEventListener('ended');
			self.restIframe();
			if($(this).hasClass('go')){
				self.creatRes();
			}else{
				$('.touzi_pause').show();
				$('.touzi_play').hide();
				self.showMusic();
				page.go2(1);
			}
		});
		$('.jieqian').on('click', function () {
			self.showJieqian();
		});
		$('.close_jieqian').on('click', function () {
			self.closeJieqian();
		});
		$('.share').on('click', function () {
			self.showShare();
		});
		$('.close_share').on('click', function () {
			self.closeShare();
		});
		$('.play_again_btn').on('click', function () {
			self.shuffle()
			self.count = 0;
			$('.time span').html(10 - self.count);
			$('.touzi_pause').show();
			$('.touzi_play').hide();
			page.go2(1);
		});
	},
	//退出全屏
	exitFullscreen: function () {
	    var de = document;
	    if (de.exitFullscreen) {
	        de.exitFullscreen();
	    } else if (de.mozCancelFullScreen) {
	        de.mozCancelFullScreen();
	    } else if (de.webkitCancelFullScreen) {
	        de.webkitCancelFullScreen();
	    }
	},
	shuffle: function (){
		var self = this;
		var countArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		var length = countArr.length;
		var shuffled = Array(length);

		for (var index = 0, rand; index < length; index++) {
			rand = ~~(Math.random() * (index + 1));
			if (rand !== index) 
				shuffled[index] = shuffled[rand];
			shuffled[rand] = countArr[index];
		}
		console.log('---shuffled---', shuffled);

		self.countShuffle = shuffled;
	},
	palyTouzi: function () {
		var self = this;
		$('.touzi_pause').hide();
		$('.touzi_play').show();
		var touziMusic = document.getElementById('touzi_audio');
		if(musicStatus){
			touziMusic.play();
		}
		setTimeout(function () {
			var shffleIndex = self.countShuffle[self.count];
			var eventTxt = self.eventtxt[shffleIndex]; 
			self.hideMusic();
			if(eventTxt.num == '3'){
				$('#res_title').html('扔出 3 点，哇~了不起了不起！')
				$('#res_content').html(self.eventtxt[0].txt);
				self.setIframe(self.eventtxt[0].url);
				$('.res_bg').attr('src', 'image/res_bg2.gif');
				$('.touzi_res_img').attr('src', `image/dian/3.png`);
				$('.res_box .title').removeClass('fail').addClass('ok');
				$('.res_box_title').attr('src', 'image/perfect.png');
				$('.res_icon_btn').attr('src', 'image/go.png');
				$('.res_icon').removeClass('again').addClass('go');
				var vectorMusic = document.getElementById('vector_audio');
				if(musicStatus){
					vectorMusic.play();
				}
			} else {
				self.count++;
				$('#res_title').html(`扔出 ${eventTxt.num} 点，进入${eventTxt.type}格`)
				$('#res_content').html(eventTxt.txt);
				self.setIframe(eventTxt.url);
				$('.res_bg').attr('src', 'image/res_bg1.png');
				$('.touzi_res_img').attr('src', `image/dian/${eventTxt.num}.png`);
				$('.res_box .title').removeClass('ok').addClass('fail');
				$('.res_box_title').attr('src', 'image/good_job.png');
				$('.res_icon_btn').attr('src', 'image/again.png');
				$('.res_icon').addClass('again').removeClass('go');
				$('.time span').html(10 - self.count);
				var failMusic = document.getElementById('fail_audio');
				if(musicStatus){
					failMusic.play();
				}
				
			}
			page.go2(2);
		}, 2000)
	},
	showMusic: function () {
		var bgMusic = document.getElementById('audio');
        if (musicStatus){
            bgMusic.play();
        }
        $('.bg_music').show();
	},
	hideMusic: function () {
		var bgMusic = document.getElementById('audio');
		if (musicStatus){
            bgMusic.pause();
        }
		$('.bg_music').hide();
	},
	setIframe: function (url) {
		var iframe_dom = `<iframe class="video" id="video" src="${url}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"> </iframe>`;
		$('.video_box').html(iframe_dom);
	},
	restIframe(){
		var iframe_dom = '';
		$('.video_box').html(iframe_dom);
	},
	creatRes: function () {
		var self = this;
		var count = self.count + 1;
		var title, xinyunse, yi, chenghao, liwu, jieqian;
		if( count <= 2){
			title = 'ouqi';
			xinyunse = '幸运色：白\\蓝\\红';
			yi = '宜：诸事皆宜';
			chenghao = '获得称号：【欧皇】';
			liwu = '获得礼物：【价值一千万的白无忧熊抱】';
			jieqian = '解签：今天你的欧气已经超越了以往的99%，做事大概率都能心想事成！说不定下一秒刚打开《神武4》的你，就能轻松洗出极品宝宝呢！';
		} else if (count >= 3 && count <= 8) {
			title = 'putong';
			xinyunse = '幸运色：橙\\青\\紫';
			yi = '宜：升官发财 打帮战 挖宝';
			chenghao = '获得称号：【亚洲之星】';
			liwu = '获得礼物：【无】';
			jieqian = '解签：虽然今天的你运势不好不坏，但是只要努力终究还是能收获圆满滴。别着急，耐心等待，没准下一秒《神武4》就连换两本高必了~';
		} else if(count >= 9) {
			title = 'xuanxue';
			xinyunse = '幸运色：黑\\金\\粉';
			yi = '宜：撞桃花 肝日常 抓捕妖怪';
			chenghao = '获得称号：【非洲酋长】';
			liwu = '获得礼物：【无】';
			jieqian = '解签：虽然你今天的手气有点差，但是身上却隐隐有红线缠绕。没事去《神武4》一些人迹罕见的地图，可能会有意想不到的桃花缘降临哦？';
		}
		$('.title_type').attr('src', `image/${title}.png`);
		$('.xinyunse span').html(xinyunse);
		$('.yi span').html(yi);
		$('.chenghao span').html(chenghao);
		$('.liwu span').html(liwu);
		$('.jieqian span').html(jieqian);
		self.showJieqian();
		setTimeout(function () {
			page.go2(3);
			self.img();
		}, 500);
		
	},
	img: function(){
        var self = this,
            ori_img_wrapper = $('#img_res')[0];

        var shareContent = document.getElementById('creat_img');
        var width = shareContent.offsetWidth;
        var height = shareContent.offsetHeight;
        var canvas = document.createElement("canvas");
        var scale = 2;

        canvas.width = width * scale;
        canvas.height = height * scale;
        canvas.getContext("2d").scale(scale, scale);

        var opts = {
            scale: scale,
            canvas: canvas,
            logging: true,
            width: width,
            height: height
        };

        html2canvas(shareContent, opts).then(canvas => {
            var context = canvas.getContext('2d');
            var img = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height);

            ori_img_wrapper.appendChild(img);
            self.closeJieqian();
            page.page.removeClass('current')
            $('.page_3').removeClass('opci').addClass('current');
            self.showMusic();
        });
    },
	showJieqian: function () {
		// $('.jieqian_show').show();
		$('.block_bg').css('display', 'flex');
	},
	closeJieqian: function () {
		// $('.jieqian_show').hide();
		$('.block_bg').css('display', 'none');
	},
	showShare: function () {
		$('.fenxiang_show').show();
		$('.block_bg').show();
	},
	closeShare: function () {
		$('.fenxiang_show').hide();
		$('.block_bg').hide();
	},
	initModel: function () {
		var hasShowModel = localStorage.getItem('ouhuang_model');
		if(!hasShowModel || hasShowModel != 'show'){
			$('.model_item').removeClass('current');
			$('.model_item').eq(0).addClass('current');
			$('.model').show();
			localStorage.setItem('ouhuang_model','show');
		}
	},
	closeModel: function () {
		$('.model').hide();
	}
}
main.init();



