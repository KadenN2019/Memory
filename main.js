function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

var cards = ''
var firstValue= ''
var secondValue= ''
var arrayItems= []
var attempts = 15
var points = 0

shuffleArray(deck)
deck.forEach(l =>{
    cards += `<div class="cardDown" id="${l.value}"><img src="${l.front}"></div>`
})

$('#lives').html(`You have ${attempts} lives left!`)

$('#cards').html(cards)
$('img').hide()
console.log(firstValue,secondValue)
$('#cards').on('click', 'div:not(.show)', function(e){
    $(this).removeClass("cardDown")
    $(this).addClass("flipped")
    thisValue = $(this).attr('id')
    thisCard = $(this)
    arrayItems.push(thisCard)
    var image =$(this).children('img')
    image.show()

    if(firstValue === ""){
        firstValue = thisValue
    }else if(firstValue !== ""&&secondValue === ""){
        secondValue = thisValue
        $('#cards *').prop("disabled", true)

        if(firstValue === secondValue){
            setTimeout(() => {
                arrayItems[0].addClass("show")
                arrayItems[1].addClass("show")
                firstValue=""
                secondValue=""
                arrayItems=[]
                $('#cards *').prop("disabled", false)

                points ++;
                if(points == 9){
                    $('#done').html(`You Won`)
                    $('#cards *').prop("disabled", true)
                }
                

            }, 1000);

        }else if(firstValue !== secondValue){
            setTimeout(() => {
                arrayItems[0].addClass("cardDown")
                arrayItems[1].addClass("cardDown")
                
                arrayItems[0].find('img').hide()
                arrayItems[1].find('img').hide()

                attempts --;
                $('#lives').html(`You have ${attempts} lives left!`)

                firstValue=""
                secondValue=""
                arrayItems=[]
                $('#cards *').prop("disabled", false)

                if(attempts == 0){
                    $('#done').html(`You Lost`)
                    $('#cards *').prop("disabled", true)
                }
            }, 1000);
        }
    }
})


