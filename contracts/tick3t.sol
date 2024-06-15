// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

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
        uint256 ticketsSold;
        uint256 maxTickets;
        string date;
        string time;
        string location;
        string description;
    }

    struct Ticket {
        address buyer;
        uint256 eventID;
        uint256 amount;
    }

    mapping(uint256 => Event) events;              // events[<event ID>] = that event
    mapping(address => Ticket[]) purchasedTickets; // purchasedTickets[<buyer wallet address>] = a buyer's ticket purchase history


    function createEvent(
        string memory _eventName,
        uint256 _ticketPrice,
        uint256 _ticketsSold,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _location,
        string memory _description
    ) public returns (uint256) {
        require(msg.sender == owner, "insufficient privileges");

        numEvents++;
        events[numEvents] = Event(
            numEvents,
            _eventName,
            _ticketPrice,
            _ticketsSold,
            _maxTickets,
            _date,
            _time,
            _location,
            _description
        );
        
        return numEvents;
    }


    function getEvent(uint256 _eventID) public view returns (Event memory) {
        return events[_eventID];
    }


    function getAllEvents() public view returns (Event[] memory) {
        Event[] memory allEvents = new Event[](numEvents);
        for (uint256 i = 1; i <= numEvents; i++) {
            allEvents[i - 1] = events[i];
        }
        return allEvents;
    }


    function purchaseTicket(uint256 _eventID, uint256 amount) public payable {
        Event storage e = events[_eventID];

        require(e.ticketsSold + amount < e.maxTickets, "tickets sold out");
        require(msg.value < e.ticketPrice * amount, "insufficient funds");
        
        purchasedTickets[msg.sender].push(
            Ticket(msg.sender, _eventID, amount)
        );

        events[_eventID].ticketsSold += amount;
    }
}
