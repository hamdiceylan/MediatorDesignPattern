function EventClass() {
};

(function() {
    var events = {};

    function privateSetEvent(eventName) {
         
        if (typeof events[eventName] === 'undefined') {
            events[eventName] = 0;
        }
        events[eventName]++;
    };

    EventClass.prototype.privilegedSetEvent = function(eventName) {
        privateSetEvent(eventName);
        return events;
    };
}()); 

var Mediator = ( function( window, undefined ) {
 
    function Mediator() {
        this._topics = {};
    }
 
    Mediator.prototype.subscribe = function mediatorSubscribe( topic, callback ) {
        if( ! this._topics.hasOwnProperty( topic ) ) {
            this._topics[ topic ] = [];
        }
 
        this._topics[ topic ].push( callback );
        return true;
    };
 
    Mediator.prototype.unsubscribe = function mediatorUnsubscribe( topic, callback ) {
        if( ! this._topics.hasOwnProperty( topic ) ) {
            return false;
        }
 
        for( var i = 0, len = this._topics[ topic ].length; i < len; i++ ) {
            if( this._topics[ topic ][ i ] === callback ) {
                this._topics[ topic ].splice( i, 1 );
                return true;
            }
        }
        return false;
    };
 
    Mediator.prototype.publish = function mediatorPublish() {
        var args = Array.prototype.slice.call( arguments );
        var topic = args.shift();
 
        if( ! this._topics.hasOwnProperty( topic ) ) {
            return false;
        }
 
        for( var i = 0, len = this._topics[ topic ].length; i < len; i++ ) {
            this._topics[ topic ][ i ].apply( undefined, args );
        }
        return true;
    };
 
    return Mediator;
 
} )( window );
 
var Logger = function LogRecorder( eventName ) {
  var eventObject = new EventClass();
  $('#logContents').empty();
  var eventDetails = eventObject.privilegedSetEvent(eventName);
      for (var p in eventDetails) {
        $('#logContents').append('<li>' + p + ': ' + eventDetails[p] + '</li>');
    }
};

var UpdateHotelList = function HotelList(hotelName){

    if ($('#js_hotel_history').find('li:contains(' + hotelName + ')').size() === 0) {
        $('#js_hotel_history').prepend('<li>' + hotelName + '</li>');
    }
};