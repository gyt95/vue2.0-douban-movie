var Interfake = require('interfake');
var interfake = new Interfake();

// 显示电影A在某日期，电影院列表
interfake.get('/cinemaList?movie_id=11502973&date=0826').status(200).body({
	"count":10,
    "data":[
	    {
	    	"cinema_id":1,
	    	"name":"橙天嘉禾广州影城",
	    	"price":49.5,
	    	"today_remain":2,
	    	"recent_time":"22:40",
	    	"distance":1.9
	    },
	    {
	    	"cinema_id":2,
	    	"name":"广州保利电影院线同德店",
	    	"price":28,
	    	"today_remain":2,
	    	"recent_time":"22:20",
	    	"distance":4.6
	    },
	    {
	    	"cinema_id":3,
	    	"name":"广州左岸国际影城",
	    	"price":25.5,
	    	"today_remain":0,
	    	"recent_time":0,
	    	"distance":5.7
	    },
	    {
	    	"cinema_id":4,
	    	"name":"广州保利国际影城",
	    	"price":49,
	    	"today_remain":3,
	    	"recent_time":"22:20",
	    	"distance":7.1
	    },
	    {
	    	"cinema_id":5,
	    	"name":"广州五月花影城",
	    	"price":38,
	    	"today_remain":2,
	    	"recent_time":"22:05",
	    	"distance":7.8
	    },
	    {
	    	"cinema_id":6,
	    	"name":"广州华影青宫电影城",
	    	"price":34,
	    	"today_remain":3,
	    	"recent_time":"22:00",
	    	"distance":7.9
	    },
	    {
	    	"cinema_id":7,
	    	"name":"广州中华广场电影城",
	    	"price":49,
	    	"today_remain":2,
	    	"recent_time":"22:10",
	    	"distance":8.3
	    },
	    {
	    	"cinema_id":8,
	    	"name":"市一宫电影城",
	    	"price":38,
	    	"today_remain":2,
	    	"recent_time":"22：30",
	    	"distance":8.3
	    },
	    {
	    	"cinema_id":9,
	    	"name":"广州星汇电影城",
	    	"price":49,
	    	"today_remain":3,
	    	"recent_time":"22:10",
	    	"distance":8.3
	    },
	    {
	    	"cinema_id":10,
	    	"name":"广州中影火山湖电影城",
	    	"price":53,
	    	"today_remain":1,
	    	"recent_time":"22:40",
	    	"distance":8.9
	    }
    ]
});


interfake.get('/cinemaList?movie_id=11502973&date=0827').body({
	"count":10,
	"movie_name":"星际特工：千星之城",
    "data":[
    	{
	    	"cinema_id":2,
	    	"name":"广州保利电影院线同德店",
	    	"price":28,
	    	"today_remain":2,
	    	"recent_time":"22:20",
	    	"distance":4.6
	    },
	    {
	    	"cinema_id":3,
	    	"name":"广州左岸国际影城",
	    	"price":25.5,
	    	"today_remain":0,
	    	"recent_time":0,
	    	"distance":5.7
	    },
	    {
	    	"cinema_id":1,
	    	"name":"橙天嘉禾广州影城",
	    	"price":49.5,
	    	"today_remain":2,
	    	"recent_time":"22:40",
	    	"distance":1.9
	    },
	    {
	    	"cinema_id":5,
	    	"name":"广州五月花影城",
	    	"price":38,
	    	"today_remain":2,
	    	"recent_time":"22:05",
	    	"distance":7.8
	    },
	    {
	    	"cinema_id":8,
	    	"name":"市一宫电影城",
	    	"price":38,
	    	"today_remain":2,
	    	"recent_time":"22：30",
	    	"distance":8.3
	    },
	    {
	    	"cinema_id":9,
	    	"name":"广州星汇电影城",
	    	"price":49,
	    	"today_remain":3,
	    	"recent_time":"22:10",
	    	"distance":8.3
	    },
	    {
	    	"cinema_id":6,
	    	"name":"广州华影青宫电影城",
	    	"price":34,
	    	"today_remain":3,
	    	"recent_time":"22:00",
	    	"distance":7.9
	    },
	    {
	    	"cinema_id":4,
	    	"name":"广州保利国际影城",
	    	"price":49,
	    	"today_remain":3,
	    	"recent_time":"22:20",
	    	"distance":7.1
	    },
	    
	    {
	    	"cinema_id":7,
	    	"name":"广州中华广场电影城",
	    	"price":49,
	    	"today_remain":2,
	    	"recent_time":"22:10",
	    	"distance":8.3
	    },
	    
	    {
	    	"cinema_id":10,
	    	"name":"广州中影火山湖电影城",
	    	"price":53,
	    	"today_remain":1,
	    	"recent_time":"22:40",
	    	"distance":8.9
	    },
    ]
});

