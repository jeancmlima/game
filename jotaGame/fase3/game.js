

kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0, 0, 0, 1],
})

// Speed identifiers
const MOVE_SPEED = 160
const JUMP_FORCE = 440
const BIG_JUMP_FORCE = 550
let CURRENT_JUMP_FORCE = JUMP_FORCE
const FALL_DEATH = 400
const ENEMY_SPEED = 0
let isRightPressed = false;
let spriteIndex = 0;

// Game logic


let isJumping = true

loadRoot('https://i.imgur.com/')
loadSprite('bloco', '12oUCa3.png')
loadSprite('cimaandaime', 'Xj9Na3O.png')
loadSprite('baixoandaime', '46aqoMH.png')
loadSprite('blocoverde', 'i9oAJpp.png')
loadSprite('blocoverdefim', 'NNLt24W.png')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('evil-shroom', 'MjHMZq2.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', '5fIINm9.png')
loadSprite('mario', 'fJD7DC9.png')
loadSprite('andar0', 'dZH7Vef.png')
loadSprite('andar1', 'iu8GNez.png')
loadSprite('andar2', '0GQuBMK.png')
loadSprite('mushroom', 'KjVgOS5.png')
loadSprite('background', 'wjZwh24.png')
loadSprite('background3', 'wjZwh24.png')
loadSprite('background2', 'ZhKbdBf.png')
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

loadSprite('enemy1', 'x0hPmn7.png')
    loadSprite('enemy2', '71lWY4I.png')
    loadSprite('enemy3', 'd5BzIlh.png')
    loadSprite('enemy4', 'AcJPzfi.png')
    loadSprite('enemy5', 'JinkfIa.png')
    loadSprite('enemy6', 'ko8fuMP.png')

  loadSprite('Dead1', 'z4yZoUd.png')
  loadSprite('Dead2', 'AgwgQbI.png')
  loadSprite('Dead3', 'MB9VrOe.png')
  loadSprite('Dead4', 'ILnoFLL.png')
  loadSprite('Dead5', 'NDOPFQ5.png')
  loadSprite('Dead6', '6ZLa31m.png')
  loadSprite('Dead7', 'YbIX92s.png')



loadSprite('blue-block', 'fVscIbn.png')
loadSprite('blue-brick', '3e5YRQd.png')
loadSprite('blue-steel', 'gqVoI2b.png')
loadSprite('blue-evil-shroom', 'SvV4ueD.png')
loadSprite('blue-surprise', 'RMqCc1G.png')

//Sprites de Morte



