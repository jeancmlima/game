//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.

kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0, 0, 0, 1],
})

// Speed identifiers
const MOVE_SPEED = 160
const JUMP_FORCE = 470
const BIG_JUMP_FORCE = 550
let CURRENT_JUMP_FORCE = JUMP_FORCE
const FALL_DEATH = 400
const ENEMY_SPEED = 45
const ENEMY_SPEED2 = 20
const ENEMY_SPEED3 = 5

// Game logic


let isJumping = false

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
loadSprite('mario', 'iGtUcg4.png')
loadSprite('mushroom', 'YwfarR1.png')
loadSprite('background', 'O8tBM1r.png')
loadSprite('background2', 'kqAnYW8.png')
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

loadSprite('enemy1', 'gmlNx0c.png')
    loadSprite('enemy2', 'GemvPv0.png')
    loadSprite('enemy3', '4LEEaTM.png')
    loadSprite('enemy4', 'zxylHaH.png')
    loadSprite('enemy5', '8kjQqzl.png')
    loadSprite('enemy6', 'fwYMNLG.png')
    loadSprite('enemy7', '8kBDl4x.png')
    loadSprite('enemy8', 'XqI1747.png')
    loadSprite('enemy9', 'IHmoSay.png')
    loadSprite('enemy10', 'vv2WEkq.png')

