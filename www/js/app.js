// Matter aliases
var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies, Body = Matter.Body, Composite = Matter.Composite, Composites = Matter.Composites, Common = Matter.Common, Constraint = Matter.Constraint, RenderPixi = Matter.RenderPixi, Events = Matter.Events, Bounds = Matter.Bounds, Vector = Matter.Vector, Vertices = Matter.Vertices, MouseConstraint = Matter.MouseConstraint, Mouse = Matter.Mouse, Query = Matter.Query;

// MatterTools aliases
if (window.MatterTools) {
	var Gui = MatterTools.Gui, Inspector = MatterTools.Inspector;
}

var _engine, _gui, _inspector, _sceneName, _mouseConstraint, _sceneEvents = [], _useInspector = window.location.hash.indexOf('-inspect') !== -1, _isMobile = /(ipad|iphone|ipod|android)/gi.test(navigator.userAgent);

var app = {
	init : function() {

		var container = document.getElementById('canvas-container');

		// some example engine options
		var options = {
			positionIterations : 6,
			velocityIterations : 4,
			enableSleeping : false
		};

		// create a Matter engine
		// NOTE: this is actually Matter.Engine.create(), see the aliases at top of this file
		_engine = Engine.create(container, options);

		// add a mouse controlled constraint
		_mouseConstraint = MouseConstraint.create(_engine);
		World.add(_engine.world, _mouseConstraint);

		// run the engine
		Engine.run(_engine);
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	},
	gravChange : true,
	flipGavity : function(g) {
		if (app.gravChange) {
			_engine.world.gravity.y = g.y / 5;
			_engine.world.gravity.x = -g.x / 5;
		}

	},
	compass : function() {

		
		
		$("#canvas-container").html("<div class='consol'>--</div><div class='pin'><img src='img/compassHEB.png' /></div>");

		navigator.compass.watchHeading(function(heading) {
			$(".consol").html(Math.round(heading.magneticHeading));
			$(".pin").css("transform","rotate(-"+(heading.magneticHeading) +"deg)");
			
		}, function() {
		}, {
			frequency : 1000
		});

	},
	newtonsCradle : function() {
		var _world = _engine.world;
		app.gravChange = false;

		app.reset({
			noShell : true
		});

		var cradle = Composites.newtonsCradle(window.innerWidth * 0.5 - 90, window.innerHeight * 0.3, 5, 30, 200);
		World.add(_world, cradle);
		//Body.translate(cradle.bodies[0], { x: -180, y: -100 });

		var renderOptions = _engine.render.options;
		renderOptions.showVelocity = false;
		renderOptions.wireframes = false;
	},
	gas : function() {
		var _world = _engine.world;

		app.reset();
		app.gravChange = true;

		var stack = Composites.stack(20, 20, 10, 10, 0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, Common.random(2, 10), {
				frictionAir : 0.01,
				restitution : 1.7,
				density : 0.1
			});
		});

		World.add(_world, stack);
		var renderOptions = _engine.render.options;
		renderOptions.wireframes = false;
		renderOptions.showAngleIndicator = false;
	},
	liquid : function() {
		var _world = _engine.world;

		app.reset();
		app.gravChange = true;

		var stack = Composites.stack(20, 20, 30, 10, 0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, Common.random(2, 10), {
				frictionAir : 0.01,
				restitution : 1.1,
				density : 0.1
			});
		});

		World.add(_world, stack);
		var renderOptions = _engine.render.options;
		renderOptions.wireframes = false;
		renderOptions.showAngleIndicator = false;
	},
	avalanche : function() {
		var _world = _engine.world;

		app.reset();
		app.gravChange = true;

		var stack = Composites.stack(20, 20, 20, 5, 0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, Common.random(2, 10), {
				frictionAir : 0.01,
				restitution : 1.1,
				density : 0.1
			});
		});

		World.add(_world, stack);
		var renderOptions = _engine.render.options;
		renderOptions.wireframes = false;
		renderOptions.showAngleIndicator = false;

		World.add(_world, [Bodies.rectangle(window.innerWidth * 0.25, window.innerHeight * 0.3, window.innerWidth * 0.55, 20, {
			isStatic : true,
			restitution : 1.5
		}), Bodies.rectangle(window.innerWidth * 0.75, window.innerHeight * 0.7, window.innerWidth * 0.75, 20, {
			isStatic : true,
			restitution : 1.5
		})]);
	},
	maze : function() {
		var _world = _engine.world;

		app.reset();
		app.gravChange = true;

		var stack = Composites.stack(20, 20, 20, 5, 0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, Common.random(2, 10), {
				frictionAir : .1,
				restitution : Common.random(2, 10) / 9,
				density : Common.random(2, 10) / 9
			});
		});

		World.add(_world, stack);
		var renderOptions = _engine.render.options;
		renderOptions.wireframes = false;
		renderOptions.showAngleIndicator = false;

		World.add(_world, [Bodies.rectangle(window.innerWidth * 0.25, window.innerHeight * 0.3, window.innerWidth * 0.90, 20, {
			isStatic : true,
			restitution : 1.5
		}), Bodies.rectangle(window.innerWidth * 0.25, window.innerHeight * 0.73, window.innerWidth * 0.55, 20, {
			isStatic : true,
			restitution : 1.5
		}), Bodies.rectangle(window.innerWidth * 0.75, window.innerHeight * 0.45, window.innerWidth * 0.75, 20, {
			isStatic : true,
			restitution : 1.5
		}), Bodies.rectangle(window.innerWidth * 0.45, window.innerHeight * 0.85, window.innerWidth * 0.75, 20, {
			isStatic : true,
			restitution : 1.5
		}), Bodies.rectangle(window.innerWidth * 0.5, window.innerHeight * 0.65, 20, 120, {
			isStatic : true,
			restitution : 1.5
		}), Bodies.rectangle(window.innerWidth * 0.35, window.innerHeight * 0.52, 20, 120, {
			isStatic : true,
			restitution : 1.5
		}), Bodies.rectangle(window.innerWidth * 0.5, window.innerHeight * 0.20, 20, 120, {
			isStatic : true,
			restitution : 1.5
		}), Bodies.rectangle(window.innerWidth * 0.80, window.innerHeight * 0.26, 20, 210, {
			isStatic : true,
			restitution : 1.5
		}), Bodies.rectangle(window.innerWidth * 0.68, window.innerHeight * 0.70, 20, 280, {
			isStatic : true,
			restitution : 1.5
		})]);
	},
	softBody : function() {
		var _world = _engine.world;

		app.reset();
		app.gravChange = true;

		var particleOptions = {
			render : {
				visible : true
			}
		};

		World.add(_world, [Composites.softBody(50, 100, 5, 5, 0, 0, true, 10, particleOptions), Composites.softBody(50, 300, 8, 3, 0, 0, true, 12, particleOptions), Composites.softBody(50, 400, 4, 4, 0, 0, true, 12, particleOptions)]);

		var renderOptions = _engine.render.options;
		renderOptions.wireframes = false;
		renderOptions.showAngleIndicator = false;
	},

	slingshot : function() {
		var _world = _engine.world;

		app.reset({});
		app.gravChange = false;
		_engine.world.gravity.y = 0;
		_engine.world.gravity.x = -0.1;

		var ground = Bodies.rectangle(395, window.innerHeight, window.innerWidth, 10, {
			isStatic : true,
			render : {
				fillStyle : '#edc51e',
				strokeStyle : '#b5a91c'
			}
		});
		var rockOptions = {
			density : 0.004,

		};

		var anchor = {
			x : window.innerWidth * 0.2,
			y : window.innerHeight * 0.2
		};

		var rock = Bodies.polygon(anchor.x, anchor.y, 10, 10, rockOptions);

		var elastic = Constraint.create({
			pointA : anchor,
			bodyB : rock,
			stiffness : 0.05,
			render : {
				lineWidth : 5,
				strokeStyle : '#dfa417'
			}
		});

		var brick = {
			restitution : 0.1,
			density : 0.0007,
			frictionAir : 0.001
		};

		var stack1 = Composites.stack(window.innerWidth * 0.1, window.innerHeight * 0.5, 3, 2, 0, 0, function(x, y, column, row) {
			return Bodies.rectangle(x, y, 25, 40, brick);
		});

		var stack2 = Composites.stack(window.innerWidth * 0.1, window.innerHeight * 0.7, 3, 2, 0, 0, function(x, y, column, row) {
			return Bodies.rectangle(x, y, 25, 40, brick);
		});

		var stack3 = Composites.stack(window.innerWidth * 0.4, window.innerHeight * 0.6, 3, 2, 0, 0, function(x, y, column, row) {
			return Bodies.rectangle(x, y, 25, 40, brick);
		});

		var beem = Bodies.rectangle(window.innerWidth * 0.3, window.innerHeight * 0.67, 25, 200, brick);

		World.add(_engine.world, [beem, stack1, stack2, stack3, rock, elastic]);

		Events.on(_engine, 'tick', function(event) {
			if (_mouseConstraint.mouse.button === -1 && (rock.position.x > (anchor.x + 20) || rock.position.y > (anchor.y + 20))) {
				rock = Bodies.polygon(anchor.x, anchor.y, 10, 10, rockOptions);
				World.add(_engine.world, rock);
				elastic.bodyB = rock;
			}
		});

		var renderOptions = _engine.render.options;
		renderOptions.wireframes = false;
		renderOptions.showAngleIndicator = false;
		// renderOptions.background = './img/background.png';
	}, ///////////////////////////////////////////////////////////////////////////
	reset : function(options) {
		options = options || {};

		var _world = _engine.world;

		World.clear(_world);
		Engine.clear(_engine);

		// clear scene graph (if defined in controller)
		var renderController = _engine.render.controller;
		if (renderController.clear)
			renderController.clear(_engine.render);

		// clear all scene events
		for (var i = 0; i < _sceneEvents.length; i++)
			Events.off(_engine, _sceneEvents[i]);

		if (_mouseConstraint.events) {
			for ( i = 0; i < _sceneEvents.length; i++)
				Events.off(_mouseConstraint, _sceneEvents[i]);
		}

		if (_world.events) {
			for ( i = 0; i < _sceneEvents.length; i++)
				Events.off(_world, _sceneEvents[i]);
		}

		_sceneEvents = [];

		// reset id pool
		Common._nextId = 0;

		// reset random seed
		Common._seed = 0;

		// reset mouse offset and scale (only required for Demo.views)
		Mouse.setScale(_mouseConstraint.mouse, {
			x : 1,
			y : 1
		});
		Mouse.setOffset(_mouseConstraint.mouse, {
			x : 0,
			y : 0
		});

		_engine.enableSleeping = false;
		_engine.world.gravity.y = 1;
		_engine.world.gravity.x = 0;
		_engine.timing.timeScale = 1;

		var offset = 140;
		var outershell = [Bodies.rectangle(window.innerWidth / 2, -offset / 2, window.innerWidth, offset, {
			isStatic : true
		}), Bodies.rectangle(window.innerWidth / 2, window.innerHeight + offset / 2, window.innerWidth, offset, {
			isStatic : true
		}), Bodies.rectangle(window.innerWidth + offset / 2, window.innerHeight / 2, offset, window.innerHeight, {
			isStatic : true
		}), Bodies.rectangle(-offset / 2, window.innerHeight / 2, offset, window.innerHeight, {
			isStatic : true
		})];

		if (!options.noShell) {
			World.add(_world, outershell);
		}

		_mouseConstraint = MouseConstraint.create(_engine);
		World.add(_world, _mouseConstraint);

		var renderOptions = _engine.render.options;
		renderOptions.wireframes = true;
		renderOptions.hasBounds = false;
		renderOptions.showDebug = false;
		renderOptions.showBroadphase = false;
		renderOptions.showBounds = false;
		renderOptions.showVelocity = false;
		renderOptions.showCollisions = false;
		renderOptions.showAxes = false;
		renderOptions.showPositions = false;
		renderOptions.showAngleIndicator = false;
		renderOptions.showIds = false;
		renderOptions.showShadows = false;
		renderOptions.background = '#fff';

		if (_isMobile)
			renderOptions.showDebug = true;
	}
};

