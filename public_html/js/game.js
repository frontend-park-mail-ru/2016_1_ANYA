define ([
    'pixi',
    'jquery'
], function (
    PIXI,
    $
)
{
    $('.game-view').children('.buttons').prepend('<div class="buttons__button" id="resetGame"><a href="#game">ЗАНОВО</a></button>')
    $('#resetGame').on('click', play);

    var renderer = PIXI.autoDetectRenderer($(window).width() * 0.8, $(window).height() * 0.7, {backgroundColor : 0x1099bb});
    $('#game-screen').append(renderer.view);

    function play() {
        var stage = new PIXI.Container();
        var texture = PIXI.Texture.fromImage('img/monster.png');

        var monsters = [];
        var nextKilledMonster = 0;
        for (var i = 0; i < 100; i++) {
            monsters[i] = new PIXI.Sprite(texture);
            //weight center
            monsters[i].anchor.x = 0.5;
            monsters[i].anchor.y = 0.5;
            monsters[i].position.x = $(renderer.view).width() + 200 * i;
            monsters[i].position.y = $(renderer.view).height() - 100;
            stage.addChild(monsters[i]);
        }

        var tower = new PIXI.Sprite(PIXI.Texture.fromImage('img/tower.png'));
        tower.anchor.x = 0.5;
        tower.anchor.y = 0.5;
        tower.position.x = 100;
        tower.position.y = $(renderer.view).height() - 100;
        tower.interactive = true;
        tower.on('mousedown', shoot);

        function shoot() {
            console.log('shooting');

            var shot = new PIXI.Sprite(PIXI.Texture.fromImage('img/lightning.png'))
            shot.anchor.x = 0.5;
            shot.anchor.y = 0.5;
            shot.position.x = tower.position.x + 30;
            shot.position.y = tower.position.y - 70;
            shot.scale.x = 0.3;
            shot.scale.y = 0.3;

            stage.addChild(shot);
            var monsterNum = nextKilledMonster++;
            function animateShot () {
                requestAnimationFrame(animateShot);
                shot.x += 4;
                shot.y += 0.1;
                if (shot.x > monsters[monsterNum].x - 10 &&
                    shot.x < monsters[monsterNum].x + 10) {
                    var explosion = new PIXI.Sprite(PIXI.Texture.fromImage('img/explosion.png'))
                    explosion.anchor.x = 0.5;
                    explosion.anchor.y = 0.5;
                    explosion.position.x = shot.position.x;
                    explosion.position.y = shot.position.y + 70;
                    explosion.scale.x = 0.2;
                    explosion.scale.y = 0.2;
                    var killed = false;
                    //stage.addChild(explosion);
                    function animateExplosion() {
                        requestAnimationFrame(animateExplosion);
                        explosion.scale.x += 0.1;
                        explosion.scale.y += 0.1;
                        if (explosion.scale.x > 0.3 && explosion.scale.x < 0.5) {
                            stage.removeChild(monsters[monsterNum]);
                            stage.removeChild(shot);
                        }
                        if (explosion.scale.x > 0.35) {
                            stage.removeChild(explosion);
                        }
                        renderer.render(stage);
                    }
                    animateExplosion();
                }
                renderer.render(stage);
            }
            animateShot();
            console.log(nextKilledMonster);
            tower.removeListener('mousedown');
            setTimeout(function () {
                tower.on('mousedown', shoot);
            }, 5000);
        }

        stage.addChild(tower);

        // start animating
        function animate() {
            requestAnimationFrame(animate);
            for (var i = 0; i < monsters.length; i++) {
                monsters[i].x -= 1;
            }
            if (monsters[nextKilledMonster].x < tower.x + 10) {
                stage.removeChildren();
                var text = new PIXI.Text('ТЫ ПРОИГРАЛ',{font : '60px Conv_rodchenko', fill : 0xff1010, align : 'center'});
                text.anchor.x = 0.5;
                text.anchor.y = 0.5;
                text.position.x = $(renderer.view).width() / 2;
                text.position.y = $(renderer.view).height() / 2;

                stage.addChild(text);
            }
            renderer.render(stage);
        };

        animate();
    };
    play();
    return play;
});