loadSprite('blue-block', 'fVscIbn.png')
loadSprite('blue-brick', '3e5YRQd.png')
loadSprite('blue-steel', 'gqVoI2b.png')
loadSprite('blue-evil-shroom', 'SvV4ueD.png')
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
      '=                                                                                                              =',
      '=                                                                                                              =',
      '=                                                                                                              =',
      '=                                                                                                              =',
      '=                                                                                                              =',
      '=                                                                                                              =',
      '=                                                                                                              =',
      '=                                                                                                              =',
      '=                                                                  ===                                 12      =',
      '=                               =========                     ===                                      34      =',
      '=                               =                        ======           ===   ======            ==============',
      '=                            ===                                                     =                         =',
      '=                            =                                                       ======                    =',
      '=                            =              ===========                                                -+      =',
      '=============================                                                                          ()      =',
      '                                                                                               =================',
      '                                                                                                                ',

      
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
    pos(-480, -213),
  ]);

  add([
    sprite("background2"),
    pos(-245, -212),
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

  const enemy = add([
    sprite('enemy1'),
    
    solid(),
    pos(420, 105),  // Defina as coordenadas corretas para a posição do inimigo
    scale(0.85), // Defina a escala desejada para o inimigo
    body(),
    'dangerous',
    {
      sprites: ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6','enemy7','enemy8','enemy9','enemy10'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  enemy.action(() => {
    enemy.timer += dt();
    if (enemy.timer >= 0.3) { // Mudar de sprite a cada 1 segundo
      enemy.currentSpriteIndex = (enemy.currentSpriteIndex + 1) % enemy.sprites.length;
      enemy.changeSprite(enemy.sprites[enemy.currentSpriteIndex]);
      enemy.timer = 0;
    }
  });

  const enemy2 = add([
    sprite('enemy1'),
    
    solid(),
    pos(1111, 100),  // Defina as coordenadas corretas para a posição do inimigo
    scale(0.85), // Defina a escala desejada para o inimigo
    body(),
    'dangerous2',
    {
      sprites: ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6','enemy7','enemy8','enemy9','enemy10'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  enemy2.action(() => {
    enemy2.timer += dt();
    if (enemy2.timer >= 0.3) { // Mudar de sprite a cada 1 segundo
      enemy2.currentSpriteIndex = (enemy2.currentSpriteIndex + 1) % enemy2.sprites.length;
      enemy2.changeSprite(enemy2.sprites[enemy2.currentSpriteIndex]);
      enemy2.timer = 0;
    }
  });
  
  const enemy3 = add([
    sprite('enemy1'),
    
    solid(),
    pos(1350, 105),  // Defina as coordenadas corretas para a posição do inimigo
    scale(0.85), // Defina a escala desejada para o inimigo
    body(),
    'dangerous2',
    {
      sprites: ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6','enemy7','enemy8','enemy9','enemy10'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  enemy3.action(() => {
    enemy3.timer += dt();
    if (enemy3.timer >= 0.3) { // Mudar de sprite a cada 1 segundo
      enemy3.currentSpriteIndex = (enemy3.currentSpriteIndex + 1) % enemy3.sprites.length;
      enemy3.changeSprite(enemy3.sprites[enemy3.currentSpriteIndex]);
      enemy3.timer = 0;
    }
  });

  const enemy4 = add([
    sprite('enemy1'),
    
    solid(),
    pos(2030, 279),  // Defina as coordenadas corretas para a posição do inimigo
    scale(0.85), // Defina a escala desejada para o inimigo
    body(),
    'dangerous2',
    {
      sprites: ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6','enemy7','enemy8','enemy9','enemy10'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  enemy2.action(() => {
    enemy4.timer += dt();
    if (enemy4.timer >= 0.3) { // Mudar de sprite a cada 1 segundo
      enemy4.currentSpriteIndex = (enemy4.currentSpriteIndex + 1) % enemy4.sprites.length;
      enemy4.changeSprite(enemy4.sprites[enemy4.currentSpriteIndex]);
      enemy4.timer = 0;
    }
  });

  const enemy5 = add([
    sprite('enemy1'),
    
    solid(),
    pos(2250, 105),  // Defina as coordenadas corretas para a posição do inimigo
    scale(0.85), // Defina a escala desejada para o inimigo
    body(),
    'dangerous',
    {
      sprites: ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6','enemy7','enemy8','enemy9','enemy10'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  enemy5.action(() => {
    enemy5.timer += dt();
    if (enemy2.timer >= 0.3) { // Mudar de sprite a cada 1 segundo
      enemy5.currentSpriteIndex = (enemy5.currentSpriteIndex + 1) % enemy5.sprites.length;
      enemy5.changeSprite(enemy5.sprites[enemy5.currentSpriteIndex]);
      enemy5.timer = 0;
    }
  });

  const enemy6 = add([
    sprite('enemy1'),
    
    solid(),
    pos(750, 105),  // Defina as coordenadas corretas para a posição do inimigo
    scale(0.85), // Defina a escala desejada para o inimigo
    body(),
    'dangerous',
    {
      sprites: ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6','enemy7','enemy8','enemy9','enemy10'],
      currentSpriteIndex: 0,
      timer: 0,
    },
  ]);
  
  enemy6.action(() => {
    enemy6.timer += dt();
    if (enemy6.timer >= 0.3) { // Mudar de sprite a cada 1 segundo
      enemy6.currentSpriteIndex = (enemy6.currentSpriteIndex + 1) % enemy6.sprites.length;
      enemy6.changeSprite(enemy6.sprites[enemy6.currentSpriteIndex]);
      enemy6.timer = 0;
    }
  });



  const player = add([
    sprite('mario'), solid(),
    pos(40, 200),
    scale(1, 1),
    body(),
    big(),
    origin('bot')
  ])

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
  action('dangerous2', (d) => {
    d.move(-ENEMY_SPEED2, 0)
  })
  action('dangerous3', (d) => {
    d.move(-ENEMY_SPEED3, 0)
  })

  player.collides('dangerous', (d) => {
    if (isJumping) {
      destroy(d)
    } else {
      go('lose', { score: scoreLabel.value})
    }
  })
  player.collides('dangerous2', (d) => {
    if (isJumping) {
      destroy(d)
    } else {
      go('lose', { score: scoreLabel.value})
    }
  })
  

  player.action(() => {
    camPos(player.pos)
    if (player.pos.y >= FALL_DEATH) {
      go('lose', { score: scoreLabel.value})
    }
  })

  player.collides('pipe1', () => {
    // Redireciona para a página da fase quando o jogador colide com o objeto pipe1
    window.location.href = '../fase2/index.html';
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
  });

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