scene("game", ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  const maps = [
    [
      '=                                                                                                                                                                                                                                                                                                                             ',
      '=                                                                                                                                                                                                                                                                                                                             ',
      '=                                                                                                                                                                                                                                                                                                                            =',
      '=                                                                                                                                                                                                                                                                                                                            =',
      '=                                                                                                                                                                                                                                                                                                                            =',
      '=                                                                                                                                                                                                                                                                                                                            =',
      '=                                                                                                                                                                                                                                                                                                                            =',
      '=                                                                                                                                                                                                                                                                                                                            =','                                                                                                                                                                               ',
      '=                                                                                                                                                                                                                                                                                                                            =',
      '=                                                                                                                                                                                                                                                                                                                            =',
      '=                                                                                                                                                                                                                                                                                                                           =',
      '=                                                                              =========================================                                                                                                                                                                                        ==============',
      '============================      ==============                                                                                                                                                                                                                                                                             =',
      '                                                                          ===                                                                                                                                                                                                                                                =',
      '=                                                                                                                             ==========================                                                                              ===     ====   ====     ===     ===                                                    =',
      '                                                                    ===                                                                                                                                           ===                 ===     == =   ====     ===     ===                                           -+       =',
      '                                                                                                                                                                                                            ===                 =================   ====================                                            ()       =',
      '                                                    ========  ===                                                                                                                               ===    ===                ===                                                 =================    =====     =================',
      '                                                                                                                                                            ================================                                                                                                                                  ',
      '=                                                                                                                                                                                                                                                                                                                             ',
      '=                                                                                                                                                                                                                                                                                                                             ',
      '=                                                                                                                                                                                                                                                                                                                             ',
      '=                                                                                                                                                                                                                                                                                                                             ',
      '=                                                                                                                                                                                                                                                                                                                             ',

      
    ],
    [
      '£                                       £',
      '£                                       £',
      '£                                       £',
      '£                                       £',
      '£                                       £',
      '£        @@@@@@              x x        £',
      '£                          x x x        £',
      '£                        x x x x  x   -+£',
      '£               z   z  x x x x x  x   ()£',
      '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
    ],

    [
      '                                        ',
      '                                        ',
      '                                        ',
      '                                        ',
      '                                        ',
      '                                        ',
      '                                        ',
      '                                        ',
      '                                        ',
      '                                        ',
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
    '^': [sprite('evil-shroom'), solid(), 'dangerous'],
    '#': [sprite('mushroom'), solid(), 'mushroom', body()],
    '!': [sprite('blue-block'), solid(), scale(0.5)],
    '£': [sprite('blue-brick'), solid(), scale(0.5)],
    'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous'],
    '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
    'x': [sprite('blue-steel'), solid(), scale(0.5)],

  }

  add([
    sprite("background"),
    layer("bg"),
    pos(0, -38),
  ]);
  add([
    sprite("background3"),
    layer("bg"),
    pos(-1000, -38),
  ]);
  add([
    sprite("background2"),
    pos(0, -38),
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

  const deadAnimation = [
    "Dead1.png",
    "Dead2.png",
    "Dead3.png",
    "Dead4.png",
    "Dead5.png",
    "Dead6.png",
    "Dead7.png"
  ];
  
  function playDeathAnimation() {
    let index = 0;
  
    function displayNextImage() {
      if (index < deadAnimation.length) {
        const imageName = deadAnimation[index];
        const image = add([sprite(imageName), pos(0, 0)]);
        wait(0.5, () => {
          destroy(image);
          index++;
          displayNextImage();
        });
      }
    }
  
    displayNextImage();
  }
  

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

  const enemy = add([
    sprite('enemy1'),
    
    solid(),
    pos(460, 225),  // Defina as coordenadas corretas para a posição do inimigo
    scale(1.5), // Defina a escala desejada para o inimigo
    'dangerous',
    {
      sprites: ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  enemy.action(() => {
    enemy.timer += dt();
    if (enemy.timer >= 0.5) { // Mudar de sprite a cada 1 segundo
      enemy.currentSpriteIndex = (enemy.currentSpriteIndex + 1) % enemy.sprites.length;
      enemy.changeSprite(enemy.sprites[enemy.currentSpriteIndex]);
      enemy.timer = 0;
    }
  });

  const enemy2 = add([
    sprite('enemy1'),
    
    solid(),
    pos(750, 225),  // Defina as coordenadas corretas para a posição do inimigo
    scale(1.5), // Defina a escala desejada para o inimigo
    'dangerous',
    {
      sprites: ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  enemy2.action(() => {
    enemy2.timer += dt();
    if (enemy2.timer >= 0.5) { // Mudar de sprite a cada 1 segundo
      enemy2.currentSpriteIndex = (enemy2.currentSpriteIndex + 1) % enemy2.sprites.length;
      enemy2.changeSprite(enemy2.sprites[enemy2.currentSpriteIndex]);
      enemy2.timer = 0;
    }
  });
  
  const enemy3 = add([
    sprite('enemy1'),
    
    solid(),
    pos(1680, 205),  // Defina as coordenadas corretas para a posição do inimigo
    scale(1.5), // Defina a escala desejada para o inimigo
    'dangerous',
    {
      sprites: ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  enemy3.action(() => {
    enemy3.timer += dt();
    if (enemy3.timer >= 0.5) { // Mudar de sprite a cada 1 segundo
      enemy3.currentSpriteIndex = (enemy3.currentSpriteIndex + 1) % enemy3.sprites.length;
      enemy3.changeSprite(enemy3.sprites[enemy3.currentSpriteIndex]);
      enemy3.timer = 0;
    }
  });
  
  const enemy4 = add([
    sprite('enemy1'),
    
    solid(),
    pos(2240, 205),  // Defina as coordenadas corretas para a posição do inimigo
    scale(1.5), // Defina a escala desejada para o inimigo
    'dangerous',
    {
      sprites: ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  enemy4.action(() => {
    enemy4.timer += dt();
    if (enemy4.timer >= 0.5) { // Mudar de sprite a cada 1 segundo
      enemy4.currentSpriteIndex = (enemy4.currentSpriteIndex + 1) % enemy4.sprites.length;
      enemy4.changeSprite(enemy4.sprites[enemy4.currentSpriteIndex]);
      enemy4.timer = 0;
    }
  });
  
  const enemy5 = add([
    sprite('enemy1'),
    
    solid(),
    pos(2780, 265),  // Defina as coordenadas corretas para a posição do inimigo
    scale(1.5), // Defina a escala desejada para o inimigo
    'dangerous',
    {
      sprites: ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  enemy5.action(() => {
    enemy5.timer += dt();
    if (enemy5.timer >= 0.5) { // Mudar de sprite a cada 1 segundo
      enemy5.currentSpriteIndex = (enemy5.currentSpriteIndex + 1) % enemy5.sprites.length;
      enemy5.changeSprite(enemy5.sprites[enemy5.currentSpriteIndex]);
      enemy5.timer = 0;
    }
  });
  
  const enemy6 = add([
    sprite('enemy1'),
    
    solid(),
    pos(3660, 340),  // Defina as coordenadas corretas para a posição do inimigo
    scale(1.5), // Defina a escala desejada para o inimigo
    'dangerous',
    {
      sprites: ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  enemy6.action(() => {
    enemy6.timer += dt();
    if (enemy6.timer >= 0.5) { // Mudar de sprite a cada 1 segundo
      enemy6.currentSpriteIndex = (enemy6.currentSpriteIndex + 1) % enemy6.sprites.length;
      enemy6.changeSprite(enemy6.sprites[enemy6.currentSpriteIndex]);
      enemy6.timer = 0;
    }
  });
  
  const enemy7 = add([
    sprite('enemy1'),
    
    solid(),
    pos(4700, 315),  // Defina as coordenadas corretas para a posição do inimigo
    scale(1.5), // Defina a escala desejada para o inimigo
    'dangerous',
    {
      sprites: ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  enemy7.action(() => {
    enemy7.timer += dt();
    if (enemy7.timer >= 0.5) { // Mudar de sprite a cada 1 segundo
      enemy7.currentSpriteIndex = (enemy7.currentSpriteIndex + 1) % enemy7.sprites.length;
      enemy7.changeSprite(enemy7.sprites[enemy7.currentSpriteIndex]);
      enemy7.timer = 0;
    }
  });
  
  const enemy8 = add([
    sprite('enemy1'),
    
    solid(),
    pos(5020, 315),  // Defina as coordenadas corretas para a posição do inimigo
    scale(1.5), // Defina a escala desejada para o inimigo
    'dangerous',
    {
      sprites: ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  enemy8.action(() => {
    enemy8.timer += dt();
    if (enemy8.timer >= 0.5) { // Mudar de sprite a cada 1 segundo
      enemy8.currentSpriteIndex = (enemy8.currentSpriteIndex + 1) % enemy8.sprites.length;
      enemy8.changeSprite(enemy8.sprites[enemy8.currentSpriteIndex]);
      enemy8.timer = 0;
    }
  });
  
  const enemy9 = add([
    sprite('enemy1'),
    
    solid(),
    pos(5860, 325),  // Defina as coordenadas corretas para a posição do inimigo
    scale(1.5), // Defina a escala desejada para o inimigo
    'dangerous',
    {
      sprites: ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  enemy9.action(() => {
    enemy9.timer += dt();
    if (enemy9.timer >= 0.5) { // Mudar de sprite a cada 1 segundo
      enemy9.currentSpriteIndex = (enemy9.currentSpriteIndex + 1) % enemy9.sprites.length;
      enemy9.changeSprite(enemy9.sprites[enemy9.currentSpriteIndex]);
      enemy9.timer = 0;
    }
  });
  

  const player = add([
    sprite('mario'), solid(),
    pos(40, 200),
    scale(1, 1),
    body(),
    big(),
    origin('bot'),
    {
      isJumping: false,
    }
  ]);

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
    window.location.href = 'fase4.html';
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
  
  keyDown('left', () => {
    // Inverte a escala do personagem no eixo x para espelhar horizontalmente
    player.scale.x = -1;
    player.move(-MOVE_SPEED, 0);
  });
  
  keyDown('right', () => {
    // Reseta a escala do personagem no eixo x para remover o espelhamento
    player.scale.x = 1;
    player.move(MOVE_SPEED, 0);
    isRightPressed = true;
  });

  window.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight") {
      isRightPressed = false;
      spriteIndex = 0;
      player.changeSprite("mario");
    }
  });

  function changePlayerSprite() {
    if (isRightPressed) {
      spriteIndex++;
      if (spriteIndex === 1) {
        player.changeSprite("andar0");
      } else if (spriteIndex === 2) {
        player.changeSprite("andar2");
      } else {
        spriteIndex = 0;
        player.changeSprite("mario");
      }
    }
  }

  function update() {
    // Aguardar SPRITE_INTERVAL segundos antes de alternar a sprite
    wait(SPRITE_INTERVAL, () => {
      changePlayerSprite();
    });
  
    player.move(MOVE_SPEED, 0);
  }
  keyPress('up', () => {
    if (player.grounded()) {
      player.isJumping = true;
      player.jump(CURRENT_JUMP_FORCE);
      player.changeSprite('mushroom'); // Adiciona essa linha para mudar a sprite para 'mushroom' durante o pulo
    }
  });
  
  player.action(() => {
    if (player.grounded()) {
      player.isJumping = false;
      player.changeSprite('mario'); // Adiciona essa linha para voltar à sprite 'mario' quando estiver no chão
    }
  });
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
