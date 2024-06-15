// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Tick3t {
    address public owner;
    uint256 public numEvents;

    constructor() {
        owner = msg.sender;
    }

    struct Event {
        uint256 id;
        string name;
        uint256 ticketPrice;
        // uint256 ticketsSold;
        // uint256 maxTickets;
        // string date;
        // string time;
        // string location;
    }

    struct Ticket {
        address buyer;
        uint256 eventID;
    }

    mapping(uint256 => Event) events;              // events[<event ID>] = that event
    mapping(uint256 => Ticket[]) tickets;          // tickets[<event ID>] = list of tickets for that event
    mapping(address => Ticket[]) purchasedTickets; // purchasedTickets[<buyer wallet address>] = a buyer's ticket purchase history


    function createEvent(string memory _eventName, uint256 _ticketPrice) public {
        require(msg.sender == owner);

        numEvents++;
        events[numEvents] = Event(numEvents, _eventName, _ticketPrice);
    }


    function purchaseTicket(address _buyer, uint256 _eventID) public payable {
        Event memory e = events[_eventID];
        require(msg.value >= e.ticketPrice);
        
        purchasedTickets[_buyer].push(
            Ticket(_buyer, _eventID)
        );
    }


    function getEvent(uint256 _eventID) public view returns (Event memory) {
        return events[_eventID];
    }
}