/* chooseEvent.vue  
   显示电影A在某日期，电影院B中的放映场次
   '/cinema/movie_id/cinema_id/event_list'
*/
interfake.get('/eventList?movie_id=11502973&cinema_id=1&date=0826').status(200).body({
	"count": 5,
	"cinema_name":"橙天嘉禾广州影城",
	"movie_name":"星际特工：千星之城",
	"ratings_count": 55822,
	"rating_average": 7.2,
	"data":[
		{
			"time":"10:00",
			"type":"原声",
			"movie_screen":"3D",
			"duration":"137分钟",
			"price":"49.5",
			"status":1
		},
		{
			"time":"12:30",
			"type":"原声",
			"movie_screen":"3D",
			"duration":"137分钟",
			"price":"49.5",
			"status":1
		},
		{
			"time":"14:10",
			"type":"原声",
			"movie_screen":"3D",
			"duration":"137分钟",
			"price":"49.5",
			"status":1
		},
		{
			"time":"16:30",
			"type":"原声",
			"movie_screen":"3D",
			"duration":"137分钟",
			"price":"49.5",
			"status":1
		},
		{
			"time":"19:40",
			"type":"原声",
			"movie_screen":"3D",
			"duration":"137分钟",
			"price":"49.5",
			"status":1
		}
	]
});

interfake.get('/eventList?movie_id=11502973&cinema_id=1&date=0827').status(200).body({
	"count": 7,
	"cinema_name":"橙天嘉禾广州影城",
	"movie_name":"星际特工：千星之城",
	"ratings_count": 55822,
	"rating_average": 7.2,
	"data":[
		{
			"time":"10:00",
			"type":"原声",
			"movie_screen":"3D",
			"duration":"137分钟",
			"price":"38",
			"status":1
		},
		{
			"time":"12:30",
			"type":"原声",
			"movie_screen":"3D",
			"duration":"137分钟",
			"price":"38",
			"status":1
		},
		{
			"time":"14:10",
			"type":"原声",
			"movie_screen":"3D",
			"duration":"137分钟",
			"price":"38",
			"status":1
		},
		{
			"time":"16:30",
			"type":"原声",
			"movie_screen":"3D",
			"duration":"137分钟",
			"price":"38",
			"status":1
		},
		{
			"time":"18:40",
			"type":"原声",
			"movie_screen":"3D",
			"duration":"137分钟",
			"price":"38",
			"status":1
		},
		{
			"time":"20:00",
			"type":"原声",
			"movie_screen":"3D",
			"duration":"137分钟",
			"price":"38",
			"status":1
		},
		{
			"time":"22:10",
			"type":"原声",
			"movie_screen":"3D",
			"duration":"137分钟",
			"price":"38",
			"status":1
		}
	]
});



interfake.get('/cinema/cinema_id=1').status(200).body({
	"status":"success",
	"data":{
		movie_list:[
			{
				"movie_id":1,
				"name":"星际特工：千星之城",
				"image_url":"",
				"event_list":[
					{
						"date":"08.26",
						"day":"周六(今天)",
						"data":[
							{
								"time":"10:00",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":1
							},
							{
								"time":"12:30",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":1
							},
							{
								"time":"14:10",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":1
							}
						]
					},
					{
						"date":"08.27",
						"day":"周日(明天)",
						"data":[
							{
								"time":"10:00",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"12:30",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"14:10",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"15:00",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"16:45",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"17:30",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"20:00",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"21:55",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							}
						]
					},
					{
						"date":"08.28",
						"day":"周一(后天)",
						"data":[
							{
								"time":"11:10",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"13:40",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"14:20",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"15:00",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"16:10",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"16:50",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							}
						]
					},
					{
						"date":"08.29",
						"day":"周二",
						"data":[
							{
								"time":"11:10",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"13:40",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"14:20",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"16:10",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"16:50",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"17:30",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"18:40",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							},
							{
								"time":"19:20",
								"type":"原声",
								"movie_screen":"3D",
								"duration":"137分钟",
								"price":"38",
								"status":0
							}
						]
					},
				]
				
			}
		]
	}
});

interfake.listen(4000);