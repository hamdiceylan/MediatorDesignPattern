    /**
 * Mediator Design Patter Sample
 */
var myMediator = new Mediator();
myMediator.subscribe( 'addLog', Logger );
myMediator.subscribe( 'addHotelList', UpdateHotelList );

$('#js_city_list li').click(function() {
    // Perform new search...
    myMediator.publish( 'addLog', 'citylist:click');
});

$('.querystring_shadow').focus(function() {
    myMediator.publish( 'addLog', 'searchfield:focus');
});

$('.querystring_shadow').keypress(function() {
    myMediator.publish( 'addLog', 'searchfield:keypress');
});

$('#js_short_dealinfos').click(function() {
    myMediator.publish( 'addLog', 'dealinfo:click');
});
    
