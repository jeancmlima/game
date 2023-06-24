//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.




kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0, 0, 0, 1],
})

// Speed identifiers
const MOVE_SPEED = 460
const JUMP_FORCE = 600
const FALL_SPEED = 500
const BIG_JUMP_FORCE = 550
let CURRENT_JUMP_FORCE = JUMP_FORCE
const FALL_DEATH = 400
const ENEMY_SPEED = 200

// Game logic


let isJumping = true

loadRoot('https://i.imgur.com/')
loadSprite('bloco', '12oUCa3.png')
loadSprite('cimaandaime', 'Xj9Na3O.png')
loadSprite('baixoandaime', '46aqoMH.png')
loadSprite('blocoverde', 'i9oAJpp.png')
loadSprite('blocoverdefim', 'NNLt24W.png')
loadSprite('mario', 'xKMGqIr.png');
loadSprite('mario1', 'xKMGqIr.png');
loadSprite('mario2', 'dXyDt1f.png');

loadSprite('coin', 'GcsQPcO.png')
loadSprite('evil-shroom', 'QuGKDw9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', '5fIINm9.png')
loadSprite('player', 'gU7Dew6.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('background', 'od1oP70.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe1-top-left', 'aVdpmUh.png')
loadSprite('pipe1-top-right', 'wr6SfsT.png')
loadSprite('pipe1-bottom-left', 'K4sq6QG.png')
loadSprite('pipe1-bottom-right', 'D1ISmtK.png')
loadSprite('pipe2-top-left', 'aVdpmUh.png')
loadSprite('pipe2-top-right', 'wr6SfsT.png')
loadSprite('pipe2-bottom-left', 'K4sq6QG.png')
loadSprite('pipe2-bottom-right', 'D1ISmtK.png')

loadSprite('blue-block', 'fVscIbn.png')
loadSprite('blue-brick', '3e5YRQd.png')
loadSprite('blue-steel', 'gqVoI2b.png')
loadSprite('blue-evil-shroom', 'OC0qYgk.png')
loadSprite('blue-surprise', 'RMqCc1G.png')

//Sprites de Morte

loadSprite('dead-1', '843ehg6.png')
loadSprite('dead-2', 'n0BxCPn.png')
loadSprite('dead-3', 'BpVWlPx.png')
loadSprite('dead-4', 'jLtVNgn.png')



scene("game", ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  const maps = [
    
    [
      '                                                                                                                                                                                                                                                                                                                                                                                                              =',
      '                                                                                                                                                                                                                                                                                                                                                                                                              =',
      '                                                                                                                                                                                                                                                                                                                                                                                                              =',
      '                                                                                                                                                                ^                                                                                                    ^                                 ^                      ^                                                                         ^     =                              ^                                        ^                                   ^                                         ',
      '                                                                                 ^                                                                                                                                                                                                                                                                                                                            =',
      '                      =                                                                                                                                                                                                                                                                                                                                $                         $                            =',
      '                      =                                                                                                                                                                                                                                                                                                                                                                $                      =',
      '                      =                                                                                                                                                                                                                                                                  $                                                 $                                                                  =',
      '                      =       $                                                                                                                                                                        $                   $                                                                                                                                                                                  =',
      '                      =                                                                                                                                                            $                                                                      $               $                                                                                                                $                  =',
      '                      =                                                                                                                                                                                                                                                                                                                                                                                       =',
      '                      =                                                                                                                                                                                                                                                                                                   $                                                                                   =',
      '                      =                                                           $                              z            $                        $                                     z                        z                                                                 z            $                                                z                    z                                  =               z                                   z                                   z                                    z                         z   ',
      '                      =                                 $                                                                                                                                                                                                                                                                                                                                       $       $  -+ =',
      '                      =                                                                                                                                                                                                                                                                                                                                                                                       =',
      '                      =                                                                                                                                                                                                                                                                                                                                                                                       =',
      '================================================        ===============================        ===========================        ====       ==        ===========================         ==============================================================       ==       ============        ===========================================         ==       ==        ==        ==        =======================',
                                                                                                                                                                                                                                                                                                                                                                                                                    

      
    ],
  ]

  const levelCfg = {
    width: 20,
    height: 20,
    'y': [sprite('bloco'), solid()],
    'e': [sprite('cimaandaime'), solid()],
    'r': [sprite('baixoandaime'), solid()],
    '=': [sprite('block'), solid(),color(0, 0, 0, 0), ],
    'q': [sprite('blocoverde'), solid()],
    'w': [sprite('blocoverdefim'), solid()],
    '$': [sprite('coin'), 'coin'],
    '%': [sprite('surprise'), solid(), 'coin-surprise'],
    '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
    '}': [sprite('unboxed'), solid()],
    '(': [sprite('pipe1-bottom-left'), solid(), scale(0.5),color(0, 0, 0, 0),'pipe1'],
    ')': [sprite('pipe1-bottom-right'), solid(), scale(0.5),color(0, 0, 0, 0),'pipe1'],
    '-': [sprite('pipe1-top-left'), solid(), scale(0.5),color(0, 0, 0, 0), 'pipe1'],
    '+': [sprite('pipe1-top-right'), solid(), scale(0.5),color(0, 0, 0, 0), 'pipe1'],
    '1': [sprite('pipe2-bottom-left'), solid(), scale(0.5),color(0, 0, 0, 0), 'pipe2'],
    '2': [sprite('pipe2-bottom-right'), solid(), scale(0.5),color(0, 0, 0, 0), 'pipe2'],
    '4': [sprite('pipe2-top-left'), solid(), scale(0.5),color(0, 0, 0, 0), 'pipe2'],
    '5': [sprite('pipe2-top-right'), solid(), scale(0.5),color(0, 0, 0, 0), 'pipe2'],
    '^': [sprite('evil-shroom'), solid(), 'dangerous' ],
    '#': [sprite('mushroom'), solid(), 'mushroom', body()],
    '!': [sprite('blue-block'), solid(), scale(0.5)],
    '£': [sprite('blue-brick'), solid(), scale(0.5)],
    'z': [sprite('blue-evil-shroom'), solid(), scale(0.47), 'dangerous' ],
    '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
    'x': [sprite('blue-steel'), solid(), scale(0.5)],

  }

  add([
    sprite("background"),
    layer("bg"),
    pos(0, -280),
  ]);

  const gameLevel = addLevel(maps[level], levelCfg)

  
  const scoreLabel = add([
    text(score),
    pos(30, 6),
    layer('ui'),
    {
      value: score,
    }
  ])

  add([text('level ' + parseInt(level + 1) ), pos(40, 6)])
  
  function big() {
    let timer = 0
    let isBig = false
    return {
      update() {
        if (isBig) {
          CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
          timer -= dt()
          if (timer <= 0) {
            this.smallify()
          }
        }
      },
      isBig() {
        return isBig
      },
      smallify() {
        this.scale = vec2(1)
        CURRENT_JUMP_FORCE = JUMP_FORCE
        timer = 0
        isBig = false
      },
      biggify(time) {
        this.scale = vec2(2)
        timer = time
        isBig = true     
      }
    }
  }


  const player = add([
    sprite('mario1'), solid(),
    pos(500, 300),
    scale(1, 1),
    body(),
    big(),
    origin('bot'),
    {
      sprites: ['mario1','mario2'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  player.action(() => {
    player.timer += dt();
    if (player.timer >= 0.1) { // Mudar de sprite a cada 1 segundo
      player.currentSpriteIndex = (player.currentSpriteIndex + 1) % player.sprites.length;
      player.changeSprite(player.sprites[player.currentSpriteIndex]);
      player.timer = 0;
    }
  });
  

  action('mushroom', (m) => {
    m.move(20, 0)
  })

  player.on("headbump", (obj) => {
    if (obj.is('coin-surprise')) {
      gameLevel.spawn('$', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
    if (obj.is('mushroom-surprise')) {
      gameLevel.spawn('#', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
  })

  player.collides('mushroom', (m) => {
    destroy(m)
    player.biggify(6)
  })

  player.collides('coin', (c) => {
    destroy(c)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
  })

  action('dangerous', (d) => {
    d.move(-ENEMY_SPEED, 0)
    
  })

  player.collides('dangerous', (d) => {
      go('lose', { score: scoreLabel.value}) 
  })
  

  player.action(() => {
    camPos(player.pos)
    if (player.pos.y >= FALL_DEATH) {
      go('lose', { score: scoreLabel.value})
    }
  })

  player.collides('pipe1', () => {
    // Redireciona para a página da fase quando o jogador colide com o objeto pipe1
    window.location.href = '../fase3/index.html';
  });
  player.collides('pipe2', () => {
    // Navegue de volta para o início do mapa
    go('game', {
      level: 0, // ou o nível que você quiser começar
      score: scoreLabel.value
    });
  });
  
  player.collides('pipe2', () => {
    // Navegue de volta para o início do mapa
    go('game', {
      level: 0, // ou o nível que você quiser começar
      score: scoreLabel.value
    });
  });
  
  keyDown('right', () => {
    // Reseta a escala do personagem no eixo x para remover o espelhamento
    player.scale.x = 1;
    player.move(MOVE_SPEED, 0);
  });

  player.action(() => {
    if(player.grounded()) {
      isJumping = false
    }
  })

  keyPress('up', () => {
    if (player.grounded()) {
      isJumping = true
      player.jump(CURRENT_JUMP_FORCE)
      player.jump(FALL_SPEED)
    }
  })
})

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    location.reload();
  }
});




const textOptions = [
  { message: "FIM DE JOGO\n\nAperte enter para reiniciar", fontSize: 22, color: rgb(1, 0, 0) },
];

scene('lose', ({ score }) => {
  const randomIndex = Math.floor(Math.random() * textOptions.length);
  const { message, fontSize, color } = textOptions[randomIndex];
  
  
  add([
    text(message, fontSize),
    origin('center'),
    pos(width() / 2, height() / 2),
    color,
  ]);
});
start("game", { level: 0, score: 0})
