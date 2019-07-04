class View {
    constructor(cardContainerId, cardCount) {
        console.info(`view construido`)

        this.cardContainer = $(cardContainerId)
        this.cards = []        

        //$.subscribe("model.initialShuffle", this.shuffle.bind(this))

        $.subscribe("view.clickCarta", this.clickCarta.bind(this)) // vai mudar para op controller
        $.subscribe("view.notify", this.notify.bind(this))

        this.init(cardCount)
        this.buttonBindregister(this)
    }

    buttonBindregister(self) {
        $('.stack').click(function () {
            self.stack();
        });

        $('.spread').click(function () {
            self.spread();
        });

        $('.shuffle').click(function () {
            self.shuffle();
        });

        $('.flip').click(function () {
            self.toogleFlipAll();
        });

        $('.player').click(function () {
            self.player();
        });
    }

    geraCard(indice) {
        console.info("generate card")
        return $("<li>").addClass("card").data("indice", indice)
            .attr("data-indice", indice)
            .append($("<div>").addClass("flip-card")
                .append($("<div>").addClass("flip-card-inner")
                    .append($("<div>").addClass("flip-card-front")
                        .append($("<img>").addClass("imgCarta")

                            .attr("src", "card-back-orange.png")
                            .attr("alt", "Carta Fundo")))
                    .append($("<div>").addClass("flip-card-back")
                        .append($("<img>").addClass("imgCarta")

                            .attr("src", "https://deckofcardsapi.com/static/img/AS.png")
                            .attr("alt", "Carta Frente")))))
            .click(function (e) {
                $.publish('view.clickCarta', { event: e, target: this })
            })
    }

    clickCarta(event, param) {
        console.log('view.clickCarta', event, param)
        this.toggleFlip($(param.target))
    }

    toggleFlip(target) {
        setTimeout(function () {
            if (target.hasClass("flip-card-desvirada")) {
                target.removeClass("flip-card-desvirada")
                $.publish('view.cartaVirada', target)
            } else {
                target.addClass("flip-card-desvirada")
                $.publish('view.cartaDesvirada', target)
            }
        }, 10)
    }

    init(qtd) {
        console.info("init")
        ' '.repeat(qtd - 1).split(' ').forEach(function (o, i) {
            this.cards.push(this.geraCard(i))
        }.bind(this))
        console.info("cards.length: " + this.cards.length)
        this.cardContainer.append(this.cards)
    }
    stack() {
        this.cards.forEach(function (o, e) {
            setTimeout(function () {
                o.removeClass("ani" + e)
                o.removeClass("p1")
                o.removeClass("p2")
            }, e * 150)
        })
    }
    spread() {
        this.cards.forEach(function (o, e) {
            setTimeout(function () {
                o.removeClass("p1")
                o.removeClass("p2")
                o.addClass("ani" + e)
                $.publish("view.spreadDone")
                console.info("spread done")
            }, e * 150)
        })
    }

    player() {
        this.cards.forEach(function (o, e) {
            setTimeout(function () {
                o.removeClass("ani" + e)
                if (e % 2 == 0)
                    o.addClass("p1")
                else
                    o.addClass("p2")
            }, e * 150)
        })
    }

    shuffle() {
        this.cards.forEach(function (o, e) {
            setTimeout(function () {
                o.removeClass("ani" + e)
                o.removeClass("p1")
                o.removeClass("p2")
                var deck = ((Math.floor(Math.random() * 3) + 1).toFixed(0))
                o.addClass("deck" + deck)
                setTimeout(function () {
                    o.removeClass("deck" + deck)
                    //$.publish('view.shuffleDone', e)
                }, e * 100)
            }, e * 100)
        })
    }

    toogleFlipAll() {
        this.cards.forEach(function (o, e) {
            setTimeout(function () {
                if (o.hasClass("flip-card-desvirada"))
                    o.removeClass("flip-card-desvirada")
                else
                    o.addClass("flip-card-desvirada")
            }, e * 150)
        })
    }

    notify(model) {
        // if mesa virada == null 
        // shuffle
    }

    showDeckId(id) {
        let str = $('<p>' + id + '</p>')
        $('#deckHere').html(str)
    }
}